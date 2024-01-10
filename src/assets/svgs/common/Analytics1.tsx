import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	colorFans?: string;
	fill?: string;
	size?: number;
}

export default function Analytics1Svg({ ...props }: FansSvgProps) {
	return (
		<Svg
			width={props.width ?? props.size}
			height={props.height ?? props.size}
			{...props}
			viewBox="0 0 78.724 62.042"
		>
			<G
				id="Group_53488"
				data-name="Group 53488"
				transform="translate(-1495.935 -258.515)"
			>
				<Path
					id="Path_47368"
					data-name="Path 47368"
					d="M1573.084,317.751c-.806,0-1.594,0-2.384,0l-2.22,0v-6.5c0-5.373-.006-10.929.019-16.393a1.612,1.612,0,0,0-1.746-1.806c-2.24.034-4.5.029-6.7.023q-1.248,0-2.495,0c-1.243,0-1.73.481-1.74,1.715v21.9c0,.206-.007.415-.013.625l-.012.42h-4.6l0-.98q0-3.508,0-7.017c0-1.051-.512-1.688-1.365-1.7h-.037a1.27,1.27,0,0,0-.914.349,1.863,1.863,0,0,0-.472,1.367v7.954h-7.034V287.261h7.034v7.8a4.818,4.818,0,0,0,.021.678,1.385,1.385,0,0,0,2.744.008,3.939,3.939,0,0,0,.023-.59q0-1.284-.005-2.56c-.007-2.1-.014-4.265.023-6.4a1.773,1.773,0,0,0,0-.356,1.607,1.607,0,0,0-1.765-1.431c-3.275.059-6.181.059-8.89,0l-.111,0a2,2,0,0,0-1.449.446,2.171,2.171,0,0,0-.486,1.617c.029,7.672.026,15.472.023,23.016l0,8.213h-4.618v-4.431q.01-4.359,0-8.714a1.557,1.557,0,0,0,0-.4,1.4,1.4,0,0,0-.543-.938,1.435,1.435,0,0,0-1.048-.28c-3.2,0-6.346,0-9.509-.005a1.543,1.543,0,0,0-1.249.533,1.747,1.747,0,0,0-.318,1.2V317.7h-4.618l0-5.811c0-4.782-.006-9.726.019-14.59a1.612,1.612,0,0,0-1.772-1.782c-1.975.041-3.968.032-5.894.025q-1.188,0-2.375-.006l-.363,0c-.237,0-.476,0-.713,0a1.43,1.43,0,0,0-.315,0,1.414,1.414,0,0,0-1.247,1.569v20.582h-5.237l0-57.269a5.772,5.772,0,0,0-.013-.605,1.391,1.391,0,0,0-1.285-1.3c-.034,0-.068,0-.1,0a1.389,1.389,0,0,0-1.381,1.288c-.017.2-.014.4-.011.6l0,.232c.018,19.165.01,38.6-.02,57.767,0,1.587.555,2.15,2.124,2.15q37.256-.018,74.514-.018l.153,0c.107,0,.213,0,.321,0l.114.009a1.49,1.49,0,0,0,1.031-.389,1.43,1.43,0,0,0,.456-1.006c0-.042,0-.091-.006-.138A1.431,1.431,0,0,0,1573.084,317.751Zm-59.285-.045h-7V298.385h7Zm17.3-.018h-7V305.761l7,0Zm34.562.007h-7v-21.8h7Z"
					fill={props?.color}
				/>
				<Path
					id="Path_47369"
					data-name="Path 47369"
					d="M1504.977,274.635q2.215,2.217,4.425,4.425c3.451,3.448,7.019,7.013,10.508,10.534a2.131,2.131,0,0,0,1.436.806h0a2.205,2.205,0,0,0,1.466-.813q11.034-11.064,22.077-22.1c.161-.157.323-.308.562-.532l.329-.308.1.16a5.332,5.332,0,0,0,.505.7q4.808,4.816,9.639,9.649l.143.145c.113.114.227.229.347.338.039.041.072.072.1.1a1.382,1.382,0,0,0,1.949-.117c.128-.114.234-.221.34-.328l.11-.11q3.955-3.949,7.9-7.913a5.321,5.321,0,0,0,.507-.732l.1-.171.138.139c.263.262.511.505.747.734.49.475.911.885,1.312,1.336a1.465,1.465,0,0,0,2.615-.7l.014-.06c.681-2.705,1.386-5.5,2.211-8.217a1.483,1.483,0,0,0-1.9-1.935c-.607.209-1.234.363-1.841.512-.283.069-.566.139-.847.213-.576.155-1.151.314-1.724.473-1.262.349-2.567.71-3.864,1.009a1.5,1.5,0,0,0-1.021.586,1.477,1.477,0,0,0,.3,2.062,14.154,14.154,0,0,1,1.122,1.093c.124.13.248.261.373.389a3.447,3.447,0,0,1,.3.36l.075.1-.09.09-8,8.016-.142-.122a2.429,2.429,0,0,1-.2-.171l-3.438-3.435q-3.428-3.439-6.871-6.87a1.529,1.529,0,0,0-.3-.307,1.44,1.44,0,0,0-2.02.291c-.114.113-.21.211-.307.308l-.144.146q-10.935,10.936-21.872,21.868c-.156.157-.317.312-.526.512l-.384.367-.1-.149a6.813,6.813,0,0,0-.54-.706q-6.8-6.807-13.627-13.625a5.867,5.867,0,0,0-.6-.573,1.353,1.353,0,0,0-1.827.138,1.34,1.34,0,0,0-.122,1.776A5.045,5.045,0,0,0,1504.977,274.635Zm66.3-11.7-1.056,3.956-2.879-2.877Z"
					fill={props?.color}
				/>
				<Path
					id="Path_47370"
					data-name="Path 47370"
					d="M1549.805,301.1h-.005a1.389,1.389,0,0,0,0,2.777h.005a1.406,1.406,0,0,0,1.384-1.355l.15-.039h-.15A1.39,1.39,0,0,0,1549.805,301.1Z"
					fill={props?.color}
				/>
			</G>
		</Svg>
	);
}