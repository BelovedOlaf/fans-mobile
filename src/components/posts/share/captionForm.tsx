import { ChevronRightSvg } from "@assets/svgs/common";
import RoundTextInput from "@components/common/RoundTextInput";
import { FypNullableView, FypVideo } from "@components/common/base";
import { FansText, FansView } from "@components/controls";
import { postPropertyLinks } from "@constants/common";
import { cdnURL } from "@helper/Utils";
import tw from "@lib/tailwind";
import { PostStepTypes, PostType, ResizeMode } from "@usertypes/commonEnums";
import { IPostForm, IPostPropertyLink } from "@usertypes/types";
import React, { FC, useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";

interface LinkRowProps {
	title: string;
	onPress: () => void;
}

export const LinkRow: FC<LinkRowProps> = (props) => {
	const { title, onPress } = props;

	return (
		<Pressable
			style={tw.style("flex-row items-center justify-between py-[14px]")}
			onPress={onPress}
		>
			<FansText fontSize={18} lineHeight={24}>
				{title}
			</FansText>
			<FansView style={tw.style("w-[8.14px] h-[14.28px]")}>
				<ChevronRightSvg color={tw.color("fans-grey-dark")} />
			</FansView>
		</Pressable>
	);
};

interface Props {
	data: IPostForm;
	caption: string;
	onChangeCaption: (val: string) => void;
	onNavigateLink: (link: IPostPropertyLink) => void;
}

const CaptionForm: FC<Props> = (props) => {
	const { data, caption, onChangeCaption, onNavigateLink } = props;

	const [value, setValue] = useState("");

	const getPropertyLinks = () => {
		switch (data.type) {
			case PostType.Text:
				return postPropertyLinks.filter(
					(link) =>
						![
							PostStepTypes.TagPeople,
							PostStepTypes.Location,
						].includes(link.stepType),
				);
			case PostType.Audio:
				return postPropertyLinks.filter(
					(link) =>
						![
							PostStepTypes.PaidPost,
							PostStepTypes.TagPeople,
						].includes(link.stepType),
				);
			default:
				return postPropertyLinks;
		}
	};

	useEffect(() => {
		setValue(caption);
	}, [caption]);

	console.log("data.medias", data.medias);

	return (
		<View>
			<View
				style={tw.style(
					"flex-row justify-center mb-[14px] md:hidden",
					data.type === PostType.Text && "hidden",
				)}
			>
				<FypNullableView visible={!!data.thumb?.uri}>
					<Image
						source={{
							uri: cdnURL(data.thumb?.uri),
						}}
						style={tw.style("w-[95px] h-[95px] rounded-[7px]")}
					/>
				</FypNullableView>
				<FypNullableView
					visible={
						!data.thumb?.uri &&
						data.type === PostType.Video &&
						data.medias.length > 0
					}
				>
					<FansView width={95} height={95}>
						<FypVideo
							source={{
								uri: cdnURL(data.medias[0]?.uri) ?? "",
							}}
							resizeMode={ResizeMode.COVER}
							style={tw.style("w-full h-full")}
						/>
					</FansView>
				</FypNullableView>
			</View>

			<View style={tw.style("mb-6")}>
				{data.type === PostType.Text ? (
					<View
						style={tw.style(
							"p-6 rounded-[15px] bg-fans-purple-light",
						)}
					>
						<FansText fontSize={16} lineHeight={21}>
							{data.caption}
						</FansText>
					</View>
				) : (
					<RoundTextInput
						value={value}
						onChangeText={(val) => setValue(val)}
						placeholder="Write a caption..."
						multiline
						numberOfLines={4}
						maxLength={1000}
						customStyles="py-3 px-5 rounded-[7px] h-[128px]"
						onPointerLeave={() => onChangeCaption(value)}
					/>
				)}

				{/* <View style={tw.style("w-[172px] mx-auto mt-[14px]")}>
						<RoundButton
							variant={RoundButtonType.OUTLINE_PRIMARY}
							icon={() => (
								<CaptionSvg
									width={19.75}
									height={12.35}
									color="#a854f5"
								/>
							)}
						>
							AI Caption
						</RoundButton>
					</View> */}
			</View>

			<View style={tw.style("gap-y-1")}>
				{getPropertyLinks().map((link) => (
					<LinkRow
						key={link.title}
						title={link.title}
						onPress={() => {
							onChangeCaption(value);
							onNavigateLink(link);
						}}
					/>
				))}
			</View>
		</View>
	);
};

export default CaptionForm;
