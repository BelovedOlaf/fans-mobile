import { SearchSvg } from "@assets/svgs/common";
import FormControl from "@components/common/FormControl";
import RoundButton from "@components/common/RoundButton";
import RoundTextInput from "@components/common/RoundTextInput";
import Title from "@components/common/Title";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import * as apis from "@helper/endpoints";
import { UserlistRespBody } from "@helper/endpoints/userlist/schemas";
import tw from "@lib/tailwind";
import {
	ComponentSizeTypes,
	RoundButtonType,
	SnapPoints,
} from "@usertypes/commonEnums";
import { IProfile } from "@usertypes/types";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CreatorChip from "./creatorChip";
import CreatorLine from "./creatorList";

export type CreateUserlistPayload = {
	title: string;
	creators: string[];
};

export type UpdateUserlistPayload = {
	id: string;
	title?: string;
	creators?: string[];
};

interface Props {
	open: boolean;
	onClose: () => void;
	userlist?: UserlistRespBody;
	onCreateUserlist: (payload: CreateUserlistPayload) => void;
	onUpdateUserlist: (payload: UpdateUserlistPayload) => void;
}

const CreateUserListMOdal: FC<Props> = (props) => {
	const { open, onClose, userlist, onUpdateUserlist, onCreateUserlist } =
		props;

	const [userlistName, setUserlistName] = useState("");
	const [query, setQuery] = useState("");
	const [queryInput, setQueryInput] = useState("");
	const [creators, setCreators] = useState<IProfile[]>([]);
	const [selectedCreators, setSelectedCreators] = useState<IProfile[]>([]);
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(10);
	const [total, setTotal] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const onSelectCreator = useCallback(
		(id: string) => {
			setSelectedCreators((prevState) => {
				const selectedCreator = creators.find((c) => c.id === id);
				if (
					selectedCreator &&
					!prevState.find((item) => item.id === id)
				) {
					return [...prevState, selectedCreator];
				}
				return prevState;
			});
		},
		[selectedCreators, setSelectedCreators, creators],
	);

	const onDeselectCreator = useCallback(
		(id: string) => {
			setSelectedCreators((prevState) => {
				const deselectedCreator = creators.find((c) => c.id === id);
				if (
					deselectedCreator &&
					prevState.find((item) => item.id === id)
				) {
					return prevState.filter((c) => c.id !== id);
				}
				return prevState;
			});
		},
		[selectedCreators, setSelectedCreators],
	);

	useEffect(() => {
		if (userlist) {
			setUserlistName(userlist.title);
			setSelectedCreators(userlist.creators);
			setQuery("");
		}
	}, [userlist]);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const resp = await apis.profile.getProfiles({
					page,
					size,
					name: query,
				});
				if (resp.ok) {
					setPage(resp.data.page);
					setSize(resp.data.size);
					setTotal(resp.data.total);
					setCreators((prevState) => [
						...prevState,
						...resp.data.profiles,
					]);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [page, size, query]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setQuery(queryInput);
			setPage(1);
			setCreators([]);
		}, 500);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [queryInput]);

	const handleEndReached = useCallback(() => {
		if (page * size < total) {
			setPage(page + 1);
		}
	}, [page, size, total]);

	const handleClickSubmit = () => {
		if (userlist) {
			onUpdateUserlist({
				id: userlist.id,
				title: userlistName,
				creators: selectedCreators.map((c) => c.id),
			});
		} else {
			onCreateUserlist({
				title: userlistName,
				creators: selectedCreators.map((c) => c.id),
			});
		}
	};

	return (
		<BottomSheetWrapper
			open={open}
			onClose={onClose}
			snapPoint={SnapPoints.Ninety}
		>
			<View
				style={tw.style(
					"relative mb-[30px] px-[18px] justify-center flex-row",
				)}
			>
				<Title
					size={ComponentSizeTypes.lg}
					style="text-center flex-none"
				>
					Add or edit list
				</Title>
			</View>

			<View style={tw.style("px-[18px] pb-5")}>
				<View style={tw.style("mb-[30px]")}>
					<Title style="mb-[15px]">
						List name
						<Text style={tw.style("text-[#eb2121]")}>*</Text>
					</Title>
					<FormControl
						value={userlistName}
						onChangeText={(text: string) => {
							setUserlistName(text);
						}}
						placeholder="e.g. Friends"
					/>
				</View>

				<View style={tw.style("mb-2")}>
					<Title style="mb-[15px]">Add users</Title>

					{selectedCreators.length > 0 ? (
						<View
							style={tw.style(
								"flex-row bg-fans-grey py-1 px-[5px] rounded-[24px] flex-wrap gap-1",
							)}
						>
							{selectedCreators.map((creator) => (
								<CreatorChip
									data={creator}
									key={`tag-${creator.id}`}
									onCancel={() =>
										onDeselectCreator(creator.id)
									}
								/>
							))}
						</View>
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
							value={queryInput}
							onChangeText={setQueryInput}
						/>
					)}
				</View>

				<View style={tw.style("max-h-[200px] min-h-[150px]")}>
					<FlatList
						renderItem={({ item: creator }) => (
							<CreatorLine
								data={creator}
								isSelected={selectedCreators
									.map((c) => c.id)
									.includes(creator.id)}
								key={creator.id}
								onSelect={() => onSelectCreator(creator.id)}
								onDeselect={() => onDeselectCreator(creator.id)}
							/>
						)}
						data={creators}
						keyExtractor={(creator) => creator.id}
						onEndReached={handleEndReached}
						onEndReachedThreshold={0.5}
					/>
				</View>

				<View style={tw.style("pt-[2px]")}>
					<RoundButton
						disabled={
							userlistName.length === 0 ||
							selectedCreators.length === 0
						}
						variant={RoundButtonType.OUTLINE_PRIMARY}
						onPress={handleClickSubmit}
					>
						{userlist ? "Update list" : "Create list"}
					</RoundButton>
				</View>
			</View>
		</BottomSheetWrapper>
	);
};

export default CreateUserListMOdal;
