import {
	DndTriggerSvg,
	EditSvg,
	ImageSvg,
	TrashSvg,
} from "@assets/svgs/common";
import tw from "@lib/tailwind";
import React, { FC } from "react";
import { Text, View } from "react-native";
import { IconButton } from "react-native-paper";

import CustomSwitch from "@components/common/customSwitch";
import CustomText from "@components/common/customText";
import { ICategory } from "@usertypes/types";
import { truncateText } from "@utils/stringHelper";

interface Props {
	data: ICategory;
	onClickEdit: () => void;
	onClickDelete: () => void;
	onToggle: (val: boolean) => void;
}

const Category: FC<Props> = (props) => {
	const { data, onClickDelete, onClickEdit, onToggle } = props;

	return (
		<View style={tw.style("flex-row items-center h-13")}>
			<DndTriggerSvg width={9.8} height={16.14} color="#000" />

			<Text style={tw.style("text-[18px] leading-6 ml-8")}>
				{truncateText(data.name, 15)}
			</Text>

			<View
				style={tw.style(
					"flex-row items-center bg-[#f6edff] h-[25px] rounded-[25px] px-[9px] ml-[14px]",
				)}
			>
				<ImageSvg width={11.7} height={11.7} color="#a854f5" />
				<CustomText size="base" style="text-fans-purple ml-1">
					{data.postCount}
				</CustomText>
			</View>

			<View style={tw.style("flex-row items-center gap-x-[7px] ml-auto")}>
				<IconButton
					icon={() => (
						<EditSvg width={14.94} height={15.5} color="#000" />
					)}
					containerColor="#f0f0f0"
					style={tw.style("m-0 w-[34px] h-[34px]")}
					onPress={onClickEdit}
				/>
				<IconButton
					icon={() => (
						<TrashSvg
							width={11.87}
							height={14.76}
							color="#eb2121"
						/>
					)}
					containerColor="#f0f0f0"
					style={tw.style("m-0 w-[34px] h-[34px]")}
					onPress={onClickDelete}
				/>
				<CustomSwitch
					value={data.isActive}
					onValueChange={(val) => onToggle(val)}
				/>
			</View>
		</View>
	);
};

export default Category;
