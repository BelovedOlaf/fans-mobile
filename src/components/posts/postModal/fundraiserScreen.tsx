import { View } from "react-native";
import React, { FC, useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

import ModalHeader from "./modalHeader";
import ScreenWrapper from "./screenWrapper";

import { FundraiserForm } from "../share";
import { IPostForm, IPickerMedia, IFundraiser } from "@usertypes/types";
import { PostStepTypes, IconTypes } from "@usertypes/commonEnums";
import { defaultFundraiserFormData } from "@constants/defaultFormData";

interface Props {
	data: IPostForm;
	step: PostStepTypes;
	handleChangeTab: (tab: PostStepTypes) => void;
	handleAddFundraiser: (
		fundraiser: IFundraiser,
		coverImg: IPickerMedia,
	) => void;
	handleCloseModal: () => void;
}

const FundraiserScreen: FC<Props> = (props) => {
	const {
		data,
		handleChangeTab,
		handleAddFundraiser,
		step,
		handleCloseModal,
	} = props;

	const [formData, setFormData] = useState<IFundraiser>(
		defaultFundraiserFormData,
	);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [coverImg, setCoverImg] = useState<IPickerMedia>({
		uri: "",
		isPicker: false,
	});
	const [availableEndTime, setAvailableEndTime] = useState(false);

	const handleChangeForm = (name: string, val: string | boolean) => {
		setFormData({
			...formData,
			[name]: val,
		});
	};

	const onAddFundraiser = async () => {
		setIsSubmitted(true);
		if (
			formData.title === "" ||
			formData.price === "" ||
			formData.timezone === ""
		) {
			return;
		}
		handleAddFundraiser(formData, coverImg);
	};

	const onChangeImage = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: false,
				aspect: [4, 3],
				quality: 1,
				allowsMultipleSelection: false,
			});

			if (!result.canceled) {
				setCoverImg({
					uri: result.assets[0].uri,
					isPicker: true,
				});
			}
		} catch (error) {
			console.log("Error picking image:", error);
		}
	};

	const onClickBack = () => {
		if (step === PostStepTypes.AddFundraiser) {
			handleChangeTab(PostStepTypes.Caption);
		} else {
			handleCloseModal;
		}
	};

	useEffect(() => {
		setFormData(data.fundraiser);
		setCoverImg({
			uri: data.fundraiser.thumb,
			isPicker: false,
		});
	}, []);

	return (
		<View>
			<ModalHeader
				title={
					step === PostStepTypes.AddFundraiser
						? "Add fundraiser"
						: "New post"
				}
				rightLabel={
					step === PostStepTypes.AddFundraiser ? "Save" : "Share"
				}
				onClickRight={onAddFundraiser}
				onClickLeft={onClickBack}
				titleIcon={
					step === PostStepTypes.NewFundraiserPost
						? IconTypes.Fundraiser
						: undefined
				}
				leftIcon={
					step === PostStepTypes.NewFundraiserPost
						? IconTypes.Close
						: undefined
				}
			/>
			<ScreenWrapper>
				<FundraiserForm
					formData={formData}
					coverImg={coverImg}
					isSubmitted={isSubmitted}
					handleChangeForm={handleChangeForm}
					onChangeImage={onChangeImage}
					handleAddFundraiser={onAddFundraiser}
					// availableEndTime={availableEndTime}
					// onChangeAvailableTime={(val) => setAvailableEndTime(val)}
				/>
			</ScreenWrapper>
		</View>
	);
};

export default FundraiserScreen;
