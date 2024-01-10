import { FypText } from "@components/common/base";
import CustomTopNavBar from "@components/common/customTopNavBar";
import FileDropzone from "@components/common/fileDropzone";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import { ImagePostChip } from "@components/posts/common";

import { useAppContext } from "@context/useAppContext";
import { updateProfilePreview } from "@helper/endpoints/profile/apis";
import useDocumentPicker from "@utils/useDocumentPicker";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MediaType } from "@usertypes/commonEnums";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import { IPickerMedia } from "@usertypes/types";
import useUploadFiles from "@utils/useUploadFile";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const PreviewScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "Preview">,
) => {
	const { navigation } = props;
	const router = useRouter();
	const insets = useSafeAreaInsets();

	const { state, dispatch } = useAppContext();
	const { previews } = state.profile;

	const { uploadFiles } = useUploadFiles();
	const { useImagePicker } = useDocumentPicker();
	const [inProgress, setInProgress] = useState(false);
	const [images, setImages] = useState<IPickerMedia[]>([]);
	const [selectedImages, setSelectedImages] = useState<IPickerMedia[]>([]);

	const onTogglePhoto = (image: IPickerMedia) => {
		let reorderedImages: IPickerMedia[] = [];
		if (selectedImages.map((el) => el.uri).includes(image.uri)) {
			reorderedImages = selectedImages.filter(
				(el) => el.uri !== image.uri,
			);
		} else {
			if (selectedImages.length < 10) {
				reorderedImages = [...selectedImages, image];
			}
		}
		setSelectedImages(reorderedImages);
	};

	const handleOpenPicker = async () => {
		const result = await useImagePicker(true);
		if (result?.ok) {
			const medias = result.data ?? [];
			setImages([...images, ...medias]);
			setSelectedImages([...selectedImages, ...medias]);
		} else {
			Toast.show({
				type: "error",
				text1: result?.message ?? "",
			});
		}
	};

	const handleSave = async () => {
		const newImageUrls = selectedImages
			.filter((media) => media.isPicker)
			.map((el) => el.uri);

		setInProgress(true);

		let uploadedUrls: string[] = [];
		if (newImageUrls.length > 0) {
			const resp = await uploadFiles(
				newImageUrls.map((uri) => ({ uri, type: MediaType.Image })),
			);

			if (resp?.ok) {
				uploadedUrls = resp.data.map((d) => d.url);
			} else {
				Toast.show({
					type: "error",
					text1: "Failed to upload images",
				});
			}
		}

		const postbody = {
			previews: [
				...selectedImages
					.filter((el) => !el.isPicker)
					.map((cell) => cell.uri),
				...uploadedUrls,
			],
		};

		const previewResp = await updateProfilePreview(postbody);
		setInProgress(false);

		if (previewResp.ok) {
			// router.back();
			navigation.goBack();
		} else {
			Toast.show({
				type: "error",
				text1: previewResp.data.message,
			});
		}
	};

	useEffect(() => {
		setImages(
			previews.map((preview) => ({ uri: preview.url, isPicker: false })),
		);
		setSelectedImages(
			previews.map((preview) => ({ uri: preview.url, isPicker: false })),
		);
	}, []);

	return (
		<AppLayout
			title="Edit Profile | FYP.Fans"
			description="FYP.Fans allows creators to make an income doing what they love!"
		>
			<View style={tw.style("flex-1")}>
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer>
						<CustomTopNavBar
							title="Edit preview"
							onClickLeft={() => navigation.goBack()}
							onClickRight={handleSave}
							rightLabel="Save"
							loading={inProgress}
						/>
						<View
							style={[
								{
									paddingBottom: insets.bottom + 35,
								},
								tw.style("pt-6"),
							]}
						>
							<FypText
								fontSize={16}
								lineHeight={21}
								textAlign="center"
								style={tw.style("mx-auto mb-9")}
							>
								Select up to 5 images for users
								{"\n"}to see on your profile preview
							</FypText>

							<View style={tw.style("mb-5 px-[18px] md:px-0")}>
								<FileDropzone
									onPress={handleOpenPicker}
									fileCounts={images.length}
								/>
							</View>

							<View style={tw.style("flex-row flex-wrap")}>
								{images.map((img, index) => (
									<ImagePostChip
										colSpan={3}
										key={index}
										uri={img.uri}
										onPress={() => onTogglePhoto(img)}
										orderNumber={
											selectedImages.findIndex(
												(cell) => cell.uri === img.uri,
											) + 1
										}
										orderAble
										sizeRate={1.7}
									/>
								))}
							</View>
						</View>
					</LayoutContentsContainer>
				</ScrollView>
			</View>
		</AppLayout>
	);
};

export default PreviewScreen;
