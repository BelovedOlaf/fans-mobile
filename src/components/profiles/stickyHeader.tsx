import { FansText, FansView, FansIconButton } from "@components/controls";
import { FypNullableView } from "@components/common/base";
import UserAvatar from "@components/avatar/UserAvatar";
import {
	ArchivedPostSvg,
	ChevronLeftSvg,
	StatisticsSvg,
	StarCheckSvg,
	ThreeDotsVerticalSvg,
	MailSvg,
	TipSvg,
} from "@assets/svgs/common";

import tw from "@lib/tailwind";
import { IProfile } from "@usertypes/types";

import React, { FC, useEffect } from "react";
import Animated, {
	useSharedValue,
	withTiming,
	Easing,
	useAnimatedStyle,
} from "react-native-reanimated";

interface Props {
	visible: boolean;
	profile?: IProfile;
	onClickBack?: () => void;
	onClickArchive?: () => void;
	onClickAnalytics?: () => void;
	onClickMenu?: () => void;
	onClickMail?: () => void;
	onClickTip?: () => void;
}

const StickyHeader: FC<Props> = (props) => {
	const {
		visible,
		profile,
		onClickBack,
		onClickArchive,
		onClickAnalytics,
		onClickMenu,
		onClickMail,
		onClickTip,
	} = props;

	const fadeInOpacity = useSharedValue(0);

	const fadeIn = () => {
		fadeInOpacity.value = withTiming(1, {
			duration: 500,
			easing: Easing.linear,
		});
	};

	const fadeOut = () => {
		fadeInOpacity.value = withTiming(0, {
			duration: 500,
			easing: Easing.linear,
		});
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: fadeInOpacity.value,
		};
	});

	useEffect(() => {
		if (visible) {
			fadeIn();
		} else {
			fadeOut();
		}
	}, [visible]);

	return (
		<Animated.View
			style={[
				tw.style("absolute top-0 left-0 w-full z-90 bg-white"),
				animatedStyle,
			]}
		>
			<FansView
				flexDirection="row"
				alignItems="center"
				height={50}
				padding={{ x: 8 }}
				border={{ b: 1 }}
				borderColor="grey-f0"
				style={tw.style(
					"top-0 left-0 w-full md:hidden",
					visible ? "flex" : "hidden",
				)}
			>
				<FansIconButton containerColor="#fff" onPress={onClickBack}>
					<ChevronLeftSvg size={14} color="#707070" />
				</FansIconButton>
				<FansView margin={{ l: 8, r: 12 }}>
					<UserAvatar image={profile?.avatar} size="34px" />
				</FansView>
				<FansView flexDirection="row" alignItems="center">
					<FansText
						fontSize={16}
						lineHeight={21}
						style={tw.style("font-semibold mr-[14px]")}
					>
						{profile?.displayName}
					</FansText>
					<StarCheckSvg width={13.66} height={13} />
				</FansView>

				<FansView flexDirection="row" style={tw.style("ml-auto")}>
					<FypNullableView visible={!!onClickMail}>
						<FansIconButton
							containerColor="#fff"
							onPress={onClickMail}
						>
							<MailSvg width={18.23} height={14.6} color="#000" />
						</FansIconButton>
					</FypNullableView>
					<FypNullableView visible={!!onClickTip}>
						<FansIconButton
							containerColor="#fff"
							onPress={onClickTip}
						>
							<TipSvg width={9.4} height={19.33} color="#000" />
						</FansIconButton>
					</FypNullableView>

					<FypNullableView visible={!!onClickArchive}>
						<FansIconButton
							containerColor="#fff"
							onPress={onClickArchive}
						>
							<ArchivedPostSvg size={18} color="#000" />
						</FansIconButton>
					</FypNullableView>
					<FypNullableView visible={!!onClickAnalytics}>
						<FansIconButton
							containerColor="#fff"
							onPress={onClickAnalytics}
						>
							<StatisticsSvg size={16} color="#000" />
						</FansIconButton>
					</FypNullableView>

					<FypNullableView visible={!!onClickMenu}>
						<FansIconButton
							containerColor="#fff"
							onPress={onClickMenu}
						>
							<ThreeDotsVerticalSvg size={16} color="#000" />
						</FansIconButton>
					</FypNullableView>
				</FansView>
			</FansView>
		</Animated.View>
	);
};

export default StickyHeader;
