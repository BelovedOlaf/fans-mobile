import React, { FC } from "react";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";

import { GemImage } from "@assets/svgs";
import { SingleGem } from "@assets/svgs/common";
import { FypButton, FypText } from "@components/common/base";
import { FansSvg, FansView } from "@components/controls";

import tw from "@lib/tailwind";

interface Props {
	progress: number;
	onCancel: () => void;
}

const UploadProgress: FC<Props> = (props) => {
	const { onCancel, progress } = props;

	const sv = useSharedValue(progress);
	sv.value = progress;

	const iconWidth = 128;

	const animatedStyle = useAnimatedStyle(() => ({
		width: (iconWidth * sv.value) / 100,
	}));

	return (
		<FansView
			justifyContent="between"
			alignItems="center"
			style={tw.style("w-full h-full pt-[200px] md:pt-[85px]")}
		>
			<FansView alignItems="center">
				<FansView
					position="relative"
					width={iconWidth}
					height={iconWidth}
				>
					<SingleGem
						style={tw.style("w-full h-full")}
						color="#f1e2ff"
					/>
					<Animated.View
						style={[
							tw.style(
								"absolute top-0 left-0",
								`h-${iconWidth}px`,
							),
							animatedStyle,
							{
								overflow: "hidden",
							},
						]}
					>
						<FansSvg size={iconWidth} svg={GemImage} />
					</Animated.View>
				</FansView>
				<FansView style={tw.style("mt-[30px] md:mt-[20px]")}>
					<FypText
						fontSize={17}
						lineHeight={22}
						fontWeight={400}
						textAlign="center"
						style={tw.style("mb-1")}
					>
						Uploading, please wait
					</FypText>
					<FypText
						fontSize={42}
						fontWeight={600}
						color="purple"
						lineHeight={56}
						textAlign="center"
					>
						{progress}%
					</FypText>

					<FypText
						fontSize={14}
						lineHeight={22}
						fontWeight={400}
						color="grey-66"
						textAlign="center"
						style={tw.style("mt-2 max-w-[400px]")}
					>
						Your video will be available to view once it is
						processed.{"\n"}
						This may take between few seconds to a few minutes.
					</FypText>
				</FansView>
			</FansView>

			{/* <FypButton
				textStyle={tw.style(
					"text-[19px] leading-[26px] font-bold text-fans-red",
				)}
				onPress={onCancel}
			>
				Cancel
			</FypButton> */}
		</FansView>
	);
};

export default UploadProgress;
