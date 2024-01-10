import { EditSvg, PhotoCameraSvg } from "@assets/svgs/common";
import RoundTextInput from "@components/common/RoundTextInput";
import { FypText } from "@components/common/base";
import { FansView } from "@components/controls";
import CustomTopNavBar from "@components/common/customTopNavBar";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import { ProfileActionType, useAppContext } from "@context/useAppContext";
import * as apis from "@helper/endpoints";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MediaType } from "@usertypes/commonEnums";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import { IPickerMedia } from "@usertypes/types";
import { cdnURL } from "@helper/Utils";
import useUploadFiles from "@utils/useUploadFile";
import useDocumentPicker from "@utils/useDocumentPicker";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView } from "react-native";
import { IconButton } from "react-native-paper";
import Toast from "react-native-toast-message";

const HighlightCoverScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "HighlightCover">,
) => {
	const { navigation } = props;
	const { state, dispatch } = useAppContext();
	const { highlightForm, highlights } = state.profile;

	const { uploadFiles } = useUploadFiles();
	const { useImagePicker } = useDocumentPicker();

	const [name, setName] = useState("");
	const [cover, setCover] = useState<IPickerMedia>();
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [inProgress, setInProgress] = useState(false);

	const onChangeCover = async () => {
		const result = await useImagePicker();
		if (result?.ok) {
			const medias = result.data ?? [];
			if (medias.length > 0) {
				setCover(medias[0]);
			}
		} else {
			Toast.show({
				type: "error",
				text1: result?.message ?? "",
			});
		}
	};

	const handleEdit = async (coverVal: string) => {
		const postbody = {
			title: name,
			cover: coverVal,
			stories: highlightForm.stories.map((story) => story.id),
		};
		const resp = await apis.profile.updateHighlight(postbody, {
			id: highlightForm.id,
		});
		setInProgress(false);
		if (resp.ok) {
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					highlights: highlights.map((el) =>
						el.id === highlightForm.id
							? {
									...el,
									stories: highlightForm.stories,
									cover: coverVal,
									title: name,
							  }
							: el,
					),
				},
			});
			navigation.navigate("Highlights");
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
		}
	};

	const handleCreate = async (coverVal: string) => {
		const postbody = {
			title: name,
			cover: coverVal,
			stories: highlightForm.stories.map((story) => story.id),
		};
		const resp = await apis.profile.createHighlight(postbody);
		setInProgress(false);
		if (resp.ok) {
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					highlights: [...state.profile.highlights, resp.data],
				},
			});
			navigation.navigate("Highlights");
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
		}
	};

	const handleSubmit = async () => {
		setIsSubmitted(true);
		if (name === "") {
			return;
		}
		setInProgress(true);
		let newCoverUrl = cover?.uri ?? "";
		if (cover && cover.isPicker) {
			const resp = await uploadFiles([
				{ uri: cover.uri, type: MediaType.Image },
			]);
			if (resp?.ok) {
				newCoverUrl = resp.data[0].url;
			}
		}
		if (highlightForm.id) {
			handleEdit(newCoverUrl);
		} else {
			handleCreate(newCoverUrl);
		}
	};

	useEffect(() => {
		if (highlightForm.id) {
			setCover({
				uri: highlightForm.cover,
				isPicker: false,
			});
			setName(highlightForm.title);
		}
	}, [highlightForm]);

	return (
		<AppLayout
			title="Edit Profile | FYP.Fans"
			description="FYP.Fans allows creators to make an income doing what they love!"
		>
			<FansView flex="1">
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer>
						<CustomTopNavBar
							title="Add highlight"
							onClickLeft={() => navigation.goBack()}
							onClickRight={handleSubmit}
							rightLabel="Done"
							loading={inProgress}
						/>
						<FansView padding={{ t: 28 }}>
							<FansView
								width={103}
								height={103}
								borderRadius={103}
								borderColor="grey"
								border={1}
								position="relative"
								margin={{ b: 8 }}
								style={tw.style("mx-auto")}
							>
								{cover ? (
									<Image
										source={{
											uri: cover.isPicker
												? cover.uri
												: cdnURL(cover.uri),
										}}
										style={tw.style(
											"w-full h-full rounded-full",
										)}
									/>
								) : (
									<FansView
										style={tw.style(
											"w-full h-full border border-fans-grey rounded-full",
										)}
									></FansView>
								)}

								<IconButton
									icon={() => (
										<PhotoCameraSvg
											width={18.81}
											height={17}
											color="#000"
										/>
									)}
									style={[
										tw.style(
											"m-0 w-[34px] h-[34px] absolute top-1/2 left-1/2",
										),
										{
											transform: [
												{ translateX: -17 },
												{ translateY: -17 },
											],
										},
									]}
									containerColor="rgba(255,255,255,0.75)"
									onPress={onChangeCover}
								/>
							</FansView>

							<FansView
								flexDirection="row"
								justifyContent="center"
								margin={{ b: 20 }}
							>
								<Pressable
									style={tw.style("flex-row items-center")}
									onPress={onChangeCover}
								>
									<EditSvg
										width={16}
										height={17.3}
										color="#a854f5"
									/>
									<FypText
										fontSize={17}
										lineHeight={22}
										fontWeight={600}
										color="purple"
										style={tw.style("ml-2")}
									>
										Edit cover
									</FypText>
								</Pressable>
							</FansView>

							<FansView padding={{ x: 18 }}>
								<RoundTextInput
									placeholder="Highlight name"
									value={name}
									onChangeText={(val) => setName(val)}
									hasError={isSubmitted && name === ""}
									helperText="Please enter highlight name"
									maxLength={50}
								/>
							</FansView>
						</FansView>
					</LayoutContentsContainer>
				</ScrollView>
			</FansView>
		</AppLayout>
	);
};

export default HighlightCoverScreen;
