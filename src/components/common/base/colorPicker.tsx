import React, { FC, useState } from "react";
import ColorPicker, {
	Panel3,
	OpacitySlider,
	PreviewText,
} from "reanimated-color-picker";

import FypModal from "./modal";
import RoundButton from "../RoundButton";
import { FansView } from "@components/controls";

import tw from "@lib/tailwind";
import { RoundButtonType } from "@usertypes/commonEnums";

interface Props {
	visible: boolean;
	onCancel: () => void;
	onSelect: (color: string) => void;
}

const FypColorPicker: FC<Props> = (props) => {
	const { visible, onCancel, onSelect } = props;

	const [color, setColor] = useState("#fff");

	const onSelectColor = (hex: string) => {
		setColor(hex);
	};

	return (
		<FypModal
			visible={visible}
			onDismiss={onCancel}
			width={{ xs: "full", md: 350 }}
		>
			<FansView position="relative" padding={{ x: 18, t: 24, b: 14 }}>
				<ColorPicker
					value={color}
					onComplete={({ hex }) => onSelectColor(hex)}
				>
					<FansView margin={{ b: 16 }}>
						<PreviewText />
					</FansView>
					<FansView
						width={200}
						height={200}
						style={tw.style("mx-auto")}
						margin={{ b: 16 }}
					>
						<Panel3 />
					</FansView>
					<OpacitySlider />
				</ColorPicker>

				<FansView flexDirection="row" gap={8} margin={{ t: 16 }}>
					<FansView flex="1">
						<RoundButton
							onPress={onCancel}
							variant={RoundButtonType.OUTLINE_PRIMARY}
						>
							Cancel
						</RoundButton>
					</FansView>
					<FansView flex="1">
						<RoundButton onPress={() => onSelect(color)}>
							Save
						</RoundButton>
					</FansView>
				</FansView>
			</FansView>
		</FypModal>
	);
};

export default FypColorPicker;
