import { View, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChevronLeftSvg, ThreeDotsSvg } from "@assets/svgs/common";
import { useAppContext } from "@context/useAppContext";

interface Props {
	onClickBack?: () => void;
	onClickMenu?: () => void;
}

const TopActions: FC<Props> = (props) => {
	const { onClickBack, onClickMenu } = props;
	const insets = useSafeAreaInsets();

	const { state } = useAppContext();
	const { cover } = state.profile;

	return (
		<View style={tw.style("absolute top-0 left-0 w-full z-10")}>
			<View
				style={{
					paddingTop: insets.top + 14,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<View>
					{onClickBack ? (
						<TouchableOpacity
							onPress={onClickBack}
							style={tw.style(
								"w-4 h-4 flex items-center justify-center ml-[14px] flex-row",
							)}
						>
							<ChevronLeftSvg
								width={8.5}
								height={15}
								color={cover.length === 0 ? "#000" : "#fff"}
							/>
						</TouchableOpacity>
					) : null}
				</View>
				{onClickMenu ? (
					<TouchableOpacity
						style={tw.style("h-4 items-center flex-row mr-[17px]")}
						onPress={onClickMenu}
					>
						<ThreeDotsSvg
							width={17.4}
							height={4}
							color={cover.length === 0 ? "#000" : "#fff"}
						/>
					</TouchableOpacity>
				) : null}
			</View>
		</View>
	);
};

export default TopActions;
