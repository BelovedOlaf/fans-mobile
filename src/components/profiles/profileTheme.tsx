import { View } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

import CustomText from "@components/common/customText";
import { UserSvg } from "@assets/svgs/common";
import { ProfileThemeType } from "@usertypes/commonEnums";
import Checkbox from "@components/common/checkbox";

interface Props {
	title: ProfileThemeType;
	selected: boolean;
	onSelect: () => void;
}

const ProfileTheme: FC<Props> = (props) => {
	const { title, selected, onSelect } = props;

	return (
		<View>
			<View
				style={tw.style(
					"w-[132px] h-[165px] bg-fans-grey rounded-[7px] pt-6 relative",
				)}
			>
				<View
					style={tw.style(
						"bg-white rounded-full w-[46px] h-[46px] items-center justify-center flex-row mx-auto",
					)}
				>
					<UserSvg width={24.38} height={24.82} color="#000" />
				</View>
				<Checkbox
					checked={selected}
					onPress={onSelect}
					style="absolute top-[10px] right-[10px]"
				/>
			</View>

			<CustomText
				size="base"
				style="text-fans-dark-grey mt-2 text-center font-medium"
			>
				{title}
			</CustomText>
		</View>
	);
};

export default ProfileTheme;
