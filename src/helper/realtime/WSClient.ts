import { BUILD_NUMBER } from "@env";
import { getWSInfo } from "@helper/endpoints/chat/apis";
import { StorageKeyTypes } from "@usertypes/commonEnums";
import { getStorage } from "@utils/storage";
import { decode, encode } from "cborg";
import { Platform } from "react-native";
import { Opcode, PayloadPong, WebSocketPayload } from "./ProtocolSchema";
import { setInbox } from "@state/chat";
import { wsAppProviderAccess } from "@context/appProvider";
import { UserActionType } from "@context/useAppContext";

enum RTSocketState {
	Disconnected,
	FetchingSocketURL,
	Connecting,
	Authenticating,
	Connected,
	Backoff,
}

const sleep = (ms: number) => new Promise((s) => setTimeout(s, ms));

class RTWebSocketManager {
	ws: WebSocket | null = null;
	state: RTSocketState = RTSocketState.Disconnected;
	loggingEnabled: boolean = true;
	cookie: number = 0;
	token: string | null = null;

	constructor() {}

	async connect() {
		if (this.state !== RTSocketState.Disconnected) {
			return;
		}

		const cookie = ++this.cookie;

		for (;;) {
			if (cookie !== this.cookie) return;
			this.token = await getStorage(StorageKeyTypes.AccessToken);
			if (this.token) break;
			await sleep(1000);
		}

		console.log("[RT] State -> Fetching WebSocket URL");
		this.state = RTSocketState.FetchingSocketURL;

		try {
			const resp = await getWSInfo();

			if (cookie !== this.cookie) return;

			if (!resp.ok) {
				throw new Error("Failed to fetch WebSocket URL");
			}

			console.log("[RT] State -> Connecting to:", resp.data.webSocketUrl);

			this.state = RTSocketState.Connecting;
			this.ws = new WebSocket(resp.data.webSocketUrl);
			this.ws.binaryType = "arraybuffer";
			this.ws.onopen = () => this.onOpen();
			this.ws.onmessage = (event) => this.onMessage(cookie, event.data);
			this.ws.onclose = (event) =>
				this.onClose(event.code, event.reason, event.wasClean);
		} catch (e) {
			if (cookie !== this.cookie) return;

			this.state = RTSocketState.Disconnected;
			console.error("[RT] State -> Disconnected.", e);

			setTimeout(this.connect.bind(this), 5000);
		}
	}

	disconnect() {
		if (this.state === RTSocketState.Disconnected) {
			return;
		}

		this.ws?.close();
		this.ws = null;
		this.state = RTSocketState.Disconnected;
		this.cookie++;
	}

	reconnect() {
		this.disconnect();
		this.connect();
	}

	private onOpen() {
		this.state = RTSocketState.Authenticating;
	}

	private async onMessage(cookie: number, buffer: ArrayBuffer) {
		if (cookie !== this.cookie) return;

		const payload = decode(new Uint8Array(buffer)) as WebSocketPayload;
		if (this.loggingEnabled) console.log("RT~>", payload);

		const [opcode, data] = payload;
		switch (opcode) {
			case Opcode.Ping: {
				const payload: PayloadPong = [Opcode.Pong, data];
				this.send(payload);
				break;
			}
			case Opcode.Hello: {
				this.state = RTSocketState.Connected;
				console.log("[RT] State -> Connected.");

				if (!this.token) return this.reconnect();

				this.send([
					Opcode.StartSession,
					{
						token: this.token,
						appVersion: BUILD_NUMBER ?? "dev",
						apiVersion: 1,
						platform: Platform.OS,
					},
				]);
				break;
			}
			case Opcode.ReadySession: {
				console.log("[RT] State -> Ready.");
				setInbox(data.conversations);
				break;
			}
			case Opcode.UserSync: {
				wsAppProviderAccess.setUser({
					type: UserActionType.updateUserInfo,
					payload: {
						data: data,
					},
				});
				break;
			}
		}
	}

	private send(payload: WebSocketPayload) {
		if (!this.ws) return;
		if (this.loggingEnabled) console.log("RT<~", payload);

		this.ws.send(encode(payload));
	}

	private onClose(code: number, reason: string, wasClean: boolean) {
		this.ws = null;
		this.state = RTSocketState.Disconnected;
		console.log("[RT] Connection closed.", code, reason, wasClean);
		setTimeout(this.connect.bind(this), 5000);
	}
}

export const globalWSManager = new RTWebSocketManager();
