import React from "react";
import { G, Path, Svg } from "react-native-svg";

import { IFansSvg } from "@usertypes/components";

const ReadSvg: IFansSvg = (props) => {
	const { color = "currentColor" } = props;

	return (
		<Svg viewBox="0 0 16.785 9.396">
			<G
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.1"
			>
				<Path
					d="M12882.783,3586.627l3.971,3.945,7.259-7.842"
					transform="translate(-12882.005 -3581.953)"
				/>
				<Path
					d="M12886.754,3590.572l7.259-7.842"
					transform="translate(-12878.005 -3581.953)"
				/>
			</G>
		</Svg>
	);
};

export default ReadSvg;
