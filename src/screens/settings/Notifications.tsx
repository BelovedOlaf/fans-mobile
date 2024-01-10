import React, { useState } from "react";

// import base modules
import {
	FansGap,
	FansHorizontalDivider,
	FansScreen3,
	FansSwitch,
	FansText,
	FansView,
} from "@components/controls";

const NotificationsScreen = () => {
	const [isEmailUpdate, setEmailUpdate] = useState(true);
	const [isPhoneNotification, setPhoneNotification] = useState(true);
	const [isWhenCreatorSendMessage, setWhenCreatorSendMessage] =
		useState(true);
	const [isWhenMakeTransaction, setWhenMakeTransaction] = useState(true);
	const [isWhenMention, setWhenMention] = useState(false);
	const [isReplyComments, setReplyComments] = useState(true);

	return (
		<FansScreen3 contentStyle1={{ maxWidth: { lg: 670 } }}>
			<FansView>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					How we notify
				</FansText>
				<FansGap height={40} />
				<FansSwitch
					text="Email update"
					value={isEmailUpdate}
					onValueChange={setEmailUpdate}
				/>
				<FansGap height={20} />
				<FansHorizontalDivider />
				<FansGap height={20} />
				<FansSwitch
					text="Phone notifications"
					value={isPhoneNotification}
					onValueChange={setPhoneNotification}
				/>
			</FansView>
			<FansGap height={46} />
			<FansView>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Notifications
				</FansText>
				<FansGap height={40} />
				<FansSwitch
					text="When a creator sends a message"
					value={isWhenCreatorSendMessage}
					onValueChange={setWhenCreatorSendMessage}
				/>
				<FansGap height={20} />
				<FansHorizontalDivider />
				<FansGap height={20} />
				<FansSwitch
					text="When you make a transaction"
					value={isWhenMakeTransaction}
					onValueChange={setWhenMakeTransaction}
				/>
				<FansGap height={20} />
				<FansHorizontalDivider />
				<FansGap height={20} />
				<FansSwitch
					text="When you are mentioned"
					value={isWhenMention}
					onValueChange={setWhenMention}
				/>
				<FansGap height={20} />
				<FansHorizontalDivider />
				<FansGap height={20} />
				<FansSwitch
					text="Replies to your comments"
					value={isReplyComments}
					onValueChange={setReplyComments}
				/>
			</FansView>
			<FansGap height={20} />
		</FansScreen3>
	);
};

export default NotificationsScreen;
