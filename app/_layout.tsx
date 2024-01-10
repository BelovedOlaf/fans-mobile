import ProdModeSwitch from "@components/ProdModeSwitch";
import {
	PostReportDialog,
	ProfileReportDialog,
} from "@components/dialogs/report";
import { SendTipDialog, SendTipSuccessDialog } from "@components/posts/dialogs";
import { AnimationLoadingModal } from "@components/common/dialog";
import BlockCreatorModal from "@components/dialogs/report/BlockCreatorModal";
import { SendMessageSuccessModal } from "@components/modals/contact";
import {
	BLOCK_CREATOR_MODAL_ID,
	POST_REPORT_DIALOG_ID,
	PROFILE_REPORT_DIALOG_ID,
	SEND_MESSAGE_SUCCESS_MODAL_ID,
	ANIMATION_LOADING_DIALOG_ID,
} from "@constants/modal";
import BackgroundTasks from "@context/BackgroundTasks";
import AppProvider from "@context/appProvider";
import tw from "@lib/tailwind";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { maybeCompleteAuthSession } from "expo-web-browser";
import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";
import { useDeviceContext } from "twrnc";

export default function AppLayout() {
	const [fontsLoaded] = useFonts({
		"Inter-Black": require("@assets/fonts/Inter-Black.ttf"),
		"Inter-Light": require("@assets/fonts/Inter-Light.ttf"),
		"Inter-Regular": require("@assets/fonts/Inter-Regular.ttf"),
		"Inter-Medium": require("@assets/fonts/Inter-Medium.ttf"),
		"Inter-SemiBold": require("@assets/fonts/Inter-SemiBold.ttf"),
		"Inter-Bold": require("@assets/fonts/Inter-Bold.ttf"),
	});

	useEffect(() => {
		maybeCompleteAuthSession();
	}, []);
	useDeviceContext(tw);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<RecoilRoot>
			<PaperProvider>
				<RecoilNexus />
				<GestureHandlerRootView style={tw.style("grow")}>
					<AppProvider>
						<BackgroundTasks />
						<Slot />
						{/* Modals & Dialogs */}
						<PostReportDialog key={POST_REPORT_DIALOG_ID} />
						<ProfileReportDialog key={PROFILE_REPORT_DIALOG_ID} />
						<SendMessageSuccessModal
							key={SEND_MESSAGE_SUCCESS_MODAL_ID}
						/>
						<BlockCreatorModal key={BLOCK_CREATOR_MODAL_ID} />
						<AnimationLoadingModal
							key={ANIMATION_LOADING_DIALOG_ID}
						/>
						<SendTipDialog key="send-tip-dialog" />
						<SendTipSuccessDialog key="send-tip-success-dialog" />
					</AppProvider>
				</GestureHandlerRootView>
				<Toast />
				<ProdModeSwitch />
			</PaperProvider>
		</RecoilRoot>
	);
}
