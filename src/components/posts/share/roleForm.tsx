import { ColorPickerSvg, ImageSvg, UsersSvg } from "@assets/svgs/common";
import RoundButton from "@components/common/RoundButton";
import RoundTextInput from "@components/common/RoundTextInput";
import { ColorButton, RoleIconButton } from "@components/posts/roles";
import { FansView } from "@components/controls";
import { FypText, FypColorPicker } from "@components/common/base";

import { roleColors, roleIcons } from "@constants/common";
import { ProfileActionType } from "@context/useAppContext";
import { IAppDispatch } from "@context/appContext";
import { createRole, updateRole } from "@helper/endpoints/role/apis";
import tw from "@lib/tailwind";
import { RoundButtonType } from "@usertypes/commonEnums";
import { IRole, IRoleIcon } from "@usertypes/types";
import { validateNumberString } from "@utils/stringHelper";

import React, { FC, useEffect, useState } from "react";
import { Image, Pressable, ScrollView } from "react-native";
import Toast from "react-native-toast-message";

const defaultFormData = {
	id: "0",
	name: "",
	color: "",
	icon: roleIcons[0].name,
	level: "",
};

interface Props {
	id: string;
	roles: IRole[];
	inProgress: boolean;
	handleBack: () => void;
	onViewFansLevel: () => void;
	handleToggleLoading: (val: boolean) => void;
	dispatch: IAppDispatch;
}

const RoleForm: FC<Props> = (props) => {
	const {
		id,
		roles,
		handleBack,
		onViewFansLevel,
		handleToggleLoading,
		dispatch,
		inProgress,
	} = props;

	const [isSubmitted, setIsSubmitted] = useState(false);
	const [formData, setFormData] = useState<IRole>(defaultFormData);
	const [icon, setIcon] = useState<IRoleIcon | null>(null);
	const [openColorPicker, setOpenColorPicker] = useState(false);

	const onChangeForm = (name: string, val: string) => {
		setFormData({
			...formData,
			[name]: val,
		});
	};

	const handleCreate = async () => {
		handleToggleLoading(true);
		const postbody = {
			name: formData.name,
			color: formData.color,
			icon: formData.icon,
			level: parseInt(formData.level as string),
		};
		const resp = await createRole(postbody);
		handleToggleLoading(false);
		if (resp.ok) {
			const sortedRoles = [
				...roles,
				{ ...resp.data, level: resp.data.level.toString() },
			].sort((p1, p2) =>
				p1.level < p2.level ? 1 : p1.level > p2.level ? -1 : 0,
			);
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					roles: sortedRoles,
				},
			});
			handleBack();
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
		}
	};

	const handleEdit = async () => {
		handleToggleLoading(true);
		const postbody = {
			name: formData.name,
			color: formData.color,
			icon: formData.icon,
			level: parseInt(formData.level as string),
		};
		const resp = await updateRole(postbody, { id: id as string });
		handleToggleLoading(false);
		if (resp.ok) {
			const sortedRoles = roles
				.map((el) =>
					el.id === id
						? {
								...formData,
								id: id,
								level: formData.level.toString(),
						  }
						: el,
				)
				.sort((p1, p2) =>
					p1.level < p2.level ? 1 : p1.level > p2.level ? -1 : 0,
				);
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					roles: sortedRoles,
				},
			});

			handleBack();
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
		}
	};

	const handleSubmit = () => {
		setIsSubmitted(true);
		const errors = {
			name: formData.name === "",
			color: formData.color === "",
			icon: formData.icon === "",
			level: !validateNumberString(formData.level as string),
		};

		if (Object.values(errors).includes(true)) {
			return;
		}

		if (id) {
			handleEdit();
		} else {
			handleCreate();
		}
	};

	useEffect(() => {
		if (id) {
			const role = roles.find((el) => el.id === (id as string));
			setFormData({
				id: role?.id ?? "",
				name: role?.name ?? "",
				color: role?.color ?? "",
				icon: role?.icon ?? "",
				level: role?.level ? role.level.toString() : "",
			});
			setIcon(roleIcons.find((el) => el.name === role?.icon) ?? null);
		} else {
			setIcon(roleIcons[0]);
		}
	}, [id, roles]);

	return (
		<FansView>
			<FansView margin={{ b: 30 }}>
				<FypText
					fontSize={17}
					lineHeight={22}
					color="black"
					fontWeight={600}
					margin={{ b: 15 }}
				>
					Role name
					<FypText
						fontSize={17}
						lineHeight={22}
						fontWeight={600}
						color="red"
					>
						*
					</FypText>
				</FypText>

				<RoundTextInput
					value={formData.name}
					onChangeText={(val) => onChangeForm("name", val)}
					placeholder="e.g.Admin"
					hasError={isSubmitted && formData.name === ""}
					helperText="Name is mandatory"
					maxLength={50}
				/>
			</FansView>

			<FansView margin={{ b: 30 }}>
				<FypText
					fontSize={17}
					lineHeight={22}
					fontWeight={600}
					color="black"
					margin={{ b: 10 }}
				>
					Role color
					<FypText
						fontSize={17}
						lineHeight={22}
						fontWeight={600}
						color="red"
					>
						*
					</FypText>
				</FypText>
				<FypText
					fontSize={16}
					lineHeight={21}
					color="grey-70"
					margin={{ b: 12 }}
				>
					Members use the color of the highest role they have
				</FypText>

				<FansView
					width={102}
					height={102}
					borderColor="grey"
					borderRadius={102}
					margin={{ b: 16 }}
					padding={4}
					style={tw.style("mx-auto")}
				>
					<FansView
						width={95}
						height={95}
						style={{
							borderRadius: 95,
							backgroundColor: formData.color,
						}}
					></FansView>
				</FansView>

				<FansView
					flexDirection="row"
					flexWrap="wrap"
					style={tw.style("gap-x-2 gap-y-[10px]")}
				>
					<Pressable
						style={tw.style(
							"w-11 h-11 rounded-full bg-fans-grey flex-row items-center justify-center",
						)}
						onPress={() => setOpenColorPicker(true)}
					>
						<FansView>
							<ColorPickerSvg
								width={21.87}
								height={21.84}
								color="#000"
							/>
						</FansView>
					</Pressable>
					{roleColors.map((el) => (
						<ColorButton
							key={el}
							value={el}
							isSelected={formData.color === el}
							onSelect={() => onChangeForm("color", el)}
						/>
					))}
				</FansView>
			</FansView>

			<FansView margin={{ b: 30 }}>
				<FypText
					fontSize={17}
					lineHeight={22}
					color="black"
					fontWeight={600}
					margin={{ b: 16 }}
				>
					Role icon
					<FypText
						fontSize={17}
						lineHeight={22}
						color="red"
						fontWeight={600}
					>
						*
					</FypText>
				</FypText>
				<FypText fontSize={16} lineHeight={21} margin={{ b: 20 }}>
					Upload an image or select a preset icon
				</FypText>
				<FansView
					width={103}
					height={103}
					borderRadius={103}
					borderColor="grey"
					margin={{ b: 20 }}
					alignItems="center"
					justifyContent="center"
					style={tw.style("mx-auto ")}
				>
					{icon ? (
						<Image
							source={icon.icon}
							style={{
								width: icon.width * 2.34,
								height: icon.height * 2.34,
							}}
						/>
					) : null}
				</FansView>

				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						columnGap: 8,
						marginBottom: 26,
					}}
				>
					{roleIcons.map((el) => (
						<RoleIconButton
							key={el.name}
							data={el}
							onSelect={() => {
								setIcon(el);
								onChangeForm("icon", el.name);
							}}
							isSelected={icon?.name === el.name}
						/>
					))}
				</ScrollView>

				<RoundButton
					variant={RoundButtonType.OUTLINE_PRIMARY}
					icon={() => (
						<ImageSvg
							width={13.73}
							height={13.73}
							color="#a854f5"
						/>
					)}
				>
					Change image
				</RoundButton>
			</FansView>

			<FansView margin={{ b: 102 }}>
				<FansView
					flexDirection="row"
					alignItems="center"
					justifyContent="between"
					margin={{ b: 15 }}
				>
					<FypText
						fontSize={17}
						lineHeight={22}
						color="black"
						fontWeight={600}
					>
						Activity level
						<FypText
							fontSize={17}
							lineHeight={22}
							color="red"
							fontWeight={600}
						>
							*
						</FypText>
					</FypText>
					<Pressable
						style={tw.style("flex-row items-center")}
						onPress={onViewFansLevel}
					>
						<FansView>
							<UsersSvg
								width={15.68}
								height={12.64}
								color="#a854f5"
							/>
						</FansView>
						<FypText
							color="purple"
							fontSize={17}
							lineHeight={22}
							fontWeight={700}
							margin={{ l: 12 }}
						>
							View fans level
						</FypText>
					</Pressable>
				</FansView>

				<FypText fontSize={16} lineHeight={21} margin={{ b: 16 }}>
					Members use the color of the highest role they have
				</FypText>

				<FansView margin={{ b: 32 }}>
					<RoundTextInput
						placeholder="e.g.Level 100"
						value={formData.level as string}
						onChangeText={(val) => onChangeForm("level", val)}
						hasError={isSubmitted && formData.level === ""}
						helperText="Level is mandatory"
						keyboardType="numeric"
					/>
				</FansView>
				<RoundButton onPress={handleSubmit} loading={inProgress}>
					{id ? "Save role" : "Create role"}
				</RoundButton>
			</FansView>
			<FypColorPicker
				visible={openColorPicker}
				onCancel={() => setOpenColorPicker(false)}
				onSelect={(color) => {
					onChangeForm("color", color);
					setOpenColorPicker(false);
				}}
			/>
		</FansView>
	);
};

export default RoleForm;
