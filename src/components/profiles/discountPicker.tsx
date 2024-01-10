import { View, Platform } from "react-native";
import React, { FC, Fragment } from "react";
import { Picker } from "@react-native-picker/picker";
import tw from "@lib/tailwind";
import { discountOptions } from "@constants/common";
import DropdownSelect from "@components/common/dropdownSelect";

interface Props {
	value: string;
	onChange: (val: string) => void;
}

const DiscountPicker: FC<Props> = (props) => {
	const { value, onChange } = props;

	return (
		<Fragment>
			{Platform.OS === "ios" ? (
				<View
					style={tw.style("border-fans-grey rounded-[15px] border")}
				>
					<Picker
						selectedValue={value}
						onValueChange={(itemValue) => onChange(itemValue)}
						itemStyle={tw.style(
							"text-[25px] font-semibold py-0 my-0",
						)}
						// selectionColor="#a854f5"
					>
						{discountOptions.map((option) => (
							<Picker.Item
								label={option.label}
								value={option.data}
								key={option.data}
							/>
						))}
					</Picker>
				</View>
			) : (
				<DropdownSelect
					data={discountOptions}
					value={value}
					setSelected={onChange}
				/>
			)}
		</Fragment>
	);
};

export default DiscountPicker;
