import ChatSvg from "@assets/svgs/common/Chat";
import { FansGap, FansSvg, FansText } from "@components/controls";
import { FansScreen2 } from "@components/controls/Screen";
import tw from "@lib/tailwind";
import { FansColors } from "@usertypes/enums";
import { ChatNativeStackScreenProps } from "@usertypes/navigations";
import React, { useEffect } from "react";

export const SelectChat = (props: ChatNativeStackScreenProps<"Messages">) => {
	const { navigation } = props;

	useEffect(() => {
		navigation.setOptions({
			header: () => null,
			headerRight: undefined,
		});
	}, [navigation]);

	return (
		<FansScreen2 contentStyle={tw`pt-[0px] justify-center items-center`}>
			<FansSvg
				width={96}
				height={96}
				svg={ChatSvg}
				color={tw.color(FansColors.Purple)}
			/>
			<FansGap height={20} />
			<FansText fontFamily="inter-semibold" fontSize={20}>
				Select a chat to continue
			</FansText>
		</FansScreen2>
	);
};
