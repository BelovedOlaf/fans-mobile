import { PlusSvg } from "@assets/svgs/common";
import FormControl from "@components/common/FormControl";
import CustomText from "@components/common/customText";
import CustomTopNavBar from "@components/common/customTopNavBar";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import { ImagePostChip } from "@components/posts/common";
import {
	PostsActionType,
	ProfileActionType,
	useAppContext,
} from "@context/useAppContext";
import { getCategory, updateCategory } from "@helper/endpoints/categories/apis";
import { getPostFeedForProfile } from "@helper/endpoints/post/apis";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PostType } from "@usertypes/commonEnums";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import { IPost } from "@usertypes/types";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const EditCategoryScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "EditCategory">,
) => {
	const { navigation, route } = props;
	const { id } = route.params;
	const insets = useSafeAreaInsets();

	const { state, dispatch } = useAppContext();
	const { categories } = state.profile;

	const [name, setName] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [selectedPostIds, setSelectedPostIds] = useState<string[]>([]);
	const [posts, setPosts] = useState<IPost[]>([]);
	const [inProgress, setInProgress] = useState(false);

	const handleSave = async () => {
		setIsSubmitted(true);
		if (name === "") {
			return;
		}

		setInProgress(true);
		const postBody = {
			name: name,
			postIds: selectedPostIds,
		};
		const resp = await updateCategory(postBody, { id: id as string });
		if (resp.ok) {
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					categories: categories.map((el) =>
						el.id === id
							? {
									...el,
									name: name,
									posts: posts.filter((post) =>
										selectedPostIds.includes(post.id),
									),
							  }
							: el,
					),
				},
			});
			navigation.goBack();
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
		}

		setInProgress(false);
	};

	const fetchCategory = async () => {
		setInProgress(true);
		const resp = await getCategory({ id: id as string });
		if (resp.ok) {
			setName(resp.data.name);
			setSelectedPostIds(resp.data.posts.map((post) => post.id));
		}
		setInProgress(false);
	};

	const onTogglePhoto = (photoId: string) => {
		setSelectedPostIds(
			selectedPostIds.includes(photoId)
				? selectedPostIds.filter((el) => el !== photoId)
				: [...selectedPostIds, photoId],
		);
	};

	const fetchPosts = async () => {
		const resp = await getPostFeedForProfile({
			userId: state.profile.userId,
		});
		if (resp.ok) {
			setPosts(resp.data.posts);
		}
	};

	const onClickAddMore = () => {
		navigation.navigate("AddPostsCategory");
	};

	useEffect(() => {
		fetchPosts();
		if (id) {
			fetchCategory();
		}
	}, [id]);

	return (
		<AppLayout
			title="Edit Profile | FYP.Fans"
			description="FYP.Fans allows creators to make an income doing what they love!"
		>
			<View style={tw.style("flex-1")}>
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer>
						<CustomTopNavBar
							title="Edit category"
							onClickLeft={() => navigation.goBack()}
							onClickRight={handleSave}
							rightLabel="Done"
							loading={inProgress}
						/>
						<View
							style={[
								tw.style("pt-6"),
								{
									paddingBottom: insets.bottom + 35,
								},
							]}
						>
							<View style={tw.style("px-[18px]")}>
								<FormControl
									label="Category name"
									value={name}
									onChangeText={(val: string) => setName(val)}
									placeholder="e.g. Fan favorites"
									hasError={isSubmitted && name === ""}
									validateString="Name must be mandatory"
									maxLength={50}
								/>
							</View>

							<View
								style={tw.style(
									"flex-row items-center justify-between mt-8 mb-[18px] px-[18px]",
								)}
							>
								<CustomText size="lg">Posts</CustomText>
								<Pressable
									style={tw.style("flex-row items-center")}
									onPress={onClickAddMore}
								>
									<PlusSvg
										width={12}
										height={12}
										color="#a854f5"
									/>
									<CustomText
										size="lg"
										style="ml-2 text-fans-purple"
									>
										Add more
									</CustomText>
								</Pressable>
							</View>

							<View style={tw.style("flex-row flex-wrap")}>
								{posts.map((post) => (
									<ImagePostChip
										colSpan={3}
										key={post.id}
										uri={post.thumb?.url ?? ""}
										onPress={() => onTogglePhoto(post.id)}
										orderNumber={
											selectedPostIds.findIndex(
												(id) => id === post.id,
											) + 1
										}
										orderAble={true}
										isVideo={post.type === PostType.Video}
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

export default EditCategoryScreen;
