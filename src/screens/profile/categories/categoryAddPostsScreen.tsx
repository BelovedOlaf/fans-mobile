import FormControl from "@components/common/FormControl";
import CustomTopNavBar from "@components/common/customTopNavBar";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import { ImagePostChip } from "@components/posts/common";
import { useAppContext } from "@context/useAppContext";
import { getPostFeedForProfile } from "@helper/endpoints/post/apis";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import { IPost } from "@usertypes/types";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CategoryAddPostsScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "AddPostsCategory">,
) => {
	const { navigation } = props;

	const insets = useSafeAreaInsets();

	const { state } = useAppContext();

	const [searchKey, setSearchKey] = useState("");
	const [selectedPostIds, setSelectedPostIds] = useState<string[]>([]);
	const [posts, setPosts] = useState<IPost[]>([]);

	const fetchPosts = async () => {
		const resp = await getPostFeedForProfile({
			userId: state.profile.userId,
		});
		if (resp.ok) {
			setPosts(resp.data.posts);
		}
	};

	const onClickNext = () => {};

	const onTogglePost = (photoId: string) => {
		setSelectedPostIds(
			selectedPostIds.includes(photoId)
				? selectedPostIds.filter((el) => el !== photoId)
				: [...selectedPostIds, photoId],
		);
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
							title="Add posts"
							onClickLeft={() => navigation.goBack()}
							onClickRight={onClickNext}
							rightLabel="Next"
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
									label="Select posts"
									value={searchKey}
									onChangeText={(val: string) =>
										setSearchKey(val)
									}
									placeholder="Search post"
								/>
							</View>

							<View style={tw.style("flex-row flex-wrap mt-4")}>
								{posts.map((post) => (
									<ImagePostChip
										colSpan={3}
										key={post.id}
										uri={post.thumb?.url ?? ""}
										onPress={() => onTogglePost(post.id)}
										orderNumber={
											selectedPostIds.findIndex(
												(id) => id === post.id,
											) + 1
										}
										selectAble={true}
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

export default CategoryAddPostsScreen;
