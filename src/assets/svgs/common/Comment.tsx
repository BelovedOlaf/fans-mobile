import tw from "@lib/tailwind";
import { IFansSvg } from "@usertypes/components";
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	colorFans?: string;
	fill?: string;
	size?: number;
}

export const Comment1Svg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 15.978 15.998">
			<Path
				d="M168.272,806.513a7.641,7.641,0,0,0,4.154-1.237q.718.242,1.439.48l1.037.345a.806.806,0,0,0,1.065-1.061l-.339-1.013q-.269-.807-.54-1.613a7.771,7.771,0,1,0-14.32-5.805,7.584,7.584,0,0,0-.3,1.858v0a7.879,7.879,0,0,0,6.512,7.941A8.2,8.2,0,0,0,168.272,806.513Zm4.112-2.372a.832.832,0,0,0-.462.143,6.577,6.577,0,0,1-4.762,1.032,6.779,6.779,0,0,1-5.58-6.847,6.563,6.563,0,0,1,.253-1.561,6.667,6.667,0,1,1,12.234,5.065.834.834,0,0,0-.06.7q.288.854.572,1.707l.168.5-.533-.177c-.513-.171-1.026-.341-1.539-.514A.916.916,0,0,0,172.384,804.142Z"
				transform="translate(-160.274 -790.716)"
				fill={color}
				stroke={color}
				strokeWidth="0.4"
			/>
		</Svg>
	);
};

export default function CommentSvg({ ...props }: FansSvgProps) {
	const {
		size,
		width = size,
		height = size,
		color = "currentColor",
		fill = "transparent",
		...props_
	} = props;

	return (
		<Svg {...props} viewBox="0 0 21.507 21.536">
			<Path
				d="M171.141,812.237a10.451,10.451,0,0,0,5.683-1.692q.983.331,1.968.657l1.418.472a1.1,1.1,0,0,0,1.457-1.451l-.463-1.385q-.368-1.1-.739-2.207a10.63,10.63,0,1,0-19.587-7.941,10.376,10.376,0,0,0-.4,2.541v0a10.778,10.778,0,0,0,8.908,10.862A11.208,11.208,0,0,0,171.141,812.237Zm5.624-3.244a1.138,1.138,0,0,0-.631.2,9,9,0,0,1-6.514,1.412,9.272,9.272,0,0,1-7.632-9.366,8.975,8.975,0,0,1,.347-2.135,9.12,9.12,0,1,1,16.734,6.928,1.141,1.141,0,0,0-.082.953q.394,1.167.782,2.335l.23.69-.729-.242c-.7-.234-1.4-.466-2.1-.7A1.253,1.253,0,0,0,176.765,808.993Z"
				transform="translate(-160.374 -790.802)"
				// stroke={color ?? "#000"}
				fill={color ?? "#000"}
				strokeWidth="0.7"
			/>
		</Svg>
	);
}
