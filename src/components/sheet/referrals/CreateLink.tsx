import React from "react";

import { CheckStar2Svg } from "@assets/svgs/common";
import UserAvatar from "@components/avatar/UserAvatar";
import {
	FansButton3,
	FansGap,
	FansSheet2,
	FansSvg,
	FansText,
	FansTextInput5,
	FansView,
} from "@components/controls";
import { FansSheetProps, IFansSheet } from "@usertypes/components";

const CreateLinkSheet: IFansSheet = (props) => {
	const { onClose, onSubmit } = props;

	const props_: FansSheetProps = {
		height: { xs: 404 },
		sheetStyle: { alignItems: "center" },
		...props,
	};

	const name = "Jane Love";
	const link = "fyp.fans/henry/";

	const handlePressCreateLink = () => {
		onSubmit("");
		onClose();
	};

	return (
		<FansSheet2 {...props_}>
			<FansGap height={12} />
			<FansText fontFamily="inter-bold" fontSize={19}>
				Create link
			</FansText>
			<FansGap height={20} />
			<FansView alignItems="center" gap={8}>
				<UserAvatar size="95px" />
				<FansView alignItems="center" flexDirection="row" gap={6}>
					<FansText fontFamily="inter-bold" fontSize={19}>
						{name}
					</FansText>
					<FansSvg
						width={15.66}
						height={15}
						svg={CheckStar2Svg}
						color1="purple-a8"
					/>
				</FansView>
			</FansView>
			<FansGap height={37} />
			<FansView
				alignItems="center"
				alignSelf="stretch"
				flexDirection="row"
				gap={9}
			>
				<FansText fontSize={18}>{link}</FansText>
				<FansTextInput5 viewStyle={{ grow: true }} />
			</FansView>
			<FansGap height={40} />
			<FansView alignSelf="stretch">
				<FansButton3
					title="Create link"
					buttonStyle={{
						backgroundColor: "green-4d",
						borderColor: undefined,
					}}
					onPress={handlePressCreateLink}
				/>
			</FansView>
		</FansSheet2>
	);
};

export default CreateLinkSheet;
