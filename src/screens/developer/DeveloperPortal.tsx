import React, { useState } from "react";
import { useDeviceContext } from "twrnc";

import { FansScreen1 } from "@components/controls";
import tw from "@lib/tailwind";
import { DeveloperNativeStackScreenProps } from ".";
import DeveloperMenu from "./menu";

const DeveloperPortalScreen = (
	props: DeveloperNativeStackScreenProps<"DeveloperPortal">,
) => {
	const { navigation } = props;

	const [isDocumentation, setDocumentationYN] = useState(false);

	const handlePressApplications = () => {
		navigation.navigate("Applications");
	};

	const handlePressDocumentation = () => {
		setDocumentationYN(!isDocumentation);
	};

	const handlePressGettingStarted = () => {
		navigation.navigate("GettingStarted");
	};

	const handleNavigate = (screen: "Applications" | "GettingStarted") => {
		navigation.navigate(screen);
	};

	return (
		<FansScreen1 contentStyle={tw.style("p-0")}>
			<DeveloperMenu onNavigate={handleNavigate} />
		</FansScreen1>
	);
};

export default DeveloperPortalScreen;
