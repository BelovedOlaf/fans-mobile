import BottomSheetWrapper from "@components/common/bottomSheetWrapper/bottomSheetWrapper";
import {
	FansButton,
	FansSwitch,
	FansText,
	FansTextInput,
} from "@components/controls";
import tw from "@lib/tailwind";
import React from "react";
import { View } from "react-native";

interface Props {
	open: boolean;
	onClose: () => void;
}

const AddWebhookSheet: React.FC<Props> = (props) => {
	const { open, onClose } = props;

	return (
		<BottomSheetWrapper open={open} onClose={onClose}>
			<View style={tw.style("flex gap-[30px]", "px-[20px] py-[30px]")}>
				<View style={tw.style("self-center")}>
					<FansText
						style={tw.style("font-inter-bold", "text-[19px]")}
					>
						Add webhook
					</FansText>
				</View>
				<View style={tw.style("flex gap-[15px]")}>
					<FansText
						style={tw.style("font-inter-semibold", "text-[17px]")}
					>
						Payload URL
						<FansText
							style={tw.style(
								"font-inter-semibold",
								"text-[17px] text-fans-red",
							)}
						>
							*
						</FansText>
					</FansText>
					<FansTextInput placeholder="Enter URL" />
				</View>
				<View style={tw.style("flex gap-[15px]")}>
					<FansText
						style={tw.style("font-inter-semibold", "text-[17px]")}
					>
						Secrets
					</FansText>
					<FansTextInput />
				</View>

				<View style={tw.style("flex gap-[15px]")}>
					<FansText
						style={tw.style("font-inter-semibold", "text-[17px]")}
					>
						Notifications
					</FansText>
					<FansText
						style={tw.style("text-[16px] text-fans-grey-dark")}
					>
						We will deliver event details when this hook is
						triggered
					</FansText>
					<FansSwitch text="Active" value={true} />
				</View>
				<FansButton title="Add webhook" />
			</View>
		</BottomSheetWrapper>
	);
};

export default AddWebhookSheet;
