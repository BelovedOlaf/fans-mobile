import React, { FC } from "react";
import tw from "@lib/tailwind";
import { Button } from "react-native-paper";
import clsx from "clsx";

interface Props {
	title: string;
	selected: boolean;
	onClick: () => void;
}

const FilterButton: FC<Props> = (props) => {
	const { selected, onClick, title } = props;

	return (
		<Button
			mode="contained"
			style={tw.style(
				clsx("px-5 pt-1 pb-2 rounded-[34px]", {
					"bg-fans-purple": selected,
					"bg-fans-grey": !selected,
				}),
			)}
			contentStyle={tw.style("m-0 p-0")}
			labelStyle={tw.style(
				clsx("text-[17px] leading-[22px] m-0 p-0", {
					"text-white": selected,
					"text-black": !selected,
				}),
			)}
			onPress={onClick}
		>
			{title}
		</Button>
	);
};

export default FilterButton;
