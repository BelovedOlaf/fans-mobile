import React from "react";

import { ImageImage } from "@assets/svgs";
import { Search1Svg, WarningCircledSvg } from "@assets/svgs/common";
import RoundButton from "@components/common/RoundButton";
import {
	FansDropdown,
	FansGap,
	FansScreen2,
	FansScreen3,
	FansSvg,
	FansText,
	FansTextInput5,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import { getColorStyle } from "@usertypes/styles";
import { TextInput } from "react-native-gesture-handler";
import { Path, Svg } from "react-native-svg";

const ReportAbuseScreen = () => {
	/*return (
		<ScrollView>
			<View style={tw.style("flex-column gap-[20px]", "m-[15px]")}>
				<View>
					<Text>User you wish to report</Text>
				</View>
				<View style={tw.style("flex-row gap-[10px] items-center")}>
					<Checkbox status="checked" />
					<Image source={require("@assets/images/default-avatar.png")} />
					<View>
						<Text>Jane Love</Text>
						<Text>@janelove</Text>
					</View>
				</View>
				<View style={tw.style("flex-row gap-[10px] items-center")}>
					<Checkbox status="unchecked" />
					<Image source={require("@assets/images/default-avatar.png")} />
					<View>
						<Text>Jane Love</Text>
						<Text>@janelove</Text>
					</View>
				</View>
				<View style={tw.style("flex-row gap-[10px] items-center")}>
					<Checkbox status="unchecked" />
					<Image source={require("@assets/images/default-avatar.png")} />
					<View>
						<Text>Jane Love</Text>
						<Text>@janelove</Text>
					</View>
				</View>
				<View style={tw.style("flex-row gap-[10px] items-center")}>
					<Checkbox status="unchecked" />
					<Image source={require("@assets/images/default-avatar.png")} />
					<View>
						<Text>Jane Love</Text>
						<Text>@janelove</Text>
					</View>
				</View>
				<View style={tw.style("flex-row gap-[10px] items-center")}>
					<Checkbox status="unchecked" />
					<Image source={require("@assets/images/default-avatar.png")} />
					<View>
						<Text>Jane Love</Text>
						<Text>@janelove</Text>
					</View>
				</View>
			</View>
		</ScrollView>
	);*/
	return (
		<FansScreen3 contentStyle1={{ maxWidth: { lg: 670 } }}>
			<FansGap height={{ lg: 40 }} />
			<FansText fontSize={16} textAlign="center">
				Please report any user violations of our{" "}
				<FansText color="purple" textDecorationLine="underline">
					Acceptable Use Policy
				</FansText>{" "}
				using the form{"\n"}below. We will promptly investigate and
				remove any offending content.
			</FansText>
			<FansGap height={26} />
			<FansView
				backgroundColor="purple-f6"
				borderRadius={15}
				padding={{ t: 17, r: 19, b: 21, l: 20 }}
			>
				<FansText color="purple-a8" fontSize={16} textAlign="center">
					<FansSvg
						width={14.23}
						height={14.23}
						svg={WarningCircledSvg}
					/>{" "}
					Should you encounter illegal activity or immediate danger,
					please prioritize contacting your local authorities. They’re
					best suited to provide urgent assistance
				</FansText>
			</FansView>
			<FansGap height={40} />
			{/* User you wish to report ~ */}
			<FansView gap={16}>
				<FansText fontFamily="inter-bold" fontSize={17}>
					User you wish to report
				</FansText>
				<FansTextInput5
					iconNode={
						<FansSvg
							width={13.14}
							height={13.26}
							svg={Search1Svg}
						/>
					}
					textInputStyle={{
						placeholder: "Search user",
						placeholderTextColor: getColorStyle("black"),
					}}
				/>
			</FansView>
			{/* ~ User you wish to report */}
			<FansGap height={32} />
			{/* Reason ~ */}
			<FansView gap={15}>
				<FansText fontFamily="inter-bold" fontSize={17}>
					Reason
				</FansText>
				<FansDropdown
					data={[
						{ text: "Underage User" },
						{ text: "Illegal Content" },
						{ text: "Impersonation or Identity Theft" },
						{ text: "Promoting Hate Speech" },
						{ text: "Promoting Violence" },
						{ text: "Profile involved in Spam" },
						{ text: "Infringement of My Rights" },
						{ text: "Other" },
					]}
					onSelect={() => {}}
				/>
			</FansView>
			{/* ~ Reason */}
			<FansGap height={32} />
			<FansText style={tw.style("font-inter-bold", "text-[17px]")}>
				Issue
			</FansText>
			<FansGap height={15} />
			<FansTextInput5
				height={128}
				viewStyle={{ borderRadius: 7, padding: { t: 13 } }}
				textInputStyle={{
					multiline: true,
					placeholder: "Briefly describe the issue",
				}}
			/>
			<FansGap height={33.4} />
			<FansText style={tw.style("font-inter-bold", "text-[17px]")}>
				Add image
			</FansText>
			<FansGap height={15} />
			<FansView
				style={tw.style(
					"h-[162px]",
					"border border-fans-grey-dark border-dashed rounded-[7px]",
					"flex justify-center items-center",
				)}
			>
				<FansView style={tw.style("w-[77.44px] h-[70.96px]")}>
					<ImageImage />
				</FansView>
				<FansGap height={13.3} />
				<FansText style={tw.style("text-[17px]")}>
					Drop image here or{" "}
					<FansText
						style={tw.style(
							"font-inter-semibold",
							"text-[17px] text-fans-purple",
						)}
					>
						browse
					</FansText>
				</FansText>
			</FansView>
			<FansGap height={33.6} />
			<RoundButton>Report</RoundButton>
			<FansGap height={16.4} />
			<FansText
				style={tw.style(
					"font-inter-semibold",
					"text-[17px] text-center leading-[25px]",
				)}
			>
				Need help?{"\n"}
				<FansText
					style={tw.style(
						"font-inter-semibold",
						"text-[17px] text-fans-purple",
					)}
				>
					Contact
				</FansText>{" "}
				our 24/7 support team
			</FansText>
		</FansScreen3>
	);
};

export default ReportAbuseScreen;
