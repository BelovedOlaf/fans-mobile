import React, { FC, ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { EditSvg, Star1Svg, Trash3Svg } from "@assets/svgs/common";
import {
	FansGap,
	FansSheet,
	FansSvg,
	FansText,
	FansView,
} from "@components/controls";
import { IColorStyle2 } from "@usertypes/styles";
import { IPaymentMethod } from "@usertypes/types";
import { deletePaymentMethod } from "@helper/endpoints/subscriptions/apis";
import { useDeviceContext } from "twrnc";
import tw from "@lib/tailwind";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";

interface ItemProps {
	icon: ReactNode;
	text: string;
	textColor?: IColorStyle2;
	onPress: () => void;
}

type Props = {
	paymentMethod?: IPaymentMethod | null;
	open: boolean;
	onClose: () => void;
	onEdit: () => void;
	onSubmit: () => void;
	onSuccess: () => void;
};

const PaymentMethodSheet: FC<Props> = (props) => {
	const { paymentMethod, onSuccess, onEdit, open, onClose } = props;

	useDeviceContext(tw);

	const onDelete = async () => {
		if (!paymentMethod) return;

		const { id, customerPaymentProfileId } = paymentMethod;

		const response = await deletePaymentMethod({
			paymentMethodId: id,
			customerPaymentProfileId,
		});

		if (response.ok) {
			Toast.show({
				type: "success",
				text1: "Payment method deleted",
			});
			onSuccess();
		} else {
			Toast.show({
				type: "error",
				text1: response.data.message,
			});
		}
	};

	const items: ItemProps[] = [
		{
			icon: <FansSvg width={18.81} height={19.61} svg={EditSvg} />,
			text: "Update card",
			onPress: onEdit,
		},
		{
			icon: (
				<FansSvg
					width={18.5}
					height={23}
					svg={Trash3Svg}
					color1="red"
				/>
			),
			text: "Delete",
			textColor: "red",
			onPress: onDelete,
		},
	];

	return (
		<BottomSheetWrapper open={open} onClose={onClose}>
			{items.map((item, index) => {
				const { icon, text, textColor, onPress } = item;

				return (
					<TouchableOpacity onPress={onPress} key={index}>
						<FansView
							alignItems="center"
							flexDirection="row"
							key={index}
						>
							<FansView width={63} height={52} center>
								{icon}
							</FansView>
							<FansText color={textColor} fontSize={18}>
								{text}
							</FansText>
						</FansView>
					</TouchableOpacity>
				);
			})}
		</BottomSheetWrapper>
	);
};

export default PaymentMethodSheet;
