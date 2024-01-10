import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useLocalSearchParams } from "expo-router";

import { ProfileNavigationStacks } from "@usertypes/navigations";
import AddCardScreen from "./addCardScreen";
import {
	AddCategoryScreen,
	CategoryAddPostsScreen,
	EditCategoryScreen,
} from "./categories";
import {
	CreateNameScreen,
	CreatePageStyleScreen,
	ReferralProgramScreen,
	AgeVerificationFormScreen,
	AgeVerificationErrorScreen,
	AgeVerificationPendingScreen,
} from "./create";
import CreatorProfileScreen from "./creatorProfileScreen";
import {
	AddCoverImagesScreen,
	ArchivedPostsScreen,
	BundleScreen,
	CategoriesScreen,
	EditProfileScreen,
	FansLevelsScreen,
	GetPaidScreen,
	PayoutSetupScreen,
	PlaylistScreen,
	PreviewScreen,
	ProfileAddPostsScreen,
	PromotionCampaignScreen,
	RoleScreen,
	SocialMediaLinkInput,
	SubscriptionScreen,
	TierScreen,
	BadgeSystemScreen,
	TrackingLinksScreen,
} from "./edit";
import {
	HighlightCoverScreen,
	HighlightSelectImagesScreen,
	HighlightsScreen,
} from "./highlights";
import { useAppContext } from "@context/useAppContext";
import { UserRoleTypes } from "@usertypes/commonEnums";
import ReferCreatorsEarnScreen from "@screens/settings/referCreators/ReferAndEarn";

const Stack = createNativeStackNavigator<ProfileNavigationStacks>();

const ProfileLayout = () => {
	const { playlistId, returnPopup, subscriptionId } = useLocalSearchParams();

	return (
		<Stack.Navigator initialRouteName="Profile">
			<Stack.Screen
				name="Profile"
				component={CreatorProfileScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="ProfileName"
				component={CreateNameScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="ReferralProgram"
				component={ReferralProgramScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="ReferCreators"
				component={ReferCreatorsEarnScreen}
				options={{
					title: "Refer and earn",
				}}
			/>

			<Stack.Screen
				name="ProfileStyle"
				component={CreatePageStyleScreen}
				options={{
					headerShown: false,
				}}
			/>

			<Stack.Screen
				name="Edit"
				component={EditProfileScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Cover"
				component={AddCoverImagesScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="SocialLinks"
				component={SocialMediaLinkInput}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Levels"
				component={FansLevelsScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="GetPaid"
				component={GetPaidScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="PayoutSetup"
				component={PayoutSetupScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Preview"
				component={PreviewScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Subscription"
				component={SubscriptionScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Bundle"
				component={BundleScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="PromotionCampaign"
				component={PromotionCampaignScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Tier"
				component={TierScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Playlist"
				component={PlaylistScreen}
				options={{
					headerShown: false,
				}}
				initialParams={{ id: playlistId as string }}
			/>
			<Stack.Screen
				name="AddPosts"
				component={ProfileAddPostsScreen}
				options={{
					headerShown: false,
				}}
			/>

			<Stack.Screen
				name="Highlights"
				component={HighlightsScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="HighlightStories"
				component={HighlightSelectImagesScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="HighlightCover"
				component={HighlightCoverScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Categories"
				component={CategoriesScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="NewCategory"
				component={AddCategoryScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="EditCategory"
				component={EditCategoryScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="AddPostsCategory"
				component={CategoryAddPostsScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="ArchivedPosts"
				component={ArchivedPostsScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="AddCard"
				component={AddCardScreen}
				options={{
					headerShown: false,
				}}
				initialParams={{ returnPopup, subscriptionId }}
			/>
			<Stack.Screen
				name="Role"
				component={RoleScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Badge"
				component={BadgeSystemScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="TrackingLinks"
				component={TrackingLinksScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="AgeVerifyForm"
				component={AgeVerificationFormScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="AgeVerifyFailed"
				component={AgeVerificationErrorScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="AgeVerifyPending"
				component={AgeVerificationPendingScreen}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
};

export default ProfileLayout;
