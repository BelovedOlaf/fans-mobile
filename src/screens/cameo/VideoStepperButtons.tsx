import React from "react";
import { View, StyleSheet } from "react-native";
import RoundButton from "@components/common/RoundButton";
import { FansGap } from "@components/controls";
import { RoundButtonType } from "@usertypes/commonEnums";

const styles = StyleSheet.create({});

interface VideoStepperButtonsProps {
	currentStep: number;
	totalSteps: number;
	handlePrevStep: () => void;
	handleNextStep: () => void;
	handleEnableVideoCalls: () => void;
}

const VideoStepperButtons: React.FC<VideoStepperButtonsProps> = ({
	currentStep,
	totalSteps,
	handlePrevStep,
	handleNextStep,
	handleEnableVideoCalls,
}) => {
	return (
		<View>
			{currentStep !== 0 && (
				<RoundButton
					variant={RoundButtonType.OUTLINE_PRIMARY}
					onPress={handlePrevStep}
				>
					Previous
				</RoundButton>
			)}
			<FansGap height={24.5} />
			{currentStep !== totalSteps - 1 ? (
				<RoundButton onPress={handleNextStep}>Next</RoundButton>
			) : (
				<RoundButton onPress={handleEnableVideoCalls}>
					Enable custom video
				</RoundButton>
			)}
		</View>
	);
};

export default VideoStepperButtons;
