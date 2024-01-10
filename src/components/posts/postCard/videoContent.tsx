import React, { FC, useState } from "react";
import { View } from "react-native";

import tw from "@lib/tailwind";
import { ResizeMode, MediaType } from "@usertypes/commonEnums";

import FansCarousel from "@components/common/carousel";
import TaggedPeople from "./taggedPeople";
import TaggedPeoplePopover from "./taggedPeoplePopover";
import { FypNullableView } from "@components/common/base";
import { IFypPostContent } from "@usertypes/components";

const VideoContent: IFypPostContent = (props) => {
	const { data, onClickMedia } = props;

	const [width, setWidth] = useState(100);
	const [showTooltip, setShowTooltip] = useState(false);

	const handleToggleTooltip = () => {
		if (showTooltip) {
			setShowTooltip(false);
		} else {
			setShowTooltip(true);
			setTimeout(() => setShowTooltip(false), 3000);
		}
	};

	return (
		<View
			style={tw.style("relative")}
			onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
		>
			<View style={[{ height: width }, tw.style("m-0 relative")]}>
				<FypNullableView visible={!data.isPaidPost || !!data.isPaidOut}>
					<FansCarousel
						id={`post-video-${data.id}`}
						width={width}
						height={width}
						resizeMode={ResizeMode.CONTAIN}
						medias={data.medias.map((el) => ({
							url: el.url,
							mediaType: MediaType.Video,
						}))}
						onClickItem={onClickMedia}
						showBadge
						useButtons
					/>
				</FypNullableView>
				{/* <OptionalView visible={!data.isPaidPost || data.isPaidOut}>
					<IconButton
						mode="contained"
						icon={() => (
							<PlaySvg width={24.42} height={27} color="#fff" />
						)}
						style={[
							tw.style(
								"w-[68px] h-[68px] rounded-full absolute top-1/2 left-1/2",
							),
							{
								transform: [
									{ translateX: -34 },
									{ translateY: -34 },
								],
							},
						]}
						containerColor="#a854f5"
					/>
				</OptionalView> */}

				<TaggedPeople data={data} onPress={handleToggleTooltip} />
			</View>
			{/* <TaggedPeoplePopover
				visible={showTooltip}
				taggedPeoples={data.taggedPeoples}
			/> */}
		</View>
	);
};

export default VideoContent;
