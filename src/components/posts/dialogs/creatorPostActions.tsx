import React, { FC } from "react";

import BottomSheetWrapper from "../../common/bottomSheetWrapper";
import MenuItem from "../common/menuItem";
import { ShareSvg, WarningSvg, EyeShowSvg } from "@assets/svgs/common";

interface Props {
	open: boolean;
	onClose: () => void;
	onShare: () => void;
	onReportPost: () => void;
	onOpenPost: () => void;
}

const CreatorPostActions: FC<Props> = (props) => {
	const { open, onClose, onShare, onReportPost, onOpenPost } = props;

	return (
		<BottomSheetWrapper open={open} onClose={onClose}>
			<MenuItem
				title="Open post"
				icon={<EyeShowSvg color="#000" width={25} height={21.45} />}
				onPress={onOpenPost}
			/>
			{/* <MenuItem
				title="Share"
				icon={<ShareSvg color="#000" width={25} height={17.41} />}
				onPress={onShare}
			/> */}
			<MenuItem
				title="Report post"
				icon={<WarningSvg width={25} height={22.57} color="#eb2121" />}
				labelClass="text-[#eb2121]"
				onPress={onReportPost}
			/>
		</BottomSheetWrapper>
	);
};

export default CreatorPostActions;
