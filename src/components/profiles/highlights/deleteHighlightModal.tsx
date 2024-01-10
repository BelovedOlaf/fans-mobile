import RoundButton from "@components/common/RoundButton";
import CustomText from "@components/common/customText";
import { FansDivider } from "@components/controls";
import { FypModal } from "@components/common/base";
import tw from "@lib/tailwind";
import { cdnURL } from "@helper/Utils";
import { RoundButtonType } from "@usertypes/commonEnums";
import { IHighlight } from "@usertypes/types";
import React, { FC } from "react";
import { Image, View } from "react-native";

interface Props {
	visible: boolean;
	handleClose: () => void;
	handleConfirm: () => void;
	data?: IHighlight;
}

const DeleteHighlightModal: FC<Props> = (props) => {
	const { visible, handleClose, handleConfirm, data } = props;

	return (
		<FypModal
			visible={visible}
			onDismiss={handleClose}
			width={{ xs: "full", lg: 600 }}
		>
			<View style={tw.style("px-4 pb-[28px] pt-6")}>
				<View
					style={tw.style(
						"w-[78px] h-[78px] rounded-full mx-auto",
						data?.cover ? "" : "border border-fans-grey",
					)}
				>
					{data?.cover ? (
						<Image
							source={{
								uri: cdnURL(data.cover),
							}}
							style={tw.style("w-[78px] h-[78px] rounded-full ")}
							resizeMode="cover"
						/>
					) : null}
				</View>

				<FansDivider />
				<CustomText size="xl" style="text-center mb-5">
					{`Delete "${data?.title ?? ""}"?`}
				</CustomText>

				<View style={tw.style("flex-row gap-x-[14px]")}>
					<View style={tw.style("flex-1")}>
						<RoundButton
							variant={RoundButtonType.OUTLINE_PRIMARY}
							onPress={handleClose}
						>
							No, cancel
						</RoundButton>
					</View>
					<View style={tw.style("flex-1")}>
						<RoundButton onPress={handleConfirm}>
							Yes, delete
						</RoundButton>
					</View>
				</View>
			</View>
		</FypModal>
	);
};

export default DeleteHighlightModal;
