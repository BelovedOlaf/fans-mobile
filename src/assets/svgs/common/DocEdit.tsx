// import React module
import { IFansSvg } from "@usertypes/components";
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

const DocEditSvg = ({ ...props }: FansSvgProps) => (
	<Svg
		width={props.width ?? props.size}
		height={props.height ?? props.size}
		viewBox="0 0 15.352 15.193"
	>
		<G transform="translate(0.75 0.75)">
			<Path
				d="M732.6,191.1v3.986a1.516,1.516,0,0,1-1.512,1.512h-9.574A1.516,1.516,0,0,1,720,195.086v-9.574A1.516,1.516,0,0,1,721.512,184h4.449"
				transform="translate(-720 -182.905)"
				fill="none"
				stroke={props.color ?? "currentColor"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
			/>
			<Path
				d="M727.813,188.985c-.241.937-.474,1.874-.721,2.855.975-.245,1.907-.477,2.836-.715l6.515-6.443a1.551,1.551,0,1,0-2.195-2.19Z"
				transform="translate(-723.208 -182)"
				fill="none"
				stroke={props.color ?? "currentColor"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
			/>
		</G>
	</Svg>
);

export const DocEdit1Svg: IFansSvg = (props) => {
	const { color = "currentColor" } = props;

	return (
		<Svg viewBox="0 0 19.89 19.399">
			<G
				transform="translate(0.8 0.8)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.6"
			>
				<Path
					d="M737.4,193.809v5.506a2.094,2.094,0,0,1-2.089,2.088H722.089A2.1,2.1,0,0,1,720,199.315V186.088A2.1,2.1,0,0,1,722.089,184h6.146"
					transform="translate(-720 -183.604)"
				/>
				<Path
					d="M728.006,190.856c-.3,1.188-.6,2.376-.914,3.619,1.237-.31,2.417-.6,3.595-.907l8.26-8.169a1.966,1.966,0,1,0-2.783-2.776Z"
					transform="translate(-721.431 -182)"
				/>
			</G>
		</Svg>
	);
};

export default DocEditSvg;
