import { atom } from "recoil";

const pageAtom = atom({
	key: "page",
	default: "home" as string,
});

export { pageAtom };
