import { View } from "react-native";
import React, { FC } from "react";

import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import { MenuItem } from "@components/posts/common";
import { TrashSvg, ArchivedPostSvg } from "@assets/svgs/common";

interface Props {
	open: boolean;
	onClose: () => void;
	onClickUnarchive: () => void;
	onClickDelete: () => void;
	tab: "post" | "story";
}

const ArchivedPostActions: FC<Props> = (props) => {
	const { open, onClose, onClickUnarchive, onClickDelete, tab } = props;

	return (
		<BottomSheetWrapper
			open={open}
			onClose={() => {
				onClose();
			}}
		>
			<View>
				<MenuItem
					title={
						tab === "post" ? "Unarchive post" : "Unarchive story"
					}
					icon={
						<ArchivedPostSvg
							color="#000"
							width={22.87}
							height={23}
						/>
					}
					onPress={onClickUnarchive}
				/>

				<MenuItem
					title="Delete"
					icon={<TrashSvg width={18.5} height={23} color="#eb2121" />}
					labelClass="text-[#eb2121]"
					onPress={onClickDelete}
				/>
			</View>
		</BottomSheetWrapper>
	);
};

export default ArchivedPostActions;
