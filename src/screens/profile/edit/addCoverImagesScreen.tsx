import CustomTopNavBar from "@components/common/customTopNavBar";
import FileDropzone from "@components/common/fileDropzone";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import { CoverImage } from "@components/profiles";
import { FansText } from "@components/controls";
import { ProfileActionType, useAppContext } from "@context/useAppContext";
import { updateMyProfile } from "@helper/endpoints/profile/apis";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MediaType } from "@usertypes/commonEnums";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import { IPickerMedia } from "@usertypes/types";
import useUploadFiles from "@utils/useUploadFile";
import useDocumentPicker from "@utils/useDocumentPicker";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const AddCoverImagesScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "Cover">,
) => {
	const { navigation } = props;

	const insets = useSafeAreaInsets();
	const { state, dispatch } = useAppContext();
	const { id, cover } = state.profile;

	const { useImagePicker } = useDocumentPicker();
	const { uploadFiles } = useUploadFiles();

	const [images, setImages] = useState<IPickerMedia[]>([]);
	const [inProgress, setInProgress] = useState(false);

	const onPickDocument = async () => {
		const result = await useImagePicker(true);
		if (result?.ok) {
			setImages([...images, ...(result.data ?? [])]);
		}
	};

	const handleSave = async () => {
		setInProgress(true);
		let newImgUrls: string[] = [];
		const newImages = images
			.filter((img) => img.isPicker)
			.map((el) => el.uri);

		if (newImages.length > 0) {
			const uploadingResp = await uploadFiles(
				newImages.map((el) => ({ uri: el, type: MediaType.Image })),
			);
			if (uploadingResp?.ok) {
				newImgUrls = uploadingResp.data.map((d) => d.url);
			}
		}
		const coverImages = [
			...images.filter((el) => !el.isPicker).map((el) => el.uri),
			...newImgUrls,
		];
		const resp = await updateMyProfile({ cover: coverImages }, { id: id });
		setInProgress(false);
		if (resp.ok) {
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					cover: coverImages,
				},
			});
			navigation.goBack();
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
		}
	};

	const handleDelete = (img: IPickerMedia) => {
		setImages(images.filter((el) => el.uri !== img.uri));
	};

	useEffect(() => {
		setImages(cover.map((el) => ({ uri: el, isPicker: false })));
	}, [cover]);

	return (
		<AppLayout
			title="Edit Profile | FYP.Fans"
			description="FYP.Fans allows creators to make an income doing what they love!"
		>
			<View style={tw.style("flex-1")}>
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer>
						<CustomTopNavBar
							title="Add cover images"
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
								tw.style("pt-6 px-[18px]"),
							]}
						>
							<FansText
								fontSize={17}
								lineHeight={22}
								style={tw.style(
									"font-semibold mb-5",
									images.length === 0 && "hidden",
								)}
							>
								Main photo
							</FansText>

							<View style={tw.style("gap-y-3 mb-3")}>
								{images.map((img) => (
									<CoverImage
										key={img.uri}
										uri={img.uri}
										onClickResize={() => {}}
										onClickTrash={() => handleDelete(img)}
									/>
								))}
							</View>

							<FileDropzone
								onPress={onPickDocument}
								fileCounts={images.length}
							/>
						</View>
					</LayoutContentsContainer>
				</ScrollView>
			</View>
		</AppLayout>
	);
};

export default AddCoverImagesScreen;
