import { View, Image } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

import { IconButton } from "react-native-paper";

import { DndTriggerSvg, TrashSvg, CropSvg } from "@assets/svgs/common";
import { cdnURL } from "@helper/Utils";

interface Props {
	onClickResize: () => void;
	onClickTrash: () => void;
	uri: string;
}

const CoverImage: FC<Props> = (props) => {
	const { onClickResize, onClickTrash, uri } = props;

	return (
		<View
			style={tw.style(
				"w-full h-[210px] rounded-[7px] relative md:h-[230px]",
			)}
		>
			<Image
				source={{
					uri: cdnURL(uri),
				}}
				style={tw.style("w-full h-full rounded-[7px]")}
				resizeMode="cover"
			/>

			<IconButton
				icon={() => (
					<DndTriggerSvg width={10} height={16.2} color="#000" />
				)}
				style={tw.style(
					"m-0 absolute w-[34px] h-[34px] top-[10px] left-[10px] hidden",
				)}
				containerColor="#f0f0f0"
			/>

			{/* <IconButton
				icon={() => (
					<CropSvg width={15.87} height={15.87} color="#000" />
				)}
				style={tw.style(
					"m-0 absolute w-[34px] h-[34px] top-[10px] right-[52px]",
				)}
				containerColor="#f0f0f0"
				onPress={onClickResize}
			/> */}

			<IconButton
				icon={() => (
					<TrashSvg width={11.87} height={14.76} color="#eb2121" />
				)}
				style={tw.style(
					"m-0 absolute w-[34px] h-[34px] top-[10px] right-[10px]",
				)}
				containerColor="#f0f0f0"
				onPress={onClickTrash}
			/>
		</View>
	);
};

export default CoverImage;
