// import react modules
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

// import common modules
import { ChevronDownSvg, ChevronUp2Svg, DiamondPng } from "@assets/svgs/common";
import {
	FansGap,
	FansHorizontalDivider,
	FansText,
	FansTextInput2,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import { ColorStyle1 } from "@usertypes/styles";

interface DeveloperMenuProps {
	onNavigate: (screen: "Applications" | "GettingStarted") => void;
	path?: string;
}

const DeveloperMenu = (props: DeveloperMenuProps) => {
	const { onNavigate, path } = props;

	const [isDocumentationExpanded, setDocumentationExpanded] = useState(true);

	const handlePressApplications = () => {
		onNavigate("Applications");
	};

	const handlePressDocumentation = () => {
		setDocumentationExpanded(!isDocumentationExpanded);
	};

	const handlePressGettingStarted = () => onNavigate("GettingStarted");

	const handlePressIntro = () => onNavigate("GettingStarted");

	const handlePressSubscriptionEndpoints = () => onNavigate("GettingStarted");

	const handlePressUsersEndpoints = () => onNavigate("GettingStarted");

	const handlePressWebhooks = () => onNavigate("GettingStarted");

	return (
		<FansView>
			<FansGap height={64} />
			<FansView
				alignSelf={{ xs: "center", lg: "start" }}
				flexDirection="row"
				gap={{ xs: 10.8, lg: 13.1 }}
			>
				<FansView width={22.21} height={20.59}>
					<DiamondPng />
				</FansView>
				<FansText
					color="purple-a8"
					fontFamily="inter-bold"
					fontSize={17}
					textTransform="uppercase"
				>
					Developer Portal
				</FansText>
			</FansView>
			<FansGap height={{ xs: 17.4, lg: 48.4 }} />
			{[
				{
					text: "Applications",
					name: "DeveloperPortal MyApplications AppDetails",
					onPress: handlePressApplications,
				},
				{
					text: "Documentation",
					onPress: handlePressDocumentation,
				},
				{ collapsed: true, divider: true },
				{
					collapsed: true,
					text: "Intro",
					onPress: handlePressIntro,
				},
				{
					collapsed: true,
					text: "Getting Started",
					name: "GettingStarted",
					onPress: handlePressGettingStarted,
				},
				{
					collapsed: true,
					text: "Subscription Endpoints",
					onPress: handlePressSubscriptionEndpoints,
				},
				{
					collapsed: true,
					text: "Users Endpoints",
					onPress: handlePressUsersEndpoints,
				},
				{
					collapsed: true,
					text: "Webhooks",
					onPress: handlePressWebhooks,
				},
			].map((item, index) => {
				const { collapsed, divider, text, onPress, name } = item;

				const selected = path && name?.includes(path);

				if (collapsed && !isDocumentationExpanded) return;

				if (divider)
					return (
						<FansView key={index} style={tw.style("px-[17px]")}>
							<FansGap height={9.5} />
							<FansHorizontalDivider />
							<FansGap height={9.5} />
						</FansView>
					);
				return (
					<TouchableOpacity key={index} onPress={onPress}>
						<FansView
							style={tw.style(
								"flex-row justify-between items-center",
								"pl-[35px] pr-[40px] min-w-[280px]",
								"py-5",

								selected && "bg-fans-purple bg-opacity-10",
							)}
						>
							<FansText
								fontFamily={
									selected ? "inter-bold" : "inter-regular"
								}
								fontSize={18}
							>
								{text}
							</FansText>
							{text === "Documentation" && (
								<FansView width={12.28} height={6.14}>
									{isDocumentationExpanded ? (
										<ChevronUp2Svg />
									) : (
										<ChevronDownSvg />
									)}
								</FansView>
							)}
						</FansView>
					</TouchableOpacity>
				);
			})}
		</FansView>
	);
};

export default DeveloperMenu;
