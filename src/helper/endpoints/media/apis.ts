import {
	createGET,
	createGETWithParams,
	createPOSTWithFormData,
	createPOSTWithParams,
} from "@helper/RequesterBase";
import { IdParams } from "@usertypes/params";
import {
	FinishUploadReqBody,
	GeneratePresignedUrlReqBody,
	MediaTypeParam,
	MediasRespBody,
	PresignedUrlRespBody,
	TusUploadRespBody,
} from "./schemas";

export const uploadMedia = createPOSTWithFormData<never, never>("/media", true);

export const getMediaImages = createGET<MediasRespBody>("/media/Image", true);

export const getMedias = createGETWithParams<never, MediaTypeParam>(
	"/media/:type",
	true,
);

export const getPostMedias = createGET<MediasRespBody>(
	"/media/post-medias",
	true,
);

export const getPostMediasByUserId = createGETWithParams<
	MediasRespBody,
	IdParams
>("/media/post-medias/:id", true);

export const generatePresignedUrl = createPOSTWithParams<
	GeneratePresignedUrlReqBody,
	PresignedUrlRespBody,
	MediaTypeParam
>("/media/generate-presigned-url/:type", true);

export const tusUpload = createPOSTWithParams<
	never,
	TusUploadRespBody,
	MediaTypeParam
>("/media/tus/:type", true);

export const finishUpload = createPOSTWithParams<
	FinishUploadReqBody,
	never,
	IdParams
>("/media/finish-upload/:id", true);
