import { ChevronRightSvg, CloseSvg } from "@assets/svgs/common";
import { FansText } from "@components/controls";
import CustomSwitch from "@components/common/customSwitch";
import { FypNullableView } from "@components/common/base";
import { FansView } from "@components/controls";
import { roleIcons } from "@constants/common";

import tw from "@lib/tailwind";
import { IRole } from "@usertypes/types";

import React, { FC } from "react";
import { Image, View, Pressable } from "react-native";
import { IconButton } from "react-native-paper";

interface Props {
	data: IRole;
	isEditMode: boolean;
	onChangeEnable: (val: boolean) => void;
	onDelete: () => void;
	onEdit: () => void;
	hideSwitch: boolean;
}

const RoleItem: FC<Props> = (props) => {
	const { data, isEditMode, onDelete, onEdit, onChangeEnable, hideSwitch } =
		props;

	const icon = roleIcons.find((el) => el.name === data.icon);

	const handleClick = () => {
		if (isEditMode) {
			onEdit();
		} else {
			onChangeEnable(!data.isEnable);
		}
	};

	return (
		<View style={tw.style("flex-row items-center py-[15px]")}>
			<FypNullableView visible={isEditMode}>
				<IconButton
					icon={() => (
						<CloseSvg width={11.3} height={11.3} color="#fff" />
					)}
					containerColor="#000"
					style={tw.style("my-0 ml-0 mr-[22px] w-[25px] h-[25px]")}
					onPress={onDelete}
				/>
			</FypNullableView>

			<Pressable
				style={{
					width: 46,
					height: 46,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					position: "relative",
				}}
				onPress={handleClick}
			>
				<FypNullableView visible={!!icon}>
					<Image
						source={icon?.icon}
						style={{
							width: icon?.width ?? 0,
							height: icon?.height ?? 0,
						}}
					/>
				</FypNullableView>
				<View
					style={{
						width: 46,
						height: 46,
						borderRadius: 46,
						backgroundColor: data.color,
						opacity: 0.15,
						position: "absolute",
						top: 0,
						left: 0,
					}}
				></View>
			</Pressable>

			<Pressable style={tw.style("ml-3")} onPress={handleClick}>
				<FansText
					fontSize={19}
					lineHeight={26}
					style={tw.style("font-semibold")}
				>
					{data.name}
				</FansText>
				<FansText
					color="grey-70"
					fontSize={16}
					lineHeight={21}
					style={tw.style("mt-[-3px]")}
				>
					{`${data.fans ?? 0} fans`}
				</FansText>
			</Pressable>

			{isEditMode ? (
				<IconButton
					icon={() => (
						<FansView style={tw.style("w-[7.32px] h-[12.64px]")}>
							<ChevronRightSvg color={tw.color("fans-black")} />
						</FansView>
					)}
					containerColor="#fff"
					style={tw.style("my-0 ml-auto mr-0 w-[25px] h-[25px]")}
					onPress={onEdit}
				/>
			) : (
				<View style={tw.style("flex-row items-center ml-auto")}>
					<FansText color="grey-70" fontSize={16} lineHeight={21}>
						{`Level ${data.level}`}
					</FansText>
					<View style={tw.style(hideSwitch ? "hidden" : "ml-[14px")}>
						<CustomSwitch
							value={data.isEnable ?? false}
							onValueChange={(val) => onChangeEnable(val)}
						/>
					</View>
				</View>
			)}
		</View>
	);
};

export default RoleItem;
