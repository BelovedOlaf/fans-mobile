import React, { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";

import { COUNTRIES } from "@assets/data";
import { ChevronDown5Svg } from "@assets/svgs/common";
import {
	FansGap,
	FansImage1,
	FansSvg,
	FansText,
	FansTextInput3,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import { IFansPhoneInput } from "@usertypes/components";
import { ICountry } from "@usertypes/types";
import {
	CountryCode,
	formatIncompletePhoneNumber,
	parsePhoneNumber,
} from "libphonenumber-js";

const FansPhoneInput: IFansPhoneInput = (props) => {
	const { value, onChange: trigChange } = props;

	const [country, setCountry] = useState<ICountry>(COUNTRIES[0]);
	const [strPhonenumber, setPhonenumber] = useState("");

	useEffect(() => {
		try {
			const objPhonenumber = parsePhoneNumber(value);
			setCountry(
				COUNTRIES.filter(
					(value) => value.code === objPhonenumber.country,
				)[0],
			);
			setPhonenumber(objPhonenumber.formatNational());
		} catch {
			//
		}
	}, [value]);

	const handleChangeText = (value: string) => {
		const strNumber = value.replace(/[^0-9]/g, "").substring(0, 10);
		setPhonenumber(
			formatIncompletePhoneNumber(strNumber, country.code as CountryCode),
		);
		try {
			const objPhonenumber = parsePhoneNumber(country.phone + strNumber);
			if (objPhonenumber.isValid()) {
				trigChange(country.phone + strNumber);
			}
		} catch {
			//
		}
	};

	const handleSelect = (item: ICountry, index: number) => {
		setCountry(item);
		setPhonenumber("");
	};

	return (
		<FansView flexDirection="row">
			<SelectDropdown
				data={COUNTRIES}
				buttonStyle={tw.style(
					"w-[140px]",
					"h-fans-dropdown",
					"border border-fans-grey-70 rounded-full",
				)}
				defaultValue={country}
				showsVerticalScrollIndicator={false}
				renderCustomizedButtonChild={(item, _) => {
					if (!item) return;
					const { code, flag } = item;

					return (
						<FansView
							center
							flexDirection="row"
							style={tw.style("px-[5px]")}
						>
							<FansImage1
								width={25.6}
								height={19.2}
								source={flag}
							/>
							<FansGap width={8.7} />
							<FansView grow>
								<FansText fontSize={18}>{code}</FansText>
							</FansView>
							<FansSvg
								width={24}
								height={6.14}
								svg={ChevronDown5Svg}
								color1="grey-70"
							/>
						</FansView>
					);
				}}
				renderCustomizedRowChild={(item, _) => {
					const { code, flag } = item;

					return (
						<FansView
							center
							flexDirection="row"
							style={tw.style("px-[21px] py-[5px]")}
						>
							<FansImage1
								width={25.6}
								height={19.2}
								source={flag}
							/>
							<FansGap width={8.7} />
							<FansView grow>
								<FansText fontSize={18}>{code}</FansText>
							</FansView>
						</FansView>
					);
				}}
				onSelect={handleSelect}
			/>
			<FansGap width={5} />
			<FansTextInput3
				value={strPhonenumber}
				grow
				placeholder="Phone number"
				onChangeText={handleChangeText}
			/>
		</FansView>
	);
};

export default FansPhoneInput;
