import { CopyLinkSvg, CopySvg, RedirectSvg } from "@assets/svgs/common";
import { FansText, FansView } from "@components/controls";
import tw from "@lib/tailwind";
import React from "react";
import { TouchableOpacity } from "react-native";

interface ReferralLinkProps {
	link: string;
}

const ReferralLink: React.FC<ReferralLinkProps> = ({ link }) => {
	return (
		<FansView
			style={tw.style(
				"flex-row gap-[7px] border border-[#dedede] p-[4px] rounded-full",
			)}
		>
			<FansView
				size={34}
				style={tw.style("bg-[#4dcc36] rounded-full")}
				center
			>
				<CopyLinkSvg size={17.71} color="white" />
			</FansView>
			<FansView style={tw.style("flex-1 justify-center")}>
				<FansText fontSize={16} lineHeight={21}>
					{link}
				</FansText>
			</FansView>

			{/* BUTTON: Copy */}
			<TouchableOpacity>
				<FansView
					size={34}
					style={tw.style("bg-[#f0f0f0] rounded-full")}
					center
				>
					<CopySvg width={14.71} height={18.73} color="black" />
				</FansView>
			</TouchableOpacity>

			{/* BUTTON: Redirect*/}
			<TouchableOpacity>
				<FansView
					size={34}
					style={tw.style("bg-[#f0f0f0] rounded-full")}
					center
				>
					<RedirectSvg width={17.65} height={12.29} color="black" />
				</FansView>
			</TouchableOpacity>
		</FansView>
	);
};

export default ReferralLink;
