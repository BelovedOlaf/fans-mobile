import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CustomTopNavBar from "@components/common/customTopNavBar";
import { FundraiserForm } from "@components/posts/share";
import { PostType, MediaType } from "@usertypes/commonEnums";
import { IFundraiser, IPickerMedia } from "@usertypes/types";
import { useAppContext } from "@context/useAppContext";
import { createPost } from "@helper/endpoints/post/apis";
import useUploadFiles from "@utils/useUploadFile";
import { PostsNavigationStacks } from "@usertypes/navigations";
import { defaultFundraiserFormData } from "@constants/defaultFormData";

const NewFundraiserPostScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "Fundraiser">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();

	const { dispatch } = useAppContext();
	const { uploadFiles } = useUploadFiles();

	const [formData, setFormData] = useState<IFundraiser>(
		defaultFundraiserFormData,
	);
	const [coverImg, setCoverImg] = useState<IPickerMedia>({
		uri: "",
		isPicker: false,
	});
	const [endTime, setEndTime] = useState("");

	const [isSubmitted, setIsSubmitted] = useState(false);

	const onChangeField = (name: string, val: string | boolean) => {
		setFormData({
			...formData,
			[name]: val,
		});
	};

	const handleShare = async () => {
		setIsSubmitted(true);
		if (
			formData.title === "" ||
			formData.price === "" ||
			formData.timezone === ""
		) {
			return;
		}

		dispatch.setShowLoading();

		let newCoverImg = coverImg.uri;
		if (coverImg.isPicker && coverImg.uri) {
			const uploadingResp = await uploadFiles([
				{ uri: coverImg.uri, type: MediaType.Image },
			]);
			if (uploadingResp?.ok) {
				newCoverImg = uploadingResp.data[0].id as string;
			}
		}

		const postbody = {
			title: formData.title,
			caption: formData.caption,
			type: PostType.Fundraiser,
			thumbId: newCoverImg,
			mediaIds: [],
			fundraiser: {
				...formData,
				price: parseFloat(formData.price as string),
				thumbId: newCoverImg,
			},
		};

		const resp = await createPost(postbody);
		if (resp.ok) {
			navigation.goBack();
		} else {
			Toast.show({
				type: "error",
				text1: "Failed to create new post",
			});
		}
		// dispatch.fetchPosts({ page: 1, size: 10 });
		dispatch.setHideLoading();
	};

	const onChangeImage = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: false,
				aspect: [4, 3],
				quality: 1,
				allowsMultipleSelection: false,
			});

			if (!result.canceled) {
				setCoverImg({
					uri: result.assets[0].uri,
					isPicker: true,
				});
			}
		} catch (error) {
			console.log("Error picking image:", error);
		}
	};

	return (
		<View
			style={{
				paddingTop: insets.top,
				flex: 1,
				backgroundColor: "#fff",
				position: "relative",
			}}
		>
			<CustomTopNavBar
				title="New post"
				onClickLeft={() => navigation.goBack()}
				onClickRight={handleShare}
				titleIcon="fundraiser"
				rightLabel="Share"
			/>
			<ScrollView style={{ paddingTop: 24 }}>
				<FundraiserForm
					formData={formData}
					coverImg={coverImg}
					isSubmitted={isSubmitted}
					handleChangeForm={onChangeField}
					onChangeImage={onChangeImage}
				/>
			</ScrollView>
		</View>
	);
};

export default NewFundraiserPostScreen;
