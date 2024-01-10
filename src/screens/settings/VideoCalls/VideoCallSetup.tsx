import React, { useState, useEffect } from "react";
import { View } from "react-native";
import VideoCallSetupStepper from "./VideoCallSetupStepper";
import {
	FansDivider,
	FansGap,
	FansHorizontalDivider,
	FansImage,
	FansImage1,
	FansScreen2,
	FansSvg,
	FansText,
	FansTextInput,
	FansView,
} from "@components/controls";
import { IProfileSettings } from "@usertypes/types";
import VideoStepperButtons from "./VideoStepperButtons";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

import { useAppContext } from "@context/useAppContext";
import { updateVideoSettings } from "../../../helper/endpoints/profile/apis";
import { useRouter } from "expo-router";

const VideoCallSetup = () => {
	// Define the state for currentStep and steps
	const [currentStep, setCurrentStep] = useState(0);
	const { state } = useAppContext();
	const router = useRouter();

	// Define the steps array
	const steps = [
		{ label: "Step 1", component: Step1 },
		{ label: "Step 2", component: Step2 },
		{ label: "Step 3", component: Step3 },
		{ label: "Step 4", component: Step4 },
		{ label: "Step 5", component: Step5 },
	];

	const totalSteps = steps.length;

	const handleNextStep = () => {
		if (currentStep < totalSteps - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleEnableVideoCalls = async () => {
		const updatedSettings = {
			...state.profile.settings,
			videoCallsEnabled: true,
		};
		const response = await updateVideoSettings(updatedSettings);
		if (response.ok) router.push("/profile");
	};

	return (
		<FansScreen2 contentStyle={{ maxWidth: 670 }}>
			<FansHorizontalDivider />
			<FansView style={{ marginTop: 20 }}>
				<VideoCallSetupStepper
					currentStep={currentStep}
					steps={steps}
					setCurrentStep={setCurrentStep}
				/>
			</FansView>
			<View>{React.createElement(steps[currentStep].component)}</View>
			<View>
				<VideoStepperButtons
					currentStep={currentStep}
					totalSteps={totalSteps}
					handlePrevStep={handlePrevStep}
					handleNextStep={handleNextStep}
					handleEnableVideoCalls={handleEnableVideoCalls}
				/>
			</View>
			<FansGap height={20} />
		</FansScreen2>
	);
};

export default VideoCallSetup;
