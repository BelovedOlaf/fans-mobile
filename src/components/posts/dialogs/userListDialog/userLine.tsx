import { CheckSvg, RoundedPlusSvg, TrashSvg } from "@assets/svgs/common";
import AvatarWithStatus from "@components/common/AvatarWithStatus";
import { FansText, FansView, FansIconButton } from "@components/controls";

import tw from "@lib/tailwind";

import React, { FC } from "react";
import { Pressable } from "react-native";

interface Props {
	avatar?: string;
	username: string;
	displayName?: string;
	selected?: boolean;
	onSelect?: () => void;
	onDelete?: () => void;
}

const UserLine: FC<Props> = (props) => {
	const { onSelect, avatar, username, displayName, selected, onDelete } =
		props;

	return (
		<FansView
			flexDirection="row"
			alignItems="center"
			border={{ b: 1 }}
			borderColor="grey"
			padding={{ y: 10 }}
		>
			<FansView
				margin={{ r: 22 }}
				style={tw.style(!onSelect && "hidden")}
			>
				{selected ? (
					<Pressable
						onPress={onSelect}
						style={tw.style(
							"w-[25px] h-[25px] bg-fans-purple items-center justify-center rounded-full",
						)}
					>
						<CheckSvg width={13.77} height={9.84} color="#fff" />
					</Pressable>
				) : (
					<Pressable
						onPress={onSelect}
						style={tw.style("w-[25px] h-[25px]")}
					>
						<RoundedPlusSvg width={25} height={25} />
					</Pressable>
				)}
			</FansView>
			<AvatarWithStatus
				avatar={avatar ?? ""}
				size={46}
				onPress={onSelect}
			/>

			<FansView margin={{ l: 12 }} flex="1">
				<FansText
					fontSize={19}
					lineHeight={26}
					style={tw.style(
						"font-semibold",
						displayName ? "mb-[-3px]" : "",
					)}
					numberOfLines={1}
					onPress={onSelect}
				>
					{displayName}
				</FansText>
				<FansText
					style={tw.style("text-fans-dark-grey")}
					fontSize={16}
					lineHeight={21}
					onPress={onSelect}
				>
					{`@${username}`}
				</FansText>
			</FansView>
			<FansIconButton
				style={tw.style(!onDelete && "hidden")}
				onPress={onDelete}
			>
				<TrashSvg size={15} color="#eb2121" />
			</FansIconButton>
		</FansView>
	);
};

export default UserLine;
