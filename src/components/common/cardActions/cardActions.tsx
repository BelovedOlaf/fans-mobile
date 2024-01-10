import React, { FC } from "react";
import { View } from "react-native";

import tw from "@lib/tailwind";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import MenuItem from "./menuItem";
import { ICardAction } from "@usertypes/types";
import { isDesktop } from "@utils/global";
interface Props {
	open: boolean;
	onClose: () => void;
	actions: ICardAction[];
}

const CardActions: FC<Props> = (props) => {
	const { open, onClose, actions } = props;

	return (
		<BottomSheetWrapper open={open} onClose={onClose}>
			<View style={tw.style(!isDesktop && "pb-10")}>
				{actions
					.filter((el) => !el.hide)
					.map((action) => (
						<MenuItem key={action.title} data={action} />
					))}
			</View>
		</BottomSheetWrapper>
	);
};

export default CardActions;
