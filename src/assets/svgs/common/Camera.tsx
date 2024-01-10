import { IFansSvg } from "@usertypes/components";
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

export default function CameraSvg({ ...props }: SvgProps) {
	return (
		<Svg {...props} viewBox="4 4 34 34">
			<G>
				<Path
					d="M21 4c9.389 0 17 7.611 17 17s-7.611 17-17 17S4 30.389 4 21 11.611 4 21 4Z"
					fill="#a854f5"
					fillRule="evenodd"
				/>
				<G>
					<Path
						d="M20.984 27.426c-1.816 0-3.631.003-5.447 0-1.108-.002-2.043-.653-2.393-1.689a2.71 2.71 0 0 1-.136-.84c-.01-2.372-.01-4.744-.005-7.116.003-1.426 1.097-2.517 2.52-2.528.276-.002.552 0 .828 0 .364-.002.562-.146.697-.487.115-.294.21-.603.37-.871.35-.583.895-.879 1.57-.885 1.338-.013 2.674-.013 4.011 0 .835.007 1.485.502 1.773 1.307.06.166.112.335.174.5.103.278.323.43.619.436.426.009.856-.013 1.277.035 1.155.134 2.106 1.152 2.13 2.314.029 1.404.012 2.81.008 4.214a.614.614 0 0 1-.632.615c-.35-.006-.612-.28-.613-.655-.002-1.315 0-2.631-.001-3.947 0-.535-.213-.955-.703-1.188-.181-.087-.397-.117-.601-.134-.274-.022-.55-.005-.826-.006-.887-.003-1.564-.486-1.859-1.324-.056-.162-.106-.326-.165-.487a.633.633 0 0 0-.62-.435c-1.3-.002-2.6-.002-3.901 0-.338 0-.54.146-.666.462-.112.285-.198.585-.35.848-.355.614-.913.917-1.622.935-.28.008-.562 0-.843.002-.798.003-1.325.532-1.327 1.334v7.022c0 .636.34 1.104.926 1.268.129.036.267.05.401.05 3.61.002 7.22.002 10.83 0 .762 0 1.27-.478 1.326-1.24.028-.385.298-.646.653-.63.356.016.603.301.595.686-.029 1.352-1.138 2.428-2.521 2.433-1.612.006-3.225.001-4.838.001h-.64Z"
						fill="#fff"
						fillRule="evenodd"
					/>
					<Path
						d="M21.006 24.929c-2.154-.019-3.903-1.783-3.884-3.92.02-2.153 1.783-3.902 3.92-3.883 2.154.02 3.901 1.783 3.883 3.92-.018 2.153-1.782 3.901-3.919 3.883Zm.03-6.554a2.662 2.662 0 0 0-2.664 2.636 2.662 2.662 0 0 0 2.63 2.669 2.662 2.662 0 0 0 2.674-2.643 2.662 2.662 0 0 0-2.64-2.662Z"
						fill="#fff"
						fillRule="evenodd"
					/>
				</G>
			</G>
		</Svg>
	);
}

export const Camera1Svg: IFansSvg = (props) => {
	return (
		<Svg viewBox="0 0 17.111 15.44">
			<G transform="translate(-159.256 -162.722)">
				<Path d="M167.8,178.161q-2.914,0-5.828,0a2.644,2.644,0,0,1-2.561-1.807,2.9,2.9,0,0,1-.147-.9q-.017-3.807,0-7.615a2.669,2.669,0,0,1,2.7-2.7c.295,0,.59,0,.885,0a.712.712,0,0,0,.746-.52,6.219,6.219,0,0,1,.4-.933,1.881,1.881,0,0,1,1.68-.947q2.146-.02,4.292,0a1.985,1.985,0,0,1,1.9,1.4c.064.178.12.359.186.536a.68.68,0,0,0,.662.466c.456.01.916-.014,1.367.038a2.615,2.615,0,0,1,2.279,2.477c.031,1.5.013,3.006.009,4.509a.657.657,0,0,1-.677.658.666.666,0,0,1-.655-.7q0-2.112,0-4.225a1.3,1.3,0,0,0-.752-1.272,1.868,1.868,0,0,0-.643-.143c-.293-.023-.589,0-.884-.006a2.021,2.021,0,0,1-1.989-1.417c-.06-.173-.114-.349-.177-.521a.678.678,0,0,0-.663-.466q-2.087,0-4.175,0a.692.692,0,0,0-.712.495,6.718,6.718,0,0,1-.374.907,1.944,1.944,0,0,1-1.736,1c-.3.008-.6,0-.9,0a1.346,1.346,0,0,0-1.42,1.428q0,.944,0,1.887,0,2.813,0,5.627a1.323,1.323,0,0,0,.991,1.357,1.607,1.607,0,0,0,.429.053q5.794,0,11.59,0a1.341,1.341,0,0,0,1.419-1.328.669.669,0,1,1,1.335.06,2.675,2.675,0,0,1-2.7,2.6c-1.725.006-3.451,0-5.177,0Z" />
				<Path
					d="M170.636,178.3a4.175,4.175,0,1,1,4.194-4.156A4.188,4.188,0,0,1,170.636,178.3Zm.033-7.014a2.839,2.839,0,1,0,2.825,2.849A2.849,2.849,0,0,0,170.669,171.288Z"
					transform="translate(-2.812 -2.814)"
				/>
			</G>
		</Svg>
	);
};

export const Camera2Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 19.824 16.548">
			<G fill={color}>
				<Path
					d="M336.145,808.8h-7.39a2.374,2.374,0,0,1-2.524-2.422q0-4.582,0-9.163a2.374,2.374,0,0,1,2.511-2.414c.84,0,1.679-.006,2.518.005a.255.255,0,0,0,.3-.214c.083-.279.183-.555.287-.828a2.382,2.382,0,0,1,2.219-1.507q2.075-.011,4.15,0a2.378,2.378,0,0,1,2.223,1.5c.113.291.216.587.309.884a.2.2,0,0,0,.23.161c.853-.006,1.707,0,2.56,0a2.373,2.373,0,0,1,2.518,2.428q0,4.573,0,9.144a2.374,2.374,0,0,1-2.519,2.427Zm-.024-1.273h7.433a1.076,1.076,0,0,0,1.176-1.128q0-4.593,0-9.186a1.078,1.078,0,0,0-1.187-1.138c-1.054,0-2.106,0-3.159,0a.657.657,0,0,1-.7-.479c-.152-.425-.3-.853-.446-1.279a1.089,1.089,0,0,0-1.128-.786q-1.971,0-3.943,0a1.087,1.087,0,0,0-1.127.787c-.14.4-.277.8-.417,1.205a.7.7,0,0,1-.79.553H328.76a1.082,1.082,0,0,0-1.208,1.158v9.127a1.086,1.086,0,0,0,1.218,1.168Z"
					transform="translate(-326.23 -792.255)"
				/>
				<Path
					d="M339.553,809.611a4.776,4.776,0,1,1,4.953-4.765A4.87,4.87,0,0,1,339.553,809.611Zm3.63-4.771a3.636,3.636,0,1,0-3.62,3.5A3.571,3.571,0,0,0,343.183,804.84Z"
					transform="translate(-329.637 -795.609)"
				/>
			</G>
		</Svg>
	);
};

export const CameraVideo1Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 23.994 15.389">
			<Path
				d="M391.424,797.3a1.774,1.774,0,0,0-.508-1.269,1.582,1.582,0,0,0-1.124-.456,2.2,2.2,0,0,0-.99.265c-.945.51-1.855,1.035-2.817,1.589l-1.539.884v-.77a2.708,2.708,0,0,0-2.706-2.705l-1.751,0c-.778,0-1.167,0-2.772,0-2.574,0-4.586,0-7.105.009a2.685,2.685,0,0,0-2.669,2.668c-.013,3.222-.013,6.6,0,10.035a2.654,2.654,0,0,0,2.668,2.669c4.531.011,6.07.011,11.627,0a2.689,2.689,0,0,0,2.657-2.233,4.784,4.784,0,0,0,.057-.488l0-.054c.006-.069.012-.138.02-.21l.045-.444,2.2,1.257c.69.4,1.381.792,2.076,1.181a1.755,1.755,0,0,0,1.78.044,1.793,1.793,0,0,0,.845-1.583q0-1.178,0-2.352v-3.548Q391.428,799.537,391.424,797.3ZM383.03,807.36a1.3,1.3,0,0,1-1.446,1.438H370.328a1.318,1.318,0,0,1-1.478-1.47v-9.634a1.3,1.3,0,0,1,1.46-1.452c4.875,0,6.386,0,11.257,0a1.3,1.3,0,0,1,1.464,1.452Zm6.977.88-.521-.263c-.068-.034-.129-.065-.19-.1l-1.863-1.064q-1.312-.748-2.624-1.494a.664.664,0,0,1-.372-.644q.006-.937,0-1.872v-.6c0-.619,0-1.237.006-1.856a.7.7,0,0,1,.3-.572q2.077-1.207,4.173-2.394l.551-.313a.392.392,0,0,1,.137-.046l.394-.087Z"
				transform="translate(-367.434 -794.825)"
				fill="#707070"
			/>
		</Svg>
	);
};