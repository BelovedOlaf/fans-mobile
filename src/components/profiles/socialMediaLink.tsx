import { View } from "react-native";
import React, { FC } from "react";

import { FansIconButton } from "@components/controls";
import { FypText } from "@components/common/base";
import getSocialIconComponent from "@components/socialIcons";
import { EditSvg, TrashSvg } from "@assets/svgs/common";
import { ComponentSizeTypes } from "@usertypes/commonEnums";

import tw from "@lib/tailwind";
import { ISocialLink } from "@usertypes/types";

// import base modules
import { FansDivider } from "@components/controls";

interface Props {
	data: ISocialLink;
	onClickEdit: () => void;
	onClickDelete: () => void;
}

const SocialMediaLink: FC<Props> = (props) => {
	const { data, onClickEdit, onClickDelete } = props;

	return (
		<View>
			<View style={tw.style("pl-[5.5px] flex-row items-center")}>
				<View style={tw.style("w-[42px] h-[42px]")}>
					{getSocialIconComponent({
						iconName: data.provider,
						size: ComponentSizeTypes.md,
					})}
				</View>

				<FypText
					fontSize={18}
					lineHeight={24}
					numberOfLines={1}
					style={tw.style("text-black ml-3")}
				>
					{data.url}
				</FypText>

				<View style={tw.style("ml-auto flex-row gap-x-[7px]")}>
					<FansIconButton
						size={34}
						containerColor="#f0f0f0"
						onPress={onClickEdit}
					>
						<EditSvg width={12.94} height={13.5} color="#000" />
					</FansIconButton>
					<FansIconButton
						size={34}
						containerColor="#f0f0f0"
						onPress={onClickDelete}
					>
						<TrashSvg
							width={11.87}
							height={14.76}
							color="#eb2121"
						/>
					</FansIconButton>
				</View>
			</View>

			<FansDivider style={tw.style("my-2 h-[1px]")} />
		</View>
	);
};

export default SocialMediaLink;
