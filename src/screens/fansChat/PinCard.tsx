import { ChevronRightSvg, CloseSvg } from "@assets/svgs/common";
import OnlineAvatar from "@components/avatar/OnlineAvatar";
import { FansSvg } from "@components/controls";
import tw from "@lib/tailwind";
import React, { useRef } from "react";
import {
	Image,
	ScrollView,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import { Pin1Svg } from "../../assets/svgs/common/Pin";

interface PinData {
	images: string[];
	date: string;
}

interface PinCardProps {
	item: PinData;
}

const PinCard = ({ item }: PinCardProps) => {
	const { width: screenWidth } = useWindowDimensions();

	const scrollRef = useRef(null);
	return (
		<ScrollView
			style={tw.style(`w-[${screenWidth}px] h-[${screenWidth}px]`)}
			horizontal
			pagingEnabled
			showsHorizontalScrollIndicator={false}
			ref={scrollRef}
		>
			{item.images.map((image, i) => (
				<View
					key={i}
					style={tw.style(
						"h-[400px]",
						`rounded-lg w-[${screenWidth}px] overflow-hidden border-t border-gray-200`,
					)}
				>
					<View
						style={{
							width: screenWidth * 0.7,
							height: screenWidth * 0.7,
							borderRadius: 10,
							overflow: "hidden",
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: [
								{ translateX: (-screenWidth * 0.7) / 2 },
								{ translateY: (-screenWidth * 0.7) / 2 },
							],
						}}
					>
						<Image
							source={{ uri: image }}
							resizeMode="cover"
							style={{ flex: 1 }}
						/>
					</View>
					{/* header */}
					<View
						style={{
							height: 50,
							width: screenWidth,
							position: "absolute",
							top: 0,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text>{item.date}</Text>
						<View
							style={tw.style(
								"absolute top-4 right-10 w-4 h-4 flex flex-row gap-4 items-center",
							)}
						>
							<CloseSvg color="black" />
							<ChevronRightSvg />
						</View>
					</View>
					{/* avatar */}
					<View
						style={{
							height: 50,
							position: "absolute",
							bottom: 50,
							left: 20,
						}}
					>
						<OnlineAvatar />
					</View>
					{/* stick */}
					<View
						style={{
							height: 50,
							position: "absolute",
							top: 80,
							right: 80,
						}}
					>
						<FansSvg
							width={21.97}
							height={21.97}
							svg={Pin1Svg}
							color1="white"
						/>
					</View>
				</View>
			))}
		</ScrollView>
	);
};

export default PinCard;
