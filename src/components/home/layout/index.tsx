import { View, SafeAreaView } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

interface Props {
	children: React.ReactNode;
}

const HomeLayout: FC<Props> = (props) => {
	const { children } = props;

	return (
		<View style={tw.style("flex-1 relative")}>
			<SafeAreaView style={tw.style("flex-1")}>
				<View
					style={tw.style("px-[18px] py-[12px] flex justify-center")}
				></View>
				{children}
			</SafeAreaView>
		</View>
	);
};

export default HomeLayout;
