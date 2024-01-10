import { View } from "react-native";
import React, { FC } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import tw from "@lib/tailwind";

import LayoutRightContents from "./rightContents";

interface Props {
	children?: React.ReactNode;
	paddingTop?: number;
	hideRightSection?: boolean;
	settingsLayout?: boolean;
}

const ContentsContainer: FC<Props> = (props) => {
	const { children, paddingTop, hideRightSection, settingsLayout } = props;

	const insets = useSafeAreaInsets();

	return (
		<View style={tw.style("flex-row flex-1")}>
			<View
				style={tw.style(
					"flex-1 md:border-r border-fans-grey items-center md:px-[18px]",
					settingsLayout && "md:pl-10 md:pr-35",
					hideRightSection && "md:border-r-0",
				)}
			>
				<View
					style={tw.style(
						"w-full flex-1 bg-white relative",
						settingsLayout ? "" : "2lg:max-w-[710px]",
					)}
				>
					<View
						style={[
							{
								paddingTop: paddingTop
									? paddingTop
									: insets.top,
							},
							tw.style("bg-white flex-1 relative"),
						]}
					>
						{children}
					</View>
				</View>
			</View>
			<LayoutRightContents hide={hideRightSection} />
		</View>
	);
};

export default ContentsContainer;
