import { BlockSvg, ClockSvg, MailSvg } from "@assets/svgs/common";
import IconAvatar from "@components/avatar/IconAvatar";
import { IconType } from "@components/avatar/Icons";
import UserAvatarList from "@components/avatar/UserAvatarList";
import RoundButtonSmall from "@components/common/RoundButtonSmall";
import { FansText } from "@components/controls";
import tw from "@lib/tailwind";
import { useMarkNotificationAsRead } from "@state/notifications";
import { RoundButtonType } from "@usertypes/commonEnums";
import { Colors } from "@usertypes/enums";
import {
	INotification,
	IPost,
	IProfile,
	IUser,
	NotificationType,
} from "@usertypes/types";
import { useRouter } from "expo-router";
import { Router } from "expo-router/build/types";
import React, { useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import PostPicture from "./PostPicture";
import { useRecoilState } from "recoil";
import { useAppContext } from "@context/useAppContext";

interface CreatorNotificationCardProps {
	notify: INotification;
}

const UserNameList = React.memo(({ users }: { users: IUser[] }) =>
	users.length > 0 ? (
		<FansText>
			<FansText color="purple-a8" fontFamily="inter-medium" fontSize={17}>
				{users[0].displayName ?? users[0].username}
			</FansText>
			{users.length === 2 && (
				<>
					<FansText>{" and "}</FansText>
					<FansText
						color="purple-a8"
						fontFamily="inter-medium"
						fontSize={17}
					>
						{users[1].displayName ?? users[1].username}
					</FansText>
				</>
			)}
			{users.length === 3 && (
				<>
					<FansText>{", "}</FansText>
					<FansText
						color="purple-a8"
						fontFamily="inter-medium"
						fontSize={17}
					>
						{users[1].displayName ?? users[1].username}
					</FansText>
					<FansText>{" and "}</FansText>
					<FansText
						color="purple-a8"
						fontFamily="inter-medium"
						fontSize={17}
					>
						{users[2].displayName ?? users[2].username}
					</FansText>
				</>
			)}
			{users.length > 3 && (
				<>
					<FansText>{", "}</FansText>
					<FansText color="purple-a8" fontFamily="inter-medium">
						{users[1].displayName ?? users[1].username}
					</FansText>
					<FansText>{" and "}</FansText>
					<FansText
						color="purple-a8"
						fontFamily="inter-medium"
						fontSize={17}
					>
						{`${users.length - 2} others`}
					</FansText>
				</>
			)}
		</FansText>
	) : undefined,
);

const AuthorName = React.memo(({ profile }: { profile?: IProfile }) => {
	const ctx = useAppContext();

	if (!profile) return null;

	return ctx.state.user.userInfo.id === profile.userId ? (
		"your"
	) : (
		<>
			<FansText color="purple-a8" fontFamily="inter-medium" fontSize={17}>
				{profile.displayName}
			</FansText>
			{`'s`}
		</>
	);
});

const getUserInitial = (users?: IUser[]): string | undefined => {
	if (!users || users.length === 0) return undefined;
	return (users[0].displayName ?? users[0].username).split(" ")[0];
};

const TimeLeft = ({ timeLeft }: { timeLeft: string }) => (
	<FansText color="grey-70" fontSize={14}>
		{` • ${timeLeft}`}
	</FansText>
);

const PostThumb = ({ post }: { post: IPost }) => (
	<View style={tw`flex-row mt-1 items-center gap-[10px]`}>
		{!!post.thumb && <PostPicture image={post.thumb.url} />}
		<FansText color="grey-70" fontSize={17}>
			{post.caption}
		</FansText>
	</View>
);

const Time = ({ time }: { time: string }) => (
	<FansText color="grey-70" fontSize={14}>
		{` • ${time}`}
	</FansText>
);

const LikeComment = React.memo(({ notify }: CreatorNotificationCardProps) => (
	<View style={tw`flex-row gap-[10px] items-center`}>
		<UserAvatarList users={notify.users} icon={IconType.Heart} />

		<FansText>
			{notify.users && <UserNameList users={notify.users} />}
			<FansText
				fontSize={16}
			>{` liked your comment: ${notify.comment?.content}`}</FansText>
			{!!notify.timeLeft && <TimeLeft timeLeft={notify.timeLeft} />}
		</FansText>
		{!!notify.post && <PostThumb post={notify.post} />}
	</View>
));

const LikePost = React.memo(({ notify }: CreatorNotificationCardProps) => (
	<View style={tw`flex-row gap-[10px] items-center`}>
		<UserAvatarList users={notify.users} icon={IconType.Heart} />
		<View>
			<FansText>
				{notify.users && <UserNameList users={notify.users} />}
				{" liked your post"}
				{!!notify.timeLeft && <TimeLeft timeLeft={notify.timeLeft} />}
			</FansText>
			{!!notify.post && <PostThumb post={notify.post} />}
		</View>
	</View>
));

const MadeComment = React.memo(({ notify }: CreatorNotificationCardProps) => (
	<View style={tw`flex-row gap-[10px] items-center`}>
		<UserAvatarList users={notify.users} icon={IconType.Comment} />
		<View>
			<FansText>
				{notify.users && <UserNameList users={notify.users} />}
				{" commented on "}
				<AuthorName profile={notify.post?.profile} />
				{" post"}
				{!!notify.timeLeft && <TimeLeft timeLeft={notify.timeLeft} />}
			</FansText>
			{!!notify.post && <PostThumb post={notify.post} />}
		</View>
	</View>
));

const ReplyComment = React.memo(({ notify }: CreatorNotificationCardProps) => (
	<View style={tw`flex-row gap-[10px] items-center`}>
		<UserAvatarList users={notify.users} icon={IconType.Comment} />
		<View>
			<FansText>
				{notify.users && <UserNameList users={notify.users} />}
				{" replied to comment on "}
				<AuthorName profile={notify.post?.profile} />
				{" post"}
				{!!notify.timeLeft && <TimeLeft timeLeft={notify.timeLeft} />}
			</FansText>
			{!!notify.post && <PostThumb post={notify.post} />}
		</View>
	</View>
));

const MentionPost = React.memo(({ notify }: CreatorNotificationCardProps) => (
	<View style={tw`flex-row gap-[10px] items-center`}>
		<UserAvatarList users={notify.users} icon={IconType.At} />
		<FansText>
			{notify.users && <UserNameList users={notify.users} />}
			<FansText>{" mentioned you on a post"}</FansText>
			{!!notify.time && <Time time={notify.time} />}
		</FansText>
		{!!notify.post && <PostThumb post={notify.post} />}
	</View>
));

const ViewedPost = React.memo(({ notify }: CreatorNotificationCardProps) => (
	<View style={tw`flex-row gap-[10px] items-center`}>
		<UserAvatarList users={notify.users} icon={IconType.Image} />
		<FansText>
			{notify.users && <UserNameList users={notify.users} />}
			<FansText>{" viewed your post"}</FansText>
			{!!notify.time && <Time time={notify.time} />}
		</FansText>
		{!!notify.post && <PostThumb post={notify.post} />}
	</View>
));

const PaidPostPurchase = React.memo(
	({ notify }: CreatorNotificationCardProps) => (
		<View style={tw`flex-row gap-[10px] items-center`}>
			<UserAvatarList users={notify.users} icon={IconType.Dollar} />
			<FansText>
				{notify.users && <UserNameList users={notify.users} />}
				<FansText>{` paid you ${notify.price} for your post`}</FansText>
				{!!notify.time && <Time time={notify.time} />}
			</FansText>
			{!!notify.post && <PostThumb post={notify.post} />}
		</View>
	),
);

const Tips = React.memo(({ notify }: CreatorNotificationCardProps) => (
	<View style={tw`flex-row gap-[10px] items-center`}>
		<UserAvatarList users={notify.users} icon={IconType.Dollar} />
		<FansText>
			{notify.users && <UserNameList users={notify.users} />}
			<FansText>{` paid you a tip of ${notify.price}`}</FansText>
			{!!notify.time && <Time time={notify.time} />}
		</FansText>
		{!!notify.post && <PostThumb post={notify.post} />}
	</View>
));

const TipsOnPost = React.memo(({ notify }: CreatorNotificationCardProps) => (
	<View style={tw`flex-row gap-[10px] items-center`}>
		<UserAvatarList users={notify.users} icon={IconType.Dollar} />
		<FansText>
			{notify.users && <UserNameList users={notify.users} />}
			<FansText>{` paid you a tip of ${notify.price} on a post`}</FansText>
			{!!notify.time && <Time time={notify.time} />}
		</FansText>
		{!!notify.post && <PostThumb post={notify.post} />}
	</View>
));

const TipsOnChat = React.memo(({ notify }: CreatorNotificationCardProps) => (
	<View style={tw`flex-row gap-[10px] items-center`}>
		<UserAvatarList users={notify.users} icon={IconType.Dollar} />
		<FansText>
			{notify.users && <UserNameList users={notify.users} />}
			<FansText>{` paid you a tip of ${notify.price} on a chat`}</FansText>
			{!!notify.time && <Time time={notify.time} />}
		</FansText>
	</View>
));

const SubscriptionCharged = React.memo(
	({ notify }: CreatorNotificationCardProps) => (
		<View style={tw`flex-row gap-[10px] items-center`}>
			<UserAvatarList users={notify.users} icon={IconType.Star} />
			<FansText>
				<FansText>{`You've been charged ${notify.price} for your subscription to `}</FansText>
				{notify.users && <UserNameList users={notify.users} />}
				{!!notify.time && <Time time={notify.time} />}
			</FansText>
		</View>
	),
);

const SubscriptionSubscribed = ({ notify }: CreatorNotificationCardProps) => {
	const userInitial = getUserInitial(notify.users);
	return (
		<View style={tw`flex-row gap-[10px] items-center`}>
			<UserAvatarList users={notify.users} icon={IconType.Star} />
			<FansText>
				{notify.users && <UserNameList users={notify.users} />}
				<FansText>{` subscribed for ${notify.price}. `}</FansText>
				{/* {userInitial && (
					<FansText style={tw`underline text-fans-purple`}>
						<MailSvg size={16} color={Colors.Purple} />
						{` DM ${userInitial}. `}
					</FansText>
				)} */}
				{!!notify.time && <Time time={notify.time} />}
			</FansText>
		</View>
	);
};

const SubscriptionRenewedCreator = React.memo(
	({ notify }: CreatorNotificationCardProps) => (
		<View style={tw`flex-row gap-[10px] items-center`}>
			<UserAvatarList users={notify.users} icon={IconType.Star} />
			<FansText>
				{notify.users && <UserNameList users={notify.users} />}
				<FansText>{` has renewed their subscription for ${notify.price} `}</FansText>
				{!!notify.time && <Time time={notify.time} />}
			</FansText>
		</View>
	),
);

const SubscriptionRenewedFan = React.memo(
	({ notify }: CreatorNotificationCardProps) => (
		<View style={tw`flex-row gap-[10px] items-center`}>
			<UserAvatarList users={notify.users} icon={IconType.Star} />
			<FansText>
				<FansText>{`Your subscription to `}</FansText>
				{notify.users && <UserNameList users={notify.users} />}
				<FansText>{` was renewed for ${notify.price} `}</FansText>
				{!!notify.time && <Time time={notify.time} />}
			</FansText>
		</View>
	),
);

const SubscriptionCancelled = React.memo(
	({ notify }: CreatorNotificationCardProps) => {
		const userInitial = getUserInitial(notify.users);
		return (
			<View style={tw`flex-row gap-[10px] items-center`}>
				<UserAvatarList users={notify.users} icon={IconType.Star} />
				<FansText>
					{notify.users && <UserNameList users={notify.users} />}
					<FansText>{` has canceled their subscription. `}</FansText>
					{/* {userInitial && (
						<FansText style={tw`underline text-fans-purple`}>
							<MailSvg size={16} color={Colors.Purple} />
							{` DM ${userInitial}. `}
						</FansText>
					)} */}
					{!!notify.time && <Time time={notify.time} />}
				</FansText>
			</View>
		);
	},
);

const SubscriptionExpiring = React.memo(
	({ notify }: CreatorNotificationCardProps) => {
		const userInitial = getUserInitial(notify.users);
		return (
			<View style={tw`flex-row gap-[10px] items-center`}>
				<UserAvatarList users={notify.users} icon={IconType.Star} />
				<FansText>
					{notify.users && <UserNameList users={notify.users} />}
					<FansText>{`'s subscription expires in a week`}</FansText>
					{/* {userInitial && (
						<FansText style={tw`underline text-fans-purple`}>
							<MailSvg size={16} color={Colors.Purple} />
							{` DM ${userInitial}. `}
						</FansText>
					)} */}
					{!!notify.time && <Time time={notify.time} />}
				</FansText>
			</View>
		);
	},
);

const SubscriptionExpired = React.memo(
	({ notify }: CreatorNotificationCardProps) => {
		const userInitial = getUserInitial(notify.users);
		return (
			<View style={tw`flex-row gap-[10px] items-center`}>
				<UserAvatarList users={notify.users} icon={IconType.Star} />
				<FansText>
					{notify.users && <UserNameList users={notify.users} />}
					<FansText>{`'s subscription has expired `}</FansText>
					{/* {userInitial && (
						<FansText style={tw`underline text-fans-purple`}>
							<MailSvg size={16} color={Colors.Purple} />
							{` Send discount `}
						</FansText>
					)} */}
					{!!notify.time && <Time time={notify.time} />}
				</FansText>
			</View>
		);
	},
);

const UnreadMessage = React.memo(({ notify }: CreatorNotificationCardProps) => (
	<View style={tw`flex-row gap-[10px] items-center`}>
		<UserAvatarList users={notify.users} icon={IconType.Mail} />
		<FansText>
			<FansText>{`You've got `}</FansText>
			<FansText color="purple-a8" fontFamily="inter-medium" fontSize={17}>
				{`${notify.amount} unread messages`}
			</FansText>
		</FansText>
		{!!notify.time && <Time time={notify.time} />}
	</View>
));

const CongratsFollowers = React.memo(
	({ notify }: CreatorNotificationCardProps) => (
		<View style={tw`flex-row gap-[10px] items-center`}>
			<IconAvatar icon={IconType.Congrats} />
			<FansText>
				<FansText>{`Congrats! You've reached ${notify.amount} followers, Keep it up!`}</FansText>
				{!!notify.time && <Time time={notify.time} />}
			</FansText>
		</View>
	),
);

const CongratsRevenue = React.memo(
	({ notify }: CreatorNotificationCardProps) => (
		<View style={tw`flex-row gap-[10px] items-center`}>
			<IconAvatar icon={IconType.Revenue} />
			<FansText>
				<FansText>{`Congrats! You've reached ${notify.price} revenue today`}</FansText>
				{!!notify.time && <Time time={notify.time} />}
			</FansText>
		</View>
	),
);

const OrderCustomVideo = React.memo(
	({ notify }: CreatorNotificationCardProps) => (
		<View style={tw`flex gap-2`}>
			<View style={tw`flex-row gap-[10px] items-center`}>
				<UserAvatarList
					users={notify.users}
					icon={IconType.CustomizeVideo}
				/>
				<FansText>
					{notify.users && <UserNameList users={notify.users} />}
					<FansText>{` ordered a custom video for ${notify.price}`}</FansText>
					{!!notify.time && !notify.rejected && (
						<Time time={notify.time} />
					)}
				</FansText>
			</View>
			{notify.rejected ? (
				<View
					style={tw.style(
						"bg-fans-red/10",
						"flex-row gap-[5px] items-center",
						"ml-[55px]",
						"p-[7px]",
						"rounded-full",
						"self-start",
					)}
				>
					<BlockSvg size={12} color={Colors.Red} />
					<FansText
						color="red-eb"
						fontFamily="inter-bold"
						fontSize={12}
					>
						REJECTED
					</FansText>
				</View>
			) : (
				<View
					style={tw.style(
						"bg-fans-green/10",
						"flex-row gap-[5px] items-center",
						"ml-[55px]",
						"p-[7px]",
						"rounded-full",
						"self-start",
					)}
				>
					<ClockSvg size={12} color={Colors.Green} />
					<FansText
						color="green-4d"
						fontFamily="inter-bold"
						fontSize={12}
					>
						{notify.timeLeft}
					</FansText>
				</View>
			)}
			{!notify.rejected && (
				<View
					style={tw.style(
						"flex-row gap-[10px] justify-between items-center",
						"ml-[55px]",
						"rounded-full",
					)}
				>
					<RoundButtonSmall variant={RoundButtonType.OUTLINE_PRIMARY}>
						REJECT
					</RoundButtonSmall>
					<RoundButtonSmall>VIEW ORDER</RoundButtonSmall>
				</View>
			)}
		</View>
	),
);

const VideoCallPurchase = React.memo(
	({ notify }: CreatorNotificationCardProps) => (
		<View style={tw`flex gap-2`}>
			<View style={tw`flex-row gap-[10px] items-center`}>
				<UserAvatarList
					users={notify.users}
					icon={IconType.VideoCall}
				/>
				<FansText>
					{notify.users && <UserNameList users={notify.users} />}
					<FansText>{` purchased a video call for ${notify.price}`}</FansText>
				</FansText>
			</View>
			<View
				style={tw.style(
					"bg-fans-green/10",
					"flex-row gap-[5px] items-center",
					"ml-[55px]",
					"p-[7px]",
					"rounded-full",
					"self-start",
				)}
			>
				<ClockSvg size={12} color={Colors.Green} />
				<FansText
					color="green-4d"
					fontFamily="inter-bold"
					fontSize={12}
				>
					{notify.time}
				</FansText>
			</View>

			{notify.accepted ? (
				<View
					style={tw.style(
						"flex-row gap-[10px] justify-between items-center",
						"ml-[55px]",
						"rounded-full",
					)}
				>
					<RoundButtonSmall variant={RoundButtonType.OUTLINE_PRIMARY}>
						REJECT
					</RoundButtonSmall>
					<RoundButtonSmall>VIEW ORDER</RoundButtonSmall>
				</View>
			) : (
				<View
					style={tw.style(
						"flex-row gap-[10px] justify-between items-center",
						"ml-[55px]",
						"rounded-full",
					)}
				>
					<RoundButtonSmall variant={RoundButtonType.OUTLINE_PRIMARY}>
						CANCEL
					</RoundButtonSmall>
					<RoundButtonSmall>JOIN CALL</RoundButtonSmall>
				</View>
			)}
		</View>
	),
);

const VideoCallSchedule = React.memo(
	({ notify }: CreatorNotificationCardProps) => (
		<View style={tw`flex gap-2`}>
			<View style={tw`flex-row gap-[10px] items-center`}>
				<UserAvatarList
					users={notify.users}
					icon={IconType.VideoCall}
				/>
				<FansText>
					<FansText>{`Video call in ${notify.amount} minutes with `}</FansText>
					{notify.users && <UserNameList users={notify.users} />}
				</FansText>
			</View>

			<View
				style={tw.style(
					"flex-row gap-[10px] justify-between items-center",
					"ml-[55px]",
					"rounded-full",
				)}
			>
				<RoundButtonSmall variant={RoundButtonType.OUTLINE_PRIMARY}>
					CANCEL
				</RoundButtonSmall>
				<RoundButtonSmall>JOIN</RoundButtonSmall>
			</View>
		</View>
	),
);

const WarningPostUnderReview = React.memo(
	({ notify }: CreatorNotificationCardProps) => (
		<View style={tw`flex gap-2`}>
			<View style={tw`flex-row gap-[10px] items-center`}>
				<IconAvatar icon={IconType.Warning} />
				<FansText>
					<FansText fontSize={16}>
						{`Your post is under review for guidelines compliance`}
					</FansText>
					{!!notify.time && <Time time={notify.time} />}
				</FansText>
				{!!notify.post && <PostThumb post={notify.post} />}
			</View>
			{notify.strike && (
				<>
					<View
						style={tw.style(
							`bg-fans-red/${notify.strike * 10}`,
							"flex-row gap-[5px] items-center",
							"ml-[55px]",
							"p-[7px]",
							"rounded-full",
							"self-start",
						)}
					>
						<FansText
							color="red-eb"
							fontFamily="inter-bold"
							fontSize={12}
						>
							{`STRIKE ${notify.strike} of 3`}
						</FansText>
					</View>
					<View
						style={tw.style(
							"flex-row gap-[10px] justify-between items-center",
							"ml-[55px]",
							"rounded-full",
						)}
					>
						<RoundButtonSmall
							variant={RoundButtonType.OUTLINE_PRIMARY}
						>
							CANCEL
						</RoundButtonSmall>
						<RoundButtonSmall>JOIN</RoundButtonSmall>
					</View>
				</>
			)}
		</View>
	),
);

const WarningGuidelinesViolation = React.memo(
	({ notify }: CreatorNotificationCardProps) => (
		<View style={tw`flex-row gap-[10px] items-center`}>
			<IconAvatar icon={IconType.Warning} />
			<FansText>
				<FansText fontSize={16}>{`Your post violates our `}</FansText>
				<FansText
					color="purple-a8"
					fontSize={17}
					style={tw`underline`}
				>{`Community Guidelines`}</FansText>
				{!!notify.time && <Time time={notify.time} />}
			</FansText>
			{!!notify.post && <PostThumb post={notify.post} />}
		</View>
	),
);

const WarningTOSViolation = React.memo(
	({ notify }: CreatorNotificationCardProps) => (
		<View style={tw`flex-row gap-[10px] items-center`}>
			<IconAvatar icon={IconType.Warning} />
			<FansText>
				<FansText fontSize={16}>{`Your post violates our `}</FansText>
				<FansText
					color="purple-a8"
					fontSize={17}
					style={tw`underline`}
				>{`Terms of Use`}</FansText>
				{!!notify.time && <Time time={notify.time} />}
			</FansText>
			{!!notify.post && <PostThumb post={notify.post} />}
		</View>
	),
);

const getNotificationComponent = (notify: INotification) => {
	switch (notify.type) {
		case NotificationType.LikeComment:
			return <LikeComment notify={notify} />;
		case NotificationType.MadeComment:
			return <MadeComment notify={notify} />;
		case NotificationType.LikePost:
			return <LikePost notify={notify} />;
		case NotificationType.MentionPost:
			return <MentionPost notify={notify} />;
		case NotificationType.ViewedPost:
			return <ViewedPost notify={notify} />;
		case NotificationType.PaidPostPurchase:
			return <PaidPostPurchase notify={notify} />;
		case NotificationType.Tips:
			return <Tips notify={notify} />;
		case NotificationType.TipsOnPost:
			return <TipsOnPost notify={notify} />;
		case NotificationType.TipsOnChat:
			return <TipsOnChat notify={notify} />;
		case NotificationType.SubscriptionCharged:
			return <SubscriptionCharged notify={notify} />;
		case NotificationType.SubscriptionSubscribed:
			return <SubscriptionSubscribed notify={notify} />;
		case NotificationType.SubscriptionRenewedCreator:
			return <SubscriptionRenewedCreator notify={notify} />;
		case NotificationType.SubscriptionRenewedFan:
			return <SubscriptionRenewedFan notify={notify} />;
		case NotificationType.SubscriptionCancelled:
			return <SubscriptionCancelled notify={notify} />;
		case NotificationType.SubscriptionExpiring:
			return <SubscriptionExpiring notify={notify} />;
		case NotificationType.SubscriptionExpired:
			return <SubscriptionExpired notify={notify} />;
		case NotificationType.UnreadMessage:
			return <UnreadMessage notify={notify} />;
		case NotificationType.CongratsFollowers:
			return <CongratsFollowers notify={notify} />;
		case NotificationType.CongratsRevenue:
			return <CongratsRevenue notify={notify} />;
		case NotificationType.OrderCustomVideo:
			return <OrderCustomVideo notify={notify} />;
		case NotificationType.VideoCallPurchase:
			return <VideoCallPurchase notify={notify} />;
		case NotificationType.VideoCallSchedule:
			return <VideoCallSchedule notify={notify} />;
		case NotificationType.WarningPostUnderReview:
			return <WarningPostUnderReview notify={notify} />;
		case NotificationType.WarningGuidelinesViolation:
			return <WarningGuidelinesViolation notify={notify} />;
		case NotificationType.WarningTOSViolation:
			return <WarningTOSViolation notify={notify} />;
		case NotificationType.ReplyComment:
			return <ReplyComment notify={notify} />;
		default:
			return null;
	}
};

function dummy() {}

const getCallback = (notify: INotification, router: Router) => {
	switch (notify.type) {
		case NotificationType.LikeComment:
		case NotificationType.MadeComment:
		case NotificationType.LikePost:
		case NotificationType.ReplyComment:
		case NotificationType.MentionPost: {
			const postId = notify.post?.id;
			return () => router.push(`/p/${postId}`);
			break;
		}
	}

	return dummy;
};

const CreatorNotificationCard = (props: CreatorNotificationCardProps) => {
	const router = useRouter();
	const markNotificationRead = useMarkNotificationAsRead();
	const callback = useCallback(() => {
		markNotificationRead(props.notify.id);
		return getCallback(props.notify, router)();
	}, [props.notify, router]);

	return (
		<View
			style={{
				...tw`border-b-2 border-fans-grey py-4 px-4 ${
					!props.notify.read ? "bg-fans-purple-light" : ""
				}`,
				cursor: "pointer",
			}}
		>
			<TouchableOpacity onPress={callback}>
				{getNotificationComponent(props.notify)}
			</TouchableOpacity>
		</View>
	);
};

export default React.memo(CreatorNotificationCard);
