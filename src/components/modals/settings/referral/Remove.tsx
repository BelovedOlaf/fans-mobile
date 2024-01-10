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

const RemoveModal: IFansModal = (props) => {
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
			<FansGap height={24} />
			<FansView maxWidth={207}>
				<FansText
					fontFamily="inter-bold"
					fontSize={19}
					textAlign="center"
				>
					Warning
				</FansText>
			</FansView>
			<FansGap height={18} />
			<FansView maxWidth={279}>
				<FansText fontSize={16} textAlign="center">
					This will remove all links and leave this creators program
				</FansText>
			</FansView>
			<FansGap height={24} />
			<FansView alignSelf="stretch" flexDirection="row" gap={14}>
				<FansView flex="1">
					<FansButton3
						title="Cancel"
						buttonStyle={{
							backgroundColor: "white",
							borderColor: "red-eb",
						}}
						textStyle1={{ color: "red-eb" }}
						onPress={handleClose}
					>
						Cancel
					</FansButton3>
				</FansView>
				<FansView flex="1">
					<FansButton3
						title="Confirm"
						buttonStyle={{
							backgroundColor: "red-eb",
							borderColor: "red-eb",
						}}
						onPress={handleClose}
					/>
				</FansView>
			</FansView>
		</FansModal2>
	);
};

export default RemoveModal;
