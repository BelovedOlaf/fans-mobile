import { View } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

import CustomText from "@components/common/customText";
import { PictureCamera, RecordSvg, HeartSvg } from "@assets/svgs/common";

interface Props {
	photos: number;
	videos: number;
	likes: number;
}

const CountsDetails: FC<Props> = (props) => {
	const { photos, videos, likes } = props;

	return (
		<View style={tw.style("flex-row items-center gap-x-3")}>
			<View style={tw.style("flex-row items-center")}>
				<PictureCamera width={19.82} height={16.55} />
				<CustomText
					size="sm"
					style="font-medium text-fans-dark-grey ml-2"
				>
					{photos}
				</CustomText>
			</View>

			<View style={tw.style("flex-row items-center")}>
				<RecordSvg width={24} height={15.4} />
				<CustomText
					size="sm"
					style="font-medium text-fans-dark-grey ml-2"
				>
					{videos}
				</CustomText>
			</View>

			<View style={tw.style("flex-row items-center")}>
				<HeartSvg width={18.78} height={16.87} color="#707070" />
				<CustomText
					size="sm"
					style="font-medium text-fans-dark-grey ml-2"
				>
					{likes}
				</CustomText>
			</View>
		</View>
	);
};

export default CountsDetails;
