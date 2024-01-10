// import react module
import React from "react";
import Svg, { Defs, G, Path, Stop, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	size?: number;
}

const ApplicationPng = (props: FansSvgProps) => {
	const { height, size, width, ...props_ } = props;

	return (
		<Svg
			width={width ?? size}
			height={height ?? size}
			viewBox="0 0 46 46"
			{...props_}
		>
			<Defs>
				<linearGradient
					id="linear-gradient"
					x1="-0.189"
					y1="1.225"
					x2="2.469"
					y2="-1.572"
					gradientUnits="objectBoundingBox"
				>
					<Stop offset="0" stopColor="#161fe4" />
					<Stop offset="1" stopColor="#bb14e2" />
				</linearGradient>
				<linearGradient
					id="linear-gradient-2"
					x1="-0.823"
					y1="1.892"
					x2="1.835"
					y2="-0.905"
					xlinkHref="#linear-gradient"
				/>
				<linearGradient
					id="linear-gradient-3"
					x1="-1.425"
					y1="2.526"
					x2="1.233"
					y2="-0.271"
					xlinkHref="#linear-gradient"
				/>
				<linearGradient
					id="linear-gradient-4"
					x1="-0.795"
					y1="1.863"
					x2="1.871"
					y2="-0.943"
					xlinkHref="#linear-gradient"
				/>
			</Defs>
			<G fill="none">
				<Path
					d="M23,0A23,23,0,1,1,0,23,23,23,0,0,1,23,0Z"
					stroke="none"
				/>
				<Path
					d="M 23 1 C 20.02957916259766 1 17.14854049682617 1.581539154052734 14.43691062927246 2.728458404541016 C 11.81729125976563 3.836471557617188 9.464408874511719 5.422889709472656 7.443649291992188 7.443649291992188 C 5.422889709472656 9.464408874511719 3.836471557617188 11.81729125976563 2.728458404541016 14.43691062927246 C 1.581539154052734 17.14854049682617 1 20.02957916259766 1 23 C 1 25.97042083740234 1.581539154052734 28.85145950317383 2.728458404541016 31.56309127807617 C 3.836471557617188 34.18270874023438 5.422889709472656 36.53559112548828 7.443649291992188 38.55635070800781 C 9.464408874511719 40.57711029052734 11.81729125976563 42.16352844238281 14.43691062927246 43.27154159545898 C 17.14854049682617 44.41846084594727 20.02957916259766 45 23 45 C 25.97042083740234 45 28.85145950317383 44.41846084594727 31.56309127807617 43.27154159545898 C 34.18270874023438 42.16352844238281 36.53559112548828 40.57711029052734 38.55635070800781 38.55635070800781 C 40.57711029052734 36.53559112548828 42.16352844238281 34.18270874023438 43.27154159545898 31.56309127807617 C 44.41846084594727 28.85145950317383 45 25.97042083740234 45 23 C 45 20.02957916259766 44.41846084594727 17.14854049682617 43.27154159545898 14.43691062927246 C 42.16352844238281 11.81729125976563 40.57711029052734 9.464408874511719 38.55635070800781 7.443649291992188 C 36.53559112548828 5.422889709472656 34.18270874023438 3.836471557617188 31.56309127807617 2.728458404541016 C 28.85145950317383 1.581539154052734 25.97042083740234 1 23 1 M 23 0 C 35.70254898071289 0 46 10.29745101928711 46 23 C 46 35.70254898071289 35.70254898071289 46 23 46 C 10.29745101928711 46 0 35.70254898071289 0 23 C 0 10.29745101928711 10.29745101928711 0 23 0 Z"
					stroke="none"
					fill="#f0f0f0"
				/>
			</G>
			<G transform="translate(-731.091 -2.821)">
				<Path
					d="M749.581,25.6h-3.108a3.226,3.226,0,0,0-3.223,3.223v3.108a3.226,3.226,0,0,0,3.223,3.223h3.108a3.226,3.226,0,0,0,3.223-3.223V28.821A3.226,3.226,0,0,0,749.581,25.6Zm1.465,6.331a1.466,1.466,0,0,1-1.465,1.465h-3.108a1.467,1.467,0,0,1-1.465-1.465V28.821a1.466,1.466,0,0,1,1.465-1.465h3.108a1.466,1.466,0,0,1,1.465,1.465Z"
					transform="translate(0 1.78)"
					fill="url(#linear-gradient)"
				/>
				<Path
					d="M749.581,15.25h-3.108a3.226,3.226,0,0,0-3.223,3.223v3.108a3.226,3.226,0,0,0,3.223,3.223h3.108a3.226,3.226,0,0,0,3.223-3.223V18.473A3.226,3.226,0,0,0,749.581,15.25Zm1.465,6.331a1.466,1.466,0,0,1-1.465,1.465h-3.108a1.466,1.466,0,0,1-1.465-1.465V18.473a1.467,1.467,0,0,1,1.465-1.465h3.108a1.466,1.466,0,0,1,1.465,1.465Z"
					fill="url(#linear-gradient-2)"
				/>
				<Path
					d="M759.929,15.25h-3.108a3.226,3.226,0,0,0-3.223,3.223v3.108a3.226,3.226,0,0,0,3.223,3.223h3.108a3.226,3.226,0,0,0,3.223-3.223V18.473A3.226,3.226,0,0,0,759.929,15.25Zm1.465,6.331a1.466,1.466,0,0,1-1.465,1.465h-3.108a1.466,1.466,0,0,1-1.465-1.465V18.473a1.466,1.466,0,0,1,1.465-1.465h3.108a1.467,1.467,0,0,1,1.465,1.465Z"
					transform="translate(1.78)"
					fill="url(#linear-gradient-3)"
				/>
				<Path
					d="M762.256,29.494h-3V26.489a.879.879,0,1,0-1.758,0v3.005h-3.005a.879.879,0,0,0,0,1.758h3.005v3a.879.879,0,1,0,1.758,0v-3h3a.879.879,0,1,0,0-1.758Z"
					transform="translate(1.782 1.782)"
					fill="url(#linear-gradient-4)"
				/>
			</G>
		</Svg>
	);
};

export default ApplicationPng;
