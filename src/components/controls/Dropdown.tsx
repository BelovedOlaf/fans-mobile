import React, { useEffect, useMemo, useRef } from "react";
import SelectDropdown from "react-native-select-dropdown";

import { ChevronDown5Svg } from "@assets/svgs/common";
import { FansSvg, FansView, FansText } from "@components/controls";
import tw from "@lib/tailwind";
import { IFansDropdown } from "@usertypes/components";

import countries from "@helper/geo/country.json";
import { isUndefined } from "lodash";

const FansDropdown: IFansDropdown = (props) => {
	const { data, value, dropdownStyle, onSelect } = props;

	const refSelectDropdown = useRef<SelectDropdown>(null);

	useEffect(() => {
		if (isUndefined(value) && refSelectDropdown.current)
			refSelectDropdown.current.reset();
	}, [value]);

	return (
		<FansView height="dropdown">
			<SelectDropdown
				ref={refSelectDropdown}
				data={data}
				buttonStyle={[
					tw.style(
						"w-full h-full",
						"bg-fans-white",
						"border border-fans-grey-70 rounded-full",
					),
					dropdownStyle?.buttonStyle,
				]}
				buttonTextAfterSelection={(item) => item.text}
				buttonTextStyle={tw.style(
					"font-inter-regular",
					"text-[18px] text-left",
				)}
				defaultButtonText={dropdownStyle?.defaultButtonText}
				defaultValue={data.find(
					(item, index) => (item.id ?? index) === value,
				)}
				dropdownStyle={tw.style("rounded-[15px]")}
				renderDropdownIcon={(isOpened) => (
					<FansSvg
						width={24}
						height={6.14}
						svg={ChevronDown5Svg}
						color1="grey-70"
					/>
				)}
				rowStyle={tw.style("h-fans-dropdown")}
				rowTextForSelection={(item) => item.text}
				rowTextStyle={tw.style(
					"font-inter-regular",
					"leading-[42px]",
					"text-[18px] text-left",
				)}
				search={dropdownStyle?.search}
				searchInputStyle={tw.style("p-[0px]")}
				searchPlaceHolder="Search"
				showsVerticalScrollIndicator={false}
				onSelect={onSelect}
			/>
		</FansView>
	);
};

export const FansCountryDropdown: IFansDropdown = (props) => {
	const { value, onSelect } = props;

	const countryOptions = useMemo(
		() =>
			countries
				.map((el) => ({
					id: el.isoCode,
					text: el.name,
					flag: el.flag,
				}))
				.sort((a, b) => a.text.localeCompare(b.text)),
		[],
	);

	return (
		<FansView>
			<FansDropdown
				data={countryOptions}
				value={value}
				onSelect={onSelect}
				dropdownStyle={{
					defaultButtonText: "Select Country",
					buttonStyle: tw.style(value ? "pl-[46px]" : ""),
				}}
			/>
			<FansView
				width={22}
				height={22}
				flexDirection="row"
				justifyContent="center"
				alignItems="center"
				position="absolute"
				style={tw.style("left-4 top-[10px]")}
			>
				<FansText>
					{countryOptions.find((el) => el.id === value)?.flag}
				</FansText>
			</FansView>
		</FansView>
	);
};

export default FansDropdown;
