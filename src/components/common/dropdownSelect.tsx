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

const DropdownSelect: FC<Props> = (props) => {
	const {
		data,
		value,
		setSelected,
		customBoxStyles,
		validateString,
		hasError,
		search,
		...others
	} = props;

	const options = data.map((el) => ({ key: el.data, value: el.label }));

	return (
		<View>
			<SelectList
				setSelected={(val: string) => setSelected(val)}
				data={options}
				save="key"
				search={search}
				boxStyles={tw.style(
					clsx(
						"border-fans-dark-grey h-[42px] rounded-[42px] px-5 text-black items-center py-0",
						hasError ? "border-fans-red border" : "",
						customBoxStyles,
					),
				)}
				inputStyles={tw.style("text-[18px] leading-6 border-0")}
				arrowicon={
					<ChevronDownSvg
						width={12.28}
						height={6.14}
						color="#707070"
					/>
				}
				closeicon={
					<CloseSvg width={12.28} height={12.28} color="#707070" />
				}
				defaultOption={options.find((el) => el.key === value)}
				// dropdownStyles={tw.style(
				// 	"absolute w-full top-[42px] z-90 bg-white",
				// )}
				// dropdownItemStyles={tw.style("bg-white z-20 relative")}
				// dropdownTextStyles={tw.style("bg-white z-30 relative")}
				{...others}
			/>
			{hasError && validateString && (
				<CustomText size="base" style="text-fans-red mt-1">
					{validateString}
				</CustomText>
			)}
		</View>
	);
};

export default DropdownSelect;
