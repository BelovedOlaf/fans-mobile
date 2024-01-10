import React, { FC, useState, useEffect } from "react";
import { View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Toast from "react-native-toast-message";

import ModalHeader from "./modalHeader";
import ScreenWrapper from "./screenWrapper";

import { PostsActionType } from "@context/useAppContext";
import { PostStepTypes } from "@usertypes/commonEnums";
import { IPostForm, IUploadForm } from "@usertypes/types";
import { TagPeopleForm } from "../share";
import { IAppDispatch } from "@context/appContext";

interface Props {
	data: IPostForm;
	handleChangeTab: (tab: PostStepTypes) => void;
	dispatch: IAppDispatch;
}

const TagPeopleScreen: FC<Props> = (props) => {
	const { data, handleChangeTab, dispatch } = props;
	const [files, setFiles] = useState<IUploadForm[]>([]);

	const onClickInviteNewUser = () => {
		handleChangeTab(PostStepTypes.InviteNewUser);
	};

	const onSave = () => {
		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				uploadFiles: files,
			},
		});
		handleChangeTab(PostStepTypes.Caption);
	};

	const onDeleteDocument = (url: string) => {
		setFiles(files.filter((file) => file.url !== url));
	};

	const onClickDropzone = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				multiple: true,
				type: "application/*",
			});

			if (!result.canceled) {
				setFiles([
					...files,
					...result.assets.map((asset) => ({
						id: "0",
						origin: asset.name,
						url: asset.uri,
						isPicker: true,
					})),
				]);
			}
		} catch (error) {
			Toast.show({
				type: "error",
				text1: error as string,
			});
		}
	};

	const onCreateNewTagUser = () => {
		handleChangeTab(PostStepTypes.TagPeopleSearch);
	};

	useEffect(() => {
		setFiles(data.uploadFiles);
	}, []);

	return (
		<View>
			<ModalHeader
				title="Tag people"
				rightLabel="Save"
				onClickRight={onSave}
				onClickLeft={() => handleChangeTab(PostStepTypes.Caption)}
			/>
			<ScreenWrapper>
				<TagPeopleForm
					postForm={data}
					dispatch={dispatch}
					onClickInviteNewUser={onClickInviteNewUser}
					files={files}
					onDeleteDocument={onDeleteDocument}
					onClickDropzone={onClickDropzone}
					onCreateNewTagUser={onCreateNewTagUser}
				/>
			</ScreenWrapper>
		</View>
	);
};

export default TagPeopleScreen;
