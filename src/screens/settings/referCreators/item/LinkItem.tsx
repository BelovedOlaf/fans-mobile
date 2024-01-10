import { Block3Svg, ChevronDownSvg, UserSvg } from "@assets/svgs/common";
import ClickSvg from "@assets/svgs/common/Click";
import { FansGap, FansSvg, FansText, FansView } from "@components/controls";
import React, { FC, useState } from "react";
import DeleteLinkModal from "../modal/DeleteLinkModal";
import { CreatorReferralLinkPerformance } from "@usertypes/types";
import * as apis from "@helper/endpoints";

const LinkItem: FC<{
	data: CreatorReferralLinkPerformance;
	onDeleteLink: () => void;
}> = (props) => {
	const { data, onDeleteLink } = props;
	const { id, code, amount, count } = data;
	const share = 40;
	const date = "";

	const [isDeleteLinkModalOpened, setDeleteLinkModalOpened] = useState(false);

	const onRemoveLink = () => {
		setDeleteLinkModalOpened(true);
	};

	const handleCloseDeleteLinkModal = () => {
		setDeleteLinkModalOpened(false);
	};
	const handleSubmitDeleteLinkModal = async () => {
		const resp = await apis.profile.deleteReferralLink({}, { id: id });
		if (resp.ok) {
			onDeleteLink();
		}
	};

	return (
		<FansView height={82} flexDirection="row" background="white">
			<FansView>
				<FansText fontFamily="inter-medium" fontSize={16}>
					{`fyp.fans/?r=${code ?? ""}`}
				</FansText>

				<FansGap height={10} />

				<FansView flexDirection="row" alignItems="center">
					<FansView
						alignItems="center"
						backgroundColor={{
							color: "green-4d",
							opacity: 10,
						}}
						borderRadius="full"
						padding={{ x: 10 }}
						height={20}
					>
						<FansText
							fontFamily="inter-medium"
							fontSize={16}
							color="green-4d"
						>
							REVENUE ${amount.toLocaleString()}
						</FansText>
					</FansView>

					<FansGap width={7} />

					<FansView
						alignItems="center"
						backgroundColor={{
							color: "green-4d",
							opacity: 10,
						}}
						borderRadius="full"
						padding={{ x: 10 }}
						height={20}
					>
						<FansText
							fontFamily="inter-medium"
							fontSize={16}
							color="green-4d"
						>
							{share.toLocaleString()}% SHARE
						</FansText>
					</FansView>
				</FansView>

				<FansGap height={8} />

				<FansView flexDirection="row" alignItems="center">
					<UserSvg width={15.43} height={15.71} color="#4DCC36" />
					<FansGap width={6} />
					<FansText fontFamily="inter-medium" fontSize={16}>
						{count.toLocaleString()}
					</FansText>

					<FansGap width={22} />

					<ClickSvg width={17} height={17} color="#4dcc36" />
					<FansGap width={6} />
					<FansText fontFamily="inter-medium" fontSize={16}>
						{count.toLocaleString()}
					</FansText>
				</FansView>
			</FansView>

			<FansView
				style={{ position: "absolute", right: 0 }}
				flexDirection="row"
				alignItems="center"
			>
				<FansText fontFamily="inter-regular" fontSize={14}>
					{date}
				</FansText>
				<FansGap width={16} />
				<ChevronDownSvg width={14} height={7} />
			</FansView>

			<FansView
				style={{ position: "absolute", right: 0, bottom: 0 }}
				width={34}
				height={34}
				alignItems="center"
				backgroundColor="grey-f0"
				borderRadius="full"
				justifyContent="center"
				touchableOpacityProps={{ onPress: onRemoveLink }}
			>
				<FansSvg
					width={16}
					height={16}
					color1="red-eb"
					svg={Block3Svg}
				/>
			</FansView>

			<DeleteLinkModal
				visible={isDeleteLinkModalOpened}
				onClose={handleCloseDeleteLinkModal}
				onSubmit={handleSubmitDeleteLinkModal}
			/>
		</FansView>
	);
};

export default LinkItem;
