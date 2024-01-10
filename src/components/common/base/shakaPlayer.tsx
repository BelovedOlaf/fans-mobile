import type shaka from "shaka-player/dist/shaka-player.ui.js";
import React from "react";
import { View, Text } from "react-native";

export interface ShakaPlayerProps {
	src: string;
	config?: Partial<shaka.extern.PlayerConfiguration>;
	uiConfig?: Partial<shaka.extern.UIConfiguration>;
	chromeless?: boolean;
	className?: string;
	resizeMode?: "cover" | "contain" | "stretch";
}

export interface ShakaPlayerRef {
	player: shaka.Player | null;
	ui: shaka.ui.Overlay | null;
	videoElement: HTMLVideoElement | null;
}

function ShakaPlayer(props: ShakaPlayerProps, ref: React.Ref<ShakaPlayerRef>) {
	return (
		<View>
			<Text>This component is only available on web</Text>
		</View>
	);
}

export default React.forwardRef(ShakaPlayer);
