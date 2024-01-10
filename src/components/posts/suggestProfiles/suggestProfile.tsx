import React, { FC, useState } from "react";
import { Image, Pressable } from "react-native";
import { useRouter } from "expo-router";

import UserAvatar from "@components/avatar/UserAvatar";
import RoundButton from "@components/common/RoundButton";
import { FansText, FansView } from "@components/controls";
import { FypText } from "@components/common/base";

import tw from "@lib/tailwind";
import { CommonActionType, useAppContext } from "@context/useAppContext";
import { ComponentSizeTypes, RoundButtonType } from "@usertypes/commonEnums";
import { IProfile } from "@usertypes/types";
import { cdnURL } from "@helper/Utils";

interface Props {
	data: IProfile;
}

const SuggestProfile: FC<Props> = (props) => {
	const { data } = props;
	const router = useRouter();
	const { dispatch } = useAppContext();

	const onClickView = () => {
		if (data.profileLink) {
			const username = data.profileLink.split("/").slice(-1);
			router.push(`/${username[0]}`);
			dispatch.setCommon({
				type: CommonActionType.setCreatorUsername,
				data: username[0],
			});
		}
	};

	return (
		<Pressable
			style={tw.style("relative border border-fans-grey rounded-[15px]")}
			onPress={onClickView}
		>
			<FansView height={63} style={tw.style("w-full rounded-t-[15px]")}>
				{data.cover.length > 0 ? (
					<Image
						source={{ uri: cdnURL(data.cover[0]) }}
						style={tw.style("w-full h-full rounded-t-[15px]")}
						resizeMode="cover"
					/>
				) : null}
			</FansView>

			<FansView
				alignItems="center"
				flexDirection="row"
				justifyContent="between"
				padding={{ r: 12, l: 106 }}
				style={tw.style("rounded-b-[15px]")}
			>
				<FansView padding={{ t: 8, b: 12 }} flex="1">
					<FypText
						fontSize={17}
						lineHeight={22}
						fontWeight={700}
						style={tw.style("text-black")}
						numberOfLines={1}
						onPress={onClickView}
					>
						{data.displayName}
					</FypText>
					<FansText
						color="grey-70"
						fontSize={16}
						lineHeight={21}
						style={tw.style("mt-[-2px]")}
					>
						{`@${data.username}`}
					</FansText>
				</FansView>

				<FansView width={89}>
					<RoundButton
						variant={RoundButtonType.OUTLINE_PRIMARY}
						onPress={onClickView}
						size={ComponentSizeTypes.md}
					>
						View
					</RoundButton>
				</FansView>
			</FansView>

			<FansView
				border={4}
				borderColor="white"
				borderRadius={75}
				position="absolute"
				style={tw.style("left-[11px] top-[28px]")}
			>
				<UserAvatar image={data.avatar} size="75px" />
			</FansView>
		</Pressable>
	);
};

export default SuggestProfile;
