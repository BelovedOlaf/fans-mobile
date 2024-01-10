import {
	IFansDropdownItem,
	IFansTabsItem,
	IPost,
	ITransaction,
} from "@usertypes/types";
import { FC, MutableRefObject, ReactNode } from "react";
import {
	ButtonProps,
	ImageProps,
	LayoutChangeEvent,
	ModalProps,
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	ScrollViewProps,
	StyleProp,
	SwitchProps,
	TextInputProps,
	TextProps,
	TextStyle,
	TouchableOpacityProps,
	ViewProps,
	ViewStyle,
} from "react-native";
import { SelectDropdownProps } from "react-native-select-dropdown";
import { SvgProps } from "react-native-svg";
import { FansColors } from "./enums";
import {
	AspectRatioStyle,
	BorderRadiusStyle,
	BorderStyle,
	BottomStyle,
	ColorStyle1,
	ColorStyle2,
	FansColorStyle,
	FansFillStyle,
	FlexBasisStyle,
	FlexStyle,
	FlexWrapStyle,
	FontFamilyStyle,
	FontWeightStyle,
	IAlignItemsStyle,
	IAlignSelfStyle,
	IColorStyle2,
	IDisplayStyle,
	IFlexDirectionStyle,
	IFontSizeStyle,
	IGapStyle,
	IHeightStyle,
	IJustifyContentStyle,
	ILineHeightStyle,
	IMarginStyle,
	IMaxWidthStyle,
	IPaddingStyle,
	IWidthStyle,
	LetterSpacingStyle,
	OpacityStyle,
	OverflowStyle,
	PlacementStyle,
	PositionStyle,
	RightStyle,
	TextAlignStyle,
	TextDecorationLineStyle,
	TextTransformStyle,
	TopStyle,
} from "./styles";
import { IChipsItem, IFansCheckButtonsItem } from "./types";

// define styles
export type ColorStyle = string;

export type PaddingStyle = number[];

interface FansScreenProps
	extends Pick<ScrollViewProps, "children" | "style" | "onScroll"> {
	screenStyle?: Pick<FansViewProps, "alignItems">;
	background?: ColorStyle;
	contentStyle?: StyleProp<ViewStyle>;
	contentStyle1?: Pick<
		FansViewProps,
		"maxWidth" | "flexDirection" | "grow" | "padding"
	>;
	contentContainerStyle?: StyleProp<ViewStyle>;
	overflow?: boolean;
	padding?: PaddingStyle;
	ver1?: boolean;
	ver2?: boolean;
}

export interface FansSheetProps<Input = undefined>
	extends Pick<ModalProps, "children" | "visible"> {
	width?: IWidthStyle;
	height?: IHeightStyle;
	data?: Input;
	sheetStyle?: Pick<FansViewProps, "alignItems" | "padding">;
	transaction?: ITransaction;
	onClose: () => void;
	onSubmit: (value: string) => void;
}

interface FansButtonProps
	extends Omit<ButtonProps, "title">,
		Pick<
			FansViewProps,
			"width" | "height" | "style" | "children" | "grow"
		> {
	title?: string;
	icon?: ReactNode;
	buttonStyle?: Pick<
		FansViewProps,
		| "alignSelf"
		| "backgroundColor"
		| "borderColor"
		| "flex"
		| "gap"
		| "grow"
	>;
	textStyle1?: {
		color?: IColorStyle2;
		fontFamily?: FontFamilyStyle;
		fontSize?: IFontSizeStyle;
	};

	backgroundColor?: IColorStyle2;
	borderColor?: IColorStyle2;
	textColor?: IColorStyle2;
	color?: FansColors;
	colorFans?: FansColorStyle;
	fillMode?: FansFillStyle;
	ver1?: boolean;
	ver2?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<ViewStyle>;
}

interface FansCheckProps
	extends Pick<FansViewProps, "height" | "width" | "gap"> {
	value: boolean;
	label?: ReactNode;
	onChangeValue: (value: boolean) => void;
}

interface FansCheckButtonsProps {
	data: IFansCheckButtonsItem[];
	renderItem: (item: IFansCheckButtonsItem) => React.ReactNode;
	onPress: (id: number) => void;
}

interface FansChipsProps extends Pick<ScrollViewProps, "style"> {
	data: IChipsItem[];
	value?: number | string;
	viewStyle?: Pick<FansViewProps, "style">;
	viewStyle1?: Pick<FansViewProps, "margin" | "padding">;
	chipsStyle?: Pick<FansViewProps, "backgroundColor">;
	onChangeValue: ((value: number) => void) | ((value: string) => void);
	onContentSizeChange?: ((w: number, h: number) => void) | undefined;
	onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
	onScroll?:
		| ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
		| undefined;
	scrollEventThrottle?: number | undefined;
	scrollRef?: MutableRefObject<ScrollView | null> | undefined;

	activeColor?: ColorStyle;
	activeColor1?: ColorStyle1;
	selected?: number;
}

interface FansDividerProps
	extends Pick<FansViewProps, "width" | "height" | "style"> {
	size?: number;
	color?: FansColorStyle;
	vertical?: boolean;
	ver1?: boolean;
}

interface FansDropdownProps {
	data: IFansDropdownItem[];
	value?: number | string;
	dropdownStyle?: Pick<
		SelectDropdownProps,
		"defaultButtonText" | "buttonStyle" | "search"
	>;
	onSelect: (value: IFansDropdownItem, index?: number) => void;
}

interface FansIconButtonProps extends TouchableOpacityProps {
	size?: number;
	containerColor?: string;
}

interface FansLayoutProps {
	children: ReactNode;
}

interface FansTextInputProps
	extends TextInputProps,
		Pick<FansViewProps, "width" | "height" | "grow"> {
	viewStyle?: Pick<FansViewProps, "borderRadius" | "grow" | "padding">;
	textInputStyle?: Pick<
		TextInputProps,
		| "multiline"
		| "placeholder"
		| "placeholderTextColor"
		| "secureTextEntry"
		| "style"
		| "onFocus"
	>;
	iconNode?: ReactNode;
	textStyle?: StyleProp<TextStyle>;
	icon?: IFansSvg | React.FC;
	label?: string;
	ver1?: boolean;
	error?: boolean;
	errorText?: string;
}

export interface FansViewProps extends ViewProps {
	width?: IWidthStyle;
	height?: IHeightStyle;
	maxWidth?: IMaxWidthStyle;
	alignItems?: IAlignItemsStyle;
	alignSelf?: IAlignSelfStyle;
	aspectRatio?: AspectRatioStyle;
	backgroundColor?: IColorStyle2;
	border?: BorderStyle;
	borderColor?: IColorStyle2;
	borderRadius?: BorderRadiusStyle;
	bottom?: BottomStyle;
	display?: IDisplayStyle;
	flex?: FlexStyle;
	flexBasis?: FlexBasisStyle;
	flexDirection?: IFlexDirectionStyle;
	flexWrap?: FlexWrapStyle;
	gap?: IGapStyle;
	grow?: boolean;
	justifyContent?: IJustifyContentStyle;
	margin?: IMarginStyle;
	opacity?: OpacityStyle;
	overflow?: OverflowStyle;
	padding?: IPaddingStyle;
	placement?: PlacementStyle;
	position?: PositionStyle;
	right?: RightStyle;
	scrollViewProps?: Pick<
		ScrollViewProps,
		| "contentContainerStyle"
		| "horizontal"
		| "showsHorizontalScrollIndicator"
		| "onContentSizeChange"
		| "onLayout"
		| "onScroll"
		| "scrollEventThrottle"
	>;
	scrollRef?: MutableRefObject<ScrollView | null> | undefined;
	top?: TopStyle;
	touchableOpacityProps?: Pick<
		TouchableOpacityProps,
		"activeOpacity" | "onPress"
	>;

	background?: ColorStyle1 | string;
	center?: boolean;
	size?: number;
}

export type EmojiProps = {
	emoji: number;
	size?: number;
} & TextProps;

interface FansGapProps
	extends Pick<FansViewProps, "width" | "height" | "grow"> {
	viewStyle?: Pick<FansViewProps, "flex" | "grow">;
}

export interface FansSvgProps
	extends Pick<FansViewProps, "width" | "height">,
		Omit<SvgProps, "width" | "height" | "opacity"> {
	color?: string;
	color1?: ColorStyle2;
	colorFans?: FansColorStyle;
	fill?: FansColors;
	size?: number;
	svg?: IFansSvg | React.FC;
}

interface FansImageProps
	extends Pick<
			FansViewProps,
			"width" | "height" | "style" | "background" | "position"
		>,
		Pick<ImageProps, "source" | "resizeMode"> {
	viewStyle?: Pick<
		FansViewProps,
		| "alignSelf"
		| "aspectRatio"
		| "borderColor"
		| "borderRadius"
		| "flexBasis"
		| "grow"
		| "margin"
		| "padding"
		| "placement"
		| "position"
	>;
	imageStyle?: Pick<ImageProps, "resizeMode">;
}

export interface FansModalProps
	extends Pick<ModalProps, "children" | "visible">,
		Pick<FansViewProps, "width" | "height"> {
	modalStyle?: Pick<FansViewProps, "alignItems" | "padding">;
	code?: string;
	onClose: () => void;
	onSubmit: (value?: string) => void;
}

interface FansPhoneInputProps {
	value: string;
	onChange: (value: string) => void;
}

interface FansSwitchProps
	extends Pick<SwitchProps, "value" | "onValueChange">,
		Pick<FansViewProps, "width" | "height" | "style"> {
	switchStyle?: Pick<FansViewProps, "backgroundColor">;
	label?: string | ReactNode;
}

interface FansTabsProps {
	data: IFansTabsItem[];
	value: number | string;
	viewStyle?: Pick<FansViewProps, "margin">;
	tabStyle?: { activeBorderColor: IColorStyle2 };
	onChangeValue: ((value: number) => void) | ((value: string) => void);
}

interface FansTextProps extends TextProps {
	color?: IColorStyle2;
	fontFamily?: FontFamilyStyle;
	fontSize?: IFontSizeStyle;
	letterSpacing?: LetterSpacingStyle;
	lineHeight?: ILineHeightStyle;
	textAlign?: TextAlignStyle;
	textDecorationLine?: TextDecorationLineStyle;
	textTransform?: TextTransformStyle;
}

interface FansLinkProps extends FansTextProps {
	url?: string;
	onPress?: () => void;
}

interface FypModalProps
	extends Pick<ModalProps, "children" | "visible">,
		Pick<FansViewProps, "width" | "height"> {
	modalStyle?: Pick<FansViewProps, "alignItems" | "padding">;
	onDismiss: () => void;
}

interface FypTextProps extends TextProps {
	color?: IColorStyle2;
	fontSize?: IFontSizeStyle;
	fontFamily?: string;
	letterSpacing?: LetterSpacingStyle;
	lineHeight?: ILineHeightStyle;
	textAlign?: TextAlignStyle;
	textDecorationLine?: TextDecorationLineStyle;
	textTransform?: TextTransformStyle;
	fontWeight?: FontWeightStyle;
	margin?: IMarginStyle;
}
interface FypDropdownProps {
	data: IFansDropdownItem[];
	value?: number | string;
	dropdownStyle?: Pick<
		SelectDropdownProps,
		"defaultButtonText" | "buttonStyle"
	>;
	onSelect: (value: IFansDropdownItem, index?: number) => void;
	search?: boolean;
}

export interface FypPostContentProps {
	data: IPost;
	onClickMedia?: (index: number) => void;
}

export interface FypLinearGradientViewProps extends FansViewProps {
	colors: string[];
}

// define components
export type FansCheckButtonsComponent = FC<FansCheckButtonsProps>;
export type FansEmojiComponent = FC<EmojiProps>;
export type FansIconButtonComponent = React.FC<FansIconButtonProps>;
export type FansLayoutComponent = FC<FansLayoutProps>;

export interface IFansButton extends FC<FansButtonProps> {}
export interface IFansCheck extends FC<FansCheckProps> {}
export interface IFansChips extends FC<FansChipsProps> {}
export interface IFansDivider extends FC<FansDividerProps> {}
export interface IFansDropdown extends FC<FansDropdownProps> {}
export interface IFansGap extends FC<FansGapProps> {}
export interface IFansImage extends FC<FansImageProps> {}
export interface IFansModal extends FC<FansModalProps> {}
export interface IFansPhoneInput extends FC<FansPhoneInputProps> {}
export interface IFansScreen extends FC<FansScreenProps> {}
export interface IFansSheet<Input = undefined>
	extends FC<FansSheetProps<Input>> {}
export interface IFansSvg extends FC<FansSvgProps> {}
export interface IFansSwitch extends FC<FansSwitchProps> {}
export interface IFansTabs extends FC<FansTabsProps> {}
export interface IFansText extends FC<FansTextProps> {}
export interface IFansTextInput extends FC<FansTextInputProps> {}
export interface IFansView extends FC<FansViewProps> {}
export interface IFansLink extends FC<FansLinkProps> {}

export interface IFypModal extends FC<FypModalProps> {}
export interface IFypText extends FC<FypTextProps> {}

export interface IFypDropdown extends FC<FypDropdownProps> {}
export interface IFypPostContent extends FC<FypPostContentProps> {}
export interface IFypLinearGradientView
	extends FC<FypLinearGradientViewProps> {}
