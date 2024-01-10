import React, { useState } from "react";
import { View } from "react-native";

import FansCarousel from "@components/common/carousel";
import TaggedPeople from "./taggedPeople";
import TaggedPeoplePopover from "./taggedPeoplePopover";
import { FypNullableView, FypCarousel } from "@components/common/base";

import tw from "@lib/tailwind";
import { MediaType, ResizeMode } from "@usertypes/commonEnums";
import { IFypPostContent } from "@usertypes/components";

const ImageContent: IFypPostContent = (props) => {
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
			<View style={[{ height: width }, tw.style("m-0")]}>
				<FypNullableView visible={!data.isPaidPost || !!data.isPaidOut}>
					<FansCarousel
						width={width}
						height={width}
						resizeMode={ResizeMode.COVER}
						medias={data.medias.map((el) => ({
							blurhash: el.blurhash,
							url: el.url,
							mediaType: MediaType.Image,
						}))}
						onClickItem={onClickMedia}
						showBadge
						useButtons
					/>
				</FypNullableView>

				<TaggedPeople data={data} onPress={handleToggleTooltip} />
			</View>
			{/* <TaggedPeoplePopover
				visible={showTooltip}
				taggedPeoples={data.taggedPeoples}
			/> */}
		</View>
	);
};

export default ImageContent;
