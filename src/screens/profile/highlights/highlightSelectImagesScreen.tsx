import CustomText from "@components/common/customText";
import CustomTopNavBar from "@components/common/customTopNavBar";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import { ImagePostChip } from "@components/posts/common";
import { ProfileActionType, useAppContext } from "@context/useAppContext";
import * as apis from "@helper/endpoints";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import { IStory } from "@usertypes/types";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native-paper";

const HighlightSelectImagesScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "HighlightStories">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();

	const { state, dispatch } = useAppContext();
	const { highlightForm } = state.profile;

	const [stories, setStories] = useState<IStory[]>([]);
	const [selectedStories, setSelectedStories] = useState<IStory[]>([]);
	const [loading, setLoading] = useState(false);

	const onToggleStory = (story: IStory) => {
		if (selectedStories.find((el) => el.id === story.id)) {
			setSelectedStories(
				selectedStories.filter((cell) => cell.id !== story.id),
			);
		} else {
			if (selectedStories.length < 10) {
				setSelectedStories([...selectedStories, story]);
			}
		}
	};

	const handleNext = () => {
		if (selectedStories.length > 1) {
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					highlightForm: {
						...highlightForm,
						stories: selectedStories,
					},
				},
			});
			navigation.navigate("HighlightCover");
		} else {
			Toast.show({
				type: "error",
				text1: "please select at least 2 images",
			});
		}
	};

	const getStories = async () => {
		setLoading(true);
		const resp = await apis.post.getStories();
		setLoading(false);
		if (resp.ok) {
			setStories(resp.data.stories);
			const defaultSelectedStories = resp.data.stories.filter(
				(story: IStory) =>
					highlightForm.stories.map((el) => el.id).includes(story.id),
			);
			setSelectedStories(defaultSelectedStories);
			if (resp.data.stories.length === 0) {
				Toast.show({
					type: "error",
					text1: "Must add stories to create highlights.",
				});
			}
		}
	};

	useEffect(() => {
		getStories();
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
							title="Add highlight"
							onClickLeft={() => navigation.goBack()}
							onClickRight={handleNext}
							rightLabel={
								selectedStories.length > 0 ? "Next" : ""
							}
						/>
						<View
							style={[
								{
									paddingBottom: insets.bottom + 35,
								},
								tw.style("pt-6"),
							]}
						>
							<CustomText size="base" style="text-center mb-7">
								Select at least 2 stories{"\n"}to create a
								highlight
							</CustomText>

							<View style={tw.style("flex-row flex-wrap")}>
								{stories.map((story) => (
									<ImagePostChip
										colSpan={3}
										key={story.id}
										uri={story.medias[0]}
										onPress={() => onToggleStory(story)}
										orderNumber={
											selectedStories.findIndex(
												(cell) => cell.id === story.id,
											) + 1
										}
										orderAble={true}
										sizeRate={1.7}
									/>
								))}
							</View>
							<View
								style={tw.style("my-10", !loading && "hidden")}
							>
								<ActivityIndicator
									animating={true}
									color="#a854f5"
								/>
							</View>
						</View>
					</LayoutContentsContainer>
				</ScrollView>
			</View>
		</AppLayout>
	);
};

export default HighlightSelectImagesScreen;
