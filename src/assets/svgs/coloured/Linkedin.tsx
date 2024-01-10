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

export default function Linkedin({ ...props }: FansSvgProps) {
	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			{...props}
			viewBox={`0 0 ${props.size} ${props.size}`}
		>
			<G data-name="Group 54258">
				<Path
					data-name="Path 46276"
					d="M23 0A23 23 0 110 23 23 23 0 0123 0z"
					transform="translate(-180 -335.395) translate(180 335.395)"
					fill="#0077b5"
				/>
				<G data-name="Group 56014" fill="#fff">
					<Path
						data-name="Path 48576"
						d="M442.307 465.251H437.6v-.369-7.783a2.406 2.406 0 00-1.732-2.438 2.372 2.372 0 00-2.957 1.965 6.033 6.033 0 00-.026.614v8.006h-4.7v-14.132h4.7v1.706a16.539 16.539 0 011.384-1.188 4.768 4.768 0 015.636.136 5.328 5.328 0 012.41 4.535c.018 2.911 0 5.823 0 8.736.003.061-.003.12-.008.212z"
						transform="translate(-180 -335.395) translate(-230.806 -99.625) translate(3.154 3.024)"
					/>
					<Path
						data-name="Path 48577"
						d="M427.948 465.122h-4.678v-14.134h4.678z"
						transform="translate(-180 -335.395) translate(-230.806 -99.625) translate(.188 3.153)"
					/>
					<Path
						data-name="Path 48578"
						d="M428.618 448.608a2.83 2.83 0 01-5.66 0 2.83 2.83 0 115.66 0z"
						transform="translate(-180 -335.395) translate(-230.806 -99.625)"
					/>
				</G>
			</G>
		</Svg>
	);
}
