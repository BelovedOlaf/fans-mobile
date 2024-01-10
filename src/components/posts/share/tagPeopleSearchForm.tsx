import { ScrollView, Pressable, NativeScrollEvent } from "react-native";
import React, { FC, useState, useEffect } from "react";

import { FansView, FansText } from "@components/controls";
import SearchTextInput from "@components/common/searchTextInput";
import UserLine from "@components/posts/dialogs/userListDialog/userLine";

import tw from "@lib/tailwind";
import { IPostForm, IUserInfo } from "@usertypes/types";
import { UsersRespBody } from "@helper/endpoints/users/schemas";
import { getUsers } from "@helper/endpoints/users/apis";
import { IAppDispatch } from "@context/appContext";
import { PostsActionType } from "@context/useAppContext";

interface Props {
	postForm: IPostForm;
	dispatch: IAppDispatch;
	onSaveCallback: () => void;
}

const TagPeopleSearchForm: FC<Props> = (props) => {
	const { postForm, dispatch, onSaveCallback } = props;
	const { carouselIndex, newUsertags, medias } = postForm;
	const [isLoading, setIsLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [users, setUsers] = useState<UsersRespBody>({
		users: [],
		page: 1,
		total: 0,
		size: 10,
	});

	const onChangeSearch = (query: string) => {
		setSearchQuery(query);
		setUsers({
			...users,
			page: 1,
			total: 0,
		});
	};

	const fetchUsers = async () => {
		const params = {
			page: users.page,
			size: 10,
			query: searchQuery,
		};
		const resp = await getUsers(params);
		if (resp.ok) {
			setUsers({
				...resp.data,
				users:
					resp.data.page === 1
						? resp.data.users
						: [...users.users, ...resp.data.users],
			});
			setIsLoading(false);
		}
	};

	const onScrollView = (nativeEvent: NativeScrollEvent) => {
		const paddingToBottom = 20;
		const isScrollEnd =
			nativeEvent.layoutMeasurement.height +
				nativeEvent.contentOffset.y >=
			nativeEvent.contentSize.height - paddingToBottom;
		if (isScrollEnd && !isLoading) {
			if (users.total > 10 * users.page) {
				setIsLoading(true);
				setUsers({
					...users,
					page: users.page + 1,
				});
			}
		}
	};

	const handleToggleUser = (user: IUserInfo) => {
		const uploadId = medias[carouselIndex].id;
		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				newUsertags: newUsertags.map((userTag) =>
					userTag.uploadId === uploadId
						? {
								...userTag,
								usertags: userTag.usertags.map((tag) =>
									tag.user
										? tag
										: {
												...tag,
												user: user,
												userId: user.profile?.userId,
										  },
								),
						  }
						: userTag,
				),
			},
		});
		onSaveCallback();
	};

	useEffect(() => {
		setSearchQuery("");
	}, []);

	useEffect(() => {
		fetchUsers();
	}, [searchQuery, users.page]);
	console.log(newUsertags);
	return (
		<FansView>
			<FansView
				flexDirection="row"
				alignItems="center"
				gap={19}
				margin={{ b: 24 }}
			>
				<FansView flex="1">
					<SearchTextInput
						value={searchQuery}
						onChangeText={onChangeSearch}
					/>
				</FansView>
				<Pressable onPress={() => setSearchQuery("")}>
					<FansText fontSize={19} lineHeight={26}>
						Cancel
					</FansText>
				</Pressable>
			</FansView>
			<FansView style={tw.style("max-h-100 min-h-[150px]")}>
				<ScrollView
					showsVerticalScrollIndicator={true}
					onScroll={({ nativeEvent }) => onScrollView(nativeEvent)}
					scrollEventThrottle={30}
					style={tw.style("h-100")}
				>
					{users.users.map((user) => (
						<UserLine
							avatar={user.avatar ?? ""}
							username={user.username}
							displayName={user.displayName}
							key={user.username}
							onSelect={() => handleToggleUser(user)}
						/>
					))}
				</ScrollView>
			</FansView>
		</FansView>
	);
};

export default TagPeopleSearchForm;
