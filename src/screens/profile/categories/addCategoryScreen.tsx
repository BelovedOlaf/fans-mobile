import FormControl from "@components/common/FormControl";
import CustomText from "@components/common/customText";
import CustomTopNavBar from "@components/common/customTopNavBar";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import SearchTextInput from "@components/common/searchTextInput";
import { ImagePostChip } from "@components/posts/common";
import {
	PostsActionType,
	ProfileActionType,
	useAppContext,
} from "@context/useAppContext";
import { createCategory } from "@helper/endpoints/categories/apis";
import { getPostFeedForProfile } from "@helper/endpoints/post/apis";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PostType } from "@usertypes/commonEnums";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import { IPost } from "@usertypes/types";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const AddCategoryScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "NewCategory">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();

	const { state, dispatch } = useAppContext();

	const { categories } = state.profile;

	const [name, setName] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [searchKey, setSearchKey] = useState("");
	const [selectedPostIds, setSelectedPostIds] = useState<string[]>([]);
	const [posts, setPosts] = useState<IPost[]>([]);
	const [inProgress, setInProgress] = useState(false);

	const onChangeSearch = (val: string) => {
		setSearchKey(val);
	};

	const handleSave = async () => {
		setIsSubmitted(true);
		if (name === "") {
			return;
		}
		const postbody = {
			name: name,
			isActive: true,
			roleIds: [],
			postIds: selectedPostIds,
		};
		setInProgress(true);

		const resp = await createCategory(postbody);
		if (resp.ok) {
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					categories: [...categories, resp.data],
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

	const onTogglePhoto = (postId: string) => {
		setSelectedPostIds(
			selectedPostIds.includes(postId)
				? selectedPostIds.filter((el) => el !== postId)
				: [...selectedPostIds, postId],
		);
	};

	const fetchPosts = async () => {
		const resp = await getPostFeedForProfile({
			userId: state.profile.userId,
		});
		if (resp.ok) {
			setPosts(resp.data.posts);
			setSelectedPostIds([]);
		}
	};

	useEffect(() => {
		fetchPosts();
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
							title="Add category"
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
							<View style={tw.style("px-[18px] mb-[18px]")}>
								<FormControl
									label="Category name"
									value={name}
									onChangeText={(val: string) => setName(val)}
									placeholder="e.g. Fan favorites"
									styles="mb-8"
									hasError={isSubmitted && name === ""}
									validateString="Category name is mandatory!"
									maxLength={10}
								/>

								<View>
									<CustomText size="lg" style="mb-3">
										Select posts
									</CustomText>
									<SearchTextInput
										placeholder="Search post"
										value={searchKey}
										onChangeText={onChangeSearch}
									/>
								</View>
							</View>

							<View style={tw.style("flex-row flex-wrap")}>
								{posts.map((post) => (
									<ImagePostChip
										colSpan={3}
										uri={post.thumb?.url ?? ""}
										key={post.id}
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

export default AddCategoryScreen;
