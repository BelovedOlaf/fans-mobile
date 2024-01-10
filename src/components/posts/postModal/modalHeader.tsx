import { View, Pressable } from "react-native";
import React, { Fragment, FC } from "react";
import { ActivityIndicator } from "react-native-paper";
import tw from "@lib/tailwind";

import { FansText, FansDivider, FansView } from "@components/controls";
import { ChevronLeftSvg } from "@assets/svgs/common";
import IconComponents from "@helper/iconComponents";
import { IconTypes } from "@usertypes/commonEnums";

interface Props {
	title: string;
	rightLabel?: string;
	onClickRight?: () => void;
	onClickLeft: () => void;
	titleIcon?: IconTypes;
	leftIcon?: IconTypes;
	loading?: boolean;
}

const ModalHeader: FC<Props> = (props) => {
	const {
		title,
		rightLabel,
		onClickRight,
		onClickLeft,
		titleIcon,
		leftIcon,
		loading,
	} = props;

	const getTitleIcon = () => {
		if (titleIcon) {
			const TitleIcon = Object.hasOwnProperty.call(
				IconComponents,
				titleIcon,
			)
				? IconComponents[titleIcon]
				: undefined;

			return TitleIcon ? <TitleIcon size={18} color="#000" /> : null;
		} else {
			return null;
		}
	};

	const getLeftIcon = () => {
		if (leftIcon) {
			const LeftIcon = Object.hasOwnProperty.call(
				IconComponents,
				leftIcon,
			)
				? IconComponents[leftIcon]
				: null;
			return LeftIcon ? <LeftIcon size={14.3} color="#000" /> : null;
		} else {
			return <ChevronLeftSvg size={16} color="#707070" />;
		}
	};

	return (
		<Fragment>
			<FansView
				flexDirection="row"
				alignItems="center"
				justifyContent="center"
				position="absolute"
				style={tw.style("py-[34px] top-[-100px] w-full")}
			>
				<Pressable
					style={tw.style(
						"absolute left-8 w-5 h-5 flex-row items-center justify-center",
					)}
					onPress={onClickLeft}
				>
					{getLeftIcon()}
				</Pressable>
				<View
					style={tw.style(
						"flex-row items-center gap-x-2.5 justify-center",
					)}
				>
					{getTitleIcon()}
					<FansText
						fontSize={23}
						lineHeight={31}
						style={tw.style("font-bold")}
					>
						{title}
					</FansText>
				</View>

				<Pressable
					style={tw.style(
						"absolute right-8 flex-row items-center",
						!onClickRight && "hidden",
					)}
					onPress={() => {
						if (!loading && onClickRight) {
							onClickRight();
						}
					}}
				>
					<ActivityIndicator
						animating={!!loading}
						color="#a854f5"
						size={16}
					/>
					<FansText
						fontSize={19}
						lineHeight={26}
						style={tw.style(
							"font-bold text-fans-purple ml-2",
							loading && "opacity-50",
						)}
					>
						{rightLabel}
					</FansText>
				</Pressable>
			</FansView>
			<FansDivider style={tw.style("mx-8")} />
		</Fragment>
	);
};

export default ModalHeader;
