import { Pressable } from "react-native";
import React, { FC, useState, useEffect } from "react";
import tw from "@lib/tailwind";
import * as Clipboard from "expo-clipboard";

import { FansView, FansIconButton, FansText } from "@components/controls";
import { CopyLinkSvg, CopySvg, CheckSvg } from "@assets/svgs/common";
import { truncateText } from "@utils/stringHelper";

interface Props {
	url: string;
}

const CopyLink: FC<Props> = (props) => {
	const { url } = props;

	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		await Clipboard.setStringAsync(
			url.includes("https://") ? url : `https://${url}`,
		);
		setCopied(true);
	};

	useEffect(() => {
		setCopied(false);
	}, []);

	return (
		<FansView flexDirection="row" alignItems="center">
			<FansView
				border={1}
				borderRadius={25}
				borderColor="grey"
				padding={{ y: 5, l: 5, r: 20 }}
				flexDirection="row"
				alignItems="center"
			>
				<FansIconButton
					size={24}
					containerColor="#a854f5"
					style={tw.style("mr-2")}
				>
					<CopyLinkSvg width={13.91} height={13.92} color="#fff" />
				</FansIconButton>
				<FansText color="purple-a8" fontSize={16} lineHeight={21}>
					{truncateText(url, 30)}
				</FansText>
			</FansView>
			<Pressable style={tw.style("ml-2")} onPress={handleCopy}>
				{copied ? (
					<CheckSvg width={20} height={16} color="#a854f5" />
				) : (
					<CopySvg width={14.71} height={18.73} color="#a854f5" />
				)}
			</Pressable>
		</FansView>
	);
};

export default CopyLink;
