import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { Fragment, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import {
	ChevronDown6Svg,
	ChevronUp2Svg,
	CloseSvg,
	DevotedPng,
	ElitePng,
	EnthusiastPng,
	LegendPng,
	SearchSvg,
} from "@assets/svgs/common";
import LoyalPng from "@assets/svgs/common/LoyalC";
import RoundButton from "@components/common/RoundButton";
import {
	FansButton,
	FansCheck,
	FansCheckButtons,
	FansChips,
	FansChips2,
	FansChips3,
	FansDivider,
	FansGap,
	FansImage,
	FansScreen2,
	FansScreen3,
	FansSvg,
	FansText,
	FansTextInput,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import { RoundButtonType } from "@usertypes/commonEnums";
import { ChatNativeStackParams } from "@usertypes/navigations";
import { IFansCheckButtonsItem } from "@usertypes/types";
import UserAvatar from "@components/avatar/UserAvatar";
import { getFansList } from "@helper/endpoints/chat/apis";
import Toast from "react-native-toast-message";

type ItemProps = {
	data: IFansCheckButtonsItem;
	onChange: (value: boolean) => void;
};

const RoleItem: React.FC<ItemProps> = (props) => {
	const { data, onChange } = props;
	const { color, icon, avatar, isChecked, text, text2 } = data;

	const handleChange = () => onChange(!isChecked);

	return (
		<FansCheck value={isChecked} onChange={handleChange}>
			<FansView
				height={65}
				style={tw.style("flex-row gap-[10px] items-center")}
			>
				{icon && (
					<View
						style={tw.style(
							"w-[46px] h-[46px]",
							`bg-[${color}]/15`,
							"flex justify-center items-center",
							"rounded-full",
						)}
					>
						{icon}
					</View>
				)}
				<UserAvatar size="46px" image={avatar} />
				<View>
					<FansText fontFamily="inter-semibold" fontSize={19}>
						{text}
					</FansText>
					<FansText fontSize={16}>{text2}</FansText>
				</View>
			</FansView>
		</FansCheck>
	);
};

const SendMessageScreen = (
	props: NativeStackScreenProps<ChatNativeStackParams, "SendMessage">,
) => {
	const { navigation } = props;

	const items = [
		{ text: "Individual fans" },
		{ text: "All fans" },
		// { text: "Roles" },
		// { text: "Recent" },
		{ text: "Canceled" },
		// { text: "Following" },
		// { text: "Muted" },
		{ text: "Tips Given" },
	];

	const items2 = [
		{ text: "Individual fans" },
		// { text: "Roles" },
		// { text: "Muted" },
	];

	const [limit, setLimit] = useState(10);

	const [initialFansItems, setInitialFansItems] = useState<
		IFansCheckButtonsItem[]
	>([]);
	const [fansItems, setFansItems] = useState<IFansCheckButtonsItem[]>([]);

	const [rolesItems, setRolesItems] = useState<IFansCheckButtonsItem[]>([
		{
			id: 0,
			color: "#FA7142",
			text: "Elite",
			text2: "12 fans",
			icon: (
				<FansView style={tw.style("w-[24.93px] h-[25.02px]")}>
					<ElitePng />
				</FansView>
			),
			isChecked: false,
		},
		{
			id: 1,
			color: "#FAAC42",
			text: "Legend",
			text2: "12 fans",
			icon: (
				<FansView style={tw.style("w-[19.28px] h-[27.18px]")}>
					<LegendPng />
				</FansView>
			),
			isChecked: false,
		},
		{
			id: 2,
			color: "#AC42FA",
			text: "Devoted",
			text2: "12 fans",
			icon: (
				<FansView style={tw.style("w-[26.16px] h-[26.25px]")}>
					<DevotedPng />
				</FansView>
			),
			isChecked: false,
		},
		{
			id: 3,
			color: "#42FAA5",
			text: "Loyal",
			text2: "12 fans",
			icon: (
				<FansView style={tw.style("w-[28.08px] h-[28.08px]")}>
					<LoyalPng />
				</FansView>
			),
			isChecked: false,
		},
		{
			id: 4,
			color: "#42ACFA",
			text: "Enthusiast",
			text2: "12 fans",
			icon: (
				<FansView style={tw.style("w-[25.34px] h-[22.46px]")}>
					<EnthusiastPng />
				</FansView>
			),
			isChecked: false,
		},
	]);

	const [selected, setSelected] = useState(0);
	const [selected2, setSelected2] = useState(0);
	const [isChecked, setChecked] = useState(false);
	const [isExclude, setExcludeYN] = useState(false);

	useEffect(() => {
		const fetchFansList = async () => {
			const response = await getFansList({
				category: selected,
				limit,
			});

			if (response.ok) {
				const fansList = response.data.fans.map((fan) => ({
					id: fan.id,
					text: fan.displayName,
					text2: fan.username,
					isChecked: false,
				}));

				setInitialFansItems(fansList);
				setFansItems(fansList);
			} else {
				Toast.show({
					type: "error",
					text1: "Error",
					text2: response.data.message,
				});
			}
		};
		fetchFansList();
	}, [selected, limit]);

	const handleChangeFans = (index: number, value: boolean) =>
		trigCheckFansItem(index, value);

	const handleChangeRoles = (index: number, value: boolean) =>
		trigCheckRolesItem(index, value);

	const handlePressExclude = () => setExcludeYN(!isExclude);

	const handlePressFansCheckButtons = (id: number) => {
		trigCheckFansItem(id, false);
	};

	const handlePressRolesCheckButtons = (id: number) => {
		trigCheckRolesItem(id, false);
	};

	const handlePressSend = () => {
		navigation.navigate("NewMessage");
	};

	const handleRenderItem = (item: IFansCheckButtonsItem) => {
		const { color, icon, avatar, text2 } = item;

		return (
			<View
				style={tw.style(
					"h-[34px]",
					"bg-fans-white",
					"flex-row gap-[5px] items-center",
					"px-[3px]",
					"rounded-full",
				)}
			>
				{icon && (
					<View
						style={tw.style(
							"w-[29px] h-[29px]",
							`bg-[${color}]/15`,
							"flex justify-center items-center",
							"rounded-full",
						)}
					>
						{icon}
					</View>
				)}
				<UserAvatar size="29px" image={avatar} />
				<FansText>{text2}</FansText>
				<View
					style={tw.style(
						"w-[29px] h-[29px]",
						"flex justify-center items-center",
					)}
				>
					<CloseSvg width={10} height={10} />
				</View>
			</View>
		);
	};

	const trigCheckFansItem = (index: number, value: boolean) => {
		const newItems = [...fansItems];
		newItems[index].isChecked = value;
		setFansItems(newItems);
	};

	const trigCheckRolesItem = (index: number, value: boolean) => {
		const newItems = [...rolesItems];
		newItems[index].isChecked = value;
		setRolesItems(newItems);
	};

	const fansCheckedItems = fansItems.filter((item) => item.isChecked);
	const rolesCheckedItems = rolesItems.filter((item) => item.isChecked);

	const onViewMore = () => setLimit(limit + 10);

	const onSearchFans = (text: string) => {
		const newItems = initialFansItems.filter(
			(item) =>
				item.text?.toLowerCase().includes(text.toLowerCase()) ||
				item.text2?.toLowerCase().includes(text.toLowerCase()),
		);
		setFansItems(newItems);
	};

	return (
		<FansScreen3>
			<FansView>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Send to
				</FansText>
				<FansGap height={15} />
				<FansChips3
					data={items}
					value={selected}
					viewStyle={{ style: tw.style("-mx-[17px]", "px-[17px]") }}
					onChangeValue={setSelected}
				/>
				<FansGap height={15} />
				{(selected === 0 ||
					selected === 1 ||
					selected === 2 ||
					selected === 3) && (
					<>
						{fansCheckedItems.length === 0 ? (
							<FansTextInput
								icon={SearchSvg}
								placeholder="Search fans"
								onChangeText={onSearchFans}
							/>
						) : (
							<FansCheckButtons
								data={fansCheckedItems}
								renderItem={handleRenderItem}
								onPress={handlePressFansCheckButtons}
							/>
						)}
						<FansGap height={15} />
						{fansItems.map((fansItem, index) => (
							<Fragment key={index}>
								{index !== 0 && <FansDivider />}
								<RoleItem
									data={fansItem}
									onChange={(value: boolean) =>
										handleChangeFans(index, value)
									}
								/>
							</Fragment>
						))}
					</>
				)}
				{selected === 5 && (
					<>
						{rolesCheckedItems.length === 0 ? (
							<FansTextInput
								icon={SearchSvg}
								placeholder="Search roles"
							/>
						) : (
							<FansCheckButtons
								data={rolesCheckedItems}
								renderItem={handleRenderItem}
								onPress={handlePressRolesCheckButtons}
							/>
						)}
						{rolesItems.map((roleItem, index) => (
							<Fragment key={index}>
								{index !== 0 && <FansDivider ver1 />}
								<RoleItem
									data={roleItem}
									onChange={(value: boolean) =>
										handleChangeRoles(index, value)
									}
								/>
							</Fragment>
						))}
					</>
				)}
				<FansGap height={15} />
				{(selected === 0 ||
					selected === 1 ||
					selected === 2 ||
					selected === 3) && (
					<RoundButton
						variant={RoundButtonType.OUTLINE_PRIMARY}
						onPress={onViewMore}
					>
						View more
					</RoundButton>
				)}
			</FansView>
			<FansGap height={35} />
			<View>
				<TouchableOpacity onPress={handlePressExclude}>
					<FansView
						alignItems="center"
						flexDirection="row"
						justifyContent="between"
					>
						<FansText fontFamily="inter-semibold" fontSize={17}>
							Exclude
						</FansText>
						{isExclude ? (
							<FansSvg
								width={12.72}
								height={6.36}
								svg={ChevronUp2Svg}
								color1="grey-70"
							/>
						) : (
							<FansSvg
								width={12.72}
								height={6.36}
								svg={ChevronDown6Svg}
								color1="grey-70"
							/>
						)}
					</FansView>
				</TouchableOpacity>
				{isExclude && (
					<Fragment>
						<FansGap height={15} />
						<FansChips
							data={items2}
							value={selected2}
							onChangeValue={setSelected2}
						/>
						<FansGap height={15} />
						<FansTextInput
							iconNode={<SearchSvg size={14} />}
							placeholder="Search fans"
							onChangeText={onSearchFans}
						/>
					</Fragment>
				)}
			</View>
			<FansGap height={35} />
			<FansButton title="Send" onPress={handlePressSend} />
		</FansScreen3>
	);
};

export default SendMessageScreen;
