import React, { FC } from "react";

import {
	ImageContent,
	VideoContent,
	PollContent,
	TextContent,
	FundraiserContent,
	AudioContent,
} from "@components/posts/postCard";

import { PostType } from "@usertypes/commonEnums";
import { FypPostContentProps } from "@usertypes/components";

export type PostContentComponentType = {
	[propKey: string]: FC<FypPostContentProps>;
};

const PostContentComponents: PostContentComponentType = {
	[PostType.Photo]: ImageContent,
	[PostType.Video]: VideoContent,
	[PostType.Poll]: PollContent,
	[PostType.Text]: TextContent,
	[PostType.Fundraiser]: FundraiserContent,
	[PostType.Audio]: AudioContent,
};

export default PostContentComponents;
