import {
	GallerySvg,
	OutlinedDollarSvg,
	PlusSvg,
	SendOneSvg,
	SoundWaveSvg,
	TrashSvg,
	VoiceRecordSvg,
} from "@assets/svgs/common";
import { FansGap, FansSvg, FansText, FansView } from "@components/controls";
import AddSheet from "@components/dialogs/chat/Add";
import { ChatPhotoSheet } from "@components/sheet";
import tw from "@lib/tailwind";
import { Colors } from "@usertypes/enums";
import { Audio } from "expo-av";
import React, { FC, Fragment, useRef, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface IMessageInput {
	isTipAndPhotoVisible?: boolean;
	textonly?: boolean;
	onSend?: (message: string) => void;
}

const MessageInput: FC<IMessageInput> = (props) => {
	const { isTipAndPhotoVisible = true, textonly = false, onSend } = props;

	const duration = useRef(0);
	const interval = useRef<NodeJS.Timeout | undefined>(undefined);

	const [isAddSheetOpened, setAddSheetOpened] = useState(false);
	const [isPhotoSheetOpened, setPhotopSheetOpened] = useState(false);
	const [isRecording, setRecordingYN] = useState(false);
	const [message, setMessage] = useState("");
	const [audio, setAudio] = React.useState<Audio.Recording>();
	const [time, setTime] = useState("0:0");

	const handleChangeText = (text: string) => setMessage(text);

	const handleCloseAddSheet = () => setAddSheetOpened(false);
	const handlePressAdd = () => setAddSheetOpened(true);

	const handlePressDelete = () => setAudio(undefined);

	const handleClosePhotopSheet = () => setPhotopSheetOpened(false);
	const handlePressPhoto = () => setPhotopSheetOpened(true);

	const handlePressIn = async () => {
		try {
			await Audio.requestPermissionsAsync();
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			});
			const { recording } = await Audio.Recording.createAsync();
			setAudio(recording);
			interval.current = setInterval(handleTimer, 1000);
			setRecordingYN(true);
		} catch (e) {
			return;
		}
		console.log("Audio started", interval);
	};
	const handlePressOut = async () => {
		console.log("Audio ended", interval);
		if (audio) {
			await audio.stopAndUnloadAsync();
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
			});
			const uri = audio.getURI();
			/*if (!uri) return;
			const { sound } = await Audio.Sound.createAsync({ uri });
			await sound.playAsync();*/
		}
		clearInterval(interval.current);
		setRecordingYN(false);
	};

	const handlePressSend = () => {
		if (onSend) {
			if (audio) {
				setAudio(undefined);
			} else onSend(message);
		}
	};

	const handleTimer = () => {
		duration.current++;
		setTime(
			Math.floor(duration.current / 60) + ":" + (duration.current % 60),
		);
	};

	const isSendable = message.length !== 0;

	if (textonly) {
		return (
			<FansView
				style={tw.style(
					"w-full h-[42px]",
					"bg-fans-grey",
					"flex-row items-center",
					"rounded-full",
				)}
			>
				<FansView style={tw.style("grow", "mx-[20px]")}>
					<TextInput
						value={message}
						style={tw.style("font-inter-regular", "text-[18px]")}
						placeholder="Send Message..."
						placeholderTextColor={tw.color("fans-grey-dark")}
						onChangeText={handleChangeText}
					/>
				</FansView>
				{isSendable && (
					<FansView
						style={tw.style(
							"w-[34px] h-[34px]",
							"bg-fans-purple",
							"flex justify-center items-center",
							"mr-[4px]",
							"rounded-full",
						)}
					>
						<FansView style={tw.style("w-[16.32px] h-[16.32px]")}>
							<SendOneSvg color={Colors.White} />
						</FansView>
					</FansView>
				)}
			</FansView>
		);
	}

	return (
		<Fragment>
			<FansView
				style={tw.style("w-full", "flex-row items-center", "relative")}
			>
				{audio ? (
					<FansView
						style={tw.style(
							"h-[42px]",
							"bg-fans-purple",
							"flex-row justify-between items-center",
							"grow",
							"px-[4px]",
							"rounded-full",
						)}
					>
						<TouchableOpacity onPress={handlePressDelete}>
							<View
								style={tw.style(
									"w-[34px] h-[34px]",
									"bg-fans-white",
									"flex justify-center items-center",
									"rounded-full",
								)}
							>
								<TrashSvg size={14} color={Colors.Purple} />
							</View>
						</TouchableOpacity>
						<FansGap width={10} />
						<View style={tw.style("grow")}>
							<SoundWaveSvg size={28} color={Colors.White} />
						</View>
						<FansText
							color="white"
							fontFamily="inter-semibold"
							fontSize={15}
						>
							{time}
						</FansText>
						<FansGap width={10} />
						{!isRecording && (
							<TouchableOpacity onPress={handlePressSend}>
								<View
									style={tw.style(
										"w-[34px] h-[34px]",
										"bg-fans-white",
										"flex justify-center items-center",
										"rounded-full",
									)}
								>
									<SendOneSvg
										size={16}
										color={Colors.Purple}
									/>
								</View>
							</TouchableOpacity>
						)}
					</FansView>
				) : (
					<Fragment>
						<View
							style={tw.style(
								"h-[42px]",
								"bg-fans-grey",
								"flex-row items-center",
								"grow",
								"rounded-full",
							)}
						>
							<FansGap width={8.7} />
							<FansView style={tw.style("w-[0px]", "grow")}>
								<TextInput
									value={message}
									style={tw.style(
										"font-inter-regular",
										"text-[18px]",
									)}
									placeholder="Message..."
									placeholderTextColor={tw.color(
										"fans-grey-dark",
									)}
									onChangeText={handleChangeText}
								/>
							</FansView>
							{isSendable ? (
								<TouchableOpacity onPress={handlePressSend}>
									<View
										style={tw.style(
											"w-[34px] h-[34px]",
											"bg-fans-purple",
											"flex justify-center items-center",
											"rounded-full",
										)}
									>
										<SendOneSvg
											size={16}
											color={Colors.White}
										/>
									</View>
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									onPressIn={handlePressIn}
									onPressOut={handlePressOut}
								>
									<FansView
										width={42}
										height={42}
										alignItems="center"
										justifyContent="center"
									>
										<FansSvg
											width={16.81}
											height={20.67}
											svg={VoiceRecordSvg}
											color1="grey-70"
										/>
									</FansView>
								</TouchableOpacity>
							)}
						</View>
						{isSendable || !isTipAndPhotoVisible ? (
							<FansGap width={13.6} />
						) : (
							<Fragment>
								<FansGap width={17} />
								<TouchableOpacity>
									<FansView
										style={tw.style(
											"w-[20.78px] h-[20.77px]",
										)}
									>
										<OutlinedDollarSvg />
									</FansView>
								</TouchableOpacity>
								<FansGap width={18.2} />
								<TouchableOpacity onPress={handlePressPhoto}>
									<FansView
										style={tw.style(
											"w-[18.7px] h-[18.7px]",
										)}
									>
										<GallerySvg />
									</FansView>
								</TouchableOpacity>
								<FansGap width={18} />
							</Fragment>
						)}
						<TouchableOpacity onPress={handlePressAdd}>
							<PlusSvg size={18} />
						</TouchableOpacity>
					</Fragment>
				)}
				{/*
    <View style={tw.style("flex-1 relative")}>
      <TextInput
        placeholder="Message..."
        value={value}
        onChangeText={onChange}
        onFocus={() => setFocus(true)}
        style={tw.style(
          "text-[18px] leading-6 text-black py-2 bg-fans-grey rounded-[21px] pl-[42px] pr-2",
        )}
        multiline
      />
      <TouchableOpacity
        style={tw.style(
          `flex justify-center items-center w-[34px] h-[34px] rounded-full absolute left-1 bottom-1 ${
            isfocus ? "bg-transparent" : "bg-fans-purple"
          }`,
        )}
      >
        <OutlineCamera
          size={16}
          style={tw.style(
            `${isfocus ? "text-fans-purple" : "text-white"}`,
          )}
        />
      </TouchableOpacity>

      {isfocus ? (
        <TouchableOpacity
          style={tw.style(
            "flex justify-center items-center w-[34px] h-[34px] rounded-full absolute right-1 bottom-1 bg-fans-purple",
          )}
          onPress={() => {
            onSend();
          }}
        >
          <SendSvg width={34} height={34} style={tw.style("")} />
        </TouchableOpacity>
      ) : (
      )}
          </View>*/}
			</FansView>
			<AddSheet open={isAddSheetOpened} onClose={handleCloseAddSheet} />
			<ChatPhotoSheet
				open={isPhotoSheetOpened}
				onClose={handleClosePhotopSheet}
			/>
		</Fragment>
	);
};

export default MessageInput;
