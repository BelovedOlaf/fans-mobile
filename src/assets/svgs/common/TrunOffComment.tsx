import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

export default function TurnOffCommentSvg({ ...props }: SvgProps) {
	return (
		<Svg {...props} viewBox="0 0 23 23">
			<G transform="translate(-128.517 -252.523)">
				<Path
					d="M132.327,269.076a10.115,10.115,0,0,1-1.768-5.764,9.249,9.249,0,0,1,.357-2.2,9.416,9.416,0,0,1,13.111-5.908,9.718,9.718,0,0,1,1.36.811l1.12-1.12a11.24,11.24,0,0,0-1.8-1.1,10.974,10.974,0,0,0-15.289,6.889,10.682,10.682,0,0,0-.416,2.617v0a11.651,11.651,0,0,0,2.212,6.881Z"
					transform="translate(-0.124 -0.05)"
				/>
				<Path d="M151.245,252.78a.9.9,0,0,0-.5-.241.91.91,0,0,0-.811.241l-21.159,21.159a.974.974,0,0,0,0,1.313.928.928,0,0,0,1.312,0l3.008-3.008a10.563,10.563,0,0,0,4.957,2.2,11.535,11.535,0,0,0,1.812.146,10.767,10.767,0,0,0,5.853-1.744c.675.228,1.35.451,2.027.676l1.46.486a1.135,1.135,0,0,0,1.5-1.494l-.477-1.428q-.379-1.137-.761-2.273a10.878,10.878,0,0,0-1.005-11.943l2.783-2.783A.927.927,0,0,0,151.245,252.78Zm-2.449,8a9.327,9.327,0,0,1-.767,7.422,1.177,1.177,0,0,0-.085.982q.405,1.2.806,2.4l.237.711-.751-.249q-1.085-.36-2.168-.725a1.289,1.289,0,0,0-.411-.07,1.171,1.171,0,0,0-.65.2,9.263,9.263,0,0,1-6.71,1.454,9,9,0,0,1-4.091-1.776l13.147-13.147A9.345,9.345,0,0,1,148.8,260.777Z" />
			</G>
		</Svg>
	);
}