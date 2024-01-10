import { View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CustomTopNavBar from "@components/common/customTopNavBar";
import { FundraiserForm } from "@components/posts/share";
import { IFundraiser, IPickerMedia } from "@usertypes/types";
import { MediaType } from "@usertypes/commonEnums";
import { useAppContext, PostsActionType } from "@context/useAppContext";
import useUploadFiles from "@utils/useUploadFile";
import { PostsNavigationStacks } from "@usertypes/navigations";
import { defaultFundraiserFormData } from "@constants/defaultFormData";

const AddFundraiserScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "FundraiserProperty">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();

	const { state, dispatch } = useAppContext();
	const { postForm } = state.posts;
	const { uploadFiles } = useUploadFiles();

	const [formData, setFormData] = useState<IFundraiser>(
		defaultFundraiserFormData,
	);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [coverImg, setCoverImg] = useState<IPickerMedia>({
		uri: "",
		isPicker: false,
	});
	const [availableEndTime, setAvailableEndTime] = useState(false);

	const handleChangeForm = (name: string, val: string | boolean) => {
		setFormData({
			...formData,
			[name]: val,
		});
	};

	const handleAddFundraiser = async () => {
		setIsSubmitted(true);
		if (
			formData.title === "" ||
			formData.price === "" ||
			formData.timezone === ""
		) {
			return;
		}
		let newCoverImg = coverImg.uri;
		if (coverImg.isPicker && coverImg.uri) {
			dispatch.setShowLoading();
			const uploadingResp = await uploadFiles([
				{ uri: coverImg.uri, type: MediaType.Image },
			]);
			if (uploadingResp?.ok) {
				newCoverImg = uploadingResp.data[0].id as string;
			}
			dispatch.setHideLoading();
		}

		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				fundraiser: {
					...formData,
					price: formData.price as string,
					thumb: newCoverImg,
				},
			},
		});
		navigation.goBack();
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

	useEffect(() => {
		setFormData(postForm.fundraiser);
		setCoverImg({
			uri: postForm.fundraiser.thumb,
			isPicker: false,
		});
	}, []);

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
				title="Add fundraiser"
				onClickLeft={() => navigation.goBack()}
				onClickRight={() => {}}
			/>
			<ScrollView style={{ paddingTop: 24 }}>
				<FundraiserForm
					formData={formData}
					coverImg={coverImg}
					isSubmitted={isSubmitted}
					handleChangeForm={handleChangeForm}
					onChangeImage={onChangeImage}
					handleAddFundraiser={handleAddFundraiser}
					// availableEndTime={availableEndTime}
					// onChangeAvailableTime={(val) => setAvailableEndTime(val)}
				/>
			</ScrollView>
		</View>
	);
};

export default AddFundraiserScreen;
