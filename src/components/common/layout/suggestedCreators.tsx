import { Pressable } from "react-native";
import React, { FC, useEffect, useState } from "react";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";

import SuggestProfile from "../../posts/suggestProfiles/suggestProfile";
import { FansText, FansView } from "@components/controls";
import { FypNullableView } from "@components/common/base";

import tw from "@lib/tailwind";
import { useAppContext } from "@context/useAppContext";

interface Props {
	searchQuery: string;
}

const SuggestedCreators: FC<Props> = (props) => {
	const { state } = useAppContext();

	const { suggestedCreators } = state.common;

	const [width, setWidth] = useState(0);
	const [page, setPage] = useState(0);
	const [pages, setPages] = useState(0);

	const offset = useSharedValue(0);

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withTiming(offset.value * width * -1, {
						duration: 500,
					}),
				},
			],
		};
	});

	const onPaginate = (index: number) => {
		offset.value = index;
		setPage(index);
	};

	useEffect(() => {
		setPages(Math.ceil(suggestedCreators.length / 3));
	}, [suggestedCreators]);

	return (
		<FansView>
			<FypNullableView visible={suggestedCreators.length > 0}>
				<FansText
					fontSize={20}
					lineHeight={27}
					style={tw.style("font-semibold mb-3.5")}
				>
					Suggested for you
				</FansText>
				<FansView
					position="relative"
					height={400}
					style={tw.style("overflow-hidden")}
					onLayout={(e) => {
						setWidth(e.nativeEvent.layout.width);
					}}
				>
					<Animated.View
						style={[
							tw.style("absolute top-0 flex-row"),
							animatedStyles,
						]}
					>
						{[...Array(pages)].map((el, index) => (
							<FansView gap={10} width={width} key={index}>
								{suggestedCreators
									.slice(index * 3, (index + 1) * 3)
									.map((creator) => (
										<SuggestProfile
											key={creator.id}
											data={creator}
										/>
									))}
							</FansView>
						))}
					</Animated.View>
				</FansView>
				<FansView
					margin={{ t: 22 }}
					flexDirection="row"
					alignItems="center"
					justifyContent="center"
					gap={8}
				>
					{[...Array(pages)].map((el, index) => (
						<Pressable
							key={index}
							style={tw.style(
								"w-2 h-2 rounded-full bg-fans-grey",
								index === page ? "bg-black w-3 h-3" : "",
							)}
							onPress={() => onPaginate(index)}
						></Pressable>
					))}
				</FansView>
			</FypNullableView>
		</FansView>
	);
};

export default SuggestedCreators;
