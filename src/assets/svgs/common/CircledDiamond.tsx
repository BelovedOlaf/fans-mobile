// import react module
import React from "react";
import Svg, { Defs, G, LinearGradient, Path, Stop } from "react-native-svg";
import tw from "@lib/tailwind";
import { IFansSvg } from "@usertypes/components";

const CircledDiamondSvg: IFansSvg = (props) => {
	const { size, width = size, height = size, colorFans = "current" } = props;

	return (
		<Svg width="46" height="46" viewBox="0 0 46 46">
			<Defs>
				<LinearGradient
					id="linear-gradient"
					x1="-0.076"
					y1="0.791"
					x2="1.125"
					y2="0.184"
					gradientUnits="objectBoundingBox"
				>
					<Stop offset="0" stop-color="#161fe4" />
					<Stop offset="0.66" stop-color="#a854f5" />
					<Stop offset="1" stop-color="#d885ff" />
				</LinearGradient>
			</Defs>
			<G
				id="Group_52108"
				data-name="Group 52108"
				transform="translate(-175 -1258)"
			>
				<Path
					id="Path_46042"
					data-name="Path 46042"
					d="M815,79a23,23,0,1,1,23-23A23.026,23.026,0,0,1,815,79Zm0-44.516A21.516,21.516,0,1,0,836.516,56,21.541,21.541,0,0,0,815,34.484Z"
					transform="translate(-617 1225)"
					fill="url(#linear-gradient)"
				/>
				<G
					id="Group_52107"
					data-name="Group 52107"
					transform="translate(183.648 1268.627)"
				>
					<Path
						id="Path_45947"
						data-name="Path 45947"
						d="M39.752,11.906l2.756-5.173H28.8l2.756,5.173Z"
						transform="translate(-21.473 -6.733)"
						fill="#be9dfc"
					/>
					<Path
						id="Path_45948"
						data-name="Path 45948"
						d="M66.336,17.347l6.423.281L65.435,6.733l-2.756,5.173Z"
						transform="translate(-44.399 -6.733)"
						fill="#9486fc"
					/>
					<Path
						id="Path_45949"
						data-name="Path 45949"
						d="M12.567,39.56l-6.423.281L20.324,57.4V49.165Z"
						transform="translate(-6.144 -28.946)"
						fill="#b588fc"
					/>
					<Path
						id="Path_45950"
						data-name="Path 45950"
						d="M16.225,11.906,13.469,6.733,6.144,17.628l6.423-.281Z"
						transform="translate(-6.144 -6.733)"
						fill="#ecd9fc"
					/>
					<Path
						id="Path_45951"
						data-name="Path 45951"
						d="M57.757,39.56,50,49.165V57.4L64.18,39.841Z"
						transform="translate(-35.82 -28.946)"
						fill="#8150f9"
					/>
					<Path
						id="Path_45952"
						data-name="Path 45952"
						d="M29.667,22.733l-3.658,5.44,7.757,9.605,7.757-9.605-3.658-5.44Z"
						transform="translate(-19.586 -17.56)"
						fill="#cfb4f9"
					/>
				</G>
			</G>
		</Svg>
	);
};

export default CircledDiamondSvg;
