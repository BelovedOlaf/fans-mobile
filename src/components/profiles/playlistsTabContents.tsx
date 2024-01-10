import { MusicSvg } from "@assets/svgs/common";
import RoundButton from "@components/common/RoundButton";
import PlayListCard from "@components/posts/playListCard";
import { ProfileActionType, useAppContext } from "@context/useAppContext";
import { deletePlaylist } from "@helper/endpoints/profile/apis";
import tw from "@lib/tailwind";
import { RoundButtonType } from "@usertypes/commonEnums";
import { IPlayList } from "@usertypes/types";
import React, { FC, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import FilterButton from "./filterButton";
import { SubscribeAlert } from "@components/profiles";

interface Props {
	playlists: IPlayList[];
	needToSubscribe?: boolean;
	isSuggested?: boolean;
	onClickMenus: (id: string) => void;
	handleAdd: () => void;
	handleEdit: (id: string) => void;
	onClickSubscribe?: () => void;
}

const PlaylistsTabContents: FC<Props> = (props) => {
	const {
		playlists,
		isSuggested,
		onClickMenus,
		handleAdd,
		handleEdit,
		onClickSubscribe,
		needToSubscribe,
	} = props;
	const { dispatch } = useAppContext();

	const filters = ["Newest", "Oldest", "Most content"];
	const [filter, setFilter] = useState("Newest");

	const onClickEdit = (id: string) => {
		handleEdit(id);
	};

	const onClickDelete = async (id: string) => {
		dispatch.setShowLoading();
		const resp = await deletePlaylist({ id: id }, { id: id });
		if (resp.ok) {
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					playlists: playlists.filter(
						(playlist) => playlist.id !== id,
					),
				},
			});
		} else {
			Toast.show({
				type: "error",
				text1: "Failed to delete playlist.",
			});
		}

		dispatch.setHideLoading();
	};

	return (
		<View style={tw.style("pt-4 px-[17.5px]", needToSubscribe && "px-0")}>
			<View style={tw.style("px-[18px] md:px-0")}>
				<SubscribeAlert
					icon="playlist"
					hide={!needToSubscribe}
					text={`To view ${playlists.length} playlists, subscribe to this creator`}
					onSubscribe={onClickSubscribe}
				/>
			</View>

			{isSuggested ? (
				<View
					style={tw.style(
						"flex-row gap-x-2",
						needToSubscribe && "hidden",
					)}
				>
					{filters.map((el) => (
						<FilterButton
							title={el}
							selected={filter === el}
							onClick={() => setFilter(el)}
							key={el}
						/>
					))}
				</View>
			) : (
				<RoundButton
					variant={RoundButtonType.OUTLINE_PRIMARY}
					icon={() => (
						<MusicSvg
							width={13.18}
							height={14.86}
							color="#a854f5"
						/>
					)}
					onPress={handleAdd}
				>
					Add playlist
				</RoundButton>
			)}

			<View style={tw.style("mt-[26px]", needToSubscribe && "hidden")}>
				{(needToSubscribe ? [] : playlists).map((playlist) => (
					<PlayListCard
						key={playlist.id}
						data={playlist}
						onClickEdit={() => onClickEdit(playlist.id)}
						onClickDelete={() => onClickDelete(playlist.id)}
						isSuggested={isSuggested}
						onClickMenus={() => onClickMenus(playlist.id)}
					/>
				))}
			</View>
		</View>
	);
};

export default PlaylistsTabContents;
