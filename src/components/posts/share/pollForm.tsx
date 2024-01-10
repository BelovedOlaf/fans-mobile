import { PlusSvg } from "@assets/svgs/common";
import FormControl from "@components/common/FormControl";
import RoundButton from "@components/common/RoundButton";
import CustomRadio from "@components/common/customRadio";
import CustomSwitch from "@components/common/customSwitch";
import CustomText from "@components/common/customText";
import { FansDivider } from "@components/controls";
import { PollAnswer, PreviewImageField } from "@components/posts/common";
import tw from "@lib/tailwind";
import { RoundButtonType } from "@usertypes/commonEnums";
import { IPickerMedia, IPoll } from "@usertypes/types";
import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";

interface Props {
	formData: IPoll;
	isSubmitted: boolean;
	handleAddAnswer: () => void;
	onAddPoll: () => void;
	onChangeImage: () => void;
	onChangeField: (name: string, val: string | boolean) => void;
	onDeleteAnswer: (index: number) => void;
	onChangeAnswer: (val: string, index: number) => void;
	voteType: string;
	onChangeVoteType: (val: string) => void;
	publicResult: boolean;
	onChangePublicResult: (val: boolean) => void;
	coverImg: IPickerMedia;
	availableEndTime?: boolean;
	onChangeAvailableEndTime?: (val: boolean) => void;
	hideAddBtn?: boolean;
}

const PollForm: FC<Props> = (props) => {
	const {
		formData,
		handleAddAnswer,
		onAddPoll,
		onChangeImage,
		onChangeField,
		isSubmitted,
		onDeleteAnswer,
		onChangeAnswer,
		voteType,
		onChangeVoteType,
		publicResult,
		onChangePublicResult,
		coverImg,
		availableEndTime,
		onChangeAvailableEndTime,
		hideAddBtn,
	} = props;

	return (
		<View>
			<View style={tw.style("px-[18px] md:px-0 mb-7")}>
				<CustomText size="base" style="text-center mb-11">
					Create a poll below your post to ask your fans questions and
					get feedback
				</CustomText>

				<FormControl
					label="Question"
					placeholder="e.g.Favorite content"
					value={formData.question}
					onChangeText={(val: string) =>
						onChangeField("question", val)
					}
					hasError={isSubmitted && formData.question === ""}
					validateString="Please enter question."
					styles="mb-[30px]"
				/>

				<FormControl
					label="Description (optional)"
					placeholder="e.g.Favorite content"
					value={formData.caption}
					onChangeText={(val: string) =>
						onChangeField("caption", val)
					}
					styles="mb-[30px]"
					isTextArea
				/>

				<View>
					<CustomText size="lg" style="mb-[15px]">
						Answers
					</CustomText>
					<View style={tw.style("gap-y-3 mb-3")}>
						{formData.answers.map((answer, i) => (
							<PollAnswer
								value={answer}
								onCancel={() => onDeleteAnswer(i)}
								onChange={(val) => onChangeAnswer(val, i)}
								placeholder={`Option ${i + 1}`}
								key={i}
							/>
						))}
					</View>

					<Pressable
						style={tw.style("flex-row items-center")}
						onPress={handleAddAnswer}
					>
						<PlusSvg width={11.6} height={11.6} color="#a854f5" />
						<CustomText size="lg" style="text-fans-purple ml-3">
							Add option
						</CustomText>
					</Pressable>
				</View>
			</View>

			<PreviewImageField
				label="Preview image (optional)"
				style="mb-[34px]"
				onChangeImage={onChangeImage}
				data={coverImg}
			/>

			<View style={tw.style("px-[18px] md:px-0")}>
				{/* <View style={tw.style("mb-[30px]")}>
					<CustomText size="lg" style="mb-4">
						Duration
					</CustomText>
				</View>

				<View style={tw.style("mb-7")}>
					<View style={tw.style("mb-4 flex-row items-center justify-between")}>
						<CustomText size="lg" style="">
							End time
						</CustomText>
						{onChangeAvailableEndTime ? (
							<CustomSwitch
								value={availableEndTime ?? false}
								onValueChange={onChangeAvailableEndTime}
							/>
						) : null}
					</View>
					<CustomMaskInput
						value={endTime}
						onChangeText={(val) => setEndTime(val)}
						type="time"
						placeholder="hh:mm"
					/>
				</View> */}

				<View style={tw.style("mb-4")}>
					<CustomText size="lg" style="mb-3">
						Privacy
					</CustomText>
					<View
						style={tw.style(
							"flex-row items-center justify-between h-13",
						)}
					>
						<Text style={tw.style("text-[18px] leading-6")}>
							Public results
						</Text>
						<CustomSwitch
							value={publicResult}
							onValueChange={onChangePublicResult}
						/>
					</View>
				</View>

				<View style={tw.style("mb-5")}>
					<CustomText size="lg" style="mb-3">
						Who can vote
					</CustomText>
					<View
						style={tw.style(
							"flex-row items-center justify-between h-13",
						)}
					>
						<CustomRadio
							label="All subscribers"
							onPress={() => onChangeVoteType("all")}
							checked={voteType === "all"}
						/>
					</View>

					<FansDivider style={tw.style("my-1.5")} />

					<View
						style={tw.style(
							"flex-row items-center justify-between h-13",
						)}
					>
						<CustomRadio
							label="Some roles"
							onPress={() => onChangeVoteType("role")}
							checked={voteType === "role"}
						/>
					</View>
				</View>
				{!hideAddBtn ? (
					<View style={tw.style("mb-5")}>
						<RoundButton
							variant={RoundButtonType.OUTLINE_PRIMARY}
							onPress={onAddPoll}
						>
							Add poll
						</RoundButton>
					</View>
				) : null}
			</View>
		</View>
	);
};

export default PollForm;
