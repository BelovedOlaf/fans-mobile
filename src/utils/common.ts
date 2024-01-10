import { ComponentSizeTypes, MediaType } from "@usertypes/commonEnums";
import { MediasRespBody } from "@helper/endpoints/media/schemas";
import { isArray } from "lodash";
import moment from "moment";

export const firstParam = (
	param: string[] | string | undefined,
): string | undefined => {
	if (param == undefined) return undefined;

	return isArray(param) ? param[0] : param;
};

export const getIconSize = (
	width: number,
	height: number,
	size: ComponentSizeTypes,
) => {
	switch (size) {
		case ComponentSizeTypes.xs:
			return { width: width * 0.6, height: height * 0.6 };
		case ComponentSizeTypes.sm:
			return { width: width / 1.2, height: height / 1.2 };
		case ComponentSizeTypes.md:
			return { width: width, height: height };
		default:
			return { width: width, height: height };
	}
};

export const getAgoTime = (dateStr: string) => {
	const nowTime = new Date().getTime();
	const argTime = new Date(dateStr).getTime();
	const minutes =
		argTime > nowTime ? 0 : Math.floor((argTime - nowTime) / (60 * 1000));
	return moment.duration(minutes, "minutes").humanize(true);
};

export const checkEnableMediasLoadingMore = (
	filter: MediaType,
	medias: MediasRespBody,
) => {
	let enableLoadingMore = false;
	const mediaTotalCounts = medias.imageTotal + medias.videoTotal;
	if (filter === MediaType.All && mediaTotalCounts > 10 * medias.page) {
		enableLoadingMore = true;
	}
	if (filter === MediaType.Image && medias.imageTotal > 10 * medias.page) {
		enableLoadingMore = true;
	}
	if (filter === MediaType.Video && medias.videoTotal > 10 * medias.page) {
		enableLoadingMore = true;
	}
	return enableLoadingMore;
};

export const getBlob = async (fileUri: string) => {
	const resp = await fetch(fileUri);
	const imageBody = await resp.blob();
	return imageBody;
};
