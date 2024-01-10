import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";

import { FansText } from "@components/controls";
import { PreviewImageField } from "@components/posts/common";
import { FypNullableView } from "@components/common/base";
import FormControl from "@components/common/FormControl";
import RoundButton from "@components/common/RoundButton";

import tw from "@lib/tailwind";
import useDocumentPicker from "@utils/useDocumentPicker";
import { PostsAction } from "@context/reducer/postsReducer";
import { PostsActionType } from "@context/useAppContext";
import { IPickerMedia, IPostForm } from "@usertypes/types";
import { validateNumberString } from "@utils/stringHelper";
import { PostType } from "@usertypes/commonEnums";

interface Props {
	postForm: IPostForm;
	inProgress: boolean;
	onGoToBack: () => void;
	handleUpdatePostContext: <P extends PostsAction>(
		actionType: P["type"],
		data: P["data"],
	) => void;
}

const PaidPostForm: FC<Props> = (props) => {
	const { postForm, onGoToBack, handleUpdatePostContext, inProgress } = props;
	const { useImagePicker } = useDocumentPicker();
	const [price, setPrice] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [coverImg, setCoverImg] = useState<IPickerMedia>({
		uri: "",
		isPicker: false,
	});

	const handleChangeImage = async () => {
		const result = await useImagePicker();
		if (result?.ok) {
			const medias = result.data ?? [];
			if (medias.length > 0) {
				setCoverImg(medias[0]);
			}
		}
	};

	const handleSaveData = () => {
		setIsSubmitted(true);
		if (!validateNumberString(price)) {
			return;
		}
		if (parseFloat(price) > 200 || parseFloat(price ?? "0") < 0) {
			return;
		}
		handleUpdatePostContext(PostsActionType.updatePostForm, {
			paidPost: {
				currency: "USD",
				price: price,
				thumb: coverImg,
			},
		});
	};

	const handleSend = () => {
		handleSaveData();
		onGoToBack();
	};

	useEffect(() => {
		setPrice(postForm.paidPost?.price as string);
		if (postForm.paidPost) {
			setCoverImg(postForm.paidPost.thumb);
		}
	}, []);

	return (
		<View>
			<View style={tw.style("px-[18px] md:px-0 mb-7")}>
				<FansText
					fontSize={16}
					lineHeight={21}
					style={tw.style("text-center mb-11")}
				>
					Charge money for your subscribers to see this post. This can
					increase your earnings
				</FansText>

				<FormControl
					label="Price (USD)"
					placeholder="e.g.25"
					value={price}
					onChangeText={(val: string) => setPrice(val)}
					hasError={
						(isSubmitted && !validateNumberString(price)) ||
						parseFloat(price ?? "0") > 200 ||
						parseFloat(price ?? "0") < 0
					}
					validateString={
						!price
							? "Please enter price"
							: "Price should be max $200"
					}
					keyboardType="numeric"
					styles="mb-7"
					onPointerLeave={handleSaveData}
				/>
			</View>

			<FypNullableView visible={postForm.type !== PostType.Text}>
				<PreviewImageField
					label="Preview image (optional)"
					style="mb-7"
					onChangeImage={handleChangeImage}
					data={coverImg}
				/>
			</FypNullableView>

			<View style={tw.style("px-[18px] md:px-0 mb-13")}>
				<RoundButton onPress={handleSend} loading={inProgress}>
					Save
				</RoundButton>
			</View>
		</View>
	);
};

export default PaidPostForm;
