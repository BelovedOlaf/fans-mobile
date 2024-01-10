import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";

import { StarCheckSvg } from "@assets/svgs/common";
import UserAvatar from "@components/avatar/UserAvatar";
import RoundButton from "@components/common/RoundButton";
import {
	FansGap,
	FansScreen2,
	FansScreen3,
	FansSvg,
	FansText,
	FansView,
} from "@components/controls";
import { useAppContext } from "@context/useAppContext";
import tw from "@lib/tailwind";
import { RoundButtonType } from "@usertypes/commonEnums";
import { ChatNativeStackScreenProps } from "@usertypes/navigations";

const ShareNoteScreen = (props: ChatNativeStackScreenProps<"ShareNote">) => {
	const { navigation } = props;

	const { state } = useAppContext();
	const { userInfo } = state.user;
	const { avatar, username } = userInfo;

	const [strNote, setNote] = useState("");

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<FansView style={tw.style("mr-[20px]")}>
					<TouchableOpacity>
						<FansText
							color="purple"
							fontFamily="inter-bold"
							fontSize={17}
						>
							Share
						</FansText>
					</TouchableOpacity>
				</FansView>
			),
		});
	});

	return (
		<FansScreen3>
			<FansGap height={129.4} />
			<FansView alignItems="center">
				<FansView gap={8}>
					<UserAvatar image={avatar} size="95px" />
					<FansView alignItems="center" flexDirection="row" gap={6}>
						<FansText
							style={tw.style("font-inter-bold", "text-[19px]")}
						>
							{username}
						</FansText>
						<FansSvg width={15.66} height={15} svg={StarCheckSvg} />
					</FansView>
				</FansView>
				<FansGap height={35} />
				<FansView
					width={248}
					height={98}
					style={tw.style(
						"flex items-center",
						"p-[15px]",
						"rounded-[15px]",
						"shadow-black/16 shadow-offset-[3px]/[3px] shadow-radius-[6px]",
					)}
				>
					<TextInput
						value={strNote}
						style={tw.style(
							"w-full h-full",
							"font-inter-regular",
							"text-[18px]",
						)}
						maxLength={60}
						multiline
						placeholder="Write a note..."
						placeholderTextColor={tw.color("fans-grey-dark")}
						onChangeText={setNote}
					/>
				</FansView>
				<FansGap height={9.3} />
				<FansText style={tw.style("text-[14px] text-fans-grey-dark")}>
					{strNote.length}/60
				</FansText>
			</FansView>
			<FansGap grow />
			<RoundButton variant={RoundButtonType.OUTLINE_PRIMARY}>
				Share
			</RoundButton>
		</FansScreen3>
	);
};

export default ShareNoteScreen;
