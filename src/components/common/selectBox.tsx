import { Text, Pressable } from "react-native";
import React, { FC, useState } from "react";
import tw from "@lib/tailwind";
import { Menu } from "react-native-paper";

import { ChevronDownSvg } from "@assets/svgs/common";
import { ISelectData } from "@usertypes/types";

interface Props {
	data: ISelectData[];
	value: string;
	onChange: (val: string) => void;
}

const SelectBox: FC<Props> = (props) => {
	const { data, value, onChange } = props;
	const [open, setOpen] = useState(false);

	const handleChange = (val: string) => {
		setOpen(false);
		onChange(val);
	};

	return (
		<Menu
			visible={open}
			onDismiss={() => setOpen(false)}
			anchor={
				<Pressable
					style={tw.style(
						"w-full h-[42px] border border-fans-dark-grey px-5 justify-center rounded-[42px] relative",
					)}
					onPress={() => setOpen(true)}
				>
					<Text
						style={tw.style(
							"text-[18px] leading-[24px] font-normal m-0",
						)}
					>
						{data.find((el) => el.data === value)?.label}
					</Text>
					<ChevronDownSvg
						width={12.28}
						height={6.14}
						color="#707070"
						style={tw.style("absolute top-[18px] right-[18px]")}
					/>
				</Pressable>
			}
			contentStyle={tw.style("max-w-full bg-white")}
			style={tw.style("left-[18px] right-[18px] bg-white")}
		>
			{data.map((el) => (
				<Menu.Item
					key={el.data}
					onPress={() => handleChange(el.data)}
					title={el.label}
					style={tw.style("w-full max-w-full")}
				/>
			))}
		</Menu>
	);
};

export default SelectBox;
