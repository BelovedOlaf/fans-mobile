import { ChevronDownSvg, CircledDollarSvg, UserSvg } from "@assets/svgs/common";
import { FansGap, FansImage2, FansText, FansView } from "@components/controls";
import { CreatorReferralCreator } from "@usertypes/types";
import { getAgoTime } from "@utils/common";
import React, { FC } from "react";

const CreatorItem: FC<{ data: CreatorReferralCreator }> = (props) => {
	const { data } = props;
	const { amount, referentId, referent } = data;

	return (
		<FansView height={82} flexDirection="row" background="white">
			<FansImage2
				width={34}
				height={34}
				viewStyle={{ borderRadius: "full" }}
				source={require("@assets/images/default-avatar.png")}
			/>

			<FansGap width={13} />

			<FansView>
				<FansText fontFamily="inter-medium" fontSize={16}>
					{referent?.displayName}
				</FansText>

				<FansGap height={10} />

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
						MONTHLY INCOME / MO ${amount.toLocaleString()}
					</FansText>
				</FansView>

				<FansGap height={8} />

				<FansView flexDirection="row" alignItems="center">
					<UserSvg width={15.43} height={15.71} color="#4DCC36" />
					<FansGap width={6} />
					<FansText fontFamily="inter-medium" fontSize={16}>
						{referent?.likeCount?.toLocaleString()}
					</FansText>

					<FansGap width={22} />

					<CircledDollarSvg
						width={17}
						height={17}
						colorFans="fans-green"
					/>
					<FansGap width={6} />
					<FansText fontFamily="inter-medium" fontSize={16}>
						{amount.toLocaleString()}
					</FansText>
				</FansView>
			</FansView>

			<FansView
				style={{ position: "absolute", right: 0 }}
				flexDirection="row"
				alignItems="center"
			>
				<FansText fontFamily="inter-regular" fontSize={14}>
					{getAgoTime(referent?.createdAt ?? "")}
				</FansText>
				<FansGap width={16} />
				<ChevronDownSvg width={14} height={7} />
			</FansView>
		</FansView>
	);
};

export default CreatorItem;
