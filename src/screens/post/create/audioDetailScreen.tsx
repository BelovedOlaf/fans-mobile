import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CustomTopNavBar from "@components/common/customTopNavBar";
import { AudioDetailForm } from "@components/posts/share";
import { PostsNavigationStacks } from "@usertypes/navigations";
import { IAudioDetail, IPickerMedia } from "@usertypes/types";
import { defaultAudioDetail } from "@constants/defaultFormData";
import { PostsActionType, useAppContext } from "@context/useAppContext";
import useDocumentPicker from "@utils/useDocumentPicker";

const AudioDetailScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "AudioDetail">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();
	const { useImagePicker } = useDocumentPicker();

	const handleCancel = () => {
		navigation.goBack();
	};

	const { dispatch } = useAppContext();

	const [formData, setFormData] = useState<IAudioDetail>(defaultAudioDetail);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [coverImg, setCoverImg] = useState<IPickerMedia>({
		uri: "",
		isPicker: false,
	});

	const onChangeFormData = (name: string, value: string | boolean) => {
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const onChangeImage = async () => {
		const result = await useImagePicker();
		if (result?.ok) {
			const medias = result.data ?? [];
			if (medias.length > 0) {
				setCoverImg(medias[0]);
			}
		}
	};

	const handleNext = async () => {
		setIsSubmitted(true);
		if (formData.title === "") {
			return;
		}

		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				audio: formData,
				thumb: coverImg,
			},
		});
		navigation.navigate("Caption");
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
				onClickLeft={handleCancel}
				onClickRight={handleNext}
				rightLabel="Next"
				titleIcon="audio"
				leftIcon="close"
			/>
			<ScrollView
				contentContainerStyle={{
					paddingBottom: insets.bottom,
					paddingTop: 28,
				}}
			>
				<AudioDetailForm
					formData={formData}
					coverImg={coverImg}
					isSubmitted={isSubmitted}
					onChangeFormData={onChangeFormData}
					onChangeImage={onChangeImage}
				/>
			</ScrollView>
		</View>
	);
};

export default AudioDetailScreen;
