import { globalWSManager } from "@helper/realtime/WSClient";
import { AuthState, authStateAtom } from "@state/auth";
import { useRefreshNotifications } from "@state/notifications";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useAppContext } from "./useAppContext";

function BackgroundTasks() {
	const app = useAppContext();
	const refreshNotifications = useRefreshNotifications();
	const authState = useRecoilValue(authStateAtom);
	const user = app.state.user;

	useEffect(() => {
		if (authState !== AuthState.Authenticated) return;

		const periodicRefresh = () => {
			if (user.userInfo.id === "0") return;
			refreshNotifications();
		};
		const interval = setInterval(periodicRefresh, 30000);
		return () => clearInterval(interval);
	}, [user.userInfo.id, authState]);

	useEffect(() => {
		if (authState !== AuthState.Authenticated) return;
		if (user.userInfo.id === "0") return;
		globalWSManager.connect();
	}, [user.userInfo.id, authState]);

	return null;
}

export default BackgroundTasks;
