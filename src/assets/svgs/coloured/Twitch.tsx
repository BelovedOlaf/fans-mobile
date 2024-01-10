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
			<G data-name="Group 56010">
				<Path
					data-name="Path 46276"
					d="M23 0A23 23 0 110 23 23 23 0 0123 0z"
					transform="translate(-11843 23352) translate(11843 -23352)"
					fill="#9147fe"
				/>
				<G data-name="Group 50713">
					<G data-name="Group 50712" fill="#fff">
						<Path
							data-name="Path 46295"
							d="M391.525 354.6h-5.217c-.006-.078-.013-.135-.013-.191v-14.887a.652.652 0 01.036-.218q.652-1.753 1.311-3.5c.1-.262.061-.22.315-.22h19.234c.006.076.015.138.015.2v12.943a.383.383 0 01-.123.3q-2.734 2.728-5.461 5.462a.381.381 0 01-.3.122h-3.9a.431.431 0 00-.338.138c-.863.871-1.732 1.735-2.6 2.605a.381.381 0 01-.3.12h-2.521c-.14 0-.146-.011-.151-.144v-2.73zm13.757-17.1h-15.635c0 .078-.011.146-.011.213v13.423c0 .081.034.119.115.115h4.045c.084 0 .115.04.112.118v2.708l.145-.132q1.277-1.277 2.552-2.557a.434.434 0 01.337-.14h4.848a.4.4 0 00.311-.125q1.505-1.515 3.02-3.02a.51.51 0 00.161-.4q-.006-5.01 0-10.02z"
							transform="translate(-11843 23352) translate(11855.543 -23338.443) translate(-386.294 -335.583)"
						/>
						<Path
							data-name="Path 46296"
							d="M401.964 350.481h-1.883c-.006-.067-.014-.124-.014-.18v-5.344c0-.18 0-.173.193-.171H401.951c.049.141.055 5.522.013 5.695z"
							transform="translate(-11843 23352) translate(11855.543 -23338.443) translate(-391.52 -339.075)"
						/>
						<Path
							data-name="Path 46297"
							d="M410.4 344.8v5.55c0 .134-.012.145-.15.145h-1.617c-.094 0-.141-.032-.134-.13v-5.327c0-.257-.015-.243.246-.243h1.54a.493.493 0 01.115.005z"
							transform="translate(-11843 23352) translate(11855.543 -23338.443) translate(-394.718 -339.077)"
						/>
					</G>
				</G>
			</G>
		</Svg>
	);
}
