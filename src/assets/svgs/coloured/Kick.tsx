import React from "react";
import Svg, {
	Defs,
	ClipPath,
	Path,
	Pattern,
	Image,
	G,
	SvgProps,
	Circle,
} from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

export default function Kick({ ...props }: FansSvgProps) {
	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			{...props}
			viewBox={`0 0 ${props.size} ${props.size}`}
		>
			<g data-name="Group 54257">
				<path
					data-name="Path 46276"
					d="M23 0A23 23 0 110 23 23 23 0 0123 0z"
					transform="translate(-180) translate(180)"
				/>
				<path
					data-name="Path 48575"
					d="M-153.247 526.4v-8.066-1.721c0-.1.027-.128.128-.128q3.177.005 6.356 0c.1 0 .119.034.119.126v4.163c0 .094.02.125.119.123.657 0 1.315-.005 1.972 0 .1 0 .118-.034.118-.125v-1.929c0-.15 0-.151.157-.151h1.919c.1 0 .121-.027.119-.121v-1.961c0-.093.02-.126.119-.125h6.367c.093 0 .118.027.118.118v6.379c0 .086-.027.11-.112.109h-1.961c-.094 0-.125.02-.123.119v1.951c0 .1-.027.139-.135.139-.638-.005-1.277 0-1.917 0-.151 0-.153 0-.153.155v1.928c0 .105.032.125.128.125h1.919c.157 0 .159 0 .159.155v1.906c0 .166-.014.144.15.144h1.917c.1 0 .13.027.13.128V536.186c0 .094-.016.132-.123.132q-3.169-.005-6.335 0c-.144 0-.144 0-.144-.141v-1.951c0-.094-.03-.116-.119-.114h-1.94c-.114 0-.139-.037-.139-.144.005-.64 0-1.279 0-1.919 0-.142 0-.142-.141-.142h-1.94c-.1 0-.128.029-.128.127q.005 2.06 0 4.12c0 .162 0 .162-.166.162h-6.292c-.142 0-.142 0-.142-.142V526.4z"
					transform="translate(-180) translate(347.443 -503.401)"
					fill="#fff"
				/>
			</g>
		</Svg>
	);
}
