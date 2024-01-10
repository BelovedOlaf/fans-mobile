import React from "react";

import UserAvatar from "@components/avatar/UserAvatar";
import {
	FansButton3,
	FansGap,
	FansHorizontalDivider,
	FansModal1,
	FansModal2,
	FansText,
	FansView,
} from "@components/controls";
import { IFansModal } from "@usertypes/components";

const BanModal: IFansModal = (props) => {
	const { onClose: handleClose } = props;

	const name = "Jane Love";

	return (
		<FansModal2
			modalStyle={{
				alignItems: "center",
				padding: { t: 25, b: 27, x: 17 },
			}}
			{...props}
		>
			<UserAvatar size="78px" />
			<FansGap height={19} />
			<FansHorizontalDivider />
			<FansGap height={18} />
			<FansView maxWidth={207}>
				<FansText
					fontFamily="inter-bold"
					fontSize={19}
					textAlign="center"
				>
					Are you sure you want to ban {name}?
				</FansText>
			</FansView>
			<FansGap height={17} />
			<FansView maxWidth={279}>
				<FansText fontSize={16} textAlign="center">
					This will remove their referral links and block them from
					creating more
				</FansText>
			</FansView>
			<FansGap height={24} />
			<FansView alignSelf="stretch" flexDirection="row" gap={14}>
				<FansButton3
					title="Cancel"
					buttonStyle={{ backgroundColor: "white", flex: "1" }}
					textStyle1={{ color: "purple-a8" }}
					onPress={handleClose}
				>
					Cancel
				</FansButton3>
				<FansButton3
					title="Confirm"
					buttonStyle={{ flex: "1" }}
					onPress={handleClose}
				/>
			</FansView>
		</FansModal2>
	);
};

export default BanModal;
