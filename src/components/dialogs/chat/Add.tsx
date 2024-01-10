import { View } from "react-native";
import React, { FC, useState } from "react";
import tw from "@lib/tailwind";

import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import {
	Close1Svg,
	CustomizeVideoSvg,
	GallerySvg,
	GIFSvg,
	OutlinedDollarSvg,
	PurpleTipSvg,
	VideoCallSvg,
} from "@assets/svgs/common";
import { Colors } from "@usertypes/enums";
import { FansGap, FansSvg, FansText, FansView } from "@components/controls";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ChatAddSheet } from "..";
import { ChatPhotoSheet } from "@components/sheet";

interface Props {
	open: boolean;
	onClose: () => void;
}

const AddSheet: FC<Props> = (props) => {
	const { open, onClose } = props;

	const [isPhotoSheetOpened, setPhotoSheetOpened] = useState(false);

	const handleClosePhotoSheet = () => setPhotoSheetOpened(false);

	const handlePressPhoto = () => setPhotoSheetOpened(true);

	return (
		<BottomSheetWrapper open={open} onClose={onClose}>
			<FansView
				width={30}
				height={30}
				style={tw.style("mr-[16px]")}
				alignItems="center"
				alignSelf="end"
				backgroundColor={{ color: "black", opacity: 30 }}
				borderRadius="full"
				display={{ xs: "hidden", lg: "flex" }}
				justifyContent="center"
			>
				<FansSvg
					width={11.46}
					height={11.45}
					svg={Close1Svg}
					color1="white"
				/>
			</FansView>
			<FansGap height={{ lg: 13.2 }} />
			<View style={tw.style("flex-row justify-around", "pb-[100px]")}>
				{/*<View style={tw.style("flex-col items-center")}>
				<VideoCallSvg width={36} height={36} />
				<Text style={tw.style("pt-[13px] text-[19px]")}>
					Video Call
				</Text>
</View>*/}
				<TouchableOpacity>
					<View style={tw.style("flex gap-[10px] items-center")}>
						<OutlinedDollarSvg size={36} color={Colors.Purple} />
						<FansText fontSize={19}>Send tip</FansText>
					</View>
				</TouchableOpacity>
				<View style={tw.style("flex gap-[10px] items-center")}>
					<View style={tw.style("p-[2px]")}>
						<GIFSvg size={32} color={Colors.Purple} />
					</View>
					<FansText fontSize={19}>GIF</FansText>
				</View>
				<TouchableOpacity onPress={handlePressPhoto}>
					<View style={tw.style("flex gap-[10px] items-center")}>
						<View style={tw.style("p-[2px]")}>
							<GallerySvg size={32} color={Colors.Purple} />
						</View>
						<FansText fontSize={19}>Photo</FansText>
					</View>
				</TouchableOpacity>
			</View>
			{/*
			<View style={tw.style("px-[18px] pb-5")}>
				<View style={tw.style("flex-row justify-around")}>
					<View style={tw.style("flex-col items-center")}>
						<CustomizeVideoSvg width={36} height={36} />
						<Text style={tw.style("pt-[13px] text-[19px]")}>
							Custom video
						</Text>
					</View>
				</View>
			</View>
*/}
			<ChatPhotoSheet
				open={isPhotoSheetOpened}
				onClose={handleClosePhotoSheet}
			/>
		</BottomSheetWrapper>
	);
};

export default AddSheet;
