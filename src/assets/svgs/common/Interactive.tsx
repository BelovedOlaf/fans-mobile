import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

import { IFansSvg } from "@usertypes/components";

const InteractiveSvg: IFansSvg = (props) => {
	const { color } = props;
	return (
		<Svg viewBox="0 0 21.705 23.241">
			<G transform="translate(-52 -807)" fill={color}>
				<Path
					d="M74.24,818.516a2.3,2.3,0,0,0-3-2.111c-.056.016-.112.029-.177.047a2.315,2.315,0,0,0-3.366-1.405,2.339,2.339,0,0,0-2.74-.945v-.255c0-1.527.008-3.054,0-4.581a2.3,2.3,0,0,0-1.6-2.145,2.323,2.323,0,0,0-2.557.794,2.442,2.442,0,0,0-.483,1.547q.008,4.877,0,9.753v.227a.907.907,0,0,1-.23-.194,3.546,3.546,0,0,0-4.647-.452,1.988,1.988,0,0,0-.536,2.784c1.185,1.8,2.35,3.61,3.59,5.369a7.5,7.5,0,0,0,6.228,3.285c.6.017,1.209,0,1.814,0a7.966,7.966,0,0,0,1.908-.23,7.6,7.6,0,0,0,5.791-6.957C74.3,821.543,74.284,820.027,74.24,818.516ZM67.35,828.64a5.317,5.317,0,0,1-.7.047c-.8,0-1.605.022-2.4-.039a5.889,5.889,0,0,1-3.956-1.931,6.6,6.6,0,0,1-.657-.837q-1.694-2.521-3.373-5.053c-.017-.025-.034-.05-.05-.076a.466.466,0,0,1,.143-.7,2.01,2.01,0,0,1,2.711.388c.387.466.757.944,1.135,1.415.1.124.2.25.3.37a.773.773,0,0,0,1.355-.41,1.754,1.754,0,0,0,.011-.271q0-3.018,0-6.034t0-6.034a1.39,1.39,0,0,1,.031-.359.768.768,0,0,1,.81-.555.785.785,0,0,1,.7.719c.007.082,0,.166,0,.249q0,4.083,0,8.166a1.533,1.533,0,0,0,.022.338.771.771,0,0,0,1.521-.157c.009-.521,0-1.043.005-1.565a.771.771,0,1,1,1.542,0c.005.734,0,1.466,0,2.2a1.29,1.29,0,0,0,.035.314.762.762,0,0,0,.821.566.751.751,0,0,0,.686-.724c.012-.491,0-.983.008-1.474a1.4,1.4,0,0,1,.036-.336.768.768,0,0,1,1.5.117,2.432,2.432,0,0,1,.009.271c0,.7-.008,1.407,0,2.11a.776.776,0,1,0,1.551-.006c0-.265-.008-.53.009-.793a.766.766,0,0,1,1.5-.139,1.583,1.583,0,0,1,.036.359c0,1.27-.012,2.541,0,3.811A6.1,6.1,0,0,1,67.35,828.64Z"
					transform="translate(-0.575 -0.002)"
				/>
				<Path
					d="M54.315,809.724v.249c0,2.047,0,3.322,0,5.369a2.43,2.43,0,0,0,0,.249.785.785,0,0,0,.712.706.769.769,0,0,0,.8-.545,1.419,1.419,0,0,0,.035-.381c0-2.071,0-3.367,0-5.437v-.227l.07-.026c.052.064.1.133.157.191.26.263.515.533.788.783a.765.765,0,0,0,1.263-.333.78.78,0,0,0-.233-.825c-.734-.73-1.463-1.465-2.2-2.2a.785.785,0,0,0-1.245.009L52.3,809.476a1.394,1.394,0,0,0-.11.115.773.773,0,0,0,.611,1.273.784.784,0,0,0,.56-.259q.452-.455.906-.909Z"
					transform="translate(0)"
				/>
			</G>
		</Svg>
	);
};

export default InteractiveSvg;
