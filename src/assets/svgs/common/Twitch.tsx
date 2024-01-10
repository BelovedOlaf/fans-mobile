import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function TwitchSvg({ ...props }: SvgProps) {
	return (
		<Svg {...props} viewBox="0 0 15.459 16.174">
			<Path
				d="M390.161,349.643H386.3c0-.058-.01-.1-.01-.141q0-5.5,0-11a.483.483,0,0,1,.027-.161q.482-1.3.969-2.589c.073-.194.045-.163.233-.163H401.74c0,.056.011.1.011.147q0,4.783,0,9.567a.283.283,0,0,1-.091.218q-2.021,2.016-4.036,4.037a.281.281,0,0,1-.219.09c-.961,0-1.923,0-2.884,0a.318.318,0,0,0-.249.1c-.638.643-1.28,1.282-1.918,1.925a.282.282,0,0,1-.22.089c-.609,0-1.218,0-1.828,0h-.035c-.1,0-.108-.008-.112-.106,0-.036,0-.071,0-.107v-1.9Zm10.168-12.635H388.772c0,.057-.008.108-.008.158q0,4.914,0,9.827c0,.032,0,.063,0,.095,0,.06.025.088.085.085.032,0,.063,0,.095,0h2.788c.036,0,.072,0,.107,0,.062,0,.085.029.083.088,0,.032,0,.063,0,.095v1.907c.051-.046.08-.071.107-.1q.944-.944,1.886-1.89a.321.321,0,0,1,.249-.1c1.195,0,2.389,0,3.583,0a.294.294,0,0,0,.23-.093q1.113-1.12,2.232-2.232a.377.377,0,0,0,.119-.293q0-3.7,0-7.406Z"
				transform="translate(-386.294 -335.583)"
				fill={props.color ?? "#fff"}
			/>
			<Path
				d="M401.469,349h-1.392c0-.05-.011-.091-.011-.133q0-1.975,0-3.95c0-.133,0-.128.143-.126.372,0,.743,0,1.115,0h.135C401.494,344.891,401.5,348.868,401.469,349Z"
				transform="translate(-393.75 -340.565)"
				fill={props.color ?? "#fff"}
			/>
			<Path
				d="M409.9,344.8v4.055c0,.016,0,.032,0,.047,0,.1-.009.107-.111.107-.3,0-.593,0-.889,0-.1,0-.206,0-.308,0-.069,0-.1-.024-.1-.1,0-.027,0-.055,0-.083v-3.855c0-.19-.011-.18.182-.18h1.138C409.836,344.791,409.86,344.793,409.9,344.8Z"
				transform="translate(-398.311 -340.568)"
				fill={props.color ?? "#fff"}
			/>
		</Svg>
	);
}