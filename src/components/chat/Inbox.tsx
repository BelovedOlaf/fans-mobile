import {
	ChevronRightSvg,
	PictureSvg,
	PinSvg,
	ReadSvg,
	VideoRecordSvg,
	WarningSvg,
} from "@assets/svgs/common";
import OnlineAvatar from "@components/avatar/OnlineAvatar";
import { FansGap, FansSvg, FansText, FansView } from "@components/controls";
import { useAppContext } from "@context/useAppContext";
import tw from "@lib/tailwind";
import { UserRoleTypes } from "@usertypes/commonEnums";
import { Colors } from "@usertypes/enums";
import { IConversationMeta } from "@usertypes/types";
import { DateTime } from "luxon";
import React, { Fragment } from "react";
import { View } from "react-native";

interface InboxProps {
	data: IConversationMeta;
}

const enum IconType {
	None,
	Picture,
	Read,
	Video,
}

const InboxIcon = React.memo((props: { type: IconType }) => {
	if (props.type === IconType.None) return null;
	else if (props.type === IconType.Picture)
		return (
			<>
				<FansSvg
					width={11.12}
					height={11.12}
					svg={PictureSvg}
					color1="grey-70"
				/>
				<FansGap width={7.5} />
				<FansText
					color="grey-70"
					fontFamily="inter-semibold"
					fontSize={16}
				>
					•
				</FansText>
				<FansGap width={5.8} />
			</>
		);
	else if (props.type === IconType.Read)
		return (
			<>
				<FansSvg
					width={15.23}
					height={7.84}
					svg={ReadSvg}
					color1="purple"
				/>
				<FansGap width={6.2} />
			</>
		);
	else if (props.type === IconType.Video)
		return (
			<Fragment>
				<FansSvg
					width={12.22}
					height={11.34}
					svg={VideoRecordSvg}
					color1="grey-70"
				/>
				<FansGap width={6.5} />
				<FansText
					color="grey-70"
					fontFamily="inter-semibold"
					fontSize={16}
				>
					•
				</FansText>
				<FansGap width={5.8} />
			</Fragment>
		);
});

const Inbox = (props: InboxProps) => {
	const { data } = props;
	const { icon, isBlocked, isPinned, name, lastMessage, lastReadMessageId } =
		data;

	const { state } = useAppContext();
	const { userInfo } = state.user;
	const { type } = userInfo;

	const isCreator = type === UserRoleTypes.Creator;
	const unread = lastMessage ? lastMessage?.id !== lastReadMessageId : false;

	return (
		<FansView
			backgroundColor="white"
			style={tw.style(isBlocked ? "opacity-50" : "")}
		>
			<View style={tw.style("flex-row gap-[10px] items-center")}>
				<View style={tw.style("relative")}>
					<OnlineAvatar
						size="46px"
						online={false}
						image={icon ?? undefined}
					/>
				</View>
				<View style={tw.style("flex", "grow")}>
					<View style={tw.style("flex-row gap-[5px] items-center")}>
						{isPinned && <PinSvg size={22} color={Colors.Purple} />}
						<FansText
							fontFamily={
								unread ? "inter-semibold" : "inter-medium"
							}
							fontSize={19}
						>
							{name}
						</FansText>
						{isBlocked && (
							<WarningSvg size={14} color={Colors.Red} />
						)}
						<View style={tw.style("grow")} />
						<View
							style={tw.style("flex-row gap-[5px] items-center")}
						>
							{lastMessage && (
								<FansText color="grey-70" fontSize={14}>
									{DateTime.fromISO(
										lastMessage.createdAt,
									).toFormat("h:mm a")}
								</FansText>
							)}
							<FansView
								style={tw.style("w-[6.14px] h-[12.28px]")}
							>
								<ChevronRightSvg
									color={tw.color("fans-grey-dark")}
								/>
							</FansView>
						</View>
					</View>
					<FansView alignItems="center" flexDirection="row">
						<FansView width={0} grow>
							<FansText
								color="grey-70"
								fontFamily={
									unread ? "inter-semibold" : "inter-regular"
								}
								fontSize={16}
								numberOfLines={1}
							>
								{lastMessage?.content}
							</FansText>
						</FansView>
						{/* {isCreator && price && price !== 0 && (
							<FansView
								style={tw.style(
									"bg-fans-green/10",
									"px-[7px] py-[1px]",
								)}
								borderRadius="full"
							>
								<FansText
									color1="green"
									fontFamily1="inter-semibold"
									fontSize={14}
								>
									${price}
								</FansText>
							</FansView>
						)} */}
					</FansView>
				</View>
			</View>
		</FansView>
	);
};

export default Inbox;
