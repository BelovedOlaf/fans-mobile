import { View, Image } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import { IconButton } from "react-native-paper";

import CustomText from "@components/common/customText";
import { DndTriggerSvg, EditSvg, TrashSvg } from "@assets/svgs/common";

// import base modules
import { FansDivider } from "@components/controls";
import { IHighlight } from "@usertypes/types";
import { cdnURL } from "@helper/Utils";

interface Props {
	onClickEdit: () => void;
	onClickTrash: () => void;
	data: IHighlight;
}

const EditHighlightCell: FC<Props> = (props) => {
	const { onClickEdit, onClickTrash, data } = props;

	return (
		<View>
			<View style={tw.style("py-[15px] flex-row items-center")}>
				<View>
					<DndTriggerSvg width={9.8} height={16.14} color="#000" />
				</View>
				<View
					style={tw.style(
						"w-[78px] h-[78px] rounded-full ml-8 mr-4",
						data.cover ? "" : "border border-fans-grey",
					)}
				>
					{data.cover ? (
						<Image
							source={{ uri: cdnURL(data.cover) }}
							style={tw.style("w-[78px] h-[78px] rounded-full ")}
						/>
					) : null}
				</View>

				<View style={tw.style("mr-auto")}>
					<CustomText size="xl" style="text-black">
						{data.title}
					</CustomText>
					<CustomText
						size="base"
						style="text-fans-dark-grey mt-[-1px]"
					>
						{`${data.stories.length} stories`}
					</CustomText>
				</View>

				<View style={tw.style("flex-row gap-x-2")}>
					<IconButton
						icon={() => (
							<EditSvg width={16} height={16.5} color="#000" />
						)}
						containerColor="#f0f0f0"
						style={tw.style("m-0 w-[34px] h-[34px]")}
						onPress={onClickEdit}
					/>
					<IconButton
						icon={() => (
							<TrashSvg
								width={13.87}
								height={16.76}
								color="#eb2121"
							/>
						)}
						containerColor="#f0f0f0"
						style={tw.style("m-0 w-[34px] h-[34px]")}
						onPress={onClickTrash}
					/>
				</View>
			</View>

			<FansDivider style={tw.style("h-[1px]")} />
		</View>
	);
};

export default EditHighlightCell;
