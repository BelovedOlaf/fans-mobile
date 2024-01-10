import {
	ChevronDownSvg,
	DndTriggerSvg,
	EditSvg,
	TrashSvg,
} from "@assets/svgs/common";
import RoundButton from "@components/common/RoundButton";
import CustomText from "@components/common/customText";
import ListLine from "@components/common/listLine";
import { FansDivider } from "@components/controls";
import tw from "@lib/tailwind";
import { cdnURL } from "@helper/Utils";
import { ISubscriptionTier } from "@usertypes/types";
import React, { FC, useState, useEffect } from "react";
import { Image, Text, View } from "react-native";
import Collapsible from "react-native-collapsible";
import { IconButton } from "react-native-paper";

interface Props {
	data: ISubscriptionTier;
	onClickEdit?: () => void;
	onClickDelete?: () => void;
	onClickSubscribe?: () => void;
	isPreview?: boolean;
}

const SubscriptionTier: FC<Props> = (props) => {
	const { data, onClickEdit, onClickDelete, isPreview, onClickSubscribe } =
		props;

	const [closed, setClosed] = useState(true);

	useEffect(() => {
		if (isPreview) {
			setClosed(false);
		}
	}, [isPreview]);

	return (
		<View
			style={[
				{
					shadowColor: "rgba(0,0,0,0.08)",
					shadowRadius: 6,
					shadowOffset: { width: 0, height: 3 },
				},
				tw.style(
					"border border-fans-grey rounded-[7px] max-w-[992px]:shadow-none",
				),
			]}
		>
			<View style={tw.style("relative")}>
				<View style={tw.style("h-[78px]")}>
					<Image
						source={{ uri: cdnURL(data.cover) }}
						style={tw.style("w-full h-[78px] rounded-t-[7px]")}
						resizeMode="cover"
					/>
				</View>
				{/* <IconButton
					icon={() => (
						<DndTriggerSvg
							width={9.8}
							height={16.14}
							color="#000"
						/>
					)}
					containerColor="#f0f0f0"
					style={tw.style(
						"m-0 w-[34px] h-[34px] absolute top-[10px] left-3",
						isPreview ? "hidden" : "flex",
					)}
				/> */}

				<View
					style={tw.style(
						"absolute flex-row top-[10px] right-3 gap-x-2",
					)}
				>
					<IconButton
						icon={() => (
							<ChevronDownSvg
								width={11.87}
								height={6}
								color="#000"
							/>
						)}
						containerColor="#f0f0f0"
						onPress={() => setClosed(!closed)}
						style={[
							tw.style(!isPreview ? "flex" : "hidden"),
							{
								margin: 0,
								width: 34,
								height: 34,
								transform: [
									{ rotateX: closed ? "0deg" : "180deg" },
								],
							},
						]}
					/>
					<IconButton
						icon={() => (
							<EditSvg width={12.94} height={13.5} color="#000" />
						)}
						containerColor="#f0f0f0"
						style={tw.style(
							"m-0 w-[34px] h-[34px]",
							!isPreview ? "flex" : "hidden",
						)}
						onPress={onClickEdit}
					/>
					<IconButton
						icon={() => (
							<TrashSvg
								width={11.87}
								height={14.76}
								color="#eb2121"
							/>
						)}
						containerColor="#f0f0f0"
						style={tw.style(
							"m-0 w-[34px] h-[34px]",
							!isPreview ? "flex" : "hidden",
						)}
						onPress={onClickDelete}
					/>
				</View>
			</View>

			<View style={tw.style("")}>
				<View style={tw.style("px-5 pt-4 pb-5")}>
					<CustomText size="lg" style="text-center mb-[5px]">
						{data.title}
					</CustomText>
					<View style={tw.style("flex-row items-end justify-center")}>
						<Text
							style={tw.style(
								"text-fans-purple text-[21px] font-bold leading-[28px]",
							)}
						>
							{`$${data.price}`}
						</Text>
						<CustomText
							size="base"
							style="ml-1 font-bold text-fans-purple mb-[2px]"
						>
							PER MONTH
						</CustomText>
					</View>
				</View>

				<Collapsible collapsed={closed}>
					<View
						style={tw.style("px-3", isPreview ? "pb-4" : "pb-7.5")}
					>
						<CustomText style="text-center" size="base">
							{data.description}
						</CustomText>
						<FansDivider style={tw.style("mt-5 mb-[18px]")} />
						<View style={tw.style("gap-y-[18px]")}>
							{data.perks.slice(0, 10).map((el, index) => (
								<ListLine text={el} size="lg" key={index} />
							))}
						</View>
					</View>
				</Collapsible>
				<View
					style={tw.style(
						"w-40 mx-auto pb-7.5",
						!isPreview && "hidden",
					)}
				>
					<RoundButton onPress={onClickSubscribe}>
						Subscribe
					</RoundButton>
				</View>
			</View>
		</View>
	);
};

export default SubscriptionTier;
