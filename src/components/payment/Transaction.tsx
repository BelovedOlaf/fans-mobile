import { CheckSvg, ThreeDotsVerticalSvg } from "@assets/svgs/common";
import { FansDivider, FansText } from "@components/controls";
import tw from "@lib/tailwind";
import { Colors } from "@usertypes/enums";
import { DateTime } from "luxon";
import React from "react";
import { Image, View } from "react-native";

const Transaction = () => {
	const time = "2023-09-05T23:39:10.318Z";

	return (
		<>
			<View style={tw.style("flex-row gap-[10px] items-center")}>
				<Image
					style={tw.style("w-[34px] h-[34px] rounded-full")}
					source={require("@assets/images/default-avatar.png")}
				/>
				<View style={tw.style("grow gap-1")}>
					<View style={tw.style("flex-row gap-4 items-center")}>
						<FansText fontSize={16}>connan_key</FansText>
						<FansText color="green-4d" fontSize={14}>
							20%
						</FansText>
					</View>
					<FansText color="grey-70" fontSize={13}>
						Wells Fargo Bank **** 1234
					</FansText>
				</View>

				<View style={tw.style("flex items-end gap-1")}>
					<View
						style={tw.style(
							"bg-fans-green/10 flex-row gap-[5px]",
							"px-[10px]",
							"rounded-full",
						)}
					>
						<CheckSvg color={Colors.Green} width={10} />
						<FansText color="green-4d" fontSize={14}>
							$15
						</FansText>
					</View>
					<FansText
						color="grey-70"
						fontSize={13}
						style={tw.style("uppercase")}
					>
						{DateTime.fromISO(time).toFormat("MMM d, h:mm a")}
					</FansText>
				</View>

				<ThreeDotsVerticalSvg size={18} />
			</View>
			<FansDivider style={tw.style("my-[17px]")} />
		</>
	);
};

export default Transaction;
