// import react module
import React from "react";
import Svg, { Defs, G, LinearGradient, Path, Stop } from "react-native-svg";
import { IFansSvg } from "@usertypes/components";

const EditNoteSvg: IFansSvg = (props) => {
	const { color = "currentColor" } = props;

	return (
		<Svg viewBox="0 0 60.988 68.105">
			<Defs>
				<LinearGradient
					id="linear-gradient"
					x1="-0.098"
					y1="1.099"
					x2="1"
					gradientUnits="objectBoundingBox"
				>
					<Stop offset="0" stopColor="#161fe4" />
					<Stop offset="0.054" stopColor="#161fe4" />
					<Stop offset="0.545" stopColor="#a854f5" />
					<Stop offset="0.915" stopColor="#d885ff" />
					<Stop offset="1" stopColor="#d885ff" />
				</LinearGradient>
			</Defs>
			<Path
				d="M-3223.056,5356.866a6.129,6.129,0,0,1-5.944-6.284v-54.538a6.128,6.128,0,0,1,5.944-6.284h37.432a6.129,6.129,0,0,1,5.945,6.284v16.6a1.54,1.54,0,0,1-1.541,1.541,1.541,1.541,0,0,1-1.542-1.541v-16.6a3.049,3.049,0,0,0-2.862-3.2h-37.432a3.05,3.05,0,0,0-2.862,3.2v54.538a3.05,3.05,0,0,0,2.862,3.2h37.432a3.049,3.049,0,0,0,2.862-3.2V5341.1a1.542,1.542,0,0,1,1.542-1.542,1.542,1.542,0,0,1,1.541,1.542v9.485a6.129,6.129,0,0,1-5.945,6.284Zm25.954-13.492a1.54,1.54,0,0,1-.407-1.466l.365-1.456c.508-2.023,1-3.981,1.5-5.942a1.525,1.525,0,0,1,.4-.7l16.653-16.808a5.73,5.73,0,0,1,4.064-1.729h.015a5.486,5.486,0,0,1,3.9,1.651,5.565,5.565,0,0,1-.114,7.92l-16.868,16.681a1.573,1.573,0,0,1-.7.4c-1.788.457-3.58.9-5.418,1.367l-1.931.484a1.451,1.451,0,0,1-.375.047A1.541,1.541,0,0,1-3197.1,5343.374Zm20.7-24.2-16.354,16.5c-.379,1.483-.754,2.967-1.133,4.479,1.5-.375,2.964-.745,4.43-1.119l16.566-16.38a2.488,2.488,0,0,0,.1-3.569,2.423,2.423,0,0,0-1.719-.735h-.007A2.66,2.66,0,0,0-3176.407,5319.178Zm-40.367-2.623a1.541,1.541,0,0,1-1.545-1.542,1.541,1.541,0,0,1,1.545-1.541h24.869a1.541,1.541,0,0,1,1.543,1.541,1.541,1.541,0,0,1-1.543,1.542Zm0-9.484a1.542,1.542,0,0,1-1.545-1.542,1.541,1.541,0,0,1,1.545-1.541h24.869a1.541,1.541,0,0,1,1.543,1.541,1.542,1.542,0,0,1-1.543,1.542Z"
				transform="translate(3229.5 -5289.26)"
				stroke="rgba(0,0,0,0)"
				strokeMiterlimit="10"
				strokeWidth="1"
				fill="url(#linear-gradient)"
			/>
		</Svg>
	);
};

export const EditNote1Svg: IFansSvg = (props) => {
	const { color = "currentColor" } = props;

	return (
		<Svg viewBox="0 0 15.146 14.993">
			<G
				transform="translate(0.65 0.65)"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.3"
			>
				<Path
					d="M732.6,191.1v3.986a1.516,1.516,0,0,1-1.512,1.512h-9.574A1.516,1.516,0,0,1,720,195.086v-9.574A1.516,1.516,0,0,1,721.512,184h4.449"
					transform="translate(-720 -182.905)"
				/>
				<Path
					d="M727.813,188.985c-.241.937-.474,1.874-.721,2.855.975-.245,1.907-.477,2.836-.715l6.515-6.443a1.551,1.551,0,1,0-2.195-2.19Z"
					transform="translate(-723.208 -182)"
				/>
			</G>
		</Svg>
	);
};

export default EditNoteSvg;
