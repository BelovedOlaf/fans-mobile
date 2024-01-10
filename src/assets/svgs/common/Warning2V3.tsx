// import react module
import React from "react";
import Svg, { G, Path } from "react-native-svg";
import tw from "@lib/tailwind";
import { IFansSvg } from "@usertypes/components";

const Warning2Svg: IFansSvg = (props) => {
	const { colorFans = "current" } = props;

	return (
		<Svg viewBox="0 0 76.582 68.617" fill={tw.color(colorFans)}>
			<Path
				d="M1387.067,249.87h-59.242a8.658,8.658,0,0,1-7.5-12.985l29.62-51.305a8.661,8.661,0,0,1,15,0l3.544,6.141a1.731,1.731,0,0,1-3,1.731l-3.546-6.141a5.2,5.2,0,0,0-9,0l-29.622,51.305a5.193,5.193,0,0,0,4.5,7.791h59.242a5.194,5.194,0,0,0,4.5-7.791l-22-38.1a1.732,1.732,0,0,1,3-1.731l22,38.1a8.658,8.658,0,0,1-7.5,12.985Z"
				transform="translate(-1319.156 -181.253)"
			/>
			<G transform="translate(35.691 21.905)">
				<Path
					d="M1342,217.448a1.731,1.731,0,0,1-1.731-1.731v-20.08a1.731,1.731,0,1,1,3.463,0v20.08A1.73,1.73,0,0,1,1342,217.448Z"
					transform="translate(-1339.404 -193.905)"
				/>
				<Path
					d="M1342.367,216.644a2.626,2.626,0,0,1-1.835-.762,2.787,2.787,0,0,1-.571-.848,2.714,2.714,0,0,1-.19-.987,2.66,2.66,0,0,1,.052-.521,2.506,2.506,0,0,1,.156-.483,2.207,2.207,0,0,1,.225-.452,2.434,2.434,0,0,1,.329-.379,2.283,2.283,0,0,1,.4-.329,3.519,3.519,0,0,1,.452-.242,1.613,1.613,0,0,1,.483-.14,2.584,2.584,0,0,1,2.339.712,2.537,2.537,0,0,1,.329.379,4.038,4.038,0,0,1,.242.452c.05.156.1.329.138.483a2.66,2.66,0,0,1,.052.521,2.552,2.552,0,0,1-.762,1.835A2.594,2.594,0,0,1,1342.367,216.644Z"
					transform="translate(-1339.77 -181.073)"
				/>
			</G>
		</Svg>
	);
};

export default Warning2Svg;
