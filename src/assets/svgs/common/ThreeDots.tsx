// import react module
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

type Props = {
	size?: number;
} & SvgProps;

export default ({ ...props }: Props) => (
	<Svg
		width={props.width ?? props.size}
		height={props.height ?? props.size}
		viewBox="0 0 17.382 3.548"
		{...props}
	>
		<G transform="translate(0 0)">
			<Path
				d="M179.455,769.735a1.778,1.778,0,0,0,1.764,1.759,1.774,1.774,0,1,0,.007-3.548A1.775,1.775,0,0,0,179.455,769.735Z"
				transform="translate(-165.618 -767.946)"
				fill={props.color ?? "currentColor"}
			/>
			<Path
				d="M175.309,767.946a1.774,1.774,0,1,0,1.783,1.783A1.791,1.791,0,0,0,175.309,767.946Z"
				transform="translate(-166.618 -767.946)"
				fill={props.color ?? "currentColor"}
			/>
			<Path
				d="M169.381,767.946a1.774,1.774,0,0,0,.008,3.548,1.774,1.774,0,1,0-.008-3.548Z"
				transform="translate(-167.618 -767.946)"
				fill={props.color ?? "currentColor"}
			/>
		</G>
	</Svg>
);
