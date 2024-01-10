import { IAppDispatch } from "@context/appContext";
import { PostsActionType } from "@context/reducer/postsReducer";
import tw from "@lib/tailwind";
import { MediaType, PostType } from "@usertypes/commonEnums";
import { IPostForm } from "@usertypes/types";
import useDocumentPicker from "@utils/useDocumentPicker";
import React, { FC, useCallback, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import AddResource from "./addResource";
import ResourceItem from "./resourceItem";

interface Props {
	data: IPostForm;
	dispatch: IAppDispatch;
}

const AddResourceBar: FC<Props> = (props) => {
	const { data, dispatch } = props;
	const { type, medias, carouselIndex } = data;
	const { useVideoPicker, useImagePicker } = useDocumentPicker();
	const [resourceWidth, setResourceWidth] = useState(100);

	const onClickAdd = async () => {
		if (type === PostType.Video) {
			const vResult = await useVideoPicker(true);
			if (vResult?.ok) {
				const addedResources = [...medias, ...(vResult.data ?? [])];
				dispatch.setPosts({
					type: PostsActionType.updatePostForm,
					data: {
						medias: addedResources,
					},
				});
			} else {
				Toast.show({
					type: "error",
					text1: vResult?.message ?? "",
				});
			}
		} else {
			const iResult = await useImagePicker(true);
			if (iResult?.ok) {
				const addedResources = [...medias, ...(iResult.data ?? [])];
				dispatch.setPosts({
					type: PostsActionType.updatePostForm,
					data: {
						medias: addedResources,
					},
				});
			} else {
				Toast.show({
					type: "error",
					text1: iResult?.message ?? "",
				});
			}
		}
	};

	const onRemove = (mediaId: string) => {
		const mediaIndex = medias.findIndex((media) => media.id === mediaId);
		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				medias: medias.filter((media, _index) => media.id !== mediaId),
				carouselIndex:
					mediaIndex === medias.length - 1 &&
					carouselIndex === mediaIndex
						? mediaIndex - 1
						: carouselIndex,
			},
		});
	};

	const onSelectMedia = useCallback(
		(index: number) => {
			dispatch.setPosts({
				type: PostsActionType.updatePostForm,
				data: {
					carouselIndex: index,
				},
			});
		},
		[carouselIndex],
	);

	return (
		<View
			style={[
				tw.style(
					"absolute rounded-[15px] bg-[rgba(0,0,0,0.5)] p-2.5 bottom-9 flex-row gap-2 left-1/2",
					type === PostType.Video || type === PostType.Photo
						? "flex"
						: "hidden",
				),
				{
					transform: [{ translateX: resourceWidth / -2 }],
				},
			]}
			onLayout={(e) => setResourceWidth(e.nativeEvent.layout.width)}
		>
			{medias.map((media, index) => (
				<ResourceItem
					key={`${media.id}`}
					data={media}
					mediaType={
						type === PostType.Video
							? MediaType.Video
							: MediaType.Image
					}
					onClose={() => onRemove(media.id ?? "")}
					onSelect={() => onSelectMedia(index)}
				/>
			))}
			{medias.length < 5 ? <AddResource onClick={onClickAdd} /> : null}
		</View>
	);
};

export default AddResourceBar;
