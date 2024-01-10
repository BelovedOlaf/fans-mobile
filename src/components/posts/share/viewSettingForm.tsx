import { LockSvg } from "@assets/svgs/common";
import CustomRadio from "@components/common/customRadio";
import ManageRolesForm from "./manageRolesForm";
import { FansDivider, FansText } from "@components/controls";

import tw from "@lib/tailwind";
import { IRole } from "@usertypes/types";

import React, { FC } from "react";
import { View } from "react-native";

interface Props {
	roles: IRole[];
	isAll: boolean;
	onClickAllSubscribers: (val: boolean) => void;
	onCreateRole: () => void;
	onEditRole: (roleId: string) => void;
	onDeleteRole: (roleId: string) => void;
	onToggleRole: (roleId: string, val: boolean) => void;
}

const ViewSettingForm: FC<Props> = (props) => {
	const {
		onClickAllSubscribers,
		onCreateRole,
		roles,
		isAll,
		onEditRole,
		onDeleteRole,
		onToggleRole,
	} = props;

	return (
		<View>
			<FansText
				fontSize={16}
				lineHeight={21}
				style={tw.style("text-center mb-9")}
			>
				Choose who can see your post by selecting permissions and roles
				for specific fans
			</FansText>

			<View style={tw.style("py-4")}>
				<CustomRadio
					label="All subscribers"
					checked={isAll}
					onPress={() => onClickAllSubscribers(true)}
				/>
			</View>

			<FansDivider />

			<View style={tw.style("pb-[22px]")}>
				<View style={tw.style("py-4 flex-row items-center")}>
					<CustomRadio
						label="Exclusive (Loyal fans)"
						checked={!isAll}
						onPress={() => onClickAllSubscribers(false)}
					/>
					<LockSvg
						width={13.46}
						height={17.57}
						color="#000"
						style={tw.style("ml-[30px]")}
					/>
				</View>
				<FansText
					color="grey-70"
					fontSize={16}
					lineHeight={21}
					style={tw.style("pl-10")}
				>
					Offer exclusive content to your loyal fans by selecting
					specific fan levels that can access the content
				</FansText>
			</View>

			<ManageRolesForm
				collapsed={isAll}
				roles={roles}
				onEditRole={onEditRole}
				onDeleteRole={onDeleteRole}
				onToggleRole={onToggleRole}
				onCreateRole={onCreateRole}
			/>
		</View>
	);
};

export default ViewSettingForm;
