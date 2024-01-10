import React, { FC } from "react";

import { ComponentSizeTypes } from "@usertypes/commonEnums";
import Amazon from "./amazon";
import Discord from "./discord";
import Facebook from "./facebook";
import Instagram from "./instagram";
import Reddit from "./reddit";
import Snapchat from "./snapchat";
import Twitch from "./twitch";
import Twitter from "./twitter";
import Website from "./website";
import Youtube from "./youtube";
import Tiktok from "./tiktok";
import XLink from "./xLink";

export interface ISocialIconComponentProps {
	size: ComponentSizeTypes;
}

export type SocialIconComponentType = {
	[propKey: string]: FC<ISocialIconComponentProps>;
};

const SocialIconComponents: SocialIconComponentType = {
	website: Website,
	instagram: Instagram,
	twitter: Twitter,
	snapchat: Snapchat,
	discord: Discord,
	twitch: Twitch,
	reddit: Reddit,
	facebook: Facebook,
	youtube: Youtube,
	amazon: Amazon,
	tiktok: Tiktok,
	xlink: XLink,
};

interface Props {
	iconName: string;
	size: ComponentSizeTypes;
}

const getSocialIconComponent: FC<Props> = (props) => {
	const { iconName, size } = props;

	const SocialIconComponent = Object.hasOwnProperty.call(
		SocialIconComponents,
		iconName,
	)
		? SocialIconComponents[iconName]
		: undefined;

	return SocialIconComponent ? <SocialIconComponent size={size} /> : null;
};

export default getSocialIconComponent;
