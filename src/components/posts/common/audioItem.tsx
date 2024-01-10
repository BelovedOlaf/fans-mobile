import { Image, Pressable, TextProps } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

import { FansText, FansView } from "@components/controls";
import { FypNullableView } from "@components/common/base";
import { TrashSvg, MusicSvg } from "@assets/svgs/common";
import { IPickerMedia } from "@usertypes/types";

interface Props {
	data: IPickerMedia;
	onDelete?: () => void;
	textProps?: TextProps;
}

const AudioItem: FC<Props> = (props) => {
	const { data, onDelete, textProps } = props;

	const thumbnail = false;

	return (
		<FansView
			flexDirection="row"
			alignItems="center"
			padding={{ y: 10 }}
			borderColor="grey"
			border={{ b: 1 }}
		>
			<FypNullableView visible={!!onDelete}>
				<FansView margin={{ r: 22 }}>
					<Pressable onPress={onDelete}>
						<TrashSvg size={23} color="#eb2121" />
					</Pressable>
				</FansView>
			</FypNullableView>

			<FansView
				width={46}
				height={46}
				flexDirection="row"
				alignItems="center"
				justifyContent="center"
				borderRadius={46}
				style={tw.style("bg-[rgba(168,84,245,0.1)]")}
			>
				{thumbnail ? (
					<Image
						source={require("@assets/images/posts/user-1.png")}
						alt="User"
						style={tw.style("w-full h-full rounded-full")}
					/>
				) : (
					<MusicSvg width={18.63} height={21} color="#a854f5" />
				)}
			</FansView>

			<FansView flex="1" margin={{ l: 12 }}>
				<FansText
					fontFamily="inter-bold"
					fontSize={19}
					lineHeight={26}
					{...textProps}
				>
					{data.name}
				</FansText>
			</FansView>
		</FansView>
	);
};

export default AudioItem;
