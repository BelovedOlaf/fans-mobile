import tw from "@lib/tailwind";
import React, { FC, useState, useEffect } from "react";
import { View } from "react-native";

import ModalHeader from "./modalHeader";
import { TextPostForm } from "@components/posts/share";
import { IconTypes, PostStepTypes } from "@usertypes/commonEnums";
import { IPostForm } from "@usertypes/types";
import { PostsActionType } from "@context/reducer/postsReducer";
import { IAppDispatch } from "@context/appContext";

interface Props {
	data: IPostForm;
	handlePrev: () => void;
	titleIcon: IconTypes;
	handleChangeTab: (tab: PostStepTypes) => void;
	dispatch: IAppDispatch;
}

const TextScreen: FC<Props> = (props) => {
	const { titleIcon, data, handlePrev, handleChangeTab, dispatch } = props;

	const [text, setText] = useState("");

	const handleNext = () => {
		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				caption: text,
			},
		});
		handleChangeTab(PostStepTypes.Caption);
	};

	const handleSave = () => {
		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				caption: text,
			},
		});
	};

	useEffect(() => {
		setText(data.caption);
	}, [data.caption]);

	return (
		<View style={tw.style("")}>
			<ModalHeader
				title="New Post"
				rightLabel="Next"
				onClickRight={handleNext}
				onClickLeft={handlePrev}
				titleIcon={titleIcon}
			/>
			<View style={tw.style("py-5")}>
				<View style={tw.style("w-full h-150 xl:h-[670px] px-8")}>
					<TextPostForm
						value={text}
						onChange={(val) => setText(val)}
						onPointerLeave={handleSave}
					/>
				</View>
			</View>
		</View>
	);
};

export default TextScreen;
