import { View } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CustomTopNavBar from "@components/common/customTopNavBar";
import { InviteNewUserForm } from "@components/posts/share";
import { PostsNavigationStacks } from "@usertypes/navigations";

const InviteNewUserScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "Invite">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();

	const [inProgress, setInProgress] = useState(false);

	return (
		<View
			style={{
				paddingTop: insets.top,
				flex: 1,
				backgroundColor: "#fff",
				position: "relative",
			}}
		>
			<CustomTopNavBar
				title="Invite new user"
				onClickLeft={() => navigation.goBack()}
			/>
			<View style={tw.style("pt-6 px-[18px]")}>
				<InviteNewUserForm
					inProgress={inProgress}
					handleToggleLoading={setInProgress}
				/>
			</View>
		</View>
	);
};

export default InviteNewUserScreen;
