import { View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as DocumentPicker from "expo-document-picker";
import Toast from "react-native-toast-message";

import CustomTopNavBar from "@components/common/customTopNavBar";
import { TagPeopleForm } from "@components/posts/share";

import tw from "@lib/tailwind";
import { useAppContext, PostsActionType } from "@context/useAppContext";
import { PostsNavigationStacks } from "@usertypes/navigations";
import { ITaggedPeople, IUploadForm } from "@usertypes/types";

const TagPeopleScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "TagPeople">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();

	const { state, dispatch } = useAppContext();
	const { postForm } = state.posts;

	const [_taggedPeople, setTaggedPeople] = useState<ITaggedPeople[]>([]);
	const [files, setFiles] = useState<IUploadForm[]>([]);

	const onClickInviteNewUser = () => {
		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				taggedPeoples: _taggedPeople,
			},
		});
		navigation.navigate("Invite");
	};

	const onClickBack = () => {
		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				uploadFiles: files,
			},
		});
		navigation.goBack();
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
		navigation.navigate("TagPeopleSearch");
	};

	useEffect(() => {
		setTaggedPeople(postForm.taggedPeoples ?? []);
	}, [postForm.taggedPeoples]);

	return (
		<View
			style={{
				paddingTop: insets.top,
				flex: 1,
				backgroundColor: "#fff",
				position: "relative",
			}}
		>
			<CustomTopNavBar title="Tag people" onClickLeft={onClickBack} />
			<ScrollView style={tw.style("py-6 px-[18px]")}>
				<TagPeopleForm
					postForm={postForm}
					dispatch={dispatch}
					onClickInviteNewUser={onClickInviteNewUser}
					files={files}
					onDeleteDocument={onDeleteDocument}
					onClickDropzone={onClickDropzone}
					onCreateNewTagUser={onCreateNewTagUser}
				/>
			</ScrollView>
		</View>
	);
};

export default TagPeopleScreen;
