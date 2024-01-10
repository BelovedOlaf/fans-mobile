import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import {
	FansText,
	FansView,
	FansSwitch1,
	FansDropdown,
} from "@components/controls";
import RoundTextInput from "@components/common/RoundTextInput";
import UserAvatar from "@components/avatar/UserAvatar";
import { StarCheckSvg } from "@assets/svgs/common";

import tw from "@lib/tailwind";
import { useAppContext } from "@context/useAppContext";
import { TextAlignStyle } from "@usertypes/styles";
import {
	createLinkOfferLimitOptions,
	createLinkDurationOptions,
} from "@constants/common";

import React, { FC, useState } from "react";
import RoundButton from "@components/common/RoundButton";

interface Props {
	visible: boolean;
	onClose: () => void;
}

const CreateLinkModal: FC<Props> = (props) => {
	const { visible, onClose } = props;
	const { state, dispatch } = useAppContext();
	const { profile } = state;

	const [isFree, setIsFree] = useState(false);
	const [limit, setLimit] = useState<string | number>("");
	const [duration, setDuration] = useState(1);

	return (
		<BottomSheetWrapper
			open={visible}
			onClose={() => {
				onClose();
			}}
		>
			<FansView padding={{ x: 18, b: 40 }}>
				<FansText
					fontFamily="inter-bold"
					fontSize={19}
					lineHeight={26}
					textAlign="center"
				>
					Create link
				</FansText>
				<FansView margin={{ t: 20, b: 36 }} alignItems="center">
					<UserAvatar image={profile.avatar} size="95px" />
					<FansView
						flexDirection="row"
						alignItems="center"
						margin={{ t: 5 }}
						gap={13}
						justifyContent="center"
					>
						<FansText
							fontSize={19}
							lineHeight={26}
							style={tw.style("font-bold")}
						>
							Jane Love
						</FansText>
						<FansView
							width={15.66}
							height={16}
							justifyContent="center"
						>
							<StarCheckSvg width={15.66} height={15} />
						</FansView>
					</FansView>
				</FansView>

				<FansView
					flexDirection="row"
					alignItems="center"
					gap={18}
					margin={{ b: 15 }}
				>
					<FansText fontSize={18} lineHeight={24}>
						fyp.fans/henry/
					</FansText>
					<FansView flex="1">
						<RoundTextInput maxLength={50} />
					</FansView>
				</FansView>
				<FansSwitch1
					label="Free trial link"
					value={isFree}
					onValueChange={(val) => setIsFree(val)}
					height={52}
				/>

				<FansView margin={{ b: 32 }}>
					<FansText
						fontSize={17}
						lineHeight={22}
						style={tw.style("font-semibold mb-[15px]")}
					>
						Offer limit
					</FansText>
					<FansDropdown
						data={createLinkOfferLimitOptions}
						value={limit}
						onSelect={(val) => setLimit(val.id ?? "")}
					/>
				</FansView>
				<FansView margin={{ b: 32 }}>
					<FansText
						fontSize={17}
						lineHeight={22}
						style={tw.style("font-semibold mb-[15px]")}
					>
						Free trial duration
					</FansText>
					<FansDropdown
						data={createLinkDurationOptions}
						value={duration}
						onSelect={(val) => setDuration(val.id as number)}
					/>
				</FansView>
				<RoundButton>Create link</RoundButton>
			</FansView>
		</BottomSheetWrapper>
	);
};

export default CreateLinkModal;
