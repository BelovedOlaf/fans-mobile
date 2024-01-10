import tw from "@lib/tailwind";
import { Components } from "./enums";
import { Colors, Components1 } from "./types";
import { isUndefined } from "lodash";

export enum ColorStyle1 {
	Black = "fans-black",
	Blue = "fans-blue",
	Green = "fans-green",
	Grey = "fans-grey",
	GreyDark = "fans-grey-dark",
	GreyDE = "fans-grey-de",
	Purple = "fans-purple",
	PurpleLite = "fans-purple-light",
	White = "fans-white",
	Red = "fans-red",
}

export type AlignItemsStyle = "start" | "end" | "center" | "stretch";
export type IAlignItemsStyle =
	| AlignItemsStyle
	| ResponsiveStyle<AlignItemsStyle>;
export const getAlignItemsStyle = (style: IAlignItemsStyle): string => {
	switch (typeof style) {
		case "string":
			return `items-${style}`;
		case "object": {
			const { xs, sm, md, lg, xl, xxl } = style;
			return [
				xs && getAlignItemsStyle(xs),
				sm && "sm:" + getAlignItemsStyle(sm),
				md && "md:" + getAlignItemsStyle(md),
				lg && "lg:" + getAlignItemsStyle(lg),
				xl && "xl:" + getAlignItemsStyle(xl),
				xxl && "xxl:" + getAlignItemsStyle(xxl),
			].join(" ");
		}
	}
};

export type AlignSelfStyle = "start" | "end" | "center" | "stretch";
export type IAlignSelfStyle = AlignSelfStyle | ResponsiveStyle<AlignSelfStyle>;
export const getAlignSelfStyle = (style: IAlignSelfStyle): string => {
	if (typeof style === "string") {
		return `self-${style}`;
	}
	if (typeof style === "object") {
		const { xs, sm, md, lg, xl, xxl } = style;
		return [
			xs && getAlignSelfStyle(xs),
			sm && "sm:" + getAlignSelfStyle(sm),
			md && "md:" + getAlignSelfStyle(md),
			lg && "lg:" + getAlignSelfStyle(lg),
			xl && "xl:" + getAlignSelfStyle(xl),
			xxl && "xxl:" + getAlignSelfStyle(xxl),
		].join(" ");
	}
	return "";
};

export type AspectRatioStyle = "square";

export type ColorStyle2 =
	| Colors
	| "transparent"
	| { color: Colors; opacity: OpacityStyle };
export type IColorStyle2 = ColorStyle2 | ResponsiveStyle<ColorStyle2>;
export const getColorStyle = (style: IColorStyle2): string => {
	if (typeof style === "string") {
		return tw.color(`fans-${style}`) ?? "";
	}
	return "";
};
export const getBackgroundColorStyle = (style: IColorStyle2): string => {
	if (typeof style === "string") {
		return `bg-fans-${style}`;
	}
	if (typeof style === "object") {
		if ("opacity" in style) {
			const { color, opacity } = style;
			return `bg-fans-${color}/${opacity}`;
		}

		const { xs, sm, md, lg, xl, xxl } = style;
		return [
			xs && getBackgroundColorStyle(xs),
			sm && "sm:" + getBackgroundColorStyle(sm),
			md && "md:" + getBackgroundColorStyle(md),
			lg && "lg:" + getBackgroundColorStyle(lg),
			xl && "xl:" + getBackgroundColorStyle(xl),
			xxl && "xxl:" + getBackgroundColorStyle(xxl),
		].join(" ");
	}
	return "";
};
export const getBorderColorStyle = (style: IColorStyle2): string => {
	if (typeof style === "string") {
		if (style === "transparent") {
			return `border-${style}`;
		}
		return `border-fans-${style}`;
	}
	if (typeof style === "object") {
		if ("opacity" in style) {
			const { color, opacity } = style;
			return `border-fans-${color}/${opacity}`;
		}

		const { xs, sm, md, lg, xl, xxl } = style;
		return [
			xs && getBorderColorStyle(xs),
			sm && "sm:" + getBorderColorStyle(sm),
			md && "md:" + getBorderColorStyle(md),
			lg && "lg:" + getBorderColorStyle(lg),
			xl && "xl:" + getBorderColorStyle(xl),
			xxl && "xxl:" + getBorderColorStyle(xxl),
		].join(" ");
	}
	return "";
};
export const getTextColorStyle = (style: IColorStyle2): string => {
	if (typeof style === "string") {
		return `text-fans-${style}`;
	}
	if (typeof style === "object") {
		if ("opacity" in style) {
			const { color, opacity } = style;
			return `text-fans-${color}/${opacity}`;
		}

		const { xs, sm, md, lg, xl, xxl } = style;
		return [
			xs && getTextColorStyle(xs),
			sm && "sm:" + getTextColorStyle(sm),
			md && "md:" + getTextColorStyle(md),
			lg && "lg:" + getTextColorStyle(lg),
			xl && "xl:" + getTextColorStyle(xl),
			xxl && "xxl:" + getTextColorStyle(xxl),
		].join(" ");
	}
	return "";
};

export type FansColorStyle =
	| "fans-green"
	| "fans-grey"
	| "fans-grey-de"
	| "fans-grey-dark"
	| "fans-purple"
	| "fans-red"
	| "fans-red-FF"
	| "fans-white"
	| "fans-grey-f0";

export type FansFillStyle = "fill" | "outline";

export type BorderStyle =
	| number
	| {
			t?: number;
			r?: number;
			b?: number;
			l?: number;
			x?: number;
			y?: number;
	  };
export const getBorderStyle = (style: BorderStyle): string => {
	switch (typeof style) {
		case "number":
			return `border-[${style}px]`;
		case "object": {
			const { t, r, b, l, x, y } = style;
			return [
				t && `border-t-[${t}px]`,
				r && `border-r-[${r}px]`,
				b && `border-b-[${b}px]`,
				l && `border-l-[${l}px]`,
				x && `border-x-[${x}px]`,
				y && `border-y-[${y}px]`,
			].join(" ");
		}
		default:
			return "";
	}
};

export type BorderRadiusStyle =
	| "full"
	| number
	| {
			t?: number;
			r?: number;
			b?: number;
			l?: number;
			tl?: number;
			tr?: number;
			br?: number;
			bl?: number;
	  };
export const getBorderRadiusStyle = (
	style: BorderRadiusStyle,
	position: string = "",
): string => {
	switch (typeof style) {
		case "string":
			if (style === "full") {
				return "rounded-full";
			}
			return "";
		case "number":
			return `rounded-${position}[${style}px]`;
		case "object":
			if (
				"t" in style ||
				"r" in style ||
				"b" in style ||
				"l" in style ||
				"tl" in style ||
				"tr" in style ||
				"br" in style ||
				"bl" in style
			) {
				const { t, r, b, l, tl, tr, br, bl } = style;
				return [
					t && getBorderRadiusStyle(t, "t-"),
					r && getBorderRadiusStyle(r, "r-"),
					b && getBorderRadiusStyle(b, "b-"),
					l && getBorderRadiusStyle(l, "l-"),
					tl && getBorderRadiusStyle(tl, "tl-"),
					tr && getBorderRadiusStyle(tr, "tr-"),
					br && getBorderRadiusStyle(br, "br-"),
					bl && getBorderRadiusStyle(bl, "bl-"),
				].join(" ");
			}
	}
	return "";
};

export type BottomStyle = number;

type DisplayStyle = "flex" | "hidden";
export type IDisplayStyle = DisplayStyle | ResponsiveStyle<DisplayStyle>;
export const getDisplayStyle = (style: IDisplayStyle): string => {
	if (typeof style === "string") {
		return style;
	}
	if (typeof style === "object") {
		const { xs, sm, md, lg, xl, xxl } = style;
		return [
			xs && getDisplayStyle(xs),
			sm && "sm:" + getDisplayStyle(sm),
			md && "md:" + getDisplayStyle(md),
			lg && "lg:" + getDisplayStyle(lg),
			xl && "xl:" + getDisplayStyle(xl),
			xxl && "xxl:" + getDisplayStyle(xxl),
		].join(" ");
	}
	return "";
};

export type FlexStyle = "1" | "auto";

export type FlexBasisStyle = "1/3" | "1/4";

export type FlexDirectionStyle = "col" | "row";
export type IFlexDirectionStyle =
	| FlexDirectionStyle
	| ResponsiveStyle<FlexDirectionStyle>;
export const getFlexDirectionStyle = (
	style: IFlexDirectionStyle,
	responsive: string = "",
): string => {
	switch (typeof style) {
		case "string":
			return `${responsive}flex-${style}`;
		case "object": {
			const { xs, sm, md, lg, xl, xxl } = style;
			const result = [];
			!isUndefined(xs) && result.push(getFlexDirectionStyle(xs));
			!isUndefined(sm) && result.push(getFlexDirectionStyle(sm));
			!isUndefined(md) && result.push(getFlexDirectionStyle(md));
			!isUndefined(lg) && result.push(getFlexDirectionStyle(lg));
			!isUndefined(xl) && result.push(getFlexDirectionStyle(xl));
			!isUndefined(xxl) && result.push(getFlexDirectionStyle(xxl));
			return result.join(" ");
		}
	}
};

export type FlexWrapStyle = "wrap";

export type FontFamilyStyle =
	| "inter-regular"
	| "inter-medium"
	| "inter-semibold"
	| "inter-bold";
export const getFontFamilyStyle = (style: FontFamilyStyle): string => {
	return `font-${style}`;
};

export type FontSizeStyle = number;
export type IFontSizeStyle = FontSizeStyle | ResponsiveStyle<FontSizeStyle>;
export const getFontSizeStyle = (style: IFontSizeStyle): string => {
	if (typeof style === "number") {
		return `text-[${style}px]`;
	}
	if (typeof style === "object") {
		const { xs, sm, md, lg, xl, xxl } = style;
		return [
			xs && getFontSizeStyle(xs),
			sm && "sm:" + getFontSizeStyle(sm),
			md && "md:" + getFontSizeStyle(md),
			lg && "lg:" + getFontSizeStyle(lg),
			xl && "xl:" + getFontSizeStyle(xl),
			xxl && "xxl:" + getFontSizeStyle(xxl),
		].join(" ");
	}
	return "";
};

export type GapStyle = number;
export type IGapStyle = GapStyle | ResponsiveStyle<GapStyle>;
export const getGapStyle = (style: IGapStyle): string => {
	if (typeof style === "number") {
		return `gap-[${style}px]`;
	}
	if (typeof style === "object") {
		const { xs, sm, md, lg, xl, xxl } = style;
		return [
			xs && getGapStyle(xs),
			sm && "sm:" + getGapStyle(sm),
			md && "md:" + getGapStyle(md),
			lg && "lg:" + getGapStyle(lg),
			xl && "xl:" + getGapStyle(xl),
			xxl && "xxl:" + getGapStyle(xxl),
		].join(" ");
	}
	return "";
};

export type HeightStyle = number | "full" | "screen" | Components | Components1;
export type IHeightStyle = HeightStyle | ResponsiveStyle<HeightStyle>;
export const getHeightStyle = (style: IHeightStyle): string => {
	if (typeof style === "number") {
		return `h-[${style}px]`;
	}
	if (typeof style === "string") {
		if (style === "full") {
			return "h-full";
		}
		if (style === "screen") {
			return "h-screen";
		}
		return `h-fans-${style}`;
	}
	if (typeof style === "object") {
		const { xs, sm, md, lg, xl, xxl } = style;
		return [
			xs && getHeightStyle(xs),
			sm && "sm:" + getHeightStyle(sm),
			md && "md:" + getHeightStyle(md),
			lg && "lg:" + getHeightStyle(lg),
			xl && "xl:" + getHeightStyle(xl),
			xxl && "xxl:" + getHeightStyle(xxl),
		].join(" ");
	}
	return "";
};

export type JustifyContentStyle =
	| "normal"
	| "start"
	| "end"
	| "center"
	| "between"
	| "around"
	| "evenly"
	| "stretch";
export type IJustifyContentStyle =
	| JustifyContentStyle
	| ResponsiveStyle<JustifyContentStyle>;
export const getJustifyContentStyle = (style: IJustifyContentStyle): string => {
	switch (typeof style) {
		case "string":
			return `justify-${style}`;
		case "object": {
			const { xs, sm, md, lg, xl, xxl } = style;
			return [
				xs && getJustifyContentStyle(xs),
				sm && "sm:" + getJustifyContentStyle(sm),
				md && "md:" + getJustifyContentStyle(md),
				lg && "lg:" + getJustifyContentStyle(lg),
				xl && "xl:" + getJustifyContentStyle(xl),
				xxl && "xxl:" + getJustifyContentStyle(xxl),
			].join(" ");
		}
	}
};

export type LetterSpacingStyle = number;
export const getLetterSpacingStyle = (style: LetterSpacingStyle): string => {
	return `tracking-[${style}px]`;
};

export type LineHeightStyle = number;
export type ILineHeightStyle =
	| LineHeightStyle
	| ResponsiveStyle<LineHeightStyle>;
export const getLineHeightStyle = (style: ILineHeightStyle): string => {
	if (typeof style === "number") {
		return `leading-[${style}px]`;
	}
	if (typeof style === "object") {
		const { xs, sm, md, lg, xl, xxl } = style;
		return [
			xs && getLineHeightStyle(xs),
			sm && "sm:" + getLineHeightStyle(sm),
			md && "md:" + getLineHeightStyle(md),
			lg && "lg:" + getLineHeightStyle(lg),
			xl && "xl:" + getLineHeightStyle(xl),
			xxl && "xxl:" + getLineHeightStyle(xxl),
		].join(" ");
	}
	return "";
};

export type MarginStyle =
	| number
	| {
			t?: number;
			r?: number;
			b?: number;
			l?: number;
			x?: number;
			y?: number;
	  };
export type IMarginStyle = MarginStyle | ResponsiveStyle<MarginStyle>;
export const getMarginStyle = (
	style: IMarginStyle,
	responsive: string = "",
	position: string = "",
): string => {
	switch (typeof style) {
		case "number":
			return `${responsive}m${position}-[${style}px]`;
		case "object": {
			if (
				"t" in style ||
				"r" in style ||
				"b" in style ||
				"l" in style ||
				"x" in style ||
				"y" in style
			) {
				const { t, r, b, l, x, y } = style;
				return [
					t && getMarginStyle(t, responsive, "t"),
					r && getMarginStyle(r, responsive, "r"),
					b && getMarginStyle(b, responsive, "b"),
					l && getMarginStyle(l, responsive, "l"),
					x && getMarginStyle(x, responsive, "x"),
					y && getMarginStyle(y, responsive, "y"),
				].join(" ");
			}
			if (
				"xs" in style ||
				"sm" in style ||
				"md" in style ||
				"lg" in style ||
				"xl" in style ||
				"xxl" in style
			) {
				const { xs, sm, md, lg, xl, xxl } = style;
				return [
					xs && getMarginStyle(xs),
					sm && getMarginStyle(sm, "sm:"),
					md && getMarginStyle(md, "md:"),
					lg && getMarginStyle(lg, "lg:"),
					xl && getMarginStyle(xl, "xl:"),
					xxl && getMarginStyle(xxl, "xxl:"),
				].join(" ");
			}
			return "";
		}
	}
};

type MaxWidthStyle = number;
export type IMaxWidthStyle = MaxWidthStyle | ResponsiveStyle<MaxWidthStyle>;
export const getMaxWidthStyle = (
	style: IMaxWidthStyle,
	responsive: string = "",
): string => {
	switch (typeof style) {
		case "number":
			return `${responsive}max-w-[${style}px]`;
		case "object": {
			const { xs, sm, md, lg, xl, xxl } = style;
			return [
				xs && getMaxWidthStyle(xs),
				sm && getMaxWidthStyle(sm, "sm:"),
				md && getMaxWidthStyle(md, "md:"),
				lg && getMaxWidthStyle(lg, "lg:"),
				xl && getMaxWidthStyle(xl, "xl:"),
				xxl && getMaxWidthStyle(xxl, "xxl:"),
			].join(" ");
		}
	}
};

export type OpacityStyle = number;

export type OverflowStyle = "hidden";

export type Padding1Style =
	| number
	| {
			t?: number;
			r?: number;
			b?: number;
			l?: number;
			x?: number;
			y?: number;
	  };
export type IPaddingStyle = Padding1Style | ResponsiveStyle<Padding1Style>;
export const getPaddingStyle = (
	style: IPaddingStyle,
	responsive: string = "",
	position: string = "",
): string => {
	switch (typeof style) {
		case "number":
			return `${responsive}p${position}-[${style}px]`;
		case "object": {
			if (
				"t" in style ||
				"r" in style ||
				"b" in style ||
				"l" in style ||
				"x" in style ||
				"y" in style
			) {
				const { t, r, b, l, x, y } = style;
				return [
					t && getPaddingStyle(t, responsive, "t"),
					r && getPaddingStyle(r, responsive, "r"),
					b && getPaddingStyle(b, responsive, "b"),
					l && getPaddingStyle(l, responsive, "l"),
					x && getPaddingStyle(x, responsive, "x"),
					y && getPaddingStyle(y, responsive, "y"),
				].join(" ");
			}
			if (
				"xs" in style ||
				"sm" in style ||
				"md" in style ||
				"lg" in style ||
				"xl" in style ||
				"xxl" in style
			) {
				const { xs, sm, md, lg, xl, xxl } = style;
				const result = [];
				!isUndefined(xs) && result.push(getPaddingStyle(xs));
				!isUndefined(sm) && result.push(getPaddingStyle(sm, "sm:"));
				!isUndefined(md) && result.push(getPaddingStyle(md, "md:"));
				!isUndefined(lg) && result.push(getPaddingStyle(lg, "lg:"));
				!isUndefined(xl) && result.push(getPaddingStyle(xl, "xl:"));
				!isUndefined(xxl) && result.push(getPaddingStyle(xxl, "xxl:"));
				return result.join(" ");
			}
			return "";
		}
	}
};

export type PlacementStyle = {
	t?: number;
	r?: number;
	b?: number;
	l?: number;
};
export const getPlacementStyle = (
	style: PlacementStyle | number,
	position: string = "",
): string => {
	switch (typeof style) {
		case "number":
			return `${position}-[${style}px]`;
		case "object": {
			const { t, r, b, l } = style;
			return [
				isUndefined(t) ? undefined : getPlacementStyle(t, "top"),
				isUndefined(r) ? undefined : getPlacementStyle(r, "right"),
				isUndefined(b) ? undefined : getPlacementStyle(b, "bottom"),
				isUndefined(l) ? undefined : getPlacementStyle(l, "left"),
			].join(" ");
		}
	}
};

export type PositionStyle = "absolute" | "relative";

export type ResponsiveStyle<T> = {
	xs?: T;
	sm?: T;
	md?: T;
	lg?: T;
	xl?: T;
	xxl?: T;
};

export type RightStyle = number;

export interface SizeStyle {
	size?: number;
}

export type TextAlignStyle = "left" | "center" | "right";

export type TextDecorationLineStyle = "underline";

export type TextTransformStyle = "uppercase";

export type TopStyle = number;

export type WidthStyle = number | "full" | "screen" | Components1;
export type IWidthStyle = WidthStyle | ResponsiveStyle<WidthStyle>;
export const getWidthStyle = (style: IWidthStyle): string => {
	if (typeof style === "number") {
		return `w-[${style}px]`;
	}
	if (typeof style === "string") {
		if (style === "full") {
			return "w-full";
		}
		if (style === "screen") {
			return "w-screen";
		}
		return `w-fans-${style}`;
	}
	if (typeof style === "object") {
		const { xs, sm, md, lg, xl, xxl } = style;
		return [
			xs && getWidthStyle(xs),
			sm && "sm:" + getWidthStyle(sm),
			md && "md:" + getWidthStyle(md),
			lg && "lg:" + getWidthStyle(lg),
			xl && "xl:" + getWidthStyle(xl),
			xxl && "xxl:" + getWidthStyle(xxl),
		].join(" ");
	}
	return "";
};

export type FontWeightStyle = 300 | 400 | 500 | 600 | 700 | 800 | 900;

export const getFontWeightStyle = (
	fontWeight: FontWeightStyle,
	fontFamily?: string,
): string => {
	switch (fontWeight) {
		case 300:
			return `font-light ${fontFamily ?? "font-inter-light"}`;
		case 400:
			return `font-normal ${fontFamily ?? "font-inter-regular"}`;
		case 500:
			return `font-medium ${fontFamily ?? "font-inter-medium"}`;
		case 600:
			return `font-semibold ${fontFamily ?? "font-inter-semibold"}`;
		case 700:
			return `font-bold ${fontFamily ?? "font-inter-bold"}`;
		case 800:
		case 900:
			return `font-bolder ${fontFamily ?? "font-inter-black"}`;
		default:
			return `font-normal ${fontFamily ?? "font-inter-regular"}`;
	}
};
