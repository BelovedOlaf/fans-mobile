import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PostDesignScreen from "./PostDesignScreen";
import * as CreatePostScreens from "./create";

import { PostsNavigationStacks } from "@usertypes/navigations";

const Stack = createNativeStackNavigator<PostsNavigationStacks>();

const Layout = () => {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen
				name="Home"
				component={PostDesignScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Fundraiser"
				component={CreatePostScreens.NewFundraiserPostScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Poll"
				component={CreatePostScreens.NewPollPostScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Text"
				component={CreatePostScreens.NewTextPostScreen}
				options={{
					headerShown: false,
				}}
			/>

			<Stack.Screen
				name="Thumbnail"
				component={CreatePostScreens.ThumbnailScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Caption"
				component={CreatePostScreens.CaptionScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="AudioDetail"
				component={CreatePostScreens.AudioDetailScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="ViewSetting"
				component={CreatePostScreens.ViewSettingScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Role"
				component={CreatePostScreens.RoleScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="FansLevels"
				component={CreatePostScreens.AnalyzeFansLevelsScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Categories"
				component={CreatePostScreens.CategoriesScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="NewCategory"
				component={CreatePostScreens.NewCategoryScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="PaidPost"
				component={CreatePostScreens.PaidPostScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="PollProperty"
				component={CreatePostScreens.AddPollScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="TagPeople"
				component={CreatePostScreens.TagPeopleScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="TagPeopleSearch"
				component={CreatePostScreens.TagPeopleSearchScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Invite"
				component={CreatePostScreens.InviteNewUserScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Giveaway"
				component={CreatePostScreens.AddGiveAwayScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Location"
				component={CreatePostScreens.LocationScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Schedule"
				component={CreatePostScreens.SchedulePostScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="FundraiserProperty"
				component={CreatePostScreens.AddFundraiserScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="AdvancedSettings"
				component={CreatePostScreens.AdvancedSettingsScreen}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
};

export default Layout;
