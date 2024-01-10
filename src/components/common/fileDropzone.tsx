import { Pressable, Image } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import { IconButton } from "react-native-paper";

import { FansText, FansView } from "@components/controls";
import RoundButton from "./RoundButton";
import { PlusSvg, DocumentEditSvg } from "@assets/svgs/common";

import { MediaType } from "@usertypes/commonEnums";
import { TextAlignStyle } from "@usertypes/styles";

interface Props {
	onPress: () => void;
	fileCounts: number;
	textButtonMode?: boolean;
	mediaType?: MediaType;
	buttonText?: string;
}

const FileDropzone: FC<Props> = (props) => {
	const {
		onPress,
		fileCounts,
		textButtonMode,
		mediaType = MediaType.Image,
		buttonText = "Drop image here",
	} = props;

	return (
		<Pressable
			style={tw.style(
				"py-[30px] border-dashed border border-[#dedede] rounded-[8px]",
			)}
			onPress={onPress}
		>
			{fileCounts == 0 ? (
				<FansView
					flexDirection="row"
					justifyContent="center"
					margin={{ b: 14 }}
					padding={{ t: 10 }}
				>
					<FansView
						style={tw.style(
							mediaType !== MediaType.Form && "hidden",
						)}
					>
						<DocumentEditSvg size={68} />
					</FansView>
					<FansView
						style={tw.style(
							mediaType !== MediaType.Image && "hidden",
						)}
					>
						<Image
							source={require("@assets/images/common/photos.png")}
							style={{
								width: 77.44,
								height: 71,
							}}
							resizeMode="cover"
						/>
					</FansView>
				</FansView>
			) : (
				<IconButton
					icon={() => (
						<PlusSvg width={23} height={23} color="#a854f5" />
					)}
					containerColor="#f6edff"
					style={tw.style("m-auto my-0 w-12 h-12 rounded-full mb-2")}
					onPress={onPress}
				/>
			)}
			{textButtonMode ? (
				<FansText fontSize={17} lineHeight={21} textAlign="center">
					{`${buttonText} or`}
					<FansText color="purple-a8"> Browse</FansText>
				</FansText>
			) : (
				<FansView style={tw.style("mx-auto mt-5 md:flex")}>
					<RoundButton onPress={onPress}>
						Pick from computer
					</RoundButton>
				</FansView>
			)}
		</Pressable>
	);
};

export default FileDropzone;
