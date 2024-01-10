import RoundButton from "@components/common/RoundButton";
import CustomTopNavBar from "@components/common/customTopNavBar";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import {
	DeleteHighlightModal,
	EditHighlightCell,
} from "@components/profiles/highlights";
import { defaultHighlight } from "@constants/common";
import { ProfileActionType, useAppContext } from "@context/useAppContext";
import * as apis from "@helper/endpoints";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RoundButtonType } from "@usertypes/commonEnums";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const HighlightsScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "Highlights">,
) => {
	const { navigation } = props;

	const insets = useSafeAreaInsets();

	const { dispatch, state } = useAppContext();
	const { highlights } = state.profile;

	const [inProgress, setInProgress] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [selectedId, setSelectedId] = useState("");

	const handleDelete = async () => {
		setInProgress(true);
		setOpenDeleteModal(false);
		const resp = await apis.profile.deleteHighlight(
			{ id: selectedId },
			{ id: selectedId },
		);
		setInProgress(false);
		if (resp.ok) {
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					highlights: highlights.filter(
						(highlight) => highlight.id !== selectedId,
					),
				},
			});
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
		}
	};

	const onClickAdd = () => {
		dispatch.setProfile({
			type: ProfileActionType.updateProfile,
			data: {
				highlightForm: defaultHighlight,
			},
		});
		navigation.navigate("HighlightStories");
	};

	const onClickEdit = (highlightId: string) => {
		dispatch.setProfile({
			type: ProfileActionType.updateProfile,
			data: {
				highlightForm: highlights.find(
					(highlight) => highlight.id === highlightId,
				),
			},
		});
		navigation.navigate("HighlightStories");
	};

	const onClickDelete = (highlightId: string) => {
		setSelectedId(highlightId);
		setOpenDeleteModal(true);
	};

	return (
		<AppLayout
			title="Edit Profile | FYP.Fans"
			description="FYP.Fans allows creators to make an income doing what they love!"
		>
			<View style={tw.style("flex-1")}>
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer>
						<CustomTopNavBar
							title="Edit highlights"
							onClickLeft={() => navigation.goBack()}
							onClickRight={() => navigation.goBack()}
							rightLabel="Save"
							loading={inProgress}
						/>
						<View
							style={[
								{
									paddingBottom: insets.bottom + 35,
								},
								tw.style("px-[18px]"),
							]}
						>
							{highlights.map((highlight) => (
								<EditHighlightCell
									key={highlight.id}
									data={highlight}
									onClickEdit={() =>
										onClickEdit(highlight.id)
									}
									onClickTrash={() =>
										onClickDelete(highlight.id)
									}
								/>
							))}

							<View style={tw.style("mt-3 gap-y-[34px]")}>
								<RoundButton
									variant={RoundButtonType.OUTLINE_PRIMARY}
									onPress={onClickAdd}
								>
									Add highlights
								</RoundButton>
							</View>
						</View>

						<DeleteHighlightModal
							visible={openDeleteModal}
							handleClose={() => {
								setOpenDeleteModal(false);
								setSelectedId("");
							}}
							handleConfirm={handleDelete}
							data={highlights.find(
								(highlight) => highlight.id === selectedId,
							)}
						/>
					</LayoutContentsContainer>
				</ScrollView>
			</View>
		</AppLayout>
	);
};

export default HighlightsScreen;
