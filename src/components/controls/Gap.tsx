import React from "react";

import { FansView } from "@components/controls";
import { IFansGap } from "@usertypes/components";

const FansGap: IFansGap = (props) => {
	const { width, height, grow, viewStyle } = props;

	return (
		<FansView width={width} height={height} grow={grow} {...viewStyle} />
	);
};

export default FansGap;
