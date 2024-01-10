import { View, ScrollView } from "react-native";
import React, { FC } from "react";

import tw from "@lib/tailwind";

interface Props {
	children: React.ReactNode;
}

const ScreenWrapper: FC<Props> = (props) => {
	const { children } = props;

	return (
		<View style={tw.style("flex-row h-[600px] xl:h-[670px]")}>
			<View style={tw.style("w-[600px] xl:w-[670px] relative")}></View>
			<ScrollView
				style={tw.style("border-l border-fans-grey")}
				contentContainerStyle={{
					flex: 1,
				}}
			>
				<View style={[tw.style("px-5 xl:px-10 pt-10 pb-10")]}>
					{children}
				</View>
			</ScrollView>
		</View>
	);
};

export default ScreenWrapper;
