import { View } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import { IconButton } from "react-native-paper";

import FansText from "@components/controls/Text";
import { CloseSvg, DocumentEditSvg } from "@assets/svgs/common";
import { IUploadForm } from "@usertypes/types";

interface Props {
	data: IUploadForm;
	onDelete: () => void;
}

const UploadDocument: FC<Props> = (props) => {
	const { data, onDelete } = props;
	return (
		<View
			style={tw.style(
				"relative border border-fans-grey p-[17px] rounded-[7px] flex-row items-center",
			)}
		>
			<View
				style={tw.style(
					"w-[77px] h-[77px] flex-row items-center justify-center rounded-full bg-[#f6edff]",
				)}
			>
				<DocumentEditSvg width={31.3} height={35} />
			</View>

			<View style={tw.style("ml-[22px] flex-1")}>
				<FansText
					fontSize={17}
					lineHeight={22}
					style={tw.style("font-semibold")}
				>
					{data.origin}
				</FansText>
			</View>

			<IconButton
				icon={() => <CloseSvg width={11} height={11} color="#707070" />}
				style={tw.style("m-0 absolute w-6 h-6 top-[7px] right-[7px]")}
				onPress={onDelete}
			/>
		</View>
	);
};

export default UploadDocument;
