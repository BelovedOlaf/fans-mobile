import { View, Pressable } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

import CustomText from "@components/common/customText";
import { MailSvg, CloseSvg } from "@assets/svgs/common";

interface Props {
	email: string;
	onCancel: () => void;
}

const EmailChip: FC<Props> = (props) => {
	const { email, onCancel } = props;

	return (
		<View
			style={tw.style(
				"bg-white h-[34px] rounded-[34px] px-3 flex-row items-center",
			)}
		>
			<MailSvg width={16.85} height={13.5} color="#707070" />

			<CustomText size="base" style="ml-[6px] mr-3">
				{email}
			</CustomText>

			<Pressable onPress={onCancel}>
				<CloseSvg width={11.1} height={11.1} color="#707070" />
			</Pressable>
		</View>
	);
};

export default EmailChip;
