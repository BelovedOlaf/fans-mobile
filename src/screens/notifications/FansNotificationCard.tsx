import IconAvatar from "@components/avatar/IconAvatar";
import { IconType } from "@components/avatar/Icons";
import UserAvatarList from "@components/avatar/UserAvatarList";
import RoundButton from "@components/common/RoundButton";
import RoundButtonSmall from "@components/common/RoundButtonSmall";
import { FansText } from "@components/controls";
import tw from "@lib/tailwind";
import { RoundButtonType } from "@usertypes/commonEnums";
import { Colors } from "@usertypes/enums";
import {
	INotification,
	IPost,
	IProfile,
	IUser,
	NotificationType,
} from "@usertypes/types";
import React from "react";
import { View } from "react-native";
import PostPicture from "./PostPicture";

interface FansNotificationCardProps {
	notify: INotification;
}

const CreatorName = ({ creator }: { creator: IProfile }) => (
	<FansText>
		<FansText color="purple-a8" fontFamily="inter-medium" fontSize={17}>
			{creator.displayName ?? creator.username}
		</FansText>
	</FansText>
);

const UserName = ({ user }: { user: IUser }) => (
	<FansText>
		<FansText color="purple-a8" fontFamily="inter-medium" fontSize={17}>
			{user.displayName ?? user.username}
		</FansText>
	</FansText>
);

const TimeLeft = ({ timeLeft }: { timeLeft: string }) => (
	<FansText color="grey-70" fontSize={14}>
		{` • ${timeLeft}`}
	</FansText>
);

const PostThumb = ({ post }: { post: IPost }) => (
	<View>
		<PostPicture image={post.thumb?.url ?? ""} />
	</View>
);

const Time = ({ time }: { time: string }) => (
	<FansText color="grey-70" fontSize={14}>
		{` • ${time}`}
	</FansText>
);

const FanChangedSubscriptionPrice = ({ notify }: FansNotificationCardProps) => (
	<View style={tw.style("flex-row gap-[10px] items-center")}>
		<UserAvatarList
			users={notify.creator ? [notify.creator] : undefined}
			icon={IconType.Subscription}
		/>
		<FansText>
			{notify.creator && <CreatorName creator={notify.creator} />}
			<FansText>{` changed subscription price from ${notify.from} to ${notify.to}`}</FansText>
			{!!notify.time && <Time time={notify.time} />}
		</FansText>
	</View>
);

const FanRunningPromotion = ({ notify }: FansNotificationCardProps) => (
	<View style={tw.style("flex-row gap-[10px] items-center")}>
		<UserAvatarList
			users={notify.creator ? [notify.creator] : undefined}
			icon={IconType.Subscription}
		/>
		<FansText>
			{notify.creator && <CreatorName creator={notify.creator} />}
			<FansText>{` is running a promotion. `}</FansText>
			<FansText
				style={tw.style("underline text-fans-purple")}
			>{`Check it out`}</FansText>
			{!!notify.time && <Time time={notify.time} />}
		</FansText>
	</View>
);

const FanSubscriptionExpired = ({ notify }: FansNotificationCardProps) => {
	return (
		<View style={tw.style("flex gap-2")}>
			<View style={tw.style("flex-row gap-[10px] items-center")}>
				<UserAvatarList
					users={notify.creator ? [notify.creator] : undefined}
					icon={IconType.Star}
				/>
				<FansText>
					<FansText>{`You subscription to `}</FansText>
					{notify.creator && <CreatorName creator={notify.creator} />}
					<FansText>{` has expired on `}</FansText>
					{!!notify.time && <Time time={notify.time} />}
				</FansText>
			</View>
			<View
				style={tw.style(
					"flex-row gap-[10px] justify-between items-center",
					"ml-[55px]",
					"rounded-full",
				)}
			>
				<RoundButton variant={RoundButtonType.OUTLINE_PRIMARY}>
					RENEW FOR ${notify.price}/MONTH
				</RoundButton>
			</View>
		</View>
	);
};

const FanSubscriptionExpire = ({ notify }: FansNotificationCardProps) => {
	return (
		<View style={tw.style("flex gap-2")}>
			<View style={tw.style("flex-row gap-[10px] items-center")}>
				<UserAvatarList
					users={notify.creator ? [notify.creator] : undefined}
					icon={IconType.Star}
				/>
				<FansText>
					<FansText>{`You subscription to `}</FansText>
					{notify.creator && <CreatorName creator={notify.creator} />}
					<FansText>{` will expire tomorrow `}</FansText>
					{!!notify.time && <Time time={notify.time} />}
				</FansText>
			</View>
			<View
				style={tw.style(
					"flex-row gap-[10px] justify-between items-center",
					"ml-[55px]",
					"rounded-full",
				)}
			>
				<RoundButton variant={RoundButtonType.OUTLINE_PRIMARY}>
					RENEW FOR ${notify.price}/MONTH
				</RoundButton>
			</View>
		</View>
	);
};

const FanSubscriptionRenewed = ({ notify }: FansNotificationCardProps) => (
	<View style={tw.style("flex-row gap-[10px] items-center")}>
		<UserAvatarList
			users={notify.creator ? [notify.creator] : undefined}
			icon={IconType.Star}
		/>
		<FansText>
			<FansText>{`You subscription to `}</FansText>
			{notify.creator && <CreatorName creator={notify.creator} />}
			<FansText>{` was renewed for ${notify.price}`}</FansText>
			{!!notify.time && <Time time={notify.time} />}
		</FansText>
	</View>
);

const FanUploadPost = ({ notify }: FansNotificationCardProps) => (
	<View style={tw.style("flex-row gap-[10px] items-center")}>
		<UserAvatarList
			users={notify.creator ? [notify.creator] : undefined}
			icon={IconType.Image}
		/>
		<FansText>
			{notify.creator && <CreatorName creator={notify.creator} />}
			<FansText>{` has uploaded a new post `}</FansText>
			{!!notify.time && <Time time={notify.time} />}
		</FansText>
		{!!notify.post && <PostThumb post={notify.post} />}
	</View>
);

const FanStartGiveaway = ({ notify }: FansNotificationCardProps) => (
	<View style={tw.style("flex-row gap-[10px] items-center")}>
		<UserAvatarList
			users={notify.creator ? [notify.creator] : undefined}
			icon={IconType.Giveaway}
		/>
		<FansText>
			{notify.creator && <CreatorName creator={notify.creator} />}
			<FansText>{` has started a giveaway `}</FansText>
			{!!notify.time && <Time time={notify.time} />}
		</FansText>
		{!!notify.post && <PostThumb post={notify.post} />}
	</View>
);

const FanStartFundraising = ({ notify }: FansNotificationCardProps) => (
	<View style={tw.style("flex-row gap-[10px] items-center")}>
		<UserAvatarList
			users={notify.creator ? [notify.creator] : undefined}
			icon={IconType.Fundraising}
		/>
		<FansText>
			{notify.creator && <CreatorName creator={notify.creator} />}
			<FansText>{` has started a fundraising event `}</FansText>
			{!!notify.time && <Time time={notify.time} />}
		</FansText>
		{!!notify.post && <PostThumb post={notify.post} />}
	</View>
);

const FanAcceptVideoCall = ({ notify }: FansNotificationCardProps) => (
	<View style={tw.style("flex-row gap-[10px] items-center")}>
		<UserAvatarList users={notify.users} icon={IconType.VideoCall} />
		<FansText>
			{notify.users?.[0] && <UserName user={notify.users[0]} />}
			<FansText>{` has accepted your video call request `}</FansText>
			{!!notify.time && <Time time={notify.time} />}
		</FansText>
	</View>
);

const FanLikeComment = ({ notify }: FansNotificationCardProps) => (
	<View style={tw.style("flex-row gap-[10px] items-center")}>
		<UserAvatarList users={notify.users} icon={IconType.Heart} />
		<FansText>
			{notify.users?.[0] && <UserName user={notify.users[0]} />}
			<FansText
				fontSize={16}
			>{` liked your comment: ${notify.comment?.content}`}</FansText>
			{!!notify.timeLeft && <TimeLeft timeLeft={notify.timeLeft} />}
		</FansText>
		{!!notify.post && <PostThumb post={notify.post} />}
	</View>
);

const FanSentTips = ({ notify }: FansNotificationCardProps) => (
	<View style={tw.style("flex-row gap-[10px] items-center")}>
		<UserAvatarList users={notify.users} icon={IconType.Dollar} />
		<FansText>
			<FansText>{`You've send a ${notify.amount} tip to `}</FansText>
			{notify.creator && <CreatorName creator={notify.creator} />}
			{!!notify.timeLeft && <TimeLeft timeLeft={notify.timeLeft} />}
		</FansText>
		{!!notify.post && <PostThumb post={notify.post} />}
	</View>
);

const FanVideoCallSchedule = ({ notify }: FansNotificationCardProps) => (
	<View style={tw.style("flex gap-2")}>
		<View style={tw.style("flex-row gap-[10px] items-center")}>
			<UserAvatarList
				users={notify.creator ? [notify.creator] : undefined}
				icon={IconType.VideoCall}
			/>
			<FansText>
				<FansText>{`Video call in ${notify.amount} minutes with `}</FansText>
				{notify.creator && <CreatorName creator={notify.creator} />}
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
);

const FanCongrats = ({ notify }: FansNotificationCardProps) => (
	<View style={tw.style("flex-row gap-[10px] items-center")}>
		<IconAvatar icon={IconType.Diamond} />
		<FansText>
			<FansText>{`Congratulations! You've received ${notify.role?.name} in `}</FansText>
			{notify.creator && <CreatorName creator={notify.creator} />}
			<FansText>{`'s community `}</FansText>
			{!!notify.time && <Time time={notify.time} />}
		</FansText>
	</View>
);

const FansNotificationCard = ({ notify }: FansNotificationCardProps) => {
	switch (notify.type) {
		case NotificationType.FanChangedSubscriptionPrice:
			return <FanChangedSubscriptionPrice notify={notify} />;
		case NotificationType.FanRunningPromotion:
			return <FanRunningPromotion notify={notify} />;
		case NotificationType.FanSubscriptionExpired:
			return <FanSubscriptionExpired notify={notify} />;
		case NotificationType.FanSubscriptionExpire:
			return <FanSubscriptionExpire notify={notify} />;
		case NotificationType.FanSubscriptionRenewed:
			return <FanSubscriptionRenewed notify={notify} />;
		case NotificationType.FanUploadPost:
			return <FanUploadPost notify={notify} />;
		case NotificationType.FanStartGiveaway:
			return <FanStartGiveaway notify={notify} />;
		case NotificationType.FanStartFundraising:
			return <FanStartFundraising notify={notify} />;
		case NotificationType.FanAcceptVideoCall:
			return <FanAcceptVideoCall notify={notify} />;
		case NotificationType.FanLikeComment:
			return <FanLikeComment notify={notify} />;
		case NotificationType.FanSentTips:
			return <FanSentTips notify={notify} />;
		case NotificationType.FanVideoCallSchedule:
			return <FanVideoCallSchedule notify={notify} />;
		case NotificationType.FanCongrats:
			return <FanCongrats notify={notify} />;
		default:
			return undefined;
	}
};

export default FansNotificationCard;
