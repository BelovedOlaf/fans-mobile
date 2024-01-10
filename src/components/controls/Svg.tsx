import React from "react";

import { FansView } from "@components/controls";
import { IFansSvg } from "@usertypes/components";
import { getColorStyle } from "@usertypes/styles";

const FansSvg: IFansSvg = (props) => {
	const { width, height, svg: Svg, color, color1, ...props_ } = props;

	return (
		<FansView
			width={width}
			height={height}
			alignItems="center"
			justifyContent="center"
			{...props_}
		>
			{Svg && (
				<Svg
					color={
						color1 ? getColorStyle(color1) : color ?? "currentColor"
					}
				/>
			)}
		</FansView>
	);
};

export default FansSvg;
