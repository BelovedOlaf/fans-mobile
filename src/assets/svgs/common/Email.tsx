import React from "react";
import Svg, { G, Path } from "react-native-svg";

import { IFansSvg } from "@usertypes/components";

const EmailSvg: IFansSvg = (props) => {
	const { color = "currentColor" } = props;

	return (
		<Svg viewBox="0 0 23.571 18.111">
			<G transform="translate(-1.699 -1.699)" fill={color}>
				<Path
					d="M515.334,110.649a2.687,2.687,0,0,0-2.685,2.685v12.741a2.687,2.687,0,0,0,2.685,2.685h18.2a2.687,2.687,0,0,0,2.685-2.685V113.334a2.687,2.687,0,0,0-2.685-2.685Z"
					transform="translate(-510.95 -108.95)"
				/>
				<Path
					d="M525.027,122.632a2.627,2.627,0,0,1-1.662-.572l-7.841-6.415a.956.956,0,1,1,1.21-1.479l7.841,6.415a.8.8,0,0,0,.9,0l7.841-6.415a.955.955,0,1,1,1.21,1.479l-7.84,6.415A2.627,2.627,0,0,1,525.027,122.632Z"
					transform="translate(-511.542 -109.612)"
					fill="#a854f5"
				/>
			</G>
		</Svg>
	);
};

export default EmailSvg;
