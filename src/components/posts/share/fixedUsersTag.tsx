import React, { FC } from "react";
import { Popover } from "react-native-popable";

import { FypText } from "@components/common/base";
import { FansIconButton, FansView } from "@components/controls";
import { CloseSvg } from "@assets/svgs/common";

import tw from "@lib/tailwind";
import { IUserTag } from "@usertypes/types";

interface Props {
	visible: boolean;
	usertags: IUserTag[];
	onRemove: (tadId: string) => void;
}

const FixedUsersTag: FC<Props> = (props) => {
	const { visible, usertags, onRemove } = props;
	return (
		<Popover
			visible={visible}
			style={[
				{
					width: 150,
					position: "absolute",
					transform: [{ translateX: -75 }],
				},
				tw.style("left-1/2 top-1/2"),
			]}
		>
			<FansView>
				{usertags.map((usertag) => (
					<FansView
						key={usertag.id}
						flexDirection="row"
						alignItems="center"
						padding={{ l: 4, r: 16 }}
						gap={1}
						position="relative"
					>
						<FypText
							color="white"
							fontSize={17}
							numberOfLines={1}
							lineHeight={22}
							textAlign="center"
							style={tw.style("flex-1")}
						>
							{usertag.user?.username}
						</FypText>

						<FansIconButton
							size={12}
							containerColor="transparent"
							style={tw.style("absolute top-[5px] right-1")}
							onPress={() => onRemove(usertag.id)}
						>
							<CloseSvg color="#fff" size={10} />
						</FansIconButton>
					</FansView>
				))}
			</FansView>
		</Popover>
	);
};

export default FixedUsersTag;
