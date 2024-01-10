import { Stack, useRouter } from "expo-router";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { Fragment, useRef, useState } from "react";
import {
	Image,
	Animated,
	ScrollView,
	TouchableOpacity,
	View,
	VirtualizedList,
} from "react-native";

import {
	BlockSvg,
	ChevronDown2Svg,
	Close4Svg,
	CopySvg,
	ImageSvg,
	OutlinedPinSvg,
	ReplySvg,
	RobotSvg,
	Search1Svg,
	SearchSvg,
	ThreeDotsMenuSvg,
	WarningSvg,
} from "@assets/svgs/common";
import ProfileSheet from "@components/chat/common/dialogs/ChatUserDlg";
import tw from "@lib/tailwind";
import { ChatNativeStackParams } from "@usertypes/navigations";

import OnlineAvatar from "@components/avatar/OnlineAvatar";
import { MessageInput } from "@components/chat";
import ActionDialog from "@components/chat/common/dialogs/ActionDialog";
import {
	FansButton3,
	FansEmoji,
	FansGap,
	FansImage,
	FansScreen2,
	FansSvg,
	FansText,
	FansTextInput3,
	FansView,
} from "@components/controls";
import { ImageTimestampModal } from "@components/modals";
import { SelectToneSheet } from "@components/sheet/chat";
import { Colors } from "@usertypes/enums";
import { IMessage, MessageType } from "@usertypes/types";
import { Menu } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { chatInboxAtom } from "@state/chat";
import UserAvatar from "@components/avatar/UserAvatar";
import { TapGestureHandler } from "react-native-gesture-handler";
import { cdnURL } from "@helper/Utils";

const MessageMenu = () => {
	const [open, setOpen] = useState(false);

	return (
		<Menu
			visible={open}
			anchor={
				<View style={tw.style("h-[1px]")}>
					<FansText> </FansText>
				</View>
			}
			anchorPosition="bottom"
			contentStyle={tw.style(
				"bg-white",
				"flex gap-[20px]",
				"px-[20px] py-[12px]",
				"rounded-[21px]",
			)}
			onDismiss={() => setOpen(false)}
		>
			<>
				<View style={tw.style("flex-row gap-[15px] items-center")}>
					<ReplySvg size={25} />
					<FansText>Reply</FansText>
				</View>
				<View style={tw.style("flex-row gap-[15px] items-center")}>
					<CopySvg size={25} />
					<FansText>Copy</FansText>
				</View>
				<View style={tw.style("flex-row gap-[15px] items-center")}>
					<View style={tw.style("p-[2px]")}>
						<OutlinedPinSvg size={21} />
					</View>
					<FansText>Pin</FansText>
				</View>
				<View style={tw.style("flex-row gap-[15px] items-center")}>
					<View style={tw.style("p-[1px]")}>
						<BlockSvg size={23} />
					</View>
					<FansText>Unsend 300s</FansText>
				</View>
				<View style={tw.style("flex-row gap-[15px] items-center")}>
					<View style={tw.style("p-[1px]")}>
						<WarningSvg size={23} color={Colors.Red} />
					</View>
					<FansText>Report</FansText>
				</View>
			</>
		</Menu>
	);
};

const ReactionMenu = () => {
	const [open, setOpen] = useState(false);

	return (
		<Menu
			visible={open}
			anchor={
				<View style={tw.style("h-[1px]")}>
					<FansText></FansText>
				</View>
			}
			anchorPosition="top"
			contentStyle={[
				tw.style(
					"bg-white",
					"flex-row gap-[5px]",
					"px-[20px] py-[12px]",
					"rounded-full",
					"top-[-60px]",
				),
			]}
			onDismiss={() => setOpen(false)}
		>
			<>
				{Array.from(Array(6)).map((_, index) => (
					<TouchableOpacity
						key={index}
						// onPress={() => handlePressEmoji(index + 1)}
					>
						<FansEmoji
							size={24}
							emoji={index + 1}
							style={tw.style("leading-[24px]")}
						/>
					</TouchableOpacity>
				))}
			</>
		</Menu>
	);
};

const ChatItem = ({
	message,
	isSelf,
	animatedValue,
	handleActivatedDoubleTapMessage,
	handleActivatedTapMessage,
	onPressImage,
}: {
	message: IMessage;
	isSelf: boolean;
	animatedValue: Animated.Value;
	handleActivatedDoubleTapMessage: () => void;
	handleActivatedTapMessage: () => void;
	onPressImage: () => void;
}) => {
	const SelfMessage = ({ message }: { message: IMessage }) => (
		<View
			style={tw.style(
				"bg-fans-purple",
				"self-end",
				"px-[15px] py-[8px]",
				"rounded-l-full rounded-tr-full",
			)}
		>
			<FansText color="white" fontSize={18}>
				{message.content}
			</FansText>
		</View>
	);

	const FromMessage = ({
		message,
		handleActivatedDoubleTapMessage,
		handleActivatedTapMessage,
	}: {
		message: IMessage;
		handleActivatedDoubleTapMessage: () => void;
		handleActivatedTapMessage: () => void;
	}) => {
		const doubleTapRef = React.useRef();
		const singleTapRef = React.useRef();

		return (
			<View style={tw.style("flex-row gap-[10px]", "self-start")}>
				<UserAvatar size="34px" />
				<View style={tw.style("flex")}>
					<TapGestureHandler
						ref={doubleTapRef}
						numberOfTaps={2}
						onActivated={handleActivatedDoubleTapMessage}
					>
						<TapGestureHandler
							ref={singleTapRef}
							waitFor={doubleTapRef}
							numberOfTaps={1}
							onActivated={handleActivatedTapMessage}
						>
							<View
								style={tw.style(
									"relative",
									message.emoji ? "mb-[20px]" : undefined,
								)}
							>
								<View
									style={tw.style(
										"bg-fans-grey",
										"px-[15px] py-[8px]",
										"rounded-r-full rounded-tl-full",
									)}
								>
									<FansText fontSize={18}>
										{message.content}
									</FansText>
								</View>
								{message.emoji && (
									<View
										style={tw.style(
											"absolute bottom-[-20px] left-[15px]",
											"bg-fans-grey",
											"border-2 border-white rounded-full",
											"p-[6px]",
										)}
									>
										<FansEmoji
											size={14}
											emoji={message.emoji}
											style={tw.style("leading-[14px]")}
										/>
									</View>
								)}
							</View>
						</TapGestureHandler>
					</TapGestureHandler>
				</View>
			</View>
		);
	};

	const ImageMessage = ({
		images,
		onPressImage,
	}: {
		images: string[];
		onPressImage: () => void;
	}) => {
		const layoutForTwoImages = (index: number) => {
			if (index === 0) {
				return [
					tw.style("w-[196.13px] h-[143.64px]"),
					{ transform: "rotateZ(-4deg)" },
				];
			} else {
				return [
					tw.style(
						"w-[196.13px] h-[143.64px]",
						"absolute right-[0px] bottom-[0px]",
					),
					{ transform: "rotateZ(4deg)" },
				];
			}
		};

		const layoutForThreeImages = (index: number) => {
			switch (index) {
				case 0:
					return [
						tw.style(
							"w-[143.64px] h-[196.13px]",
							"absolute left-[53.9px]",
						),
						{ transform: "rotateZ(4deg)" },
					];
				case 1:
					return [
						tw.style(
							"w-[143.64px] h-[196.13px]",
							"absolute right-[0px] bottom-[0px]",
						),
						{ transform: "rotateZ(4deg)" },
					];
				case 2:
					return [
						tw.style(
							"w-[143.64px] h-[196.13px]",
							"absolute top-[151.7px]",
						),
						{ transform: "rotateZ(-4deg)" },
					];
				default:
					return {};
			}
		};

		const layoutFunction =
			images.length === 2 ? layoutForTwoImages : layoutForThreeImages;

		return (
			<FansView style={tw.style("relative", "self-end")}>
				{images.map((image: string, index: number) => (
					<TouchableOpacity
						key={index}
						activeOpacity={1}
						onPress={onPressImage}
						style={layoutFunction(index)}
					>
						<FansImage
							source={{ uri: cdnURL(image) }}
							style={tw.style("rounded-[15px]")}
							resizeMode="cover"
						/>
					</TouchableOpacity>
				))}
			</FansView>
		);
	};

	const TipMessage = ({ message }: { message: IMessage }) => (
		<View
			style={tw.style(
				"bg-fans-purple",
				"self-end",
				"px-[50px] py-[20px]",
				"rounded-[20px]",
				"justify-center",
				"items-center",
			)}
		>
			<UserAvatar image={message.user?.avatar ?? ""} size="34px" />
			<FansText
				color="white"
				fontSize={22}
				fontFamily="inter-bold"
				style={tw.style("mt-[10px]")}
			>
				{message.user?.displayName} sent you a{" "}
				<Image
					source={require("@assets/images/gem.png")}
					style={tw.style("w-4 h-4 lg:w-5.5 lg:h-5.5 mr-[10px]")}
				/>
				{message.value} tip!
			</FansText>
			<FansText color="white" fontSize={18} style={tw.style("mt-[10px]")}>
				{message.content}
			</FansText>
		</View>
	);

	return (
		<Animated.View style={[tw.style("my-[4px]")]}>
			{message.messageType === MessageType.TEXT &&
				(isSelf ? (
					<SelfMessage message={message} />
				) : (
					<FromMessage
						message={message}
						handleActivatedDoubleTapMessage={
							handleActivatedDoubleTapMessage
						}
						handleActivatedTapMessage={handleActivatedTapMessage}
					/>
				))}
			{message.messageType === MessageType.IMAGE && (
				<ImageMessage
					images={message.images ?? []}
					onPressImage={onPressImage}
				/>
			)}
			{message.messageType === MessageType.TIP && (
				<TipMessage message={message} />
			)}
		</Animated.View>
	);
};

const ChatGPTBar = (props: {
	isCustomMode: boolean;
	handlePressSayYes: () => void;
	handlePressSayNo: () => void;
	handlePressCustom: () => void;
	handlePressTone: () => void;
	handlePressCloseCustom: () => void;
	handlePressWrite: (text: string) => void;
}) => {
	const {
		isCustomMode,
		handlePressSayYes,
		handlePressSayNo,
		handlePressCustom,
		handlePressTone,
		handlePressCloseCustom,
		handlePressWrite,
	} = props;
	const [customPrompt, setCustomPrompt] = useState("");

	return (
		<FansView width="full" bottom={8} position="absolute">
			{!isCustomMode ? (
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={tw.style("items-center")}
				>
					<FansSvg width={22.85} height={14.28} svg={RobotSvg} />
					<FansGap width={8.2} />
					<FansView
						height={34}
						style={tw.style("p-[17px]")}
						alignItems="center"
						backgroundColor="purple"
						borderRadius="full"
						justifyContent="center"
					>
						<FansText color="white" fontSize={17}>
							GPT respond
						</FansText>
					</FansView>
					<FansGap width={7} />
					<TouchableOpacity onPress={handlePressSayYes}>
						<FansView
							height={34}
							style={tw.style("p-[17px]")}
							alignItems="center"
							backgroundColor="grey"
							borderRadius="full"
							justifyContent="center"
						>
							<FansText fontSize={17}>Say Yes</FansText>
						</FansView>
					</TouchableOpacity>
					<FansGap width={7} />
					<TouchableOpacity onPress={handlePressSayNo}>
						<FansView
							height={34}
							style={tw.style("p-[17px]")}
							alignItems="center"
							backgroundColor="grey"
							borderRadius="full"
							justifyContent="center"
						>
							<FansText fontSize={17}>Say No</FansText>
						</FansView>
					</TouchableOpacity>
					<FansGap width={7} />
					<TouchableOpacity onPress={handlePressCustom}>
						<FansView
							height={34}
							style={tw.style("p-[17px]")}
							alignItems="center"
							backgroundColor="grey"
							borderRadius="full"
							justifyContent="center"
						>
							<FansText fontSize={17}>Custom</FansText>
						</FansView>
					</TouchableOpacity>
					<FansGap width={7} />
					<TouchableOpacity onPress={handlePressTone}>
						<FansView
							height={34}
							style={tw.style("px-[10px]")}
							alignItems="center"
							backgroundColor="grey"
							borderRadius="full"
							flexDirection="row"
							justifyContent="center"
						>
							<FansText fontSize={24}>😍</FansText>
							<FansSvg
								width={9.31}
								height={4.66}
								svg={ChevronDown2Svg}
								color1="grey-70"
							/>
						</FansView>
					</TouchableOpacity>
				</ScrollView>
			) : (
				<FansView flexDirection="row" gap={7}>
					<FansView
						alignItems="center"
						flexDirection="row"
						grow
						position="relative"
					>
						<FansTextInput3
							height={34}
							value={customPrompt}
							grow
							placeholder="Enter instructions for AI"
							onChangeText={setCustomPrompt}
						/>
						<FansView
							position="absolute"
							style={tw.style("right-[14.2px]")}
						>
							<TouchableOpacity onPress={handlePressCloseCustom}>
								<FansSvg
									width={9.33}
									height={9.33}
									svg={Close4Svg}
									color1="grey-70"
								/>
							</TouchableOpacity>
						</FansView>
					</FansView>
					<FansButton3
						height={34}
						title="Write"
						onPress={() => handlePressWrite(customPrompt)}
						textStyle1={{ fontSize: 17 }}
					/>
				</FansView>
			)}
		</FansView>
	);
};

const ChatScreen = (
	props: NativeStackScreenProps<ChatNativeStackParams, "Chat">,
) => {
	const { navigation } = props;

	const handleSubmitChatUserSheet = (value: string) => {
		switch (value) {
			case "Media":
				navigation.navigate("Gallery");
				break;
			case "Pinned":
				navigation.navigate("PinnedMessages");
				break;
			case "Notes":
				navigation.navigate("Notes");
				break;
		}
	};

	const user = { name: "Jane Love", nickname: "janelove" };

	const animatedValue = useRef(new Animated.Value(0)).current;
	const listMessages = useRef<VirtualizedList<IMessage> | null>(null);

	const [isCustomMode, setCustomMode] = useState(false);
	const [isImageTimestampModalVisible, setImageTimestampModalVisible] =
		useState(false);
	const [isSearch, setSearch] = useState(false);
	const [isSelectToneSheetVisible, setSelectToneSheetVisible] =
		useState(false);

	const inbox = useRecoilValue(chatInboxAtom);
	const id = props.route.params?.id ?? "0";
	const conversation = inbox.data.get(id);

	const [openActionDialog, setOpenActionDialog] = useState(false);
	const [isProfileSheetVisible, setProfileSheetVisible] = useState(false);
	const [searchKey, setSearchKey] = useState("");
	const [selectedGPT, setSelectedGPT] = useState(0);
	const [length, setLength] = useState(1000);
	const router = useRouter();
	const [messages, setMessages] = useState<IMessage[]>([]);

	const handleCloseActionDialog = () => {
		setOpenActionDialog(false);
	};

	const handleCloseImageTimestampModal = () => {
		setImageTimestampModalVisible(false);
	};

	const handleCloseSelectToneSheet = () => setSelectToneSheetVisible(false);

	const handleSend = (message: string) => {
		// setMessages((prev) => [...prev, ];
		listMessages.current?.scrollToIndex({ index: 0, animated: true });
		animatedValue.setValue(37);
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 400,
			useNativeDriver: true,
		}).start();
	};

	const handleEndReached = () => {
		console.log("end reached");
		// loadMessage();
	};

	const handlePressCloseCustom = () => setCustomMode(false);

	const handlePressCustom = () => setCustomMode(true);

	const handlePressImage = () => {
		setImageTimestampModalVisible(true);
	};

	const handlePressSayNo = () => {}; //handleSend("No");

	const handlePressSayYes = () => {}; //handleSend("Yes");

	const handlePressTone = () => setSelectToneSheetVisible(true);

	const handlePressWrite = () => {}; //handleSend(strCustom);

	const handleSubmitSelectToneSheet = () => {}; //(value: string) => handleSend(value);

	if (!conversation) {
		return <FansScreen2 contentStyle={tw.style("pt-[0px]")}></FansScreen2>;
	}

	return (
		<FansScreen2 contentStyle={tw.style("pt-[0px]")}>
			<Stack.Screen
				options={{
					headerShown: !isSearch,
					headerTitleAlign: "left",
					headerTitle: (props) => (
						<View
							{...props}
							style={tw.style("flex-row gap-[10px] items-center")}
						>
							<View style={tw.style("relative")}>
								<OnlineAvatar
									size="34px"
									image={conversation.icon || undefined}
								/>
								<View
									style={tw.style(
										"w-[11px] h-[11px]",
										"absolute right-0 bottom-0",
										"bg-fans-green",
										"border-[2px] border-white rounded-full",
									)}
								/>
							</View>
							<FansText fontFamily="inter-semibold" fontSize={16}>
								{conversation.name}
							</FansText>
						</View>
					),
					headerRight: () => (
						<View style={tw.style("flex-row gap-1 justify-end")}>
							<TouchableOpacity
								style={tw.style(
									"flex justify-center items-center w-8 h-8",
								)}
								onPress={() => navigation.navigate("Gallery")}
							>
								<ImageSvg
									width={17}
									height={17}
									color={"black"}
								/>
							</TouchableOpacity>
							{/* <TouchableOpacity
								style={tw.style(
									"flex justify-center items-center w-8 h-8",
								)}
								onPress={() =>
									navigation.navigate("FanAnalysis")
								}
							>
								<FansView style={tw.style("w-[17px] h-[17px]")}>
									<Note1Svg />
								</FansView>
							</TouchableOpacity> */}
							<TouchableOpacity
								style={tw.style(
									"flex justify-center items-center w-8 h-8",
								)}
								onPress={() => setSearch(true)}
							>
								<SearchSvg
									width={17}
									height={17}
									color={"black"}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={tw.style(
									"flex justify-center items-center w-8 h-8",
								)}
								onPress={() => setProfileSheetVisible(true)}
							>
								<ThreeDotsMenuSvg
									width={17}
									height={17}
									color={"black"}
								/>
							</TouchableOpacity>
						</View>
					),
				}}
			/>
			{isSearch && (
				<Fragment>
					<FansView
						alignItems="center"
						flexDirection="row"
						gap={10}
						padding={{ t: 10 }}
					>
						<FansTextInput3
							grow
							iconNode={
								<FansSvg
									width={13.14}
									height={13.26}
									svg={Search1Svg}
								/>
							}
							placeholder="Search in chat"
							value={searchKey}
							onChangeText={setSearchKey}
						/>
						<TouchableOpacity onPress={() => setSearch(false)}>
							<FansText fontSize={19}>Cancel</FansText>
						</TouchableOpacity>
					</FansView>
					<FansGap height={20} />
				</Fragment>
			)}
			<FansView height={0} grow>
				<VirtualizedList
					ref={listMessages}
					renderItem={({ item }: { item: IMessage }) => (
						<ChatItem
							isSelf={Math.random() > 0.5}
							message={item}
							animatedValue={animatedValue}
							handleActivatedDoubleTapMessage={() => {}}
							handleActivatedTapMessage={() => {}}
							onPressImage={handlePressImage}
						/>
					)}
					style={tw.style("pt-[20px]")}
					data={messages}
					getItem={(data, index) => data[index]}
					getItemCount={(data) => data.length}
					inverted
					showsVerticalScrollIndicator={false}
					onEndReached={handleEndReached}
					onEndReachedThreshold={0.3}
				/>
			</FansView>
			{/*<ScrollView
				contentContainerStyle={tw.style("flex gap-[10px] justify-end", "grow")}
				showsVerticalScrollIndicator={false}
			>
				{messages.map((message, index) => (
					<Item key={index} data={message} animatedValue={animatedValue} />
				))}
				</ScrollView>*/}
			{/*<ReactNativeReanimated.default.ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "flex-end",
				}}
				ref={aref}
			>
				<View style={tw.style("flex gap-[10px]")}>
					{[...Array(countMessages)].map((_, index) => {
						if (index % 5 === 0)
							return (
								<View>
									<Text
										style={tw.style(
											"text-fans-grey-dark text-center",
										)}
									>
										TODAY
									</Text>
								</View>
							);
						if (index % 5 === 1)
							return (
							);
						if (index % 5 === 2)
							return (
								<View
									style={tw.style(
										"flex-row gap-[5px] items-center",
										"self-end",
									)}
								>
									<Text
										style={tw.style("text-fans-grey-dark")}
									>
										Seen
									</Text>
									<DoubleCheckSvg
										color={"#A854F5"}
										size={16}
									/>
								</View>
							);
					})}
				</View>
				</ReactNativeReanimated.default.ScrollView>*/}
			<MessageInput onSend={handleSend} />
			<FansGap height={{ lg: 47 }} />
			<ProfileSheet
				data={user}
				visible={isProfileSheetVisible}
				onClose={() => setProfileSheetVisible(false)}
				onSubmit={handleSubmitChatUserSheet}
			/>
			<ActionDialog
				open={openActionDialog}
				onClose={handleCloseActionDialog}
				onSubmit={() => {}}
			/>
			<ImageTimestampModal
				visible={isImageTimestampModalVisible}
				onClose={handleCloseImageTimestampModal}
				onSubmit={() => {}}
			/>
			<SelectToneSheet
				visible={isSelectToneSheetVisible}
				onClose={handleCloseSelectToneSheet}
				onSubmit={handleSubmitSelectToneSheet}
			/>
		</FansScreen2>
	);
};

export default ChatScreen;
