// import React module
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	size?: number;
}

const PaymentSvg = ({ ...props }: FansSvgProps) => (
	<Svg
		width={props.width ?? props.size}
		height={props.height ?? props.size}
		viewBox="0 0 24 17.596"
	>
		<G transform="translate(-519.643 -818.806)">
			<Path
				d="M531.643,836.4h-8.824a3.041,3.041,0,0,1-3.175-3.175q0-5.624,0-11.246a3.04,3.04,0,0,1,3.176-3.174h17.649a3.037,3.037,0,0,1,3.175,3.174q0,5.624,0,11.247a3.038,3.038,0,0,1-3.175,3.175Zm-.006-16q-4.411,0-8.823,0a1.449,1.449,0,0,0-1.568,1.574q0,5.623,0,11.245a1.451,1.451,0,0,0,1.568,1.575H540.46a1.455,1.455,0,0,0,1.582-1.587q0-5.61,0-11.221a1.453,1.453,0,0,0-1.582-1.587Z"
				transform="translate(0)"
				fill={props.color ?? "currentColor"}
			/>
			<Path
				d="M533.723,825.4q3.96,0,7.919,0a.8.8,0,0,1,.826,1.061.777.777,0,0,1-.689.535,1.843,1.843,0,0,1-.225,0q-7.844,0-15.688,0a1.506,1.506,0,0,1-.323-.021.8.8,0,0,1-.624-.848.793.793,0,0,1,.784-.729c.582-.009,1.166,0,1.749,0Z"
				transform="translate(-2.074 -2.59)"
				fill={props.color ?? "currentColor"}
			/>
			<Path
				d="M527.319,841.5c-.516,0-1.031,0-1.547,0a.8.8,0,1,1,0-1.6q1.546,0,3.093,0a.8.8,0,1,1,0,1.6C528.35,841.5,527.834,841.5,527.319,841.5Z"
				transform="translate(-2.075 -8.293)"
				fill={props.color ?? "currentColor"}
			/>
		</G>
	</Svg>
);

export default PaymentSvg;
