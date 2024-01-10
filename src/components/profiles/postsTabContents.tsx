import { SubscribeAlert } from "@components/profiles";
import FilterButton from "./filterButton";
import PostCard from "@components/posts/postCard";
import { FansDivider } from "@components/controls";

import tw from "@lib/tailwind";
import { IPost, ISubscription, ICategory } from "@usertypes/types";
import { SortType } from "@usertypes/commonEnums";

import { View, ScrollView } from "react-native";
import React, { FC, Fragment } from "react";

interface Props {
	posts: IPost[];
	totalPostsCount?: number;
	categories: ICategory[];
	onClickPostAction: (postId: string) => void;
	onClickPostMessage: (postId: string) => void;
	onClickBookmark: (postId: string) => void;
	onClickPostLike: (postId: string) => void;
	needToSubscribe?: boolean;
	subscription?: ISubscription;
	onClickSubscribe?: () => void;
	filter: string | SortType;
	onChangeFilter: (val: string | SortType) => void;
	onClickUnlock?: (post: IPost) => void;
	onClickComment: (postId: string) => void;
}

const PostsTabContents: FC<Props> = (props) => {
	const {
		onClickPostAction,
		onClickPostMessage,
		onClickBookmark,
		posts,
		needToSubscribe,
		subscription,
		onClickSubscribe,
		categories,
		onClickPostLike,
		onChangeFilter,
		filter,
		onClickUnlock,
		totalPostsCount,
		onClickComment,
	} = props;

	return (
		<View style={tw.style("pt-4")}>
			{/* <View style={tw.style("flex-row mb-4")}>
				<Button
					mode="text"
					labelStyle={tw.style(
						"text-[19px] text-fans-purple font-semibold leading-[26px] m-0",
					)}
					icon={() => (
						<InteractiveSvg
							width={21.71}
							height={23.24}
							style={tw.style("mr-3")}
						/>
					)}
					onPress={handleClickInteractive}
				>
					Interactive view
				</Button>
			</View> */}
			<View style={tw.style("px-[18px] md:px-0")}>
				<SubscribeAlert
					icon="post"
					hide={!needToSubscribe}
					text={`To view ${
						totalPostsCount ?? 0
					} posts, subscribe to this creator`}
					onSubscribe={onClickSubscribe}
				/>
			</View>

			<ScrollView
				horizontal
				contentContainerStyle={{
					paddingHorizontal: 18,
					columnGap: 7,
					marginBottom: 20,
				}}
				showsHorizontalScrollIndicator={true}
				style={tw.style(needToSubscribe && "hidden")}
			>
				<FilterButton
					title={SortType.Latest}
					selected={filter === SortType.Latest}
					onClick={() => onChangeFilter(SortType.Latest)}
				/>
				<FilterButton
					title={SortType.Popular}
					selected={filter === SortType.Popular}
					onClick={() => onChangeFilter(SortType.Popular)}
				/>
				{[...categories].map((category) => (
					<FilterButton
						title={category.name}
						selected={filter === category.id}
						onClick={() => onChangeFilter(category.id)}
						key={category.id}
					/>
				))}
			</ScrollView>

			<View
				style={tw.style(
					"flex-col gap-y-[18px]",
					needToSubscribe && "hidden",
				)}
			>
				{posts.map((post) => (
					<Fragment key={post.id}>
						<PostCard
							data={post}
							onClickUnlock={() => {
								if (onClickUnlock) {
									onClickUnlock(post);
								}
							}}
							onClickBookmark={() => onClickBookmark(post.id)}
							onClickLike={() => onClickPostLike(post.id)}
							onClickActionMenu={() => onClickPostAction(post.id)}
							onClickMessage={() => onClickPostMessage(post.id)}
							onClickComment={() => onClickComment(post.id)}
						/>
						<FansDivider
							style={tw.style(
								"mt-4 mb-2 mx-[18px] md:mx-0 md:mt-4.5 md:mb-2.5",
							)}
							size={1}
						/>
					</Fragment>
				))}
			</View>
		</View>
	);
};

export default PostsTabContents;
