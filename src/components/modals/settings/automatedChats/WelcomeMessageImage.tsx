import React from "react";

import { IFansModal } from "@usertypes/components";
import { FansModal3 } from "@components/controls/Modal";
import {
	FansButton3,
	FansGap,
	FansHorizontalDivider,
	FansSvg,
	FansText,
	FansView,
} from "@components/controls";
import { ChevronLeft1Svg } from "@assets/svgs/common";
import { ImagesImage } from "@assets/svgs";
import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";

const WelcomeMessageImageModal: IFansModal = (props) => {
	const { onSubmit: handleSubmit } = props;

	const handlePressPick = async () => {
		const result = await launchImageLibraryAsync({
			mediaTypes: MediaTypeOptions.Images,
			allowsEditing: false,
			quality: 1,
		});

		if (!result.canceled) handleSubmit();
	};
	const handleNext = () => handleSubmit();

	return (
		<FansModal3
			width={741}
			height={616}
			modalStyle={{ padding: { x: 34 } }}
			{...props}
		>
			<FansView height={102} alignItems="center" flexDirection="row">
				<FansView flex="1">
					<FansSvg
						width={6.36}
						height={12.72}
						svg={ChevronLeft1Svg}
						color1="grey-70"
					/>
				</FansView>
				<FansText fontFamily="inter-bold" fontSize={23}>
					Welcome message
				</FansText>
				<FansView
					touchableOpacityProps={{ onPress: handleNext }}
					flex="1"
					alignItems="end"
				>
					<FansText
						color="purple-a8"
						fontFamily="inter-bold"
						fontSize={19}
					>
						Next
					</FansText>
				</FansView>
			</FansView>
			<FansHorizontalDivider />
			<FansGap height={143.7} />
			<FansView alignItems="center" gap={20}>
				<FansSvg width={92.02} height={84.33} svg={ImagesImage} />
				<FansText fontSize={17}>Drop image here or browser</FansText>
				<FansButton3
					width={280}
					title="Pick from computer"
					onPress={handlePressPick}
				/>
			</FansView>
		</FansModal3>
	);
};

export default WelcomeMessageImageModal;
