import {
	ChatSvg,
	Diamond1Png,
	HomeSvg,
	NotificationSvg,
	OutlinedPlusSvg,
	ThreeDotsSvg,
} from "@assets/svgs/common";
import UserAvatar from "@components/avatar/UserAvatar";
import { FansGap, FansSvg, FansView } from "@components/controls";
import { PostTypesDialog } from "@components/posts/dialogs";
import { CommonActionType, useAppContext } from "@context/useAppContext";
import { useFeatureGates } from "@state/featureGates";
import { UserRoleTypes } from "@usertypes/commonEnums";
import { FansViewProps } from "@usertypes/components";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

interface Props {
	viewStyle?: Pick<FansViewProps, "display">;
}

const Sidebar = (props: Props) => {
	const { viewStyle } = props;

	const { dispatch, state } = useAppContext();
	const { userInfo } = state.user;
	const { avatar, type } = userInfo;

	const featureGates = useFeatureGates();
	const chatEnabled = featureGates.has("2023_10-chat");

	const isCreator = type === UserRoleTypes.Creator;

	const router = useRouter();

	const handlePressHome = () => router.push("/posts");

	const handlePressNotifications = () => router.push("/notifications");

	const handlePressCreate = () => {
		if (isCreator) {
			dispatch.setCommon({
				type: CommonActionType.toggleNewPostTypesModal,
				data: true,
			});
		} else {
			router.push({
				pathname: "profile",
				params: { screen: "ProfileName" },
			});
		}
	};

	const handlePressChat = () => router.push("/chat");

	const handlePressProfile = () => router.push("/profile");

	const items = [
		{
			icon: <FansSvg width={26.78} height={27.46} svg={HomeSvg} />,
			onPress: handlePressHome,
		},
		/* deleted design */
		/*{
			icon: (
				<FansSvg
					width={24.39}
					height={24.61}
					svg={Search1Svg}
				/>
			),
		},*/
		{
			icon: (
				<FansSvg width={24.67} height={27.46} svg={NotificationSvg} />
			),
			onPress: handlePressNotifications,
		},
		isCreator && {
			icon: (
				<FansSvg width={27.46} height={27.46} svg={OutlinedPlusSvg} />
			),
			onPress: handlePressCreate,
		},
		chatEnabled && {
			icon: <FansSvg width={27.45} height={27.46} svg={ChatSvg} />,
			onPress: handlePressChat,
		},
		{
			icon: <UserAvatar image={avatar} size="29px" />,
			onPress: handlePressProfile,
		},
		{
			icon: <FansSvg width={28.03} height={5.72} svg={ThreeDotsSvg} />,
		},
	];

	return (
		<FansView {...viewStyle}>
			<FansGap height={62.4} />
			<FansView touchableOpacityProps={{ onPress: handlePressHome }}>
				<FansSvg width={31.97} height={29.63} svg={Diamond1Png} />
			</FansView>
			<FansGap height={54.1} />
			<FansView width={53} gap={16}>
				{items.map((item, index) => {
					if (!item) return;
					const { icon, onPress: trigPress } = item;

					return (
						<FansView
							key={index}
							height={53}
							alignItems="center"
							flexDirection="row"
						>
							<TouchableOpacity onPress={trigPress}>
								{icon}
							</TouchableOpacity>
						</FansView>
					);
				})}
				<FansView size={40} center></FansView>
				<FansView size={40} center>
					<TouchableOpacity
						onPress={handlePressNotifications}
					></TouchableOpacity>
				</FansView>
				<FansView size={40} center></FansView>
				<FansView size={40} center></FansView>
				<FansView size={40} center>
					<FansView size={29}></FansView>
				</FansView>
			</FansView>
			<PostTypesDialog />
		</FansView>
	);
};

export default Sidebar;
