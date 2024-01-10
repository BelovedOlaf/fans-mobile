import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { Image, View } from "react-native";

import {
	PlaySvg,
	AudioPrevSvg,
	AudioNextSvg,
	PauseSvg,
} from "@assets/svgs/common";
import { FansIconButton, FansText } from "@components/controls";

import { cdnURL } from "@helper/Utils";
import tw from "@lib/tailwind";
import { convertTrackingTime } from "@utils/stringHelper";
import { IFypPostContent } from "@usertypes/components";

const AudioContent: IFypPostContent = (props) => {
	const { data } = props;
	const [duration, setDuration] = useState(0);
	const [position, setPosition] = useState(0);

	const sound = useRef(new Audio.Sound());
	const [isPlaying, setIsPlaying] = useState(false);

	const loadAudio = async () => {
		await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
		const checkLoading = await sound.current.getStatusAsync();
		if (!checkLoading.isLoaded) {
			try {
				const result = await sound.current.loadAsync({
					uri: cdnURL(data.medias[0].url) ?? "",
				});
			} catch (error) {
				return;
			}
		}
	};

	const playAudio = async () => {
		try {
			const result = await sound.current.getStatusAsync();
			if (result?.isLoaded) {
				if (result.isPlaying === false) {
					await sound.current.playAsync();
					setIsPlaying(true);
				}
			}
		} catch (err) {
			return;
		}
	};

	const pauseAudio = async () => {
		try {
			const result = await sound.current.getStatusAsync();
			if (result.isLoaded) {
				if (result.isPlaying === true) {
					await sound.current.pauseAsync();
					setIsPlaying(false);
					// const _soundStatus = await sound.current.getStatusAsync();
					// setStatus(_soundStatus);
				}
			}
		} catch (err) {
			return;
		}
	};

	const onClickPlayPause = async () => {
		const result = await sound.current.getStatusAsync();
		if (result?.isLoaded) {
			if (result.isPlaying) {
				pauseAudio();
			} else {
				playAudio();
			}
		}
	};

	const onSeekPosition = async (val: number) => {
		if (sound) {
			let newPosition = val;
			if (val < 0) {
				newPosition = 0;
			}
			if (val > duration) {
				newPosition = position;
			}
			setPosition(newPosition);
			await sound.current.setPositionAsync(newPosition * 1000);
		}
	};

	useEffect(() => {
		loadAudio();
	}, [data.medias]);

	useEffect(() => {
		if (sound && isPlaying) {
			const updatePosition = setInterval(async () => {
				const status = await sound.current.getStatusAsync();
				if (status.isLoaded) {
					setPosition(
						Math.trunc(
							!Number.isNaN(status.positionMillis)
								? status.positionMillis / 1000
								: 0,
						),
					);
					setDuration(
						Math.trunc(
							!Number.isNaN(status.durationMillis)
								? Math.round(
										(status?.durationMillis ?? 0) / 1000,
								  )
								: 0,
						),
					);
					setIsPlaying(status.isPlaying);
					if (status.didJustFinish) {
						setPosition(0);
					}
				}
			}, 500);

			return () => clearInterval(updatePosition);
		}
	}, [sound, isPlaying]);

	return (
		<View style={tw.style("px-[18px] mb-2 md:px-0")}>
			<View style={tw.style("border border-fans-grey rounded-[7px]")}>
				<Image
					source={{ uri: cdnURL(data.thumb?.url) }}
					resizeMode="cover"
					style={tw.style("h-[112px] w-full rounded-t-[7px]")}
				/>

				<View style={tw.style("pt-[10px] px-5 pb-6 ")}>
					<FansText
						fontFamily="inter-semibold"
						fontSize={17}
						lineHeight={22}
					>
						{data.title}
					</FansText>
					<FansText
						color="grey-70"
						fontSize={16}
						lineHeight={21}
						style={tw.style("mb-[14px]")}
					>
						{data.caption}
					</FansText>

					<View>
						<Slider
							maximumValue={duration}
							minimumValue={0}
							minimumTrackTintColor="#a854f5"
							maximumTrackTintColor="#f0f0f0"
							thumbTintColor="#a854f5"
							step={0.1}
							value={position}
							disabled
						/>
						<View
							style={tw.style(
								"flex-row items-center justify-between mt-[2px]",
							)}
						>
							<FansText
								color="grey-70"
								fontSize={14}
								lineHeight={19}
							>
								{duration === 0
									? ""
									: convertTrackingTime(position)}
							</FansText>
							<FansText
								color="grey-70"
								fontSize={14}
								lineHeight={19}
							>
								{duration === 0
									? ""
									: convertTrackingTime(duration)}
							</FansText>
						</View>
					</View>

					<View
						style={tw.style(
							"flex-row items-center gap-x-7 justify-center",
						)}
					>
						<FansIconButton
							size={24}
							style={tw.style("rounded-none")}
							containerColor="#fff"
							onPress={() => onSeekPosition(position - 15)}
						>
							<AudioPrevSvg width={23.6} height={23.6} />
						</FansIconButton>
						<FansIconButton
							size={68}
							containerColor="#a854f5"
							onPress={onClickPlayPause}
						>
							{isPlaying ? (
								<PauseSvg size={36} color="#fff" />
							) : (
								<PlaySvg size={27} color="#fff" />
							)}
						</FansIconButton>
						<FansIconButton
							size={24}
							style={tw.style("rounded-none")}
							containerColor="#fff"
							onPress={() => onSeekPosition(position + 15)}
						>
							<AudioNextSvg width={23.6} height={23.6} />
						</FansIconButton>
					</View>
				</View>
			</View>
		</View>
	);
};

export default AudioContent;
