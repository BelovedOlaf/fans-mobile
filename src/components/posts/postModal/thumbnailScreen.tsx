import RoundButton from "@components/common/RoundButton";
import { FypNullableView, FypVideo } from "@components/common/base";
import { AudioItem } from "@components/posts/common";
import { IAppDispatch } from "@context/appContext";
import { PostsActionType } from "@context/reducer/postsReducer";
import { cdnURL } from "@helper/Utils";
import tw from "@lib/tailwind";
import {
	IconTypes,
	PostStepTypes,
	PostType,
	ResizeMode,
} from "@usertypes/commonEnums";
import { IPickerMedia, IPostForm } from "@usertypes/types";
import useDocumentPicker from "@utils/useDocumentPicker";
import React, { FC, useEffect, useState } from "react";
import { Image, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import Toast from "react-native-toast-message";
import UploadProgress from "../common/uploadProgress";
import AddResourceBar from "./addResourceBar";
import ModalHeader from "./modalHeader";

interface Props {
	data: IPostForm;
	inProgress: boolean;
	progress: number;
	step: PostStepTypes;
	handlePrev: () => void;
	titleIcon: IconTypes;
	handleCreateStory: (medias: IPickerMedia[]) => void;
	handleChangeTab: (tab: PostStepTypes) => void;
	handleCancelUpload: () => void;
	dispatch: IAppDispatch;
}

const ThumbnailScreen: FC<Props> = (props) => {
	const {
		data,
		inProgress,
		progress,
		step,
		handlePrev,
		titleIcon,
		handleCreateStory,
		handleChangeTab,
		handleCancelUpload,
		dispatch,
	} = props;

	const { medias, type, carouselIndex } = data;
	const [pickerMedias, setPickerMedias] = useState<IPickerMedia[]>([]);

	const carouselSize = tw.prefixMatch("xl") ? 670 : 600;
	const offset = useSharedValue(carouselIndex);

	const { useVideoPicker, useAudioPicker, useImagePicker } =
		useDocumentPicker();

	const carouselStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withSpring(offset.value * carouselSize * -1, {
						damping: 100,
						stiffness: 200,
					}),
				},
			],
		};
	}, [offset.value]);

	const handleImageOpenPicker = async () => {
		const result = await useImagePicker(type === PostType.Photo);
		if (result?.ok) {
			setPickerMedias(result.data ?? []);
		} else {
			Toast.show({
				type: "error",
				text1: result?.message ?? "",
			});
		}
	};

	const handleOpenVideoPicker = async () => {
		const result = await useVideoPicker();
		if (result?.ok) {
			setPickerMedias(result.data ?? []);
		} else {
			Toast.show({
				type: "error",
				text1: result?.message ?? "",
			});
		}
	};

	const handleOpenAudioPicker = async () => {
		const result = await useAudioPicker();
		if (result?.ok) {
			setPickerMedias(result.data ?? []);
		} else {
			Toast.show({
				type: "error",
				text1: result?.message ?? "",
			});
		}
	};

	const handleClickPicker = () => {
		if (type === PostType.Audio) {
			handleOpenAudioPicker();
		} else if (type === PostType.Video) {
			handleOpenVideoPicker();
		} else {
			handleImageOpenPicker();
		}
	};

	const handleSubmit = () => {
		if (pickerMedias.length === 0) {
			return;
		}
		if (type === PostType.Audio) {
			dispatch.setPosts({
				type: PostsActionType.updatePostForm,
				data: {
					medias: pickerMedias,
				},
			});
			handleChangeTab(PostStepTypes.AudioDetail);
		} else if (type === PostType.Story) {
			handleCreateStory(pickerMedias);
		} else {
			if (type === PostType.Video) {
				dispatch.setPosts({
					type: PostsActionType.updatePostForm,
					data: {
						medias: pickerMedias,
					},
				});
			} else {
				dispatch.setPosts({
					type: PostsActionType.updatePostForm,
					data: {
						thumb: pickerMedias[0],
						medias: pickerMedias,
					},
				});
			}
			handleChangeTab(PostStepTypes.Caption);
		}
	};

	useEffect(() => {
		if (medias) {
			setPickerMedias(medias);
		}
	}, [medias]);

	useEffect(() => {
		offset.value = carouselIndex;
	}, [carouselIndex]);

	return (
		<View
			style={tw.style(
				step === PostStepTypes.Thumbnail
					? "relative"
					: "absolute bottom-0 z-10",
			)}
		>
			<FypNullableView visible={step === PostStepTypes.Thumbnail}>
				<ModalHeader
					title={
						data.type === PostType.Story ? "New Story" : "New post"
					}
					rightLabel={type === PostType.Story ? "Publish" : "Next"}
					onClickRight={handleSubmit}
					onClickLeft={handlePrev}
					titleIcon={titleIcon}
					loading={inProgress}
				/>
			</FypNullableView>

			<View style={tw.style(step === PostStepTypes.Thumbnail && "py-5")}>
				<View
					style={tw.style(
						"w-150 xl:w-[670px] h-150 xl:h-[670px] mx-auto",
					)}
				>
					<FypNullableView visible={inProgress}>
						<UploadProgress
							onCancel={handleCancelUpload}
							progress={progress}
						/>
					</FypNullableView>

					<FypNullableView
						visible={
							step === PostStepTypes.Thumbnail && !inProgress
						}
					>
						<FypNullableView visible={pickerMedias.length === 0}>
							<View
								style={tw.style(
									"h-full items-center justify-center",
								)}
							>
								<Image
									source={require("@assets/images/common/photos.png")}
									style={{
										width: 92,
										height: 84.33,
									}}
								/>
								<View style={tw.style("w-70 mt-5")}>
									<RoundButton onPress={handleClickPicker}>
										Pick from computer
									</RoundButton>
								</View>
							</View>
						</FypNullableView>

						<FypNullableView visible={pickerMedias.length > 0}>
							<View style={[tw.style("w-full h-full")]}>
								<FypNullableView
									visible={
										type === PostType.Photo ||
										type === PostType.Story
									}
								>
									<Image
										source={{
											uri: cdnURL(pickerMedias[0]?.uri),
										}}
										style={[tw.style("w-full h-full")]}
										resizeMode="cover"
									/>
								</FypNullableView>

								<FypNullableView
									visible={type === PostType.Video}
								>
									<FypVideo
										source={{
											uri:
												cdnURL(pickerMedias[0]?.uri) ??
												"",
										}}
										resizeMode={ResizeMode.CONTAIN}
										style={[tw.style("w-full h-full")]}
									/>
								</FypNullableView>
								<FypNullableView
									visible={type === PostType.Audio}
								>
									<AudioItem
										data={pickerMedias[0]}
										onDelete={() => setPickerMedias([])}
									/>
								</FypNullableView>
							</View>
						</FypNullableView>
					</FypNullableView>

					<FypNullableView
						visible={
							step !== PostStepTypes.Thumbnail && !inProgress
						}
					>
						<View
							style={[
								tw.style("w-full h-full mx-auto relative"),
								{ overflow: "hidden" },
								{
									borderBottomLeftRadius: 15,
								},
							]}
						>
							<Animated.View
								style={[
									tw.style("absolute flex-row top-0 left-0"),
									carouselStyles,
								]}
							>
								{medias.map((el, index) => (
									<View
										key={index}
										style={{
											width: carouselSize,
											height: carouselSize,
										}}
									>
										<FypNullableView
											visible={type === PostType.Photo}
										>
											<Image
												source={{
													uri: cdnURL(el.uri),
												}}
												style={[
													tw.style("w-full h-full"),
													{
														borderBottomLeftRadius: 15,
													},
												]}
												resizeMode="cover"
											/>
										</FypNullableView>

										<FypNullableView
											visible={type === PostType.Video}
										>
											<FypVideo
												source={{
													uri: cdnURL(el.uri),
												}}
												style={[
													tw.style("w-full h-full"),
													{
														borderBottomLeftRadius: 15,
													},
												]}
												resizeMode={ResizeMode.CONTAIN}
											/>
										</FypNullableView>
									</View>
								))}
							</Animated.View>
							<FypNullableView visible={type === PostType.Audio}>
								<View style={tw.style("px-8 pt-5")}>
									<AudioItem data={medias[0]} />
								</View>
							</FypNullableView>
							<AddResourceBar data={data} dispatch={dispatch} />
						</View>
					</FypNullableView>
				</View>
			</View>
		</View>
	);
};

export default ThumbnailScreen;
