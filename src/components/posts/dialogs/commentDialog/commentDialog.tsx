import { ImageSvg, SendSvg, SmileDocSvg } from "@assets/svgs/common";
import RoundTextInput from "@components/common/RoundTextInput";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import tw from "@lib/tailwind";
import React, { FC, useState } from "react";
import {
	Pressable,
	ScrollView,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import Collapsible from "react-native-collapsible";

interface Props {
	open: boolean;
	onClose: () => void;
}

const CommentDialog: FC<Props> = (props) => {
	const { open, onClose } = props;
	const { height } = useWindowDimensions();

	const [commentText, setCommentText] = useState("");
	const [openEmoji, setOpenEmoji] = useState(false);
	const [hideForm, setHideForm] = useState(true);

	const onInsertEmoji = (val: string) => {
		setCommentText(`${commentText}${val}`);
	};

	const onClickReply = () => {
		setHideForm(false);
	};

	return (
		<BottomSheetWrapper open={open} onClose={onClose}>
			<View style={tw.style("pb-4")}>
				<Text
					style={tw.style(
						"text-center text-base text-fans-dark-grey font-bold mb-8",
					)}
				>
					743 comments
				</Text>

				<View
					style={{
						height: height * 0.4,
					}}
				>
					<ScrollView
						contentContainerStyle={{
							paddingHorizontal: 18,
						}}
					>
						{/* {commentsDummyData.map((comment) => (
							<CommentParent
								key={comment.id}
								data={comment}
								onClickReply={onClickReply}
							/>
						))} */}
					</ScrollView>
				</View>
				<Collapsible collapsed={hideForm}>
					<View
						style={tw.style(
							"border-t border-fans-grey mt-2 p-[18px] flex-row items-center gap-x-[18px]",
						)}
					>
						<View style={tw.style("relative flex-1")}>
							<RoundTextInput
								value={commentText}
								onChangeText={(text) => setCommentText(text)}
								placeholder="Add comment"
								customStyles="pr-11"
							/>
							{/* <View style={tw.style("absolute top-[10.6px] right-3")}>
							<EmojiInsert
								icons={[
									"❤",
									"👏",
									"🔥",
									"🙌",
									"😍",
									"😂",
									"😮",
								]}
								open={openEmoji}
								onClose={() => setOpenEmoji(false)}
								onSelect={onInsertEmoji}
								onOpen={() => setOpenEmoji(true)}
							/>
						</View> */}
							{commentText !== "" ? (
								<Pressable
									style={tw.style("absolute right-1 top-1")}
								>
									<SendSvg width={34} height={34} />
								</Pressable>
							) : null}
						</View>

						<Pressable>
							<ImageSvg width={18.7} height={18.7} color="#000" />
						</Pressable>

						<Pressable>
							<SmileDocSvg width={19.06} height={19.07} />
						</Pressable>
					</View>
				</Collapsible>
			</View>
		</BottomSheetWrapper>
	);
};

export default CommentDialog;
