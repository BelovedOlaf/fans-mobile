import { View } from "react-native";
import React, { useState } from "react";

import { FansText } from "@components/controls";
import { FypNullableView } from "@components/common/base";

import tw from "@lib/tailwind";
import { IFypPostContent } from "@usertypes/components";

const TextContent: IFypPostContent = (props) => {
	const { data } = props;
	const [width, setWidth] = useState(0);
	return (
		<View onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
			<FypNullableView visible={!data.isPaidPost || !!data.isPaidOut}>
				<View
					style={tw.style("p-6 bg-fans-purple-light mt-3 md:mt-7.5")}
				>
					<FansText fontSize={16} lineHeight={21}>
						{data.caption}
					</FansText>
				</View>
			</FypNullableView>
			<FypNullableView visible={data.isPaidPost && !data.isPaidOut}>
				<View style={tw.style(`w-full h-[${width}px]`)}></View>
			</FypNullableView>
		</View>
	);
};

export default TextContent;
