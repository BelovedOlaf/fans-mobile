import shaka from "shaka-player/dist/shaka-player.ui.js";
import React from "react";
import "shaka-player/dist/controls.css";
import "@assets/shaka-controls.css";

export interface ShakaPlayerProps {
	src: string;
	config?: Partial<shaka.extern.PlayerConfiguration>;
	uiConfig?: Partial<shaka.extern.UIConfiguration>;
	chromeless?: boolean;
	className?: string;
	resizeMode?: "cover" | "contain" | "stretch";
}

export interface ShakaPlayerRef {
	player: shaka.Player | null;
	ui: shaka.ui.Overlay | null;
	videoElement: HTMLVideoElement | null;
}

shaka.net.NetworkingEngine.registerScheme(
	"blob",
	(uri, request, requestType, progressUpdated, headersReceived) => {
		// fetch("blob:") fails when we query with HEAD method.
		if (request.method === "HEAD") request.method = "GET";

		return shaka.net.HttpFetchPlugin.parse(
			uri,
			request,
			requestType,
			progressUpdated,
			headersReceived,
		);
	},
	shaka.net.NetworkingEngine.PluginPriority.PREFERRED,
	true,
);

function ShakaPlayer(
	{ src, config, uiConfig, chromeless, className, ...rest }: ShakaPlayerProps,
	ref: React.Ref<ShakaPlayerRef>,
) {
	const uiContainerRef = React.useRef<HTMLDivElement | null>(null);
	const videoRef = React.useRef<HTMLVideoElement | null>(null);

	const [player, setPlayer] = React.useState<shaka.Player | null>(null);
	const [ui, setUi] = React.useState<shaka.ui.Overlay | null>(null);

	// Effect to handle component mount & mount.
	// Not related to the src prop, this hook creates a shaka.Player instance.
	// This should always be the first effect to run.
	React.useEffect(() => {
		const player = new shaka.Player(videoRef.current);
		setPlayer(player);

		let ui: shaka.ui.Overlay | null = null;
		if (!chromeless) {
			ui = new shaka.ui.Overlay(
				player,
				uiContainerRef.current!,
				videoRef.current!,
			);
			setUi(ui);
		}

		return () => {
			player.destroy();
			if (ui) {
				ui.destroy();
			}
		};
	}, []);

	React.useEffect(() => {
		if (ui && uiConfig) {
			ui.configure(uiConfig);
		}
	}, [ui, uiConfig]);

	// Keep shaka.Player.configure in sync.
	React.useEffect(() => {
		if (player && config) {
			player.configure(config);
		}
	}, [player, config]);

	// Load the source url when we have one.
	React.useEffect(() => {
		if (player && src) {
			player.load(src);
		}
	}, [player, src]);

	// Define a handle for easily referencing Shaka's player & ui API's.
	React.useImperativeHandle(
		ref,
		() => ({
			get player() {
				return player;
			},
			get ui() {
				return ui;
			},
			get videoElement() {
				return videoRef.current;
			},
		}),
		[player, ui],
	);

	const objectFit =
		(rest.resizeMode === "stretch" ? "fill" : rest.resizeMode) ?? "contain";

	return (
		<div
			ref={uiContainerRef}
			className={className}
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				backgroundColor: "black",
			}}
		>
			<video
				ref={videoRef}
				style={{
					maxWidth: "100%",
					width: "100%",
					maxHeight: "100%",
					height: "100%",
					objectFit,
				}}
				{...rest}
			/>
		</div>
	);
}

export default React.forwardRef(ShakaPlayer);
