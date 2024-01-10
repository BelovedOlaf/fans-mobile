import { ListSvg, ChevronLeftSvg, SearchSvg } from "@assets/svgs/common";
import UserList from "./userList";
import UserChip from "./userChip";
import UserLine from "./userLine";
import { FypText } from "@components/common/base";
import RoundButton from "@components/common/RoundButton";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import { FansDivider, FansView } from "@components/controls";
import FormControl from "@components/common/FormControl";
import RoundTextInput from "@components/common/RoundTextInput";

import tw from "@lib/tailwind";
import { RoundButtonType } from "@usertypes/commonEnums";
import { IUserList } from "@usertypes/types";
import * as apis from "@helper/endpoints";
import { SubscribedProfilesRespBody } from "@helper/endpoints/userlist/schemas";

import React, { FC, Fragment, useState, useEffect } from "react";
import { IconButton } from "react-native-paper";
import { ScrollView, NativeScrollEvent } from "react-native";

interface PinStepContentsProps {
	usersLists: IUserList[];
	onToggleUserListActive: (id: string, val: boolean) => void;
	onEditUserList: (id: string) => void;
}

export const PinStepContents: FC<PinStepContentsProps> = (props) => {
	const { usersLists, onToggleUserListActive, onEditUserList } = props;
	return (
		<FansView padding={{ b: 24, x: 18 }}>
			<FypText
				fontSize={19}
				lineHeight={26}
				fontWeight={700}
				style={tw.style("text-center mb-3")}
			>
				Pin to home
			</FypText>

			<FansView margin={{ b: 13 }}>
				{usersLists.map((userList) => (
					<Fragment key={userList.id}>
						<UserList
							data={userList}
							onChangeActive={(val) =>
								onToggleUserListActive(userList.id, val)
							}
							onEidtUserList={onEditUserList}
						/>
						<FansDivider />
					</Fragment>
				))}
			</FansView>

			<RoundButton
				variant={RoundButtonType.OUTLINE_PRIMARY}
				icon={() => (
					<ListSvg width={14.78} height={14} color="#a854f5" />
				)}
				style={tw.style("items-center")}
				onPress={() => onEditUserList("")}
			>
				Create list
			</RoundButton>
		</FansView>
	);
};

interface FormContentsProps {
	onClickBack: () => void;
	userList?: IUserList;
	onClose: () => void;
}

export const FormContents: FC<FormContentsProps> = (props) => {
	const { onClickBack, userList, onClose } = props;

	const [title, setTitle] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [userIds, setUserIds] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmit, setIsSubmit] = useState(false);
	const [profiles, setProfiles] = useState<SubscribedProfilesRespBody>({
		profiles: [],
		page: 1,
		size: 10,
		total: 0,
	});

	const onToggleCreator = (userId: string) => {
		if (!userIds.includes(userId)) {
			setUserIds([...userIds, userId]);
		} else {
			setUserIds(userIds.filter((el) => el !== userId));
		}
	};

	const onRemoveUser = (userId: string) => {
		setUserIds(userIds.filter((el) => el !== userId));
	};

	const handleSubmit = async () => {
		setIsSubmit(true);
		if (title === "") {
			return;
		}
		const postbody = {
			title: title,
			creators: userIds,
		};
		setIsLoading(true);
		if (userList) {
			await apis.userlist.updateUserlist(postbody, {
				id: userList.id,
			});
			setIsLoading(false);
			onClose();
		} else {
			await apis.userlist.createUserlist(postbody);
			setIsLoading(false);
			onClose();
		}
	};

	const fetchProfiles = async () => {
		const query = {
			page: 1,
			size: 10,
		};
		const resp = await apis.userlist.getSubscribedProfiles(query);
		setIsLoading(false);
		if (resp.ok) {
			setProfiles({
				...resp.data,
				profiles:
					resp.data.page === 1
						? resp.data.profiles
						: [...profiles.profiles, ...resp.data.profiles],
			});
		}
	};

	const onScrollView = (nativeEvent: NativeScrollEvent) => {
		const paddingToBottom = 20;
		const isScrollEnd =
			nativeEvent.layoutMeasurement.height +
				nativeEvent.contentOffset.y >=
			nativeEvent.contentSize.height - paddingToBottom;
		if (isScrollEnd && !isLoading) {
			if (profiles.total > 10 * profiles.page) {
				setIsLoading(true);
				setProfiles({
					...profiles,
					page: profiles.page + 1,
				});
			}
		}
	};

	useEffect(() => {
		if (userList) {
			setTitle(userList?.title ?? "");
			setUserIds(userList?.creators.map((creator) => creator.id));
		} else {
			setTitle("");
			setUserIds([]);
		}

		setSearchQuery("");
	}, [userList]);

	useEffect(() => {
		fetchProfiles();
	}, []);

	useEffect(() => {
		fetchProfiles();
	}, [profiles.page]);

	return (
		<FansView padding={{ b: 24 }}>
			<FansView
				position="relative"
				margin={{ b: 30 }}
				padding={{ x: 18 }}
				justifyContent="center"
				flexDirection="row"
			>
				<IconButton
					icon={() => (
						<ChevronLeftSvg color="#707070" width={7} height={13} />
					)}
					onPress={onClickBack}
					size={20}
					style={tw.style("w-6 h-6 absolute left-1 z-10 mt-0")}
				/>
				<FypText
					fontSize={19}
					lineHeight={26}
					fontWeight={700}
					textAlign="center"
				>
					Add or edit list
				</FypText>
			</FansView>

			<FansView padding={{ x: 18 }}>
				<FansView margin={{ b: 30 }}>
					<FypText
						fontSize={17}
						lineHeight={22}
						fontWeight={600}
						style={tw.style("mb-[15px]")}
					>
						List name
						<FypText style={tw.style("text-[#eb2121]")}>*</FypText>
					</FypText>
					<FormControl
						value={title}
						onChangeText={(text: string) => {
							setTitle(text);
						}}
						placeholder="e.g. Friends"
						hasError={isSubmit && title === ""}
						validateString="Title is required field."
					/>
				</FansView>

				<FansView margin={{ b: 8 }}>
					<FypText
						fontSize={17}
						lineHeight={22}
						fontWeight={600}
						style={tw.style("mb-[15px]")}
					>
						Add Creators
					</FypText>

					{userIds.length > 0 ? (
						<FansView
							flexDirection="row"
							borderRadius={24}
							flexWrap="wrap"
							gap={4}
							padding={{ y: 4, x: 5 }}
							background="fans-grey"
							style={tw.style("min-h-[42px]")}
						>
							{profiles.profiles
								.filter((creator) =>
									userIds.includes(creator.id),
								)
								.map((user) => (
									<UserChip
										creator={user}
										key={user.id}
										onCancel={() => onRemoveUser(user.id)}
									/>
								))}
						</FansView>
					) : (
						<RoundTextInput
							icon={
								<SearchSvg
									width={13.14}
									height={13.26}
									color="#000"
								/>
							}
							placeholder="Search"
							customStyles="pl-11"
							value={searchQuery}
							onChangeText={setSearchQuery}
						/>
					)}
				</FansView>

				<FansView style={tw.style("max-h-[200px] min-h-[150px]")}>
					<ScrollView
						showsVerticalScrollIndicator={true}
						onScroll={({ nativeEvent }) =>
							onScrollView(nativeEvent)
						}
						scrollEventThrottle={30}
					>
						{profiles.profiles
							.filter(
								(creator) =>
									creator.displayName
										.toLowerCase()
										.includes(searchQuery.toLowerCase()) ||
									creator.username?.includes(
										searchQuery.toLowerCase(),
									),
							)
							.map((user) => (
								<UserLine
									avatar={user.avatar}
									displayName={user.displayName}
									username={user.username ?? ""}
									selected={userIds.includes(user.id)}
									key={user.id}
									onSelect={() => onToggleCreator(user.id)}
								/>
							))}
					</ScrollView>
				</FansView>

				<FansView padding={{ t: 2 }}>
					<RoundButton
						variant={RoundButtonType.OUTLINE_PRIMARY}
						onPress={handleSubmit}
						loading={isLoading}
					>
						{userList ? "Update list" : "Create list"}
					</RoundButton>
				</FansView>
			</FansView>
		</FansView>
	);
};

interface Props {
	open: boolean;
	onClose: () => void;
	usersLists: IUserList[];
	onChangeUserListActive: (userListId: string, active: boolean) => void;
}

const UserListModal: FC<Props> = (props) => {
	const { open, onClose, usersLists, onChangeUserListActive } = props;

	const [userListId, setUserListId] = useState("");
	const [step, setStep] = useState<"pin" | "form">("pin");

	useEffect(() => {
		setStep("pin");
		setUserListId("");
	}, [open]);

	return (
		<BottomSheetWrapper open={open} onClose={onClose}>
			{step === "pin" ? (
				<PinStepContents
					usersLists={usersLists}
					onToggleUserListActive={onChangeUserListActive}
					onEditUserList={(id) => {
						setUserListId(id);
						setStep("form");
					}}
				/>
			) : (
				<FormContents
					onClickBack={() => {
						setStep("pin");
						setUserListId("");
					}}
					userList={usersLists.find(
						(userlist) => userlist.id === userListId,
					)}
					onClose={onClose}
				/>
			)}
		</BottomSheetWrapper>
	);
};

export default UserListModal;
