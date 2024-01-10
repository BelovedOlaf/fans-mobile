import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import StepIndicator from "react-native-step-indicator";
import CustomStep from "./CustomStep"; // Import the CustomStep component

const purple = "#a854f5";
const purpleLight = "#f1e2ff";

// Style configuration for the StepIndicator
const stepIndicatorStyles = {
	stepIndicatorSize: 25, // Adjust the size of the steps
	currentStepIndicatorSize: 25,
	separatorStrokeWidth: 1,
	currentStepStrokeWidth: 2,
	stepStrokeCurrentColor: purple,
	stepStrokeWidth: 1,
	stepStrokeFinishedColor: purpleLight,
	stepStrokeUnFinishedColor: purpleLight,
	separatorFinishedColor: purpleLight,
	separatorUnFinishedColor: purpleLight,
	stepIndicatorFinishedColor: purpleLight,
	stepIndicatorUnFinishedColor: "#ffffff",
	stepIndicatorCurrentColor: "#ffffff",
	stepIndicatorLabelFontSize: 0,
	currentStepIndicatorLabelFontSize: 0,
	stepIndicatorLabelCurrentColor: purpleLight,
	stepIndicatorLabelFinishedColor: "#ffffff",
	stepIndicatorLabelUnFinishedColor: "#aaaaaa",
	labelColor: "#999999",
	labelSize: 13,
	currentStepLabelColor: "#fe7013",
};

interface VideoCallSetupStepperProps {
	currentStep: number;
	steps: Array<{ label: string; component: React.ComponentType }>;
	setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const VideoCallSetupStepper: React.FC<VideoCallSetupStepperProps> = ({
	currentStep,
	steps,
}) => {
	const totalSteps = steps.length;

	return (
		<View>
			<StepIndicator
				currentPosition={currentStep}
				labels={steps.map(() => "")}
				stepCount={totalSteps}
				customStyles={stepIndicatorStyles}
				renderStepIndicator={({ position, stepStatus }) => (
					<CustomStep isFinished={stepStatus === "finished"} />
				)}
			/>
		</View>
	);
};

export default VideoCallSetupStepper;
