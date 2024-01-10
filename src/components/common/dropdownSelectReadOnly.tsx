import React, { FC } from "react";
import { SelectList, SelectListProps } from "react-native-dropdown-select-list";
import tw from "@lib/tailwind";
import clsx from "clsx";

import { View } from "react-native";
import CustomText from "./customText";
import { ChevronDownSvg, CloseSvg } from "@assets/svgs/common";
import { ISelectData } from "@usertypes/types";

interface Props extends SelectListProps {
	data: ISelectData[];
	value: string;
	setSelected: (val: string) => void;
	customBoxStyles?: string;
	validateString?: string;
	hasError?: boolean;
}

const DropdownSelectReadOnly: FC<Props> = (props) => {
	const {
		data,
		value,
		setSelected,
		customBoxStyles,
		validateString,
		hasError,
		...others
	} = props;

	const options = data.map((el) => ({ key: el.data, value: el.label }));

	return (
		<View>
			<SelectList
				setSelected={(val: string) => setSelected(val)}
				data={options}
				save="key"
				boxStyles={tw.style(
					clsx(
						"border-fans-grey h-[42px] rounded-[42px] px-5 text-left text-fans-red-10 items-center py-0",
					),
				)}
				search={false}
				inputStyles={tw.style("text-[18px] leading-6 border-0")}
				arrowicon={<></>}
				defaultOption={options.find((el) => el.key === value)}
				dropdownShown={false}
			/>
		</View>
	);
};

export default DropdownSelectReadOnly;
