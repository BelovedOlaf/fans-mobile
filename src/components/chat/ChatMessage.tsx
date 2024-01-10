import React, { FC, useState } from "react";

interface Props {
	id: string;
	message: string;
	onLongPressMessage: Function;
	onPressMessage: Function;
}

const ChatMessage: FC<Props> = (props) => {
	const { id, message, onLongPressMessage, onPressMessage } = props;
	const [open, setOpen] = useState(false);

	// const { width: screenWidth } = useWindowDimensions();

	const handleLongPressMessage = () => {
		onLongPressMessage();
	};

	const handlePressMessage = () => {
		onPressMessage();
	};

	const onOpen = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	const onSelect = () => {};

	return <></>;

	/*if (message.replyId == id)
		return (
			<View style={tw.style("flex items-end")}>
				<View
					style={tw.style(
						"flex w-2/3 flex-col justify-end items-end",
					)}
				>
					{message.images.length === 1 && (
						<View
							style={tw.style(
								`relative h-[${screenWidth / 3}px]`,
							)}
						>
							{message.images.map((image: string, i: number) => (
								<View
									key={i}
									style={{
										position: "absolute",
										top: 0,
										borderRadius: 10,
										right: 0,
										overflow: "hidden",
										height: screenWidth / 3,
										width: screenWidth / 3,
									}}
								>
									<Image
										source={{ uri: String(image) }}
										style={{
											height: undefined,
											width: undefined,
											flex: 1,
											resizeMode: "contain",
										}}
									/>
								</View>
							))}
						</View>
					)}
					{message.images.length > 1 && (
						<View
							style={tw.style(
								`relative h-[${
									(screenWidth / 6) *
									(message.images.length + 1)
								}px] mr-[20px]`,
							)}
						>
							{message.images.map((image: string, i: number) => (
								<View
									key={i}
									style={{
										position: "absolute",
										top: (screenWidth / 6) * i,
										transform: [
											{
												rotate: `${
													Math.pow(-1, i + 1) * 5
												}deg`,
											},
										],
										borderRadius: 10,
										right:
											screenWidth / 10 +
											Math.pow(-1, i + 1) *
												(screenWidth / 10),
										overflow: "hidden",
										height: screenWidth / 3,
										width: screenWidth / 3,
									}}
								>
									<Image
										source={{ uri: String(image) }}
										style={{
											height: undefined,
											width: undefined,
											flex: 1,
											resizeMode: "contain",
										}}
									/>
								</View>
							))}
						</View>
					)}
					<EmojiReply
						open={open}
						onOpen={onOpen}
						onClose={onClose}
						onSelect={onSelect}
						message={message}
						id={id}
					/>
					<View style={tw.style("flex items-end")}>
						<View
							style={tw.style(
								"relative bg-fans-purple rounded-t-large min-w-35 rounded-bl-large py-2 px-3 mb-[10px]",
							)}
						>
							<TouchableOpacity
								onPress={handlePressMessage}
								onLongPress={handleLongPressMessage}
							>
								<Text
									style={tw.style("text-[18px] text-white")}
								>
									{message.text}
								</Text>
							</TouchableOpacity>
							<View
								style={tw.style(
									"absolute flex-row bg-fans-grey rounded-full px-2 py-[6px] border-2 border-white bottom-[-6] left-4",
								)}
							>
								<Text style={tw.style(" text-3")}>❤</Text>
								<Text style={tw.style(" text-3")}>😍</Text>
							</View>
						</View>
						<View style={tw.style("flex-row items-center gap-1")}>
							<Text style={tw.style("text-sm")}>Seen</Text>
							<CheckAllSvg width={16} height={16} />
						</View>
					</View>
				</View>
			</View>
		);
	else
		return (
			<>
				{message.type === "offer" ? (
					<View
						style={tw.style(
							"flex-row justify-start items-end  max-w-[80%] mb-[10px]",
						)}
					>
						<OnlineAvatar />
						<View
							style={tw.style(
								`relative ml-2 w-[${screenWidth * 0.7}px] h-[${
									screenWidth * 0.9
								}px] rounded-lg overflow-hidden`,
							)}
						>
							<Image
								source={{ uri: message.images[0] }}
								style={{
									flex: 1,
									resizeMode: "cover",
									height: undefined,
									width: undefined,
								}}
								blurRadius={30}
							/>
							<TouchableOpacity
								style={{
									width: 80,
									height: 80,
									backgroundColor: "white",
									position: "absolute",
									borderRadius: 40,
									opacity: 0.7,
									padding: 20,
									top: "40%",
									left: "50%",
									transform: [
										{ translateX: -40 },
										{ translateY: -40 },
									],
								}}
							>
								<LockSvg color="white" />
							</TouchableOpacity>
							<View
								style={tw.style(
									`bg-current absolute bottom-0 flex gap-2 p-3 justify-center items-center w-[${
										screenWidth * 0.7
									}px]`,
								)}
							>
								<TouchableOpacity
									style={tw.style(
										`w-[${
											screenWidth * 0.7 * 0.8
										}px] bg-purple-500 h-10 rounded-full flex flex-row justify-center items-center gap-2`,
									)}
								>
									<View style={tw.style("w-3")}>
										<LockSvg color="white" />
									</View>
									<Text
										style={tw.style(
											"text-white font-bold text-4",
										)}
									>
										{`Unlock for $${message.value}`}
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={tw.style(
										`w-[${
											screenWidth * 0.7 * 0.8
										}px] bg-white border border-purple-500 h-10 rounded-full flex flex-row justify-center items-center gap-2`,
									)}
								>
									<Text
										style={tw.style(
											"text-purple-500 font-bold text-4",
										)}
									>
										See preview
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				) : (
					<View
						style={tw.style(
							"flex-row justify-start items-start  max-w-[80%] mb-[10px]",
						)}
					>
						<OnlineAvatar />
						<View style={tw.style("flex-col items-start")}>
							{message.images.length === 1 && (
								<View
									style={tw.style(
										`relative h-[${screenWidth / 3}px]`,
									)}
								>
									{message.images.map(
										(image: string, i: number) => (
											<View
												key={i}
												style={{
													position: "absolute",
													top: 0,
													borderRadius: 10,
													left: 0,
													overflow: "hidden",
													height: screenWidth / 3,
													width: screenWidth / 3,
												}}
											>
												<Image
													source={{
														uri: String(image),
													}}
													style={{
														height: undefined,
														width: undefined,
														flex: 1,
														resizeMode: "contain",
													}}
												/>
											</View>
										),
									)}
								</View>
							)}
							{message.images.length > 1 && (
								<View
									style={tw.style(
										`relative h-[${
											(screenWidth / 6) *
											(message.images.length + 1)
										}px] mr-[20px]`,
									)}
								>
									{message.images.map(
										(image: string, i: number) => (
											<View
												key={i}
												style={{
													position: "absolute",
													top: (screenWidth / 6) * i,
													transform: [
														{
															rotate: `${
																Math.pow(
																	-1,
																	i + 1,
																) * 5
															}deg`,
														},
													],
													borderRadius: 10,
													left:
														screenWidth / 10 +
														Math.pow(-1, i + 1) *
															(screenWidth / 10),
													overflow: "hidden",
													height: screenWidth / 3,
													width: screenWidth / 3,
												}}
											>
												<Image
													source={{
														uri: String(image),
													}}
													style={{
														height: undefined,
														width: undefined,
														flex: 1,
														resizeMode: "contain",
													}}
												/>
											</View>
										),
									)}
								</View>
							)}
							<EmojiReply
								open={open}
								onOpen={onOpen}
								onClose={onClose}
								onSelect={onSelect}
								message={message}
								id={id}
							/>
							<View style={tw.style("flex items-start")}>
								<View
									style={tw.style(
										"relative bg-fans-grey rounded-t-large min-w-35 rounded-br-large py-2 px-3 ml-3 mb-[10px] ",
									)}
								>
									<TouchableOpacity
										onPress={handlePressMessage}
									>
										<Text
											style={tw.style(
												"text-[18px] text-right",
											)}
										>
											{message.text}
										</Text>
									</TouchableOpacity>
									<View
										style={tw.style(
											"absolute flex-row bg-fans-grey rounded-full px-2 py-[6px] border-2 border-white bottom-[-6] left-4",
										)}
									>
										<Text style={tw.style(" text-3")}>
											❤
										</Text>
										<Text style={tw.style(" text-3")}>
											😍
										</Text>
									</View>
								</View>
							</View>
						</View>
						<View
							style={tw.style("absolute top-[10.6px] right-3")}
						></View>
					</View>
				)}
			</>
		);*/
};

export default ChatMessage;
