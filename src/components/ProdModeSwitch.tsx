import { PRODUCTION_MODE } from "@env";
import { getInitialFeatureGates } from "@helper/FeatureGate";
import tw from "@lib/tailwind";
import { featureGateAtom } from "@state/featureGates";
import React, { useState } from "react";
import { Platform } from "react-native";
import { useRecoilState } from "recoil";

function ProdModeSwitch() {
	if (PRODUCTION_MODE === "1") return null;
	if (Platform.OS !== "web") return null;

	const [prod, setProd] = useState(false);
	const toggleProd = () => {
		setProd(!prod);
		setFeatures(getInitialFeatureGates(!prod));
	};

	const [features, setFeatures] = useRecoilState(featureGateAtom);

	return (
		<>
			<style>
				{`
				.prodModeSwitch {
					position: fixed;
					top: 0;
					align-self: center;
					z-index: 999;
					opacity: 0;
					transition: opacity 0.3s ease-in-out;
				}

				.prodModeSwitch:hover {
					opacity: 1;
				}

				.prodModeSwitch button {
					background-color: ${prod ? tw.color("fans-green") : tw.color("fans-red")};
					color: white;
					font-size: 12px;
					padding: 5px;
					border-radius: 5px;
					border: none;
					outline: none;
				}
			`}
			</style>
			<div className="prodModeSwitch">
				<button className={prod ? "prod" : "dev"} onClick={toggleProd}>
					{prod ? "PROD MODE" : "DEV MODE"} (press to toggle)
				</button>
			</div>
		</>
	);
}

export default ProdModeSwitch;
