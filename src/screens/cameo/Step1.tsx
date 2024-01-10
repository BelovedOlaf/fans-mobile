// Step1.tsx
import React from "react";
import { View } from "react-native";
import { FansGap, FansText, FansView } from "@components/controls";
import Step1ValuesGrid from "./Step1ValuesGrid";

const Step1 = () => (
	<View>
		<FansView>
			<FansView alignItems="center" justifyContent="center">
				<FansGap height={25} />
				<FansText
					textAlign="center"
					fontFamily="inter-semibold"
					fontSize={27}
				>
					Pricing & duration
				</FansText>
				<FansGap height={12} />
				<FansText textAlign="center" fontSize={16}>
					Set your price for different video durations. Higher
					duration videos should be more expensive
				</FansText>
			</FansView>
			<FansGap height={42} />
		</FansView>
		<FansView>
			<FansText fontFamily="inter-semibold" fontSize={17}>
				Prices
			</FansText>
			<FansGap height={12} />
			<FansText color="grey-70" fontSize={16}>
				Create prices for different video call durations. Provide up to
				10 time options for fans to buy
			</FansText>
		</FansView>
		<FansGap height={24.5} />
		<FansView>
			<Step1ValuesGrid />
		</FansView>
		<FansGap height={180} />
	</View>
);

export default Step1;
