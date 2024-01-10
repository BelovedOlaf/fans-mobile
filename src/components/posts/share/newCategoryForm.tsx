import RoundButton from "@components/common/RoundButton";
import RoundTextInput from "@components/common/RoundTextInput";
import CustomRadio from "@components/common/customRadio";
import ManageRolesForm from "./manageRolesForm";
import { FansDivider } from "@components/controls";
import { FypText } from "@components/common/base";

import tw from "@lib/tailwind";
import { createCategory } from "@helper/endpoints/categories/apis";
import { deleteRole } from "@helper/endpoints/role/apis";
import { RoundButtonType } from "@usertypes/commonEnums";
import { ICategory, IRole, IPostCategoryForm } from "@usertypes/types";
import { IAppDispatch } from "@context/appContext";
import { PostsActionType, ProfileActionType } from "@context/useAppContext";

import React, { FC, useState, useEffect } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { defaultPostFormData } from "@constants/defaultFormData";

interface Props {
	goToBack: () => void;
	roles: IRole[];
	inProgress: boolean;
	handleToggleLoading: (val: boolean) => void;
	onEditRole: (roleId: string) => void;
	dispatch: IAppDispatch;
	categories: ICategory[];
	defaultForm?: IPostCategoryForm;
	handlePointerLeave?: (formData: IPostCategoryForm) => void;
}

const NewCategoryForm: FC<Props> = (props) => {
	const {
		handleToggleLoading,
		goToBack,
		inProgress,
		onEditRole,
		roles,
		dispatch,
		categories,
		defaultForm,
		handlePointerLeave,
	} = props;

	const [localRoles, setLocalRoles] = useState<IRole[]>([]);
	const [isAll, setIsAll] = useState(true);
	const [categoryName, setCategoryName] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const onToggleRole = (roleId: string, val: boolean) => {
		const _roles = localRoles.map((el) =>
			el.id === roleId ? { ...el, isEnable: val } : el,
		);
		setLocalRoles(_roles);
	};

	const handleCreateCategory = async () => {
		setIsSubmitted(true);
		if (categoryName === "") {
			return;
		}
		handleToggleLoading(true);
		const resp = await createCategory({
			name: categoryName,
			roleIds: localRoles
				.filter((role) => role.isEnable)
				.map((el) => el.id),
		});
		if (resp.ok) {
			if (handlePointerLeave) {
				handlePointerLeave(defaultPostFormData.categoryForm);
			}
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					categories: [...categories, { ...resp.data }],
				},
			});
		}

		handleToggleLoading(false);

		if (resp.ok) {
			goToBack();
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
		}
	};

	const onDeleteRole = async (roleId: string) => {
		handleToggleLoading(true);
		const resp = await deleteRole({ id: roleId }, { id: roleId });

		if (resp.ok) {
			setLocalRoles(localRoles.filter((el) => el.id !== roleId));
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					roles: roles.filter((el) => el.id !== roleId),
				},
			});
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
		}
		handleToggleLoading(false);
	};

	const onChangeShare = (val: boolean) => {
		if (val) {
			const _roles = localRoles.map((el) => ({ ...el, isEnable: val }));
			setLocalRoles(_roles);
		}
		setIsAll(val);
	};

	const onPointerLeave = () => {
		if (handlePointerLeave) {
			handlePointerLeave({
				categoryName,
				isAll,
				roleIds: localRoles
					.filter((el) => el.isEnable)
					.map((role) => role.id),
			});
		}
	};

	useEffect(() => {
		setLocalRoles(
			roles.map((el) => ({
				...el,
				isEnable: true,
			})),
		);
	}, [roles]);

	useEffect(() => {
		if (defaultForm) {
			setIsAll(defaultForm.isAll);
			setCategoryName(defaultForm.categoryName);
			if (!defaultForm.isAll && defaultForm.roleIds.length > 0) {
				setLocalRoles(
					roles.map((role) =>
						defaultForm.roleIds.includes(role.id)
							? { ...role, isEnable: true }
							: role,
					),
				);
			}
		}
	}, [defaultForm]);

	return (
		<View>
			<View style={tw.style("mb-[26px]")}>
				<FypText
					fontSize={17}
					lineHeight={22}
					fontWeight={600}
					style={tw.style("mb-[15px]")}
				>
					Category name
				</FypText>

				<RoundTextInput
					placeholder="e.g.DIY Inspiration"
					value={categoryName}
					onChangeText={(val) => setCategoryName(val)}
					hasError={isSubmitted && categoryName === ""}
					helperText="Category name is mandatory field."
					maxLength={50}
					onPointerLeave={onPointerLeave}
				/>
			</View>

			<View style={tw.style("mb-6")}>
				<FypText
					fontSize={17}
					lineHeight={22}
					fontWeight={600}
					style={tw.style("mb-[10px]")}
				>
					Shared with
				</FypText>

				<View style={tw.style("py-4")}>
					<CustomRadio
						label="Everyone"
						checked={isAll}
						onPress={() => onChangeShare(true)}
					/>
				</View>

				<FansDivider style={tw.style("my-1.5")} />

				<View style={tw.style("py-4")}>
					<CustomRadio
						label="Some roles"
						checked={!isAll}
						onPress={() => onChangeShare(false)}
					/>
				</View>

				<ManageRolesForm
					collapsed={isAll}
					roles={localRoles}
					onEditRole={onEditRole}
					onDeleteRole={onDeleteRole}
					onToggleRole={onToggleRole}
				/>
			</View>

			<RoundButton
				variant={RoundButtonType.OUTLINE_PRIMARY}
				onPress={handleCreateCategory}
				loading={inProgress}
			>
				Create category
			</RoundButton>
		</View>
	);
};

export default NewCategoryForm;
