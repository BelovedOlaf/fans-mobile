// import react modules
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, Text, View } from "react-native";

import FansLink from "@components/common/link";
import { FansDivider, FansText } from "@components/controls";
import tw from "@lib/tailwind";
import { DeveloperNativeStackScreenProps } from "@screens/developer";

const GettingStartedScreen = (
	props: DeveloperNativeStackScreenProps<"GettingStarted">,
) => {
	const { navigation, route } = props;

	return (
		<ScrollView
			style={tw.style("h-screen bg-[#FFF] py-[20px] px-[20px]")}
			showsVerticalScrollIndicator={false}
		>
			<View style={tw.style("flex gap-[30px]")}>
				<View style={tw.style("flex gap-[15px]")}>
					<FansText
						style={tw.style("font-inter-semibold", "text-[17px]")}
					>
						Lorem ipsum
					</FansText>
					<FansText
						style={tw.style("text-[16px] text-fans-grey-dark")}
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor
					</FansText>
					<View style={tw.style("bg-fans-black", "rounded-[15px]")}>
						<View
							style={tw.style(
								"flex-row",
								"bg-[#2E2E2E]",
								"p-[15px]",
								"rounded-t-[15px]",
							)}
						>
							<FansText
								style={tw.style(
									"w-[95px]",
									"font-inter-semibold",
									"text-[15px] text-fans-white",
								)}
							>
								FIELD
							</FansText>
							<FansText
								style={tw.style(
									"w-[95px]",
									"font-inter-semibold",
									"text-[15px] text-fans-white",
								)}
							>
								TYPE
							</FansText>
							<FansText
								style={tw.style(
									"font-inter-semibold",
									"text-[15px] text-fans-white",
								)}
							>
								DESCRIPTION
							</FansText>
						</View>
						<View style={tw.style("flex gap-[15px]", "p-[15px]")}>
							<View style={tw.style("flex-row")}>
								<FansText
									style={tw.style(
										"min-w-[95px]",
										"text-[13px] text-fans-white",
									)}
								>
									Lorem ipsum
								</FansText>
								<FansText
									style={tw.style(
										"min-w-[95px]",
										"text-[13px] text-fans-white",
									)}
								>
									Lorem ipsum
								</FansText>
								<FansText
									style={tw.style(
										"text-[13px] text-fans-white",
									)}
								>
									Value for the choice, up to 100 characters
									if string
								</FansText>
							</View>
							<View style={tw.style("h-[1px]", "bg-[#2E2E2E]")} />
							<View style={tw.style("flex-row")}>
								<FansText
									style={tw.style(
										"min-w-[95px]",
										"text-[13px] text-fans-white",
									)}
								>
									Lorem ipsum
								</FansText>
								<FansText
									style={tw.style(
										"min-w-[95px]",
										"text-[13px] text-fans-white",
									)}
								>
									Lorem ipsum
								</FansText>
								<FansText
									style={tw.style(
										"text-[13px] text-fans-white",
									)}
								>
									Value for the choice, up to 100 characters
									if string
								</FansText>
							</View>
							<View style={tw.style("h-[1px]", "bg-[#2E2E2E]")} />
							<View style={tw.style("flex-row")}>
								<FansText
									style={tw.style(
										"min-w-[95px]",
										"text-[13px] text-fans-white",
									)}
								>
									Lorem ipsum
								</FansText>
								<FansText
									style={tw.style(
										"min-w-[95px]",
										"text-[13px] text-fans-white",
									)}
								>
									Lorem ipsum
								</FansText>
								<FansText
									style={tw.style(
										"text-[13px] text-fans-white",
									)}
								>
									Value for the choice, up to 100 characters
									if string
								</FansText>
							</View>
						</View>
					</View>
				</View>
				<View style={tw.style("flex gap-[15px]")}>
					<FansText
						style={tw.style("font-inter-semibold", "text-[17px]")}
					>
						Lorem ipsum
					</FansText>
					<FansText
						style={tw.style("text-[16px] text-fans-grey-dark")}
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor
					</FansText>
					<View
						style={tw.style(
							"bg-[#F6EDFF]",
							"p-[15px]",
							"rounded-[15px]",
						)}
					>
						<FansText
							style={tw.style(
								"text-[16px] text-fans-purple text-center",
							)}
						>
							<Text
								style={tw.style(
									"border rounded-full px-2 border-fans-purple mx-2 mr-10",
								)}
							>
								!
							</Text>
							We have temporarily frozen your account due to
							suspicious activity. &nbsp;
							<FansLink url="/">Learn more</FansLink>
						</FansText>
					</View>
					<View
						style={tw.style(
							"h-[320px]",
							"bg-fans-black",
							"rounded-[15px]",
						)}
					></View>
				</View>
				<FansDivider />
				<View style={tw.style("flex gap-[15px]")}>
					<FansText
						style={tw.style("font-inter-semibold", "text-[21px]")}
					>
						Lorem ipsum
					</FansText>
					<FansText
						style={tw.style("font-inter-semibold", "text-[17px]")}
					>
						Lorem ipsum
					</FansText>
					<FansText
						style={tw.style("text-[16px] text-fans-grey-dark")}
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea
						commodo consequat
					</FansText>
					<FansText
						style={tw.style("text-[16px] text-fans-grey-dark")}
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea
						commodo consequat
					</FansText>
					<View style={tw.style("ml-[20px]")}>
						<FansText
							style={tw.style("text-[16px] text-fans-grey-dark")}
						>
							•{" "}
							<FansText
								style={tw.style(
									"font-inter-semibold",
									"text-[16px] text-fans-purple",
									"underline",
								)}
							>
								Lorem ipsum
							</FansText>{" "}
							dolor sit amet, consectetur adipiscing elit
						</FansText>
					</View>
					<View style={tw.style("ml-[20px]")}>
						<FansText
							style={tw.style("text-[16px] text-fans-grey-dark")}
						>
							• Lorem ipsum dolor sit amet, consectetur adipiscing
							elit
						</FansText>
					</View>
					<FansText
						style={tw.style("text-[16px] text-fans-grey-dark")}
					>
						Lorem ipsum dolor sit amet,{" "}
						<FansText
							style={tw.style(
								"font-inter-semibold",
								"text-[16px] text-fans-purple",
								"underline",
							)}
						>
							consectetur adipiscing
						</FansText>{" "}
						elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis
						nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat
					</FansText>
				</View>
			</View>
		</ScrollView>
	);
};

export default GettingStartedScreen;
