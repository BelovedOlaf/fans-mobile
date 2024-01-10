import tw from "@lib/tailwind";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { usersData, usersListData } from "@assets/dummyData/post";
import { DocEditSvg, EditSvg } from "@assets/svgs/common";
import CardActions from "@components/common/cardActions";
import Layout from "@components/common/layout";
import { FilterButton } from "@components/posts/common";
import { UserListModal, SendMessageDialog } from "@components/posts/dialogs";
import PostCard from "@components/posts/postCard";
import SuggestProfiles from "@components/posts/suggestProfiles";
import { useAppContext } from "@context/useAppContext";
import * as apis from "@helper/endpoints";
import { useFeatureGates } from "@state/featureGates";
import { IconTypes } from "@usertypes/commonEnums";
import { ICardAction, IPost, IUserList, IUserProfile } from "@usertypes/types";

const UserLists = () => {
	const [users, setUsers] = useState<IUserProfile[]>(usersData);
	const [userLists, setUserLists] = useState<IUserList[]>(usersListData);
	const [filter, setFilter] = useState<string | number>("all");
	const [openCreatingUsers, setOpenCreatingUsers] = useState(false);
	const [openEditUsersList, setOpenEditUsersList] = useState(false);
	const [selectedUserListId, setSelectedUserListId] = useState<null | number>(
		null,
	);

	const onChangeFilter = (value: string | number) => {
		setFilter(value);
	};

	const onSelectUser = (user: IUserProfile) => {
		if (!user.isCurrentUser) return;

		setUsers(
			users.map((cell) =>
				cell.id === user.id
					? {
							...cell,
							isSelected: !user.isSelected,
					  }
					: cell,
			),
		);
	};

	const onClickFilterEdit = () => {
		setOpenCreatingUsers(true);
	};

	const onChangeUserListActive = (userListId: number, active: boolean) => {
		setOpenCreatingUsers(false);
	};

	const onClickCreateUsersList = () => {
		setSelectedUserListId(null);
		setOpenCreatingUsers(false);
		setOpenEditUsersList(true);
	};

	const onSubmitUserList = (userList: IUserList) => {
		if (userLists.find((el) => el.id === userList.id)) {
			setUserLists(
				userLists.map((el) => (el.id === userList.id ? userList : el)),
			);
		} else {
			setUserLists([...userLists, userList]);
		}
		setOpenEditUsersList(false);
	};

	return (
		<>
			<View style={tw.style("my-5")}>
				<ScrollView
					horizontal
					contentContainerStyle={{
						paddingHorizontal: 18,
						columnGap: 8,
					}}
					showsHorizontalScrollIndicator
				>
					<FilterButton
						title="All"
						onClick={() => onChangeFilter("all")}
						isSelected={filter === "all"}
					/>
					{userLists
						.filter((el) => el.isActive)
						.map((userList) => (
							<FilterButton
								key={userList.id}
								title={userList.title}
								onClick={() => onChangeFilter(userList.id)}
								isSelected={filter === userList.id}
							/>
						))}
					<TouchableOpacity
						style={tw.style("py-[6px] flex-row items-center")}
						onPress={onClickFilterEdit}
					>
						<EditSvg width={13} height={13.5} />
						<Text
							style={tw.style(
								"text-fans-purple font-bold text-[17px] leading-[22px] ml-[6.5px]",
							)}
						>
							Edit
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>

			{/* <UserListModal
				open={openCreatingUsers}
				onClose={() => {
					setOpenCreatingUsers(false);
					getUserLists();
				}}
				usersLists={userLists.userlists}
				onChangeUserListActive={onChangeUserListActive}
			/> */}
		</>
	);
};

const FansView = () => {
	const { state, dispatch } = useAppContext();
	const [openMessageDialog, setOpenMessageDialog] = useState(false);
	const [openActionMenu, setOpenActionMenu] = useState(false);

	const [posts, setPosts] = useState<IPost[]>([]);
	const [openCommentModal, setOpenCommentModal] = useState(false);
	const [selectedPostId, setSelectedPostId] = useState("");

	const featureGates = useFeatureGates();

	const onChangeLike = (id: string) => {
		setPosts(
			posts.map((post) =>
				post.id === id
					? { ...post, isLike: true, likeCount: post.likeCount + 1 }
					: post,
			),
		);
	};

	const onClickBookmark = async (postId: string) => {
		const post = posts.find((el) => el.id === postId);
		if (post?.isBookmarked) {
			const resp = await apis.post.deleteBookmark(null, { id: postId });
			if (resp.ok) {
				setPosts(
					posts.map((el) =>
						el.id === postId ? resp.data.updatedPost : el,
					),
				);
			}
		} else {
			const resp = await apis.post.setBookmark(null, { id: postId });
			if (resp.ok) {
				setPosts(
					posts.map((el) =>
						el.id === postId ? resp.data.updatedPost : el,
					),
				);
			}
		}
	};

	const onClickMessage = (id: string) => {
		setOpenMessageDialog(true);
	};

	const onClickPostActionMenu = (id: string) => {
		setOpenActionMenu(true);
	};

	const handleSendMessage = (message: string) => {
		setOpenMessageDialog(false);
	};

	const handleHidePostFeed = () => {
		setOpenActionMenu(false);
	};

	const handleCopyPostLink = () => {
		setOpenActionMenu(false);
	};

	const handleAddRemoveFromList = () => {
		setOpenActionMenu(false);
	};

	const handleUnsubscribe = () => {
		setOpenActionMenu(false);
	};

	const handleReportPost = () => {};

	const postActions: ICardAction[] = [
		{
			title: "Unsubscribe",
			iconType: IconTypes.Unsubscribe,
			onClick: handleUnsubscribe,
		},
		{
			title: "Add/remove from lists",
			iconType: IconTypes.AddRemoveFromLists,
			onClick: handleAddRemoveFromList,
		},
		{
			title: "Copy post link",
			iconType: IconTypes.CopyLink,
			onClick: handleCopyPostLink,
		},
		{
			title: "Hide posts from feed",
			iconType: IconTypes.EyeHide,
			onClick: handleHidePostFeed,
		},
		{
			title: "Report post",
			iconType: IconTypes.Report,
			iconColor: "#eb2121",
			onClick: handleReportPost,
			labelClass: "text-fans-red",
		},
	];

	useEffect(() => {
		// setPosts(postsData);
	}, []);

	return (
		<Layout>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={tw.style("pb-[66px]")}>
					<ScrollView
						horizontal
						contentContainerStyle={{
							paddingHorizontal: 18,
							paddingBottom: 9,
							columnGap: 15,
						}}
						showsHorizontalScrollIndicator={false}
						style={tw.style("border-b border-fans-grey")}
					></ScrollView>

					<View style={tw.style("px-[18px] mt-5")}>
						<TouchableOpacity
							style={tw.style(
								"w-full flex flex-row items-center justify-center py-2 border border-fans-purple rounded-[42px]",
							)}
						>
							<DocEditSvg width={13.72} height={13.69} />
							<Text
								style={tw.style(
									"text-[19px] font-bold text-fans-purple ml-2",
								)}
							>
								New Post New Post
							</Text>
						</TouchableOpacity>
					</View>

					{featureGates.has("2023_10-user-lists") && <UserLists />}

					<ScrollView
						contentContainerStyle={{
							rowGap: 16,
						}}
						showsVerticalScrollIndicator={false}
					>
						{posts.map((post) => (
							<PostCard
								key={post.id}
								data={post}
								onClickBookmark={() => onClickBookmark(post.id)}
								onClickLike={() => onChangeLike(post.id)}
								onClickActionMenu={() =>
									onClickPostActionMenu(post.id)
								}
								onClickMessage={() => onClickMessage(post.id)}
								onClickComment={() => {
									setSelectedPostId(post.id);
									setOpenCommentModal(true);
								}}
							/>
						))}

						<SuggestProfiles />
					</ScrollView>
				</View>
			</ScrollView>

			<SendMessageDialog
				open={openMessageDialog}
				onClose={() => setOpenMessageDialog(false)}
				onSubmit={handleSendMessage}
			/>

			<CardActions
				open={openActionMenu}
				onClose={() => setOpenActionMenu(false)}
				actions={postActions}
			/>
		</Layout>
	);
};

export default FansView;
