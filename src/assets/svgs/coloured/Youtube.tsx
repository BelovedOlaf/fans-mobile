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

export default function Youtube({ ...props }: FansSvgProps) {
	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			{...props}
			viewBox={`0 0 ${props.size} ${props.size}`}
		>
			<G data-name="Group 56008">
				<Path
					data-name="Path 46276"
					d="M23 0A23 23 0 110 23 23 23 0 0123 0z"
					transform="translate(-11843 23680) translate(11843 -23680)"
					fill="red"
				/>
				<G data-name="Group 50717">
					<Path
						data-name="Path 46301"
						d="M100.532 338.9c1.385 0 2.772-.023 4.156.007 1.174.025 2.346.1 3.519.173.547.033 1.1.083 1.639.158a2.8 2.8 0 011.432.664 3.116 3.116 0 011.085 1.909c.109.634.218 1.271.276 1.911.066.728.092 1.462.1 2.193.015 1.115.016 2.23 0 3.344a21.2 21.2 0 01-.234 2.961 6.2 6.2 0 01-.322 1.4 3.006 3.006 0 01-2.194 1.9 6.938 6.938 0 01-.945.129q-2.291.21-4.59.244c-1.409.021-2.819.023-4.228.02s-2.795 0-4.192-.038c-1.054-.027-2.107-.1-3.16-.164a25.023 25.023 0 01-1.664-.154 2.8 2.8 0 01-1.38-.609 3 3 0 01-1.121-1.805 23.205 23.205 0 01-.283-1.777 29.868 29.868 0 01-.143-3.684c0-.693-.02-1.387.011-2.078.041-.91.1-1.82.2-2.725a8 8 0 01.326-1.585 2.9 2.9 0 011.9-1.931 3.863 3.863 0 01.848-.178 62.122 62.122 0 016.259-.3h2.711zm-3.158 4.215v8.071l7.717-4 .006-.04z"
						transform="translate(-11843 23680) translate(11853.823 -23665.119) translate(-88.275 -338.888)"
						fill="#fff"
					/>
				</G>
			</G>
		</Svg>
	);
}
