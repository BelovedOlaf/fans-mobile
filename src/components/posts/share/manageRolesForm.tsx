import { PlusSvg } from "@assets/svgs/common";
import { FansView } from "@components/controls";
import { FypText } from "@components/common/base";
import RoundButton from "@components/common/RoundButton";
import { RoleItem } from "@components/posts/roles";

import tw from "@lib/tailwind";
import { RoundButtonType } from "@usertypes/commonEnums";
import { IRole } from "@usertypes/types";

import React, { FC, useState } from "react";
import { Pressable } from "react-native";
import Collapsible from "react-native-collapsible";

interface Props {
	collapsed: boolean;
	roles: IRole[];
	onCreateRole?: () => void;
	onEditRole: (roleId: string) => void;
	onDeleteRole: (roleId: string) => void;
	onToggleRole?: (roleId: string, val: boolean) => void;
}

const ManageRolesForm: FC<Props> = (props) => {
	const {
		collapsed,
		roles,
		onCreateRole,
		onEditRole,
		onDeleteRole,
		onToggleRole,
	} = props;

	const [manageRoles, setManageRoles] = useState(false);
	return (
		<Collapsible collapsed={collapsed}>
			<FansView
				flexDirection="row"
				alignItems="center"
				justifyContent="between"
				padding={{ y: 14 }}
			>
				<FypText fontSize={17} lineHeight={22} fontWeight={600}>
					Roles
				</FypText>

				<Pressable
					onPress={() => setManageRoles(!manageRoles)}
					style={tw.style("flex-row items-center")}
				>
					{manageRoles ? null : (
						<PlusSvg width={11.37} height={11.37} color="#a854f5" />
					)}
					<FypText
						fontSize={17}
						lineHeight={22}
						fontWeight={600}
						color="purple"
						margin={{ r: 12 }}
					>
						{manageRoles ? "Done" : "Manage roles"}
					</FypText>
				</Pressable>
			</FansView>

			<FansView margin={{ b: 12 }}>
				{roles.map((role) => (
					<RoleItem
						key={role.id}
						data={role}
						onChangeEnable={(val) => {
							if (onToggleRole) {
								onToggleRole(role.id, val);
							}
						}}
						onDelete={() => onDeleteRole(role.id)}
						onEdit={() => onEditRole(role.id)}
						isEditMode={manageRoles}
						hideSwitch={!onToggleRole}
					/>
				))}
			</FansView>
			{onCreateRole ? (
				<RoundButton
					variant={RoundButtonType.OUTLINE_PRIMARY}
					onPress={onCreateRole}
				>
					Create role
				</RoundButton>
			) : null}
		</Collapsible>
	);
};

export default ManageRolesForm;
