import { IFansSvg } from "@usertypes/components";
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

export default function UserSvg({ ...props }: SvgProps) {
	return (
		<Svg {...props} viewBox="0 0 11.903 12.093">
			<G transform="translate(0.281 0.25)">
				<Path
					d="M567.037,759.532a3.266,3.266,0,1,1,3.271-3.253A3.27,3.27,0,0,1,567.037,759.532Zm.008-5.669a2.4,2.4,0,1,0,2.4,2.406A2.4,2.4,0,0,0,567.045,753.862Z"
					transform="translate(-561.358 -753)"
					fill={props.color ?? "#fff"}
					// stroke={props.color ?? "#fff"}
					strokeWidth="0.5"
				/>
				<Path
					d="M563.411,772.151c.258.018.517.026.773.057.233.028.464.079.694.127a5.857,5.857,0,0,1,1.417.509,6.514,6.514,0,0,1,2.732,2.573.433.433,0,0,1-.2.632.423.423,0,0,1-.5-.134c-.085-.121-.158-.251-.241-.374a5.635,5.635,0,0,0-1.975-1.816,5.32,5.32,0,0,0-1.159-.48c-.245-.068-.5-.112-.749-.157a4.531,4.531,0,0,0-1.087-.055,5.933,5.933,0,0,0-.9.122,5.584,5.584,0,0,0-1.947.834,5.361,5.361,0,0,0-1.361,1.308,6.77,6.77,0,0,0-.372.572.44.44,0,1,1-.754-.452,6.531,6.531,0,0,1,2.725-2.569,6.078,6.078,0,0,1,.965-.391,6.4,6.4,0,0,1,1.016-.229A8.183,8.183,0,0,1,563.411,772.151Z"
					transform="translate(-557.722 -764.506)"
					fill={props.color ?? "#fff"}
					// stroke={props.color ?? "#fff"}
					strokeWidth="0.5"
				/>
			</G>
		</Svg>
	);
}

export const User1Svg: IFansSvg = (props) => {
	const { color = "currentColor" } = props;
	return (
		<Svg viewBox="0 0 15.426 15.707">
			<G fill={color}>
				<Path
					d="M761.2,236.862a4.431,4.431,0,1,1,4.438-4.413A4.436,4.436,0,0,1,761.2,236.862Zm.01-7.692a3.261,3.261,0,1,0,3.255,3.264A3.254,3.254,0,0,0,761.211,229.17Z"
					transform="translate(-753.496 -228)"
				/>
				<Path
					d="M758.44,247.151c.349.024.7.035,1.049.077.316.038.629.107.941.173a7.953,7.953,0,0,1,1.922.691,8.84,8.84,0,0,1,3.706,3.491.588.588,0,0,1-.268.858.574.574,0,0,1-.683-.183c-.116-.164-.215-.34-.327-.507a7.642,7.642,0,0,0-2.68-2.464,7.206,7.206,0,0,0-1.572-.652c-.333-.092-.676-.152-1.017-.213a6.144,6.144,0,0,0-1.475-.075,8.037,8.037,0,0,0-1.216.166,7.572,7.572,0,0,0-2.641,1.132,7.268,7.268,0,0,0-1.846,1.774,9.083,9.083,0,0,0-.5.776.6.6,0,1,1-1.023-.614,8.859,8.859,0,0,1,3.7-3.486,8.237,8.237,0,0,1,1.31-.53,8.67,8.67,0,0,1,1.379-.311A11.025,11.025,0,0,1,758.44,247.151Z"
					transform="translate(-750.722 -236.779)"
				/>
			</G>
		</Svg>
	);
};
