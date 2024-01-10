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

export default function Twitch({ ...props }: FansSvgProps) {
	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			{...props}
			viewBox={`0 0 ${props.size} ${props.size}`}
		>
			<Path d="M23,0A23,23,0,1,1,0,23,23,23,0,0,1,23,0Z" fill="#5865f2" />
			<G data-name="Group 56009">
				<Path
					data-name="Path 46276"
					d="M23 0A23 23 0 110 23 23 23 0 0123 0z"
					transform="translate(-11843 23598) translate(11843 -23598)"
					fill="#1877f2"
				/>
				<G data-name="Group 50704">
					<Path
						data-name="Path 46283"
						d="M194.812 348.126v5.085h5.043v11.779h5.1V353.2h5.072c.147-.863.294-1.7.429-2.537s.324-1.668.407-2.556h-5.916c0-.8-.016-1.568.008-2.335a5.768 5.768 0 01.151-1.1 1.812 1.812 0 011.382-1.4 5.975 5.975 0 011.54-.156c.553-.009 1.107 0 1.661 0 .1 0 .2-.015.293-.022V338h-4.465a6.361 6.361 0 00-2.623.507 4.48 4.48 0 00-1.981 1.66 6.966 6.966 0 00-1.048 3.686c-.046 1.319-.011 2.639-.011 3.96v.313z"
						transform="translate(-11843 23598) translate(11856.624 -23588.496) translate(-194.812 -338)"
						fill="#fff"
					/>
				</G>
			</G>
		</Svg>
	);
}
