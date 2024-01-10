import tw from "@lib/tailwind";
import React, { FC, useState } from "react";
import { ScrollView, View } from "react-native";

import { ChevronDownSvg, ChevronLeftSvg } from "@assets/svgs/common";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import {
	FansButton3,
	FansImage2,
	FansText,
	FansView,
} from "@components/controls";
import { Colors } from "@usertypes/enums";

interface Props {
	open: boolean;
	onClose: () => void;
}

const PhotoSheet: FC<Props> = (props) => {
	const { open, onClose } = props;

	const images = [
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
		"https://i.postimg.cc/J7vXYBL0/image.png",
	];
	const [selects, setSelects] = useState<number[]>([]);

	const trigSelectImage = (valueIndex: number) => {
		const newSelects = [...selects];
		const index = newSelects.findIndex((value) => value === valueIndex);
		if (index === -1) {
			newSelects.push(valueIndex);
		} else {
			newSelects.splice(index, 1);
		}
		setSelects(newSelects);
	};

	const handlePressSend = () => onClose();

	return (
		<BottomSheetWrapper open={open} onClose={onClose}>
			<View style={tw.style("h-[600px]", "flex gap-[10px]")}>
				<View style={tw.style("flex-row items-center")}>
					<View style={tw.style("grow", "pl-[20px]")}>
						<ChevronLeftSvg size={13} color={Colors.Grey} />
					</View>
					<View style={tw.style("flex items-center", "grow")}>
						<View
							style={tw.style("flex-row gap-[10px] items-center")}
						>
							<FansText fontFamily="inter-bold" fontSize={19}>
								Recents
							</FansText>
							<ChevronDownSvg size={8} />
						</View>
					</View>
					<View style={tw.style("grow")} />
				</View>
				<ScrollView showsVerticalScrollIndicator={false}>
					<FansView flexDirection="row" flexWrap="wrap">
						{images.map((item, index) => {
							const handlePress = () => trigSelectImage(index);

							const selected = selects.findIndex(
								(value) => value === index,
							);
							const isSelected = selected !== -1;

							return (
								<FansView
									key={index}
									touchableOpacityProps={{
										onPress: handlePress,
									}}
									aspectRatio="square"
									borderColor="white"
									flexBasis="1/3"
									position="relative"
								>
									<FansImage2
										width="full"
										height="full"
										source={{
											uri: item,
										}}
									/>
									<FansView
										width={20}
										height={20}
										alignItems="center"
										backgroundColor={
											isSelected
												? "purple"
												: {
														color: "black",
														opacity: 50,
												  }
										}
										borderColor={
											isSelected ? "transparent" : "white"
										}
										borderRadius="full"
										justifyContent="center"
										position="absolute"
										right={10}
										top={10}
									>
										{isSelected && (
											<FansText
												color="white"
												fontFamily="inter-semibold"
												fontSize={14}
											>
												{selected + 1}
											</FansText>
										)}
									</FansView>
								</FansView>
							);
						})}
					</FansView>
				</ScrollView>
				<FansView
					width="full"
					style={tw.style("px-[17px]")}
					bottom={43}
					position="absolute"
				>
					<FansButton3 title="Send" onPress={handlePressSend} />
				</FansView>
			</View>
		</BottomSheetWrapper>
	);
};

export default PhotoSheet;
