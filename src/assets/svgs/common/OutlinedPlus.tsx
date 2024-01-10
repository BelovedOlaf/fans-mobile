import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	size?: number;
}

export default function OutlinedPlusSvg({ ...props }: FansSvgProps) {
	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			{...props}
			viewBox="0 0 25 25"
		>
			<G transform="translate(-231.7 -755.95)">
				<Path
					fill={props.color ?? "#000"}
					d="M249.784,755.95H238.616a6.925,6.925,0,0,0-6.916,6.916v11.168a6.925,6.925,0,0,0,6.916,6.916h11.168a6.925,6.925,0,0,0,6.916-6.916V762.866A6.925,6.925,0,0,0,249.784,755.95Zm5.112,18.084a5.117,5.117,0,0,1-5.112,5.112H238.616a5.117,5.117,0,0,1-5.112-5.112V762.866a5.117,5.117,0,0,1,5.112-5.112h11.168a5.117,5.117,0,0,1,5.112,5.112Z"
					transform="translate(0 0)"
				/>
				<Path
					fill={props.color ?? "#000"}
					d="M251.489,768.393h-5.541v-5.541a.9.9,0,0,0-1.8,0v5.541H238.6a.9.9,0,1,0,0,1.8h5.541v5.541a.9.9,0,0,0,1.8,0V770.2h5.541a.9.9,0,1,0,0-1.8Z"
					transform="translate(-0.845 -0.845)"
				/>
			</G>
		</Svg>
	);
}
