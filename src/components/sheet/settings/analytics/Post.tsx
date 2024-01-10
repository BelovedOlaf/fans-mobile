import React, { Fragment, useState } from "react";

import {
	Comment1Svg,
	Eye4Svg,
	Heart2Svg,
	Image1Svg,
} from "@assets/svgs/common";
import {
	FansGap,
	FansHorizontalDivider,
	FansImage2,
	FansSheet2,
	FansSvg,
	FansTabs,
	FansText,
	FansVerticalDivider,
	FansView,
} from "@components/controls";
import { IFansSheet } from "@usertypes/components";
import { IPost } from "@usertypes/types";
import { DateTime } from "luxon";
import UserAvatar from "@components/avatar/UserAvatar";
import { emptyPostData } from "@constants/common";

const FansComment = React.memo((props: { name: string; text: string }) => (
	<FansView
		alignItems="start"
		flexDirection="row"
		gap={13}
		padding={{ t: 19, b: 19 }}
	>
		<UserAvatar size="34px" />
		<FansView width={0} gap={5.3} grow>
			<FansText fontFamily="inter-semibold" fontSize={16}>
				{props.name}
			</FansText>
			<FansView>
				<FansText fontSize={16}>{props.text}</FansText>
			</FansView>
		</FansView>
	</FansView>
));

const enum Tab {
	Likes = 0,
	Comments = 1,
	Shares = 2,
}

const LikesTab = () => {
	return (
		<FansView gap={8.1}>
			<FansText fontSize={16}>590 Fans liked</FansText>
			<FansView>
				{[
					{ name: "Jane Love" },
					{ name: "Katie Johnson" },
					{ name: "Rosie J. Cambridge" },
					{ name: "David Shepard" },
					{ name: "Amber Jonathan" },
					{ name: "David Shepard" },
				].map((value, index) => {
					const { name } = value;

					return (
						<Fragment key={index}>
							{index !== 0 && <FansHorizontalDivider />}
							<FansView
								height={54}
								alignItems="center"
								flexDirection="row"
								gap={13}
							>
								<UserAvatar size="34px" />
								<FansText
									fontFamily="inter-semibold"
									fontSize={16}
								>
									{name}
								</FansText>
							</FansView>
						</Fragment>
					);
				})}
			</FansView>
		</FansView>
	);
};

const CommentsTab = () => {
	return (
		<FansView gap={8}>
			<FansText fontSize={16}>10 Fans commented</FansText>
			<FansView>
				{[
					{
						name: "Ramiro Altamiglia",
						text: "Beautiful as always! Can’t wait to join you on your next trip",
					},
					{
						name: "Kate Lee",
						text: "Ohh lovely. Such a beautiful location! Where is it?",
					},
					{
						name: "Helena Goldman",
						text: "This is awesome! Take me with you on your next trip, please! Haha",
					},
				].map((value, index) => {
					const { name, text } = value;

					return (
						<Fragment key={index}>
							{index !== 0 && <FansHorizontalDivider />}
							<FansComment name={name} text={text} />
						</Fragment>
					);
				})}
			</FansView>
		</FansView>
	);
};

const PostSheet: IFansSheet<IPost> = (props) => {
	const {
		width = { lg: 741 },
		height = { xs: 748 },
		data = emptyPostData,
		...props_
	} = props;
	const { commentCount, likeCount, createdAt } = data;

	const [numTab, setTab] = useState(Tab.Likes);

	return (
		<FansSheet2
			width={width}
			height={height}
			sheetStyle={{ padding: { t: 21, x: 17 } }}
			{...props_}
		>
			<FansView gap={15.3}>
				<FansView alignItems="center">
					<FansImage2
						width={95}
						height={95}
						viewStyle={{ borderRadius: "full" }}
						source={require("@assets/images/default-avatar.png")}
					/>
					<FansView
						width={42}
						height={42}
						alignItems="center"
						backgroundColor="grey-f0"
						border={2}
						borderColor="white"
						borderRadius="full"
						justifyContent="center"
						margin={{ t: -15 }}
					>
						<FansSvg
							width={21.1}
							height={21.1}
							svg={Image1Svg}
							color1="green-4d"
						/>
					</FansView>
				</FansView>
				<FansView alignItems="center" gap={4.8}>
					<FansText
						color="grey-70"
						fontSize={14}
						textTransform="uppercase"
					>
						{DateTime.fromISO(createdAt).toFormat("MMM d, h:m a")}
					</FansText>
					<FansText fontFamily="inter-semibold" fontSize={17}>
						Photo post
					</FansText>
				</FansView>
			</FansView>
			<FansGap height={28.8} />
			<FansView height={50} flexDirection="row">
				{[
					{
						gap: 6.8,
						icon: (
							<FansSvg
								width={18.83}
								height={13.19}
								svg={Eye4Svg}
								color1="green-4d"
							/>
						),
						value: commentCount,
						text: "Post Views",
					},
					{
						gap: 2.6,
						icon: (
							<FansSvg
								width={14.92}
								height={13.19}
								svg={Heart2Svg}
								color1="green-4d"
							/>
						),
						value: likeCount,
						text: "Likes",
					},
					{
						gap: 2.6,
						icon: (
							<FansSvg
								width={15.56}
								height={15.56}
								svg={Comment1Svg}
								color1="green-4d"
							/>
						),
						value: commentCount,
						text: "Comments",
					},
				].map((item, index) => {
					const { icon, gap, value, text } = item;

					return (
						<Fragment key={index}>
							{index !== 0 && <FansVerticalDivider />}
							<FansView alignItems="center" flex="1" gap={gap}>
								<FansView
									alignItems="center"
									flexDirection="row"
									gap={2.6}
								>
									{icon}
									<FansText
										fontFamily="inter-semibold"
										fontSize={22}
										color="green-4d"
									>
										{value.toLocaleString()}
									</FansText>
								</FansView>
								<FansText
									fontFamily="inter-semibold"
									fontSize={13}
									textTransform="uppercase"
								>
									{text}
								</FansText>
							</FansView>
						</Fragment>
					);
				})}
			</FansView>
			<FansGap height={19} />
			<FansTabs
				data={[
					{ text: "Likes" },
					{ text: "Comments" },
					{ text: "Shares" },
				]}
				value={numTab}
				tabStyle={{
					activeBorderColor: "green-4d",
				}}
				onChangeValue={setTab}
			/>
			<FansGap height={17.9} />
			{numTab === Tab.Likes && <LikesTab />}
			{numTab === Tab.Comments && <CommentsTab />}
		</FansSheet2>
	);
};

export default PostSheet;
