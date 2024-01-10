import {
	ValidFeatureGateNames,
	getInitialFeatureGates,
} from "@helper/FeatureGate";
import { atom, useRecoilValue } from "recoil";

export const featureGateAtom = atom({
	key: "featureGates",
	default: getInitialFeatureGates(),
});

interface IFeatureGatesReturn {
	has(featureGateName: ValidFeatureGateNames): boolean;
}

export const useFeatureGates = (): IFeatureGatesReturn => {
	const featureGates = useRecoilValue(featureGateAtom);

	return featureGates;
};

// TODO: toggling, developer menu, etc
