// import react module
import React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface FansSvgProps extends SvgProps {
	color?: string;
	size?: number;
}

const SingleGem = (props: FansSvgProps) => {
	const { height, size, width, ...props_ } = props;

	return (
		<Svg
			width={width ?? size}
			height={height ?? size}
			{...props_}
			viewBox="0 0 97.177 90.072"
		>
			<Path
				d="M153.072,1315.314c-10.6-8.717-21.2-17.228-31.616-25.513l-.155.045-48.882,14.377-.662.194L55.97,1335.993c8.239,6.112,26.792,19.807,59.858,43.88,10.356-16.943,28.925-49.6,37.319-64.433C153.111,1315.4,153.113,1315.346,153.072,1315.314Zm-40.515,15.915h-.014l-.134.022-.148.021-.018,0-.155.023-.005,0h0c-.132.02-.264.041-.4.064l-.26.043-.093.016-.471.082-.187.036-.121.021-.116.021-.061.012-.548.105-.025.005q-.329.067-.664.139l-.12.025-.054.011-.1.023c-.2.043-.4.089-.6.134l-.036.009-.3.073c-.139.032-.276.064-.417.1l-.137.036-.036.009c-.055.012-.109.029-.164.041-.1.027-.2.05-.294.077l-.053.014c-.262.07-.526.141-.788.216l-.141.041-.255.077c-.1.028-.2.057-.294.087l-.287.086-.162.053c-.08.025-.159.052-.239.079l-.36.118-.2.068-.07.025q-.883.307-1.716.656l-.05.023q-.211.088-.417.182l-.08.036c-.152.07-.3.137-.448.209l-.005,0c-.152.073-.3.146-.448.223l-.078.041c-.114.059-.227.12-.337.18l-.114.064c-.107.061-.21.12-.312.182l-.091.053c-.13.077-.257.157-.38.237l-.064.043c-.1.066-.2.134-.3.2l-.109.078c-.084.061-.164.121-.244.184-.034.025-.068.05-.1.077-.109.086-.214.171-.316.26h0a7.961,7.961,0,0,0-1.149,1.151h0l-.009.01c-.045.05-.087.1-.13.157s-.078.093-.118.141l-.02.027c-.03.039-.061.079-.091.12-.046.059-.093.12-.137.182l-.041.057c-.034.048-.068.1-.1.144s-.068.095-.1.145l-.054.082-.007.011c-.052.078-.1.159-.153.241l-.082.132c-.05.081-.1.162-.146.244l-.08.139c-.048.086-.1.17-.144.257l-.014.027c-.1.191-.205.387-.3.587-.029.057-.057.112-.084.171-.041.082-.08.164-.12.248l-.091.2c-.037.08-.073.16-.109.241s-.071.164-.105.246l-.112.262c-.052.127-.1.255-.155.384-.025.064-.05.128-.073.193-.039.1-.078.2-.116.3l-.07.187c-.043.116-.084.232-.125.35l-.05.139c-.12.343-.232.689-.341,1.038l-.029.087c-.048.155-.095.312-.141.469l-.02.064q-.177.6-.337,1.213l-.027.1-.018.071c-.071.275-.139.546-.2.819l-.016.063-.018.077,0,.012,0,.011,0,.013c-.053.226-.1.451-.153.674l0,.014,0,.02-.055.25-.009.041-.005.027c-.127.592-.241,1.172-.342,1.73l-.007.045-.005.032c-.075.414-.143.815-.2,1.2l-.007.045c-.016.105-.032.207-.048.308l-.011.073h0l0,.029,0,.018v-.016l0-.02v-.011c-.027-.175-.053-.351-.082-.532l-.014-.089c-.025-.159-.052-.318-.078-.48l-.012-.073c-.03-.171-.061-.344-.093-.521l-.009-.054q-.048-.265-.1-.535l-.007-.046c-.016-.081-.03-.159-.046-.241l-.014-.07-.048-.232-.059-.289c-.025-.123-.052-.246-.078-.367l-.048-.218c-.03-.137-.061-.276-.093-.415l-.009-.036-.011-.052c-.057-.246-.118-.494-.178-.742l-.037-.157-.032-.125-.03-.12-.062-.241-.029-.1c-.018-.068-.034-.134-.052-.2-.03-.111-.061-.221-.091-.33s-.07-.244-.105-.367l0-.013-.005-.016c-.078-.275-.161-.549-.244-.822-.032-.1-.068-.205-.1-.307-.014-.047-.029-.093-.043-.137l-.039-.121-.014-.043-.036-.1q-.1-.31-.214-.615c-.025-.066-.046-.134-.07-.2l-.046-.121-.034-.1c-.021-.056-.041-.111-.062-.166s-.041-.107-.062-.159c-.039-.1-.078-.2-.12-.3l-.046-.116c-.046-.113-.093-.225-.141-.335l-.036-.08c-.084-.2-.171-.391-.26-.581l-.011-.027c-.03-.062-.059-.125-.087-.187s-.054-.109-.082-.164l-.032-.068c-.034-.068-.068-.136-.1-.2s-.078-.151-.118-.226l-.023-.045c-.021-.039-.041-.08-.062-.121l-.1-.169c-.027-.048-.054-.1-.082-.146l-.036-.061c-.059-.1-.118-.2-.178-.3l-.057-.1-.03-.046c-.061-.1-.123-.191-.185-.286l-.011-.016-.009-.014-.03-.045c-.061-.089-.121-.177-.184-.26l-.029-.041-.045-.059c-.053-.071-.107-.143-.161-.212l-.043-.057-.025-.03c-.077-.094-.153-.189-.232-.278h0a7.9,7.9,0,0,0-1.15-1.151l-.036-.03c-.059-.05-.12-.1-.18-.151-.043-.034-.087-.07-.132-.1l-.091-.071c-.061-.046-.125-.093-.187-.139l-.039-.03a13.653,13.653,0,0,0-1.414-.885l-.037-.02c-.121-.066-.243-.13-.367-.193l-.041-.023-.073-.036c-.048-.023-.1-.046-.144-.071l-.111-.054-.093-.047-.036-.016-.052-.025c-.093-.044-.186-.087-.28-.13l-.064-.03-.014-.005-.125-.054-.155-.07-.148-.064-.1-.041c-.144-.061-.291-.12-.437-.178l-.207-.084c-.82-.319-1.677-.606-2.545-.867l-.016-.005c-.169-.05-.341-.1-.51-.148l-.03-.009c-.494-.141-.99-.271-1.484-.392l-.109-.028c-.139-.034-.278-.066-.416-.1l-.2-.048c-.125-.029-.248-.057-.371-.084s-.271-.061-.407-.089c-.111-.023-.223-.048-.334-.069-.137-.03-.276-.059-.412-.086l-.191-.037c-.161-.032-.317-.062-.474-.091l-.1-.02c-.678-.127-1.327-.234-1.93-.323l-.029-.005-.046,0,.032,0,.014,0h0l.134-.019.148-.023.018,0,.155-.023h.005l0,0c.132-.02.264-.041.4-.062l.259-.045.1-.016.469-.082.186-.034.121-.023.118-.022.061-.011.548-.107.021-.006c.219-.045.442-.091.667-.139l.119-.025.054-.011.1-.023c.2-.043.4-.088.6-.134l.036-.009c.1-.023.2-.048.3-.073.139-.032.278-.064.419-.1l.137-.036.036-.007.162-.043.3-.077.053-.014c.262-.07.524-.141.788-.214l.141-.043.255-.077c.1-.028.2-.057.294-.087s.191-.055.287-.085c.053-.018.109-.036.162-.052l.239-.08.358-.118.205-.068.07-.025c.587-.2,1.161-.423,1.714-.656l.052-.022c.141-.061.28-.121.417-.184l.08-.036c.152-.068.3-.137.448-.209l.005,0c.152-.073.3-.148.448-.223l.078-.043c.114-.059.227-.119.337-.18l.114-.064c.107-.059.21-.12.312-.18l.091-.054c.13-.078.257-.159.38-.239l.064-.043c.1-.066.2-.134.3-.2l.109-.078c.084-.061.164-.121.244-.182l.1-.078c.107-.086.214-.171.316-.259v0h0a7.814,7.814,0,0,0,1.15-1.15h0l.009-.011c.043-.05.087-.1.13-.157s.078-.093.118-.141l.02-.027c.03-.038.061-.078.091-.118.046-.061.093-.121.137-.184l.041-.057.1-.145c.034-.047.068-.094.1-.144l.054-.082.005-.009c.054-.08.1-.161.155-.243.027-.043.055-.087.082-.132.05-.08.1-.161.146-.244l.08-.139c.048-.085.1-.169.144-.257l.014-.027c.1-.191.2-.387.3-.585.029-.057.057-.114.084-.171.041-.082.08-.166.12-.25l.091-.2c.037-.08.073-.16.109-.241s.071-.164.105-.246.075-.175.112-.264c.052-.126.1-.253.153-.382.027-.064.05-.128.075-.193.039-.1.078-.2.116-.3l.07-.186c.043-.118.084-.234.125-.351l.05-.139q.177-.514.341-1.038l.027-.088c.048-.155.1-.312.143-.469l.02-.064q.177-.6.337-1.213l.027-.1.018-.071q.107-.409.2-.819l.016-.062.018-.077,0-.011,0-.013,0-.012c.054-.225.1-.449.153-.674l0-.014,0-.018c.02-.084.037-.168.055-.251l.009-.041.005-.027c.127-.592.241-1.172.342-1.73l.007-.044.005-.032c.075-.414.143-.815.2-1.2l.007-.045c.016-.1.032-.207.048-.308l.011-.072v0l0-.029,0-.018,0,.016,0,.02V1311c.027.173.053.35.082.532l.014.087c.025.159.052.318.078.48l.012.073c.03.171.061.344.093.521l.009.053q.048.265.1.537l.007.045c.016.08.03.159.046.241l.014.069.048.234q.029.142.059.289c.025.121.052.244.078.367l.048.216c.03.139.061.276.093.416l.007.036.012.052c.057.246.116.494.178.742l.037.159.032.123.03.121.062.241.029.1c.018.068.034.134.052.2.03.111.061.221.091.33s.07.244.105.367l0,.012,0,.016c.08.275.161.549.246.823.032.1.068.2.1.307.014.046.027.093.043.139l.039.12.014.042.034.1c.071.207.143.412.216.615l.07.2.046.121.034.1c.021.055.041.112.062.168s.041.106.062.159l.118.3.048.116c.046.112.093.225.141.335l.036.082c.084.2.171.389.259.58l.012.026c.03.063.057.125.087.188l.08.164.034.068.1.2c.039.077.078.152.12.227l.023.045c.021.039.041.082.062.121.032.057.064.112.095.167s.055.1.084.148l.034.059c.059.1.12.2.18.3.02.03.037.062.057.094l.03.046c.061.1.123.191.184.285l.012.016.009.014.03.045c.061.089.121.177.184.262l.029.039.045.059c.052.073.107.143.161.214l.043.055.025.03c.077.094.153.189.232.278h0a7.9,7.9,0,0,0,1.15,1.15l.036.03c.059.05.118.1.18.151.043.036.087.069.132.1l.091.071c.061.048.125.094.187.139l.039.03a13.329,13.329,0,0,0,1.414.885l.037.021.366.193.043.022.073.035c.046.025.1.048.144.072l.111.055.091.045.037.018.032.014.3.139.064.03.014.005c.041.019.082.036.123.054l.157.069.148.066.1.041c.144.061.291.12.437.178l.207.082c.82.319,1.677.608,2.545.867l.016.005c.169.05.339.1.51.148l.03.009c.494.141.99.271,1.484.394l.109.027.416.1.2.046c.125.029.248.057.371.084l.4.089.339.071c.137.029.275.057.412.084l.191.037c.161.032.317.062.474.091l.1.02c.68.127,1.327.234,1.932.323l.027.005.048.006Zm10.529-20.039h-.007l-.07.011-.078.013-.011,0-.082.012h0l-.21.034-.139.023-.048.009-.25.043-.1.02-.064.011-.061.013-.034.005-.289.057-.014,0c-.116.023-.234.048-.351.075l-.064.012-.029.005-.053.012c-.105.023-.21.046-.317.072l-.018.005-.161.037-.221.053-.073.018-.02.005-.087.023-.155.039-.029.009q-.209.054-.417.112l-.077.023c-.045.012-.089.027-.134.041l-.157.046c-.05.014-.1.029-.152.045l-.087.029c-.041.013-.084.029-.127.041l-.189.064-.109.036-.037.012q-.468.164-.91.348l-.027.012-.221.1-.043.019c-.08.036-.159.073-.237.111l0,0c-.08.037-.159.078-.237.118l-.041.021-.178.1-.062.034-.164.1-.048.029c-.07.041-.136.084-.2.127l-.034.021-.157.107-.059.043c-.043.032-.087.064-.128.1l-.054.041c-.057.045-.114.091-.168.137v0h0a4.436,4.436,0,0,0-.61.608v0l-.005.005c-.023.027-.045.055-.068.082s-.043.05-.062.075l-.011.014-.048.064c-.025.032-.05.062-.073.1l-.021.03-.054.077-.053.077-.029.043,0,.005c-.027.043-.055.086-.082.129l-.043.069c-.027.043-.052.086-.078.13l-.043.073c-.025.046-.05.091-.077.137l-.007.014c-.055.1-.109.2-.161.31l-.045.091-.062.132-.05.105-.057.129-.055.13c-.02.046-.041.093-.059.139-.029.068-.055.136-.084.2l-.039.1c-.02.052-.041.107-.061.16l-.037.1c-.021.063-.045.125-.066.187l-.027.073c-.062.182-.123.366-.18.551l-.014.047c-.027.082-.052.166-.075.248l-.011.034c-.062.214-.123.43-.178.644l-.016.053-.009.039q-.056.217-.107.434l-.009.034-.009.039,0,.007,0,.005,0,.007c-.029.119-.055.239-.082.357l0,.009,0,.009-.029.134-.005.021,0,.014c-.068.314-.128.621-.182.917l0,.023,0,.018q-.059.329-.107.637l0,.023-.025.164-.005.039h0l0,.014,0,.01v-.009l0-.011v-.005c-.014-.093-.029-.187-.043-.282l-.009-.048c-.012-.084-.027-.168-.041-.253l-.007-.039c-.016-.091-.032-.184-.048-.277l-.005-.029-.054-.283-.005-.025-.023-.127-.007-.037-.027-.123-.03-.153-.043-.2-.025-.114c-.016-.073-.032-.146-.048-.221l-.005-.018-.005-.029c-.03-.13-.062-.26-.095-.392l-.021-.084-.016-.066-.016-.064-.034-.126-.014-.056-.029-.105-.048-.177c-.018-.064-.036-.128-.055-.192l0-.007,0-.009c-.043-.146-.086-.291-.13-.437-.018-.054-.036-.107-.053-.162l-.023-.073-.021-.064-.007-.023-.018-.052c-.037-.111-.077-.219-.114-.326l-.037-.105-.025-.066-.018-.05-.032-.089-.034-.084c-.021-.054-.041-.107-.062-.161l-.025-.061c-.025-.061-.05-.12-.075-.179l-.02-.043c-.045-.105-.091-.207-.137-.309l-.007-.014-.045-.1-.043-.086-.02-.037-.053-.107-.062-.12-.012-.025-.034-.064-.05-.089-.043-.077-.02-.032c-.032-.055-.062-.109-.095-.16l-.03-.05-.016-.025c-.032-.052-.066-.1-.1-.152l-.005-.009-.005-.007-.016-.025c-.032-.046-.066-.093-.1-.137l-.014-.021-.023-.032c-.029-.037-.057-.075-.087-.113l-.021-.03-.014-.016c-.039-.05-.08-.1-.121-.146l0,0h0a4.279,4.279,0,0,0-.61-.61l-.018-.014c-.032-.029-.062-.055-.1-.08l-.07-.055-.048-.039c-.032-.025-.066-.048-.1-.073l-.021-.016a7.026,7.026,0,0,0-.749-.469l-.02-.011c-.064-.036-.128-.07-.194-.1l-.023-.012-.037-.02-.077-.038-.059-.028-.05-.025-.018-.009-.029-.012c-.048-.023-.1-.046-.148-.068l-.034-.016-.007,0-.066-.029-.082-.038-.08-.034-.052-.022-.232-.094-.111-.045c-.435-.169-.89-.323-1.35-.46l-.009,0c-.089-.027-.18-.054-.269-.079l-.016-.005c-.262-.075-.526-.145-.787-.209l-.059-.014-.221-.053-.105-.023-.2-.047-.216-.046-.177-.038-.219-.044-.1-.022-.251-.048-.054-.009c-.36-.068-.7-.125-1.024-.171l-.016,0-.023,0,.016,0,.007,0h0l.071-.011.078-.011.009,0,.084-.012,0,0h0l.21-.034.137-.023.05-.007c.082-.014.166-.028.25-.045l.1-.018.064-.012.062-.011.032-.007.291-.055.011,0c.118-.023.235-.048.355-.073l.062-.012.029-.007.055-.012c.1-.021.21-.046.316-.072l.02,0,.161-.039c.073-.016.146-.034.221-.052l.073-.02.02,0,.086-.023.155-.041.03-.007c.139-.037.278-.075.417-.114l.075-.022.136-.041.155-.047.153-.046.086-.027.127-.043c.064-.02.127-.041.191-.062l.107-.036.039-.012c.31-.109.615-.225.908-.35l.027-.011c.075-.032.15-.064.223-.1l.043-.018c.078-.037.159-.073.237-.11l0,0,.237-.118.043-.023.178-.094.061-.036c.055-.03.111-.062.166-.094l.048-.029c.068-.041.136-.084.2-.127l.034-.023c.054-.034.105-.07.157-.107l.057-.041.13-.1.054-.041c.057-.046.112-.091.166-.139h0a4.267,4.267,0,0,0,.61-.61h0l0-.005c.023-.027.046-.055.07-.084s.041-.048.062-.075l.011-.014.048-.062c.023-.032.048-.064.073-.1l.021-.032.054-.075.054-.077.029-.044,0-.005c.027-.041.054-.084.08-.127l.045-.071c.025-.043.052-.086.077-.129l.043-.075c.027-.045.052-.089.077-.136l.007-.014c.055-.1.109-.2.162-.31l.045-.091.062-.132.048-.107.057-.127.057-.13.059-.141c.029-.068.055-.134.082-.2l.039-.1c.021-.053.041-.107.062-.16l.036-.1c.023-.061.045-.123.066-.185l.027-.073q.094-.273.182-.551l.014-.046c.025-.082.05-.166.075-.25l.011-.034c.062-.214.121-.428.178-.644l.014-.054.009-.037c.037-.144.073-.289.109-.433l.009-.034.009-.041,0-.005,0-.007v-.005c.029-.12.055-.239.082-.359l0-.007,0-.011.03-.132,0-.021,0-.014c.068-.314.127-.623.18-.918l.005-.023,0-.018c.039-.218.075-.432.105-.635l.005-.025.025-.164.005-.038h0l0-.016v-.009l0,.009v.011l0,.005c.012.091.027.186.043.282l.007.046c.014.084.029.17.043.255l.005.039c.016.091.032.182.05.277l.005.029q.024.139.054.283l0,.023.025.129.007.037.025.123.032.153.041.194.025.116c.016.073.032.146.05.219l0,.02.007.026c.03.13.061.262.095.394l.02.084.018.066.016.063.032.128.016.056.027.105.048.175c.018.066.037.13.055.194l0,.007,0,.009c.041.145.084.291.13.435.016.055.036.109.054.164l.023.073.02.062.007.023.02.054c.037.111.075.217.114.326l.037.105.023.064.018.052.034.088.032.085.064.161.025.06c.025.059.048.12.073.178l.02.043c.045.1.091.207.137.307l.007.016.046.1.043.088.018.036.054.109.062.12.012.023.034.064.05.089.045.078.018.032.1.16.03.05.016.025c.032.05.064.1.1.15l.005.011.005.007.016.023.1.139.016.021.023.03c.029.039.057.077.086.112l.023.031.012.016c.041.05.082.1.123.148h0a4.269,4.269,0,0,0,.61.61l.02.016c.03.027.062.054.095.08l.07.055.05.038c.032.025.064.05.1.075l.021.014a6.645,6.645,0,0,0,.751.469l.02.012.194.1.021.013.039.018.077.037.059.03.048.023.02.009.018.009c.052.025.1.05.157.073l.034.016.009,0,.066.028.082.036.078.036.053.021.232.094.109.043c.435.169.89.323,1.35.46l.009,0c.091.026.18.053.271.078l.016.005q.393.109.787.209l.059.014.219.052.105.025c.066.016.132.03.2.045l.212.046.18.039.218.045.1.02.251.048.055.011c.359.066.7.123,1.024.171l.014,0,.025,0Z"
				transform="translate(-55.97 -1289.801)"
				fill={props.color ?? "#fff"}
			/>
		</Svg>
	);
};

export default SingleGem;