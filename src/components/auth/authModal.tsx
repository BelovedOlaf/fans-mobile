import { ChevronLeftSvg, CloseSvg } from "@assets/svgs/common";
import UserAvatar from "@components/avatar/UserAvatar";
import { FypNullableView } from "@components/common/base";
import { FansDivider } from "@components/controls";
import { SUBSCRIBE_LOGIN_DIALOG_ID } from "@constants/modal";
import { ModalState } from "@context/state/modalState";
import { ModalActionType, useAppContext } from "@context/useAppContext";
import tw from "@lib/tailwind";
import { authAtom } from "@state/auth";
import React, { FC } from "react";
import { Pressable, View } from "react-native";
import { IconButton, Modal, Portal } from "react-native-paper";
import { useSetRecoilState } from "recoil";
import LoginView from "./loginView";
import SignupView from "./signupView";
import VerifyAccountView from "./verifyAccountView";

interface ModalHeaderProps {
	onPrev: () => void;
	onClose: () => void;
	avatar?: string;
}

export const ModalHeader: FC<ModalHeaderProps> = (props) => {
	const { onPrev, onClose, avatar } = props;
	return (
		<View style={tw.style("relative items-center")}>
			<Pressable
				onPress={onPrev}
				style={tw.style("w-2.5 h-3.5 absolute left-0 top-[-6px]")}
			>
				<ChevronLeftSvg size={14} color="#707070" />
			</Pressable>
			<UserAvatar size="78px" image={avatar} />
			<IconButton
				icon={() => <CloseSvg size={11} color="#fff" />}
				containerColor="rgba(0,0,0,0.3)"
				style={tw.style("m-0 w-6 h-6 absolute top-[-12px] right-0")}
				onPress={onClose}
			/>
		</View>
	);
};

const AuthModal = () => {
	const { state, dispatch } = useAppContext();
	const modals = state.modal.modals;

	const setAuth = useSetRecoilState(authAtom);

	const modal = modals.find(
		(m) => m.id === SUBSCRIBE_LOGIN_DIALOG_ID,
	) as ModalState<{
		tab: string;
		avatar: string;
	}>;
	const visible = !!modal && modal.show;
	const tab = !!modal && modal.payload?.tab;
	const avatar = !!modal && modal.payload?.avatar;

	const handleClose = () => {
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: { id: SUBSCRIBE_LOGIN_DIALOG_ID, show: false },
		});
	};

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={handleClose}
				contentContainerStyle={tw.style(
					"bg-white rounded-[15px] mx-[18px] sm:w-full sm:max-w-[358px] sm:mx-auto",
				)}
			>
				<View style={tw.style("px-[18px] pt-6 pb-7.5")}>
					<ModalHeader
						avatar={avatar}
						onPrev={handleClose}
						onClose={handleClose}
					/>
					<FansDivider style={tw.style("my-5")} />
					<FypNullableView visible={tab === "signup"}>
						<SignupView
							dispatch={dispatch}
							handleClose={handleClose}
							avatar={avatar}
						/>
					</FypNullableView>
					<FypNullableView visible={tab === "verify-account"}>
						<VerifyAccountView
							dispatch={dispatch}
							modals={modals}
							handleClose={handleClose}
						/>
					</FypNullableView>
					<FypNullableView visible={tab === "login"}>
						<LoginView
							dispatch={dispatch}
							handleClose={handleClose}
							setAuth={setAuth}
							avatar={avatar}
						/>
					</FypNullableView>
				</View>
			</Modal>
		</Portal>
	);
};

export default AuthModal;
