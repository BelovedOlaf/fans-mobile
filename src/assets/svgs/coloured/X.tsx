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

export default function X({ ...props }: FansSvgProps) {
	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			{...props}
			viewBox={`0 0 ${props.size} ${props.size}`}
		>
			<G data-name="Group 54253" transform="translate(-267 -472)">
				<Circle
					data-name="Ellipse 1711"
					cx={23}
					cy={23}
					r={23}
					transform="translate(267 472)"
				/>
				<G data-name="Group 54039">
					<Path
						data-name="Path 47498"
						d="M936.335 572.913h-5.946a.276.276 0 01-.252-.13q-2.1-2.828-4.207-5.651l-1.4-1.879c-.01-.014-.023-.027-.03-.035-.1.1-.206.187-.3.287q-1.358 1.456-2.713 2.915-1.037 1.114-2.075 2.226-1.019 1.094-2.035 2.189a.214.214 0 01-.173.078h-1.475c-.038 0-.076-.005-.137-.01l8.138-8.721-8.14-10.922c.061 0 .1-.011.144-.011h5.74a.183.183 0 01.165.087q2.046 2.728 4.094 5.454.656.873 1.309 1.747c.01.014.023.026.043.049.14-.149.278-.293.414-.439l2.937-3.146 2.467-2.649c.317-.34.634-.679.956-1.015a.252.252 0 01.156-.081c.51-.006 1.019 0 1.529 0a.324.324 0 01.056.013l-7.76 8.331zm-18.164-18.385l.42.559 4.714 6.261 3.891 5.169 3.722 4.944a.184.184 0 00.166.085h2.548c.042 0 .084-.006.143-.01-.042-.06-.071-.1-.1-.146l-3.366-4.492-3.943-5.265-5.243-7a.231.231 0 00-.211-.1h-2.575z"
						transform="translate(280.104 485.165) translate(-915.59 -553.247)"
						fill="#fff"
					/>
				</G>
			</G>
		</Svg>
	);
}
