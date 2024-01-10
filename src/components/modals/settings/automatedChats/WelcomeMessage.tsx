import React from "react";

import {
	FansButton3,
	FansGap,
	FansHorizontalDivider,
	FansImage2,
	FansModal2,
	FansSvg,
	FansText,
	FansTextInput5,
	FansView,
} from "@components/controls";
import { IFansModal } from "@usertypes/components";
import { FansModal3 } from "@components/controls/Modal";
import {
	ChevronLeft1Svg,
	ChevronRight1Svg,
	Robot1Svg,
} from "@assets/svgs/common";

const WelcomeMessageModal: IFansModal = (props) => {
	return (
		<FansModal3 width={1100} modalStyle={{ padding: { r: 39 } }} {...props}>
			<FansView
				height={102}
				alignItems="center"
				flexDirection="row"
				padding={{ l: 37.5 }}
			>
				<FansSvg
					width={6.36}
					height={12.72}
					svg={ChevronLeft1Svg}
					color1="grey-70"
				/>
				<FansView grow>
					<FansText
						fontFamily="inter-bold"
						fontSize={23}
						textAlign="center"
					>
						Welcome message
					</FansText>
				</FansView>
				<FansView>
					<FansText
						color="purple-a8"
						fontFamily="inter-bold"
						fontSize={19}
					>
						Create
					</FansText>
				</FansView>
			</FansView>
			<FansHorizontalDivider />
			<FansView flexDirection="row" gap={39}>
				<FansImage2
					source={{ uri: "https://i.postimg.cc/J7vXYBL0/image.png" }}
					viewStyle={{ aspectRatio: "square", grow: true }}
				/>
				<FansView width={359} padding={{ t: 42 }}>
					<FansTextInput5
						height={128}
						viewStyle={{ borderRadius: 7, padding: { t: 13 } }}
						textInputStyle={{ multiline: true }}
					/>
					<FansGap height={14} />
					<FansButton3
						title="AI Caption"
						buttonStyle={{ backgroundColor: "white", gap: 8.8 }}
						textStyle1={{ color: "purple-a8" }}
						icon={
							<FansSvg
								width={19.75}
								height={12.35}
								svg={Robot1Svg}
								color1="purple-a8"
							/>
						}
					/>
					<FansGap height={20} />
					{[
						"Add poll",
						"Tag people",
						"Add giveaway",
						"Add location",
						"Add fundraiser",
					].map((value, index) => {
						return (
							<FansView
								key={index}
								height={52}
								alignItems="center"
								flexDirection="row"
								justifyContent="between"
							>
								<FansText fontSize={18}>{value}</FansText>
								<FansSvg
									width={6.14}
									height={12.28}
									svg={ChevronRight1Svg}
									color1="grey-70"
								/>
							</FansView>
						);
					})}
				</FansView>
			</FansView>
		</FansModal3>
	);
};

export default WelcomeMessageModal;
