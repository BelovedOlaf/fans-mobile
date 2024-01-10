import React, { FC } from "react";

import {
	CopyLinkSvg,
	ListSvg,
	BlockSvg,
	RepostSvg,
	ReportSvg,
	TrashSvg,
	EyeHideSvg,
	EyeShowSvg,
	ImageSvg,
	VideoCameraSvg,
	PollSvg,
	FundSvg,
	StorySvg,
	ArchivedPostSvg,
	MusicSvg,
	TextSvg,
	CloseSvg,
	EditSvg,
	UnsubscribeSvg,
	StatisticsSvg,
} from "@assets/svgs/common";
import { IconTypes } from "@usertypes/commonEnums";
import { FansSvgProps } from "@usertypes/components";

export type IconComponentType = {
	[propKey: string]: FC<FansSvgProps> | FC;
};

const IconComponents: IconComponentType = {
	[IconTypes.CopyLink]: CopyLinkSvg,
	[IconTypes.AddRemoveFromLists]: ListSvg,
	[IconTypes.Block]: BlockSvg,
	[IconTypes.Renew]: RepostSvg,
	[IconTypes.Report]: ReportSvg,
	[IconTypes.Cancel]: TrashSvg,
	[IconTypes.EyeHide]: EyeHideSvg,
	[IconTypes.EyeShow]: EyeShowSvg,
	[IconTypes.Image]: ImageSvg,
	[IconTypes.VideoCamera]: VideoCameraSvg,
	[IconTypes.Poll]: PollSvg,
	[IconTypes.Story]: StorySvg,
	[IconTypes.Fundraiser]: FundSvg,
	[IconTypes.ArchivedPost]: ArchivedPostSvg,
	[IconTypes.Music]: MusicSvg,
	[IconTypes.Text]: TextSvg,
	[IconTypes.Close]: CloseSvg,
	[IconTypes.Edit]: EditSvg,
	[IconTypes.Unsubscribe]: UnsubscribeSvg,
	[IconTypes.Statistics]: StatisticsSvg,
};

export default IconComponents;
