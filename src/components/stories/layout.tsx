import { View, SafeAreaView } from "react-native";
import React, { FC } from "react";
import { IconButton } from "react-native-paper";

import tw from "@lib/tailwind";
import { CloseSvg, TitleSvg } from "@assets/svgs/common";
import { SendTipDialog, SendTipSuccessDialog } from "@components/posts/dialogs";

interface Props {
	children: React.ReactNode;
	onClose: () => void;
}

const Layout: FC<Props> = (props) => {
	const { onClose, children } = props;

	return (
		<View style={tw.style("bg-black flex-1")}>
			<SafeAreaView
				style={tw.style("relative flex-1 md:pt-[66px] md:pb-[75px]")}
			>
				{children}
				<TitleSvg
					width={200}
					height={50}
					color="#fff"
					style={tw.style(
						"hidden md:flex absolute top-[55px] md:left-5 lg:left-[140px]",
					)}
				/>
				<IconButton
					icon={() => <CloseSvg size={13} color="#000" />}
					containerColor="#fff"
					style={tw.style(
						"p-0 m-0 w-7.5 h-7.5 absolute top-17 md:right-5 lg:right-35 hidden md:flex",
					)}
					onPress={onClose}
				/>
			</SafeAreaView>

			{/* <SendTipDialog /> */}
			{/* <SendTipSuccessDialog /> */}
		</View>
	);
};

export default Layout;
