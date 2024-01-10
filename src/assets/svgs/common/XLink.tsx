import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	size?: number;
}

export default function XLinkSvg({ ...props }: FansSvgProps) {
	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			{...props}
			viewBox="0 0 17.048 16.164"
		>
			<Path
				d="M932.638,569.408H932.5q-2.375,0-4.751,0a.227.227,0,0,1-.207-.107q-1.726-2.324-3.458-4.644l-1.151-1.544c-.009-.012-.019-.022-.025-.029-.083.079-.169.153-.246.236q-1.116,1.2-2.229,2.4-.852.916-1.705,1.829-.837.9-1.673,1.8a.176.176,0,0,1-.142.064c-.4,0-.808,0-1.212,0-.031,0-.063,0-.113-.008l6.687-7.167-6.689-8.976c.05,0,.084-.009.118-.009q2.359,0,4.717,0a.15.15,0,0,1,.135.071q1.681,2.242,3.365,4.482.539.717,1.076,1.436c.009.011.019.021.036.04.115-.122.228-.241.34-.361q1.207-1.293,2.414-2.586l2.028-2.177q.391-.419.786-.834a.206.206,0,0,1,.128-.066c.419,0,.838,0,1.256,0a.282.282,0,0,1,.046.01l-6.376,6.849ZM917.711,554.3l.345.46,3.874,5.146,3.2,4.248q1.529,2.031,3.059,4.063a.15.15,0,0,0,.136.07c.7,0,1.4,0,2.094,0,.034,0,.069,0,.118-.008-.034-.05-.058-.086-.084-.12l-2.766-3.691-3.241-4.327q-2.155-2.877-4.309-5.755a.19.19,0,0,0-.173-.086c-.705,0-1.411,0-2.116,0Z"
				transform="translate(-915.59 -553.247)"
				fill="#fff"
			/>
		</Svg>
	);
}