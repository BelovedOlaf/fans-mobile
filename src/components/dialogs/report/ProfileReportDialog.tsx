import RoundButton from "@components/common/RoundButton";
import RoundTextInput from "@components/common/RoundTextInput";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import CustomRadio from "@components/common/customRadio";
import { FansDivider, FansText } from "@components/controls";
import {
	BLOCK_CREATOR_MODAL_ID,
	PROFILE_REPORT_DIALOG_ID,
} from "@constants/modal";
import { ModalState } from "@context/state/modalState";
import { ModalActionType, useAppContext } from "@context/useAppContext";
import * as apis from "@helper/endpoints";
import tw from "@lib/tailwind";
import { RoundButtonType } from "@usertypes/commonEnums";
import React, { useCallback, useState } from "react";
import { View } from "react-native";

const PROFILE_REPORT_FLAG = [
	{ code: "ILLEGAL_CONTENT", label: "Illegal content" },
	{ code: "UNDERAGE_USER", label: "Underage user" },
	{
		code: "IMPERSONATION_OR_IDENTITY_THEFT",
		label: "Impersonation or identity theft",
	},
	{
		code: "PROMOTING_HATE_SPEECH_OR_DISCRIMINATION",
		label: "Promoting hate speech or discrimination",
	},
	{
		code: "PROMOTING_DANGEROUS_BEHAVIORS",
		label: "Promoting dangerous behaviors",
	},
	{
		code: "INVOLVED_IN_SPAN_OR_SCAM_ACTIVITIES",
		label: "Involved in spam or scam activities",
	},
	{
		code: "INFRINGEMENT_OF_MY_COPYRIGHT",
		label: "Infringement of my copyright",
	},
	{ code: "OTHER", label: "Other" },
] as const;

const ProfileReportDialog: React.FC = () => {
	const { state, dispatch } = useAppContext();
	const modals = state.modal.modals;
	const modal = modals.find(
		(m) => m.id === PROFILE_REPORT_DIALOG_ID,
	) as ModalState<{ profileId: string; username: string }>;
	const { profileId, username } = modal?.payload ?? {};
	const [index, setIndex] = useState(0);
	const [reason, setReason] = useState("");
	const [loading, setLoading] = useState(false);

	const handleClose = useCallback(() => {
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: {
				id: PROFILE_REPORT_DIALOG_ID,
				show: false,
			},
		});
	}, []);

	const handleSubmit = useCallback(async () => {
		if (profileId && username) {
			setLoading(true);
			const resp = await apis.profile.createProfileReport({
				profileId: profileId,
				reportFlag: PROFILE_REPORT_FLAG[index].code,
				reason: reason,
			});
			if (resp.ok) {
				setLoading(false);
				dispatch.setModal({
					type: ModalActionType.showModal,
					data: {
						id: BLOCK_CREATOR_MODAL_ID,
						show: true,
						payload: { profileId, username },
					},
				});

				dispatch.setModal({
					type: ModalActionType.showModal,
					data: { id: PROFILE_REPORT_DIALOG_ID, show: false },
				});
			}
		}
	}, [profileId, index, reason]);

	return (
		<BottomSheetWrapper open={!!modal && modal.show} onClose={handleClose}>
			<View style={tw.style("m-[15px]", "flex gap-[15px]")}>
				<FansText
					fontFamily="inter-bold"
					fontSize={19}
					textAlign="center"
				>
					Why are you reporting?
				</FansText>
				<View style={tw.style("h-[20px]")} />

				{PROFILE_REPORT_FLAG.map((flag, i) => (
					<React.Fragment key={i}>
						<CustomRadio
							label={flag.label}
							checked={index === i}
							onPress={() => setIndex(i)}
						/>
						{i < PROFILE_REPORT_FLAG.length - 1 && <FansDivider />}
					</React.Fragment>
				))}

				{PROFILE_REPORT_FLAG[index].code === "OTHER" && (
					<RoundTextInput
						placeholder={"Describe your issue"}
						value={reason}
						onChangeText={setReason}
					/>
				)}

				<RoundButton
					disabled={
						loading ||
						(PROFILE_REPORT_FLAG[index].code === "OTHER" &&
							reason.length === 0)
					}
					variant={RoundButtonType.OUTLINE_PRIMARY}
					onPress={handleSubmit}
				>
					<FansText>Submit</FansText>
				</RoundButton>
			</View>
		</BottomSheetWrapper>
	);
};

export default ProfileReportDialog;
