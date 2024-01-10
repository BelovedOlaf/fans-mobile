import React, { FC } from "react";
import { View } from "react-native";

import ModalHeader from "./modalHeader";
import ScreenWrapper from "./screenWrapper";

import { PostStepTypes } from "@usertypes/commonEnums";
import { IPostForm, IRole } from "@usertypes/types";
import { IAppDispatch } from "@context/appContext";
import { RoleForm } from "../share";

interface Props {
	data: IPostForm;
	roleId: string;
	roles: IRole[];
	handleChangeTab: (tab: PostStepTypes) => void;
	inProgress: boolean;
	setInProgress: (val: boolean) => void;
	prevScreen: PostStepTypes;
	dispatch: IAppDispatch;
}

const RoleScreen: FC<Props> = (props) => {
	const {
		data,
		roleId,
		roles,
		handleChangeTab,
		inProgress,
		setInProgress,
		prevScreen,
		dispatch,
	} = props;

	const onViewFansLevel = () => {
		handleChangeTab(PostStepTypes.AnalyzeFansLevels);
	};
	return (
		<View>
			<ModalHeader
				title="Add or edit role"
				onClickLeft={() => handleChangeTab(prevScreen)}
			/>
			<ScreenWrapper>
				<RoleForm
					id={roleId}
					roles={roles}
					inProgress={inProgress}
					handleBack={() => {
						handleChangeTab(prevScreen);
					}}
					onViewFansLevel={onViewFansLevel}
					handleToggleLoading={setInProgress}
					dispatch={dispatch}
				/>
			</ScreenWrapper>
		</View>
	);
};

export default RoleScreen;
