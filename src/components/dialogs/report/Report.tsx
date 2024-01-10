import RoundButton from "@components/common/RoundButton";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import CustomRadio from "@components/common/customRadio";
import { FansButton3, FansDivider, FansText } from "@components/controls";
import tw from "@lib/tailwind";
import { RoundButtonType } from "@usertypes/commonEnums";
import React, { useState } from "react";
import { View } from "react-native";

interface Props {
	open: boolean;
	onClose: () => void;
	onSubmit: () => void;
}

const ReportDialog: React.FC<Props> = (props) => {
	const { open, onClose, onSubmit } = props;

	const [index, setIndex] = useState(0);

	return (
		<BottomSheetWrapper open={open} onClose={onClose}>
			<View style={tw.style("m-[15px]", "flex gap-[15px]")}>
				<FansText
					fontFamily="inter-bold"
					fontSize={19}
					textAlign="center"
				>
					Why are you reporting?
				</FansText>
				<View style={tw.style("h-[20px]")} />
				{[
					"Illegal content",
					"Child abuse",
					"Graphic violence or gore",
					"Harassment or bullying",
					"Self-harm or suicide",
					"Non-consensual pornography",
					"Infringement of my copyright",
					"Other",
				].map((text, i) => (
					<React.Fragment key={i}>
						{i >= 0 && <FansDivider />}
						<CustomRadio
							label={text}
							checked={index === i}
							onPress={() => setIndex(i)}
						/>
					</React.Fragment>
				))}
				<FansButton3
					title="Submit"
					onPress={onSubmit}
					buttonStyle={{ backgroundColor: "white" }}
					textStyle1={{ color: "purple-a8" }}
				/>
			</View>
		</BottomSheetWrapper>
	);
};

export default ReportDialog;
