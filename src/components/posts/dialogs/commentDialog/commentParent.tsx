import { View } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

import Comment from "./comment";
import { IComment } from "@usertypes/types";

interface Props {
	data: IComment;
	userId: string;
	onClickReply: (commentId: string) => void;
	onClickLike: (comment: IComment) => void;
	onDelete: (commentId: string) => void;
}

const CommentParent: FC<Props> = (props) => {
	const { data, onClickReply, onClickLike, onDelete, userId } = props;

	return (
		<View style={tw.style("border-fans-grey border-b py-[18px]")}>
			<Comment
				data={data}
				onClickReply={() => onClickReply(data.id)}
				onClickLike={() => onClickLike(data)}
				onDelete={onDelete}
				userId={userId}
			>
				{data.replies.map((reply) => (
					<Comment
						data={reply}
						key={reply.id}
						onClickReply={() => {}}
						onClickLike={() => onClickLike(reply)}
						isChildren
						onDelete={onDelete}
						userId={userId}
					></Comment>
				))}
			</Comment>
		</View>
	);
};

export default CommentParent;
