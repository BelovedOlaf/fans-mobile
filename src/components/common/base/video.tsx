import { Video, VideoProps } from "expo-av";
import React, { FC } from "react";
import { Platform, View } from "react-native";
import ShakaPlayer from "./shakaPlayer";

interface Props extends VideoProps {
	carouselPayingVideoId?: string;
}

const isSafari = () => {
	if (Platform.OS !== "web") return false;
	return navigator.userAgent.indexOf("Safari") !== -1;
};

const FypVideo: FC<Props> = (props) => {
	if (Platform.OS !== "web") {
		return <Video {...props} />;
	}

	let source = typeof props.source === "object" ? props.source.uri : "";

	if (!source) {
		return null;
	}

	if (isSafari() && source.endsWith(".mpd")) {
		source = source.substring(0, source.length - 4) + ".m3u8";
	}

	return (
		<View style={props.style}>
			<ShakaPlayer
				uiConfig={{
					addBigPlayButton: true,
					overflowMenuButtons: ["quality", "playback_rate", "loop"],
					customContextMenu: true,
					contextMenuElements: ["statistics"],
					statisticsList: [
						"width",
						"height",
						"playTime",
						"bufferingTime",
					],
					seekBarColors: {
						base: "rgba(255,255,255,.2)",
						buffered: "rgba(255,255,255,.4)",
						played: "#a854f5",
						adBreaks: "rgb(255,204,0)",
						chapterMarks: "rgb(27, 27, 27)",
						chapterLabels: "rgb(255, 255, 255)",
					},
				}}
				src={source}
			/>
		</View>
	);
};

export default FypVideo;
