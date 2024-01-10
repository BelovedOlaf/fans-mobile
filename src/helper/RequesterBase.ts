/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * An implementation of a type-safe HTTP requester.
 *
 * INTRODUCTION
 *
 * Short explanation of the functions and when you should use them:
 *
 * - createXXX - this is what you're usually looking for, it's for endpoints with static URLs.
 * - createXXXWithParams - this is for endpoints with dynamic URLs, that have parameters in the URL.
 *   the parameters are passed with :paramName syntax in the endpoint URL, and are passed as an object
 *   to the function.
 * - createXXXWithFormData - this is a special case for endpoints that are used to upload files, and the
 *   body parameter is a FormData object instead of regular JSON serializable object.
 *
 * In case the endpoint doesn't have a request or response body, you should use `never` in the type parameter.
 *
 * The requester has been designed with the following goals in mind:
 *
 * - Let you reduce mistakes by providing a type-safe interface, assuming you don't lazy out and use `unknown`.
 * - Never throw an exception, always return a Response object, even if a client-side error has occurred.
 *   This reduces the trouble of dealing with exceptions (which is particularly annoying in JavaScript code when you want to present a user-friendly error message).
 * - Force you to gracefully handle errors.
 *
 * STRUCTURING THE ENDPOINTS
 *
 * The convention in structure and file naming is followed with one in the backend.
 *
 * - @helper/endpoints/<endpoint>/apis.ts - the "API accessor" file which contains a set of endpoint declarations.
 *
 * See the documentation on each createXXX function for more details.
 *
 * An example of implementation:
 *
 * ```ts
 * // @helper/endpoints/auth/apis.ts
 * import { createGET, createPOST } from "@helper/RequesterBase";
 *
 * export const authLogin = createPOST<AuthPasswordLoginReqBody, TokenRespBody>("/auth/login");
 *
 * export const authGetUserInfo = createGET<AuthUserInfoRespBody>("/auth/user-info", true);
 *
 * export const authLoginWithOAuth2 = createPOSTWithParams<
 * 	 AuthOAuth2AuthorizeReqBody,
 * 	 TokenRespBody,
 * 	 AuthOAuth2AuthorizeReqParams
 * >("/auth/oauth2/authorize/:provider");
 * ```
 *
 * - @helper/endpoints/<endpoint>/schemas.ts - the "schema" file which contains the request and response body types. Supposed to be synced between app and backend.
 *
 * An example of implementation:
 *
 * ```ts
 * // @helper/endpoints/auth/schemas.ts
 * // This file is supposed to be synced between app and backend
 * // app: helper/endpoints/auth/schemas.ts
 * // backend: web/routes/auth/schemas.ts
 *
 * import { IProfile, IUser } from "../../CommonAPISchemas";
 *
 * export interface TokenRespBody {
 * 	 token: string;
 * }
 *
 * export interface AuthPasswordLoginReqBody {
 * 	 email: string;
 * 	 password: string;
 * }
 *
 * export type AuthUserInfoRespBody = IUser & {
 *   profile?: IProfile;
 * };
 *
 * export interface AuthOAuth2AuthorizeReqParams {
 * 	 provider: string;
 * }
 *
 * export interface AuthOAuth2AuthorizeReqBody {
 * 	 code: string;
 * 	 redirectUri: string;
 * }
 * ```
 *
 * EXAMPLE USAGE
 *
 * ```ts
 * const resp = await authLogin({
 * 	 email: "asdf@example.com",
 * 	 password: "asdf",
 * });
 *
 * if (resp.ok) {
 * 	 console.log("Login successful!");
 * 	 console.log("Token:", resp.data.token);
 * } else {
 * 	 console.error("Failed to login:", resp.data.message);
 * }
 * ```
 *
 * ```ts
 * const resp = await authGetUserInfo();
 *
 * if (resp.ok) {
 * 	 console.log("User info:", resp.data);
 * } else {
 * 	 console.error("Failed to get user info:", resp.data.message);
 * }
 * ```
 *
 * ```ts
 * const resp = await authLoginWithOAuth2(
 * 	 { code: "asdf", redirectUri: "https://example.com" },
 * 	 { provider: "google" },
 * );
 *
 * if (resp.ok) {
 * 	 console.log("Login successful!");
 * 	 console.log("Token:", resp.data.token);
 * } else {
 * 	 console.error("Failed to login:", resp.data.message);
 * }
 * ```
 */
import { API_URL } from "@env";
import { StorageKeyTypes } from "@usertypes/commonEnums";
import { getStorage } from "@utils/storage";
import * as pathToRegexp from "path-to-regexp";
import qs from "qs";

/**
 * Represents a response from the server.
 *
 * If the request is successful, `ok` will be `true` and `data` will contain the response body.
 * If the request is unsuccessful, `ok` will be `false` and `data` will contain an object with `code` and `message` properties.
 *
 * The `status` property will contain the HTTP status code, or 1000 if an error has occurred client-side.
 */
export type Response<T> =
	| {
			ok: true;
			status: number;
			data: T;
	  }
	| {
			ok: false;
			status: number;
			data: {
				code: number;
				message: string;
			};
	  };

/**
 * A requester function for making requests with methods similar to GET.
 * @typeParam RespBody Type of the response body.
 */
export type GETLikeHandler<RespBody = never> = (
	query?: object,
) => Promise<Response<RespBody>>;

/**
 * A requester function for making requests with methods similar to GET, but with :parameters included in the URL.
 * @typeParam RespBody Type of the response body.
 * @typeParam Params Type of the parameters.
 */
export type GETLikeWithParamsHandler<
	RespBody = never,
	Params extends object = object,
> = (params: Params, query?: object) => Promise<Response<RespBody>>;

/**
 * A requester function for making requests with methods similar to POST.
 * @typeParam ReqBody Type of the request body.
 * @typeParam RespBody Type of the response body.
 */
export type POSTLikeHandler<ReqBody = never, RespBody = never> = (
	body: ReqBody,
	query?: object,
) => Promise<Response<RespBody>>;

/**
 * A requester function for making requests with methods similar to POST, but with a custom BodyInit type.
 * @typeParam RespBody Type of the response body.
 */
export type POSTLikeHandlerRaw<RespBody = never> = (
	body: BodyInit,
	query?: object,
) => Promise<Response<RespBody>>;

/**
 * A requester function for making requests with methods similar to POST, but with :parameters included in the URL.
 * @typeParam ReqBody Type of the request body.
 * @typeParam RespBody Type of the response body.
 * @typeParam Params Type of the parameters.
 */
export type POSTLikeWithParamsHandler<
	ReqBody = never,
	RespBody = never,
	Params extends object = object,
> = (
	body: ReqBody,
	params: Params,
	query?: object,
	headers?: object,
) => Promise<Response<RespBody>>;

/**
 * A requester function for making requests with methods similar to POST, but with :parameters included in the URL and with a progress callback.
 * @typeParam ReqBody Type of the request body.
 * @typeParam RespBody Type of the response body.
 * @typeParam Params Type of the parameters.
 */
export type POSTLikeWithParamsHandlerProgress<
	ReqBody = never,
	RespBody = never,
	Params extends object = object,
> = (
	body: ReqBody,
	params: Params,
	query?: object,
	onProgress?: (progress: number) => void,
) => Promise<Response<RespBody>>;

/**
 * A requester function for making requests with methods similar to POST, but with :parameters included in the URL and with a custom BodyInit type.
 * @typeParam RespBody Type of the response body.
 * @typeParam Params Type of the parameters.
 */
export type POSTLikeWithParamsHandlerRaw<
	RespBody = unknown,
	Params extends object = object,
> = (
	body: BodyInit,
	params: Params,
	query?: object,
) => Promise<Response<RespBody>>;

function isEmptyObject(obj: object) {
	for (const name in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, name)) {
			return false;
		}
	}

	return true;
}

async function getQuery(query?: object): Promise<string> {
	if (!query || isEmptyObject(query)) {
		return "";
	}

	return "?" + qs.stringify(query);
}

async function makeResponse<T>(
	resp: globalThis.Response,
): Promise<Response<T>> {
	const text = await resp.text();
	const data = (text.length === 0 ? {} : JSON.parse(text)) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
	return {
		data,
		ok: resp.ok,
		status: resp.status,
	};
}

const reportError = <T>(e: unknown): Response<T> => {
	console.error("An error has occurred while making a network request:", e);
	const errorString =
		e instanceof Error
			? e.message
			: typeof e === "string"
			? e
			: "Unknown error";

	return {
		ok: false,
		status: 1000,
		data: {
			code: 0,
			message:
				"A client-side error has occurred while making the request: " +
				errorString,
		},
	};
};

/**
 * Creates a requester for a GET endpoint.
 * @typeParam RespBody Type of the response body.
 * @param endpoint Address of the endpoint, relative to the API URL.
 * @param authorize Whether to include the access token in the request.
 * @returns {GETLikeHandler<RespBody>} A requester function that optionally accepts an object with query paramters.
 *
 * @example
 * Declare the endpoint:
 * ```ts
 * const getSelfUser = createGET<IUser>("/users/@me");
 * ```
 *
 * @example
 * Use the endpoint:
 * ```ts
 * const resp = await getSelfUser();
 *
 * if (resp.ok) {
 *   console.log("User:", resp.data);
 * } else {
 *   console.error("Failed to get user:", resp.data.message);
 * }
 * ```
 */
export const createGET =
	<RespBody = never>(
		endpoint: string,
		authorize: boolean = false,
	): GETLikeHandler<RespBody> =>
	async (query?: object) => {
		try {
			const token = await getStorage(StorageKeyTypes.AccessToken);
			const queryString = await getQuery(query);

			const resp = await fetch(API_URL + endpoint + queryString, {
				credentials: "same-origin",
				headers: authorize
					? {
							Authorization: token ?? "",
					  }
					: {},
			}).then((r) => makeResponse<RespBody>(r));

			return resp;
		} catch (e) {
			return reportError(e);
		}
	};

/**
 * Creates a requester for a GET endpoint with parameters.
 * @typeParam RespBody Type of the response body.
 * @typeParam Params Type of the :parameters.
 * @param endpoint Address of the endpoint, relative to the API URL.
 * @param authorize Whether to include the access token in the request.
 * @returns {GETLikeWithParamsHandler<RespBody, Params>} A requester function that accepts an object with :parameters and optionally an object with query paramters.
 *
 * @example
 * Declare the endpoint:
 * ```ts
 * const getUser = createGETWithParams<IUser, { userId: string }>("/users/:userId");
 * ```
 *
 * @example
 * Use the endpoint:
 * ```ts
 * const resp = await getUser({ userId: "1234567890" });
 *
 * if (resp.ok) {
 *   console.log("User:", resp.data);
 * } else {
 *   console.error("Failed to get user:", resp.data.message);
 * }
 * ```
 */
export const createGETWithParams =
	<RespBody = never, Params extends object = object>(
		endpoint: string,
		authorize: boolean = false,
	): GETLikeWithParamsHandler<RespBody, Params> =>
	async (params: Params, query?: object) => {
		try {
			const token = await getStorage(StorageKeyTypes.AccessToken);
			const toPath = pathToRegexp.compile(endpoint);
			const queryString = await getQuery(query);

			const resp = await fetch(API_URL + toPath(params) + queryString, {
				credentials: "same-origin",
				headers: authorize
					? {
							Authorization: token ?? "",
					  }
					: {},
			}).then((r) => makeResponse<RespBody>(r));

			return resp;
		} catch (e) {
			return reportError(e);
		}
	};

const handlerPOSTLike = async <RespBody>(
	method: "POST" | "PATCH" | "PUT" | "DELETE",
	endpoint: string,
	authorize: boolean = false,
	contentType: string = "application/json",
	body: BodyInit,
	query?: object,
): Promise<Response<RespBody>> => {
	try {
		const token = await getStorage(StorageKeyTypes.AccessToken);
		const queryString = await getQuery(query);
		const headers = Object.assign(
			{},
			authorize
				? {
						Authorization: token ?? "",
				  }
				: {},
			contentType !== "multipart/form-data"
				? { "content-type": contentType }
				: {},
		) as HeadersInit;

		const resp = await fetch(API_URL + endpoint + queryString, {
			method,
			credentials: "same-origin",
			headers,
			body,
		}).then((r) => makeResponse<RespBody>(r));

		return resp;
	} catch (e) {
		return reportError(e);
	}
};

const handlerPOSTLikeWithParams = async <RespBody>(
	method: "POST" | "PATCH" | "PUT" | "DELETE",
	endpoint: string,
	authorize: boolean = false,
	contentType: string = "application/json",
	body: BodyInit,
	params: object,
	query?: object,
	headersInit: object = {},
): Promise<Response<RespBody>> => {
	try {
		const token = await getStorage(StorageKeyTypes.AccessToken);

		const toPath = pathToRegexp.compile(endpoint);
		const queryString = await getQuery(query);
		const headers = Object.assign(
			headersInit,
			authorize
				? {
						Authorization: token ?? "",
				  }
				: {},
			contentType !== "multipart/form-data"
				? { "content-type": contentType }
				: {},
		) as HeadersInit;

		const resp = await fetch(API_URL + toPath(params) + queryString, {
			method,
			credentials: "same-origin",
			headers,
			body,
		}).then((r) => makeResponse<RespBody>(r));

		return resp;
	} catch (e) {
		return reportError(e);
	}
};

/**
 * Creates a requester for a POST endpoint.
 * @typeParam ReqBody Type of the request body.
 * @typeParam RespBody Type of the response body.
 * @param endpoint Address of the endpoint, relative to the API URL.
 * @param authorize Whether to include the access token in the request.
 * @returns {POSTLikeHandler<ReqBody, RespBody>} A requester function that accepts a request body and optionally an object with query paramters.
 *
 * @example
 * Declare the endpoint:
 * ```ts
 * const createPost = createPOST<IPost, IPost>("/posts");
 * ```
 *
 * @example
 * Use the endpoint:
 * ```ts
 * const resp = await createPost({
 *   title: "Hello world",
 *   type: PostType.Text,
 *   caption: "This is a test post",
 *   thumb: "https://example.com/thumb.jpg",
 * });
 *
 * if (resp.ok) {
 *   console.log("Post created!", resp.data);
 * } else {
 *   console.error("Failed to get user:", resp.data.message);
 * }
 * ```
 */
export const createPOST =
	<ReqBody = never, RespBody = never>(
		endpoint: string,
		authorize: boolean = false,
	): POSTLikeHandler<ReqBody, RespBody> =>
	async (body: ReqBody, query?: object) =>
		handlerPOSTLike(
			"POST",
			endpoint,
			authorize,
			"application/json",
			JSON.stringify(body),
			query,
		);

/**
 * Creates a requester for a PATCH endpoint.
 * @typeParam ReqBody Type of the request body.
 * @typeParam RespBody Type of the response body.
 * @param endpoint Address of the endpoint, relative to the API URL.
 * @param authorize Whether to include the access token in the request.
 * @returns {POSTLikeHandler<ReqBody, RespBody>} A requester function that accepts a request body and optionally an object with query paramters.
 *
 * @example
 * Declare the endpoint:
 * ```ts
 * const patchSelfUser = createPUT<Partial<IUser>, IUser>("/users/@me");
 * ```
 *
 * @example
 * Use the endpoint:
 * ```ts
 * const resp = await patchSelfUser({
 *   username: "newUsername",
 * });
 *
 * if (resp.ok) {
 *   console.log("Username updated!", resp.data);
 * } else {
 *   console.error("Failed to update user:", resp.data.message);
 * }
 * ```
 */
export const createPATCH =
	<ReqBody = never, RespBody = never>(
		endpoint: string,
		authorize: boolean = false,
	): POSTLikeHandler<ReqBody, RespBody> =>
	async (body: ReqBody, query?: object) =>
		handlerPOSTLike(
			"PATCH",
			endpoint,
			authorize,
			"application/json",
			JSON.stringify(body),
			query,
		);

/**
 * Creates a requester for a PUT endpoint.
 * @typeParam ReqBody Type of the request body.
 * @typeParam RespBody Type of the response body.
 * @param endpoint Address of the endpoint, relative to the API URL.
 * @param authorize Whether to include the access token in the request.
 * @returns {POSTLikeHandler<ReqBody, RespBody>} A requester function that accepts a request body and optionally an object with query paramters.
 *
 * @example
 * Declare the endpoint:
 * ```ts
 * const createPost = createPUT<IPost, IPost>("/posts");
 * ```
 *
 * @example
 * Use the endpoint:
 * ```ts
 * const resp = await createPost({
 *   title: "Hello world",
 *   type: PostType.Text,
 *   caption: "This is a test post",
 *   thumb: "https://example.com/thumb.jpg",
 * });
 *
 * if (resp.ok) {
 *   console.log("Post created!", resp.data);
 * } else {
 *   console.error("Failed to create post:", resp.data.message);
 * }
 * ```
 */
export const createPUT =
	<ReqBody = never, RespBody = never>(
		endpoint: string,
		authorize: boolean = false,
	): POSTLikeHandler<ReqBody, RespBody> =>
	async (body: ReqBody, query?: object) =>
		handlerPOSTLike(
			"PUT",
			endpoint,
			authorize,
			"application/json",
			JSON.stringify(body),
			query,
		);

/**
 * Creates a requester for a DELETE endpoint.
 * @typeParam ReqBody Type of the request body.
 * @typeParam RespBody Type of the response body.
 * @param endpoint Address of the endpoint, relative to the API URL.
 * @param authorize Whether to include the access token in the request.
 * @returns {POSTLikeHandler<ReqBody, RespBody>} A requester function that accepts a request body and optionally an object with query paramters.
 *
 * @example
 * Declare the endpoint:
 * ```ts
 * const deleteProfile = createDELETE<never, never>("/profile");
 * ```
 *
 * @example
 * Use the endpoint:
 * ```ts
 * const resp = await deleteProfile();
 *
 * if (resp.ok) {
 *   console.log("Profile deleted!");
 * } else {
 *   console.error("Failed to delete profile:", resp.data.message);
 * }
 * ```
 */
export const createDELETE =
	<ReqBody = never, RespBody = never>(
		endpoint: string,
		authorize: boolean = false,
	): POSTLikeHandler<ReqBody, RespBody> =>
	async (body: ReqBody, query?: object) =>
		handlerPOSTLike(
			"DELETE",
			endpoint,
			authorize,
			"application/json",
			JSON.stringify(body),
			query,
		);

/**
 * Creates a requester for a POST endpoint with parameters.
 * @typeParam ReqBody Type of the request body.
 * @typeParam RespBody Type of the response body.
 * @typeParam Params Type of the :parameters.
 * @param endpoint Address of the endpoint, relative to the API URL.
 * @param authorize Whether to include the access token in the request.
 * @returns {POSTLikeWithParamsHandler<ReqBody, RespBody, Params>} A requester function that accepts a request body,
 * parameters object and optionally an object with query parameters.
 *
 * @example
 * Declare the endpoint:
 * ```ts
 * const createChatMessage = createPOSTWithParams<CreateChatMessageReqBody, IMessage, {userId: string}>("/chat/:userId/messages");
 * ```
 *
 * @example
 * Use the endpoint:
 * ```ts
 * const resp = await createChatMessage({
 *   content: "Hey, how are you?",
 * }, {
 *   userId: "1234567890"
 * });
 *
 * if (resp.ok) {
 *   console.log("Message sent!", resp.data);
 * } else {
 *   console.error("Failed to send message:", resp.data.message);
 * }
 * ```
 */
export const createPOSTWithParams =
	<ReqBody = unknown, RespBody = unknown, Params extends object = object>(
		endpoint: string,
		authorize: boolean = false,
	): POSTLikeWithParamsHandler<ReqBody, RespBody, Params> =>
	async (body: ReqBody, params: Params, query?: object, headers?: object) => {
		return handlerPOSTLikeWithParams(
			"POST",
			endpoint,
			authorize,
			"application/json",
			JSON.stringify(body),
			params,
			query,
			headers,
		);
	};

/**
 * Creates a requester for a PATCH endpoint with parameters.
 * @typeParam ReqBody Type of the request body.
 * @typeParam RespBody Type of the response body.
 * @typeParam Params Type of the :parameters.
 * @param endpoint Address of the endpoint, relative to the API URL.
 * @param authorize Whether to include the access token in the request.
 * @returns {POSTLikeWithParamsHandler<ReqBody, RespBody, Params>} A requester function that accepts a request body,
 * parameters object and optionally an object with query parameters.
 *
 * @example
 * Declare the endpoint:
 * ```ts
 * const updateChatMessage = createPATCHWithParams<
 *   UpdateChatMessageReqBody,
 *   IMessage,
 *   {
 *     userId: string;
 *     messageId: string;
 *   },
 * >("/chat/:userId/messages/:messageId");
 * ```
 *
 * @example
 * Use the endpoint:
 * ```ts
 * const resp = await updateChatMessage({
 *   content: "hiiiii!",
 * }, {
 *   userId: "1234567890",
 *   messageId: "0987654321",
 * });
 *
 * if (resp.ok) {
 *   console.log("Message updated!", resp.data);
 * } else {
 *   console.error("Failed to send message:", resp.data.message);
 * }
 * ```
 */
export const createPATCHWithParams =
	<ReqBody = unknown, RespBody = unknown, Params extends object = object>(
		endpoint: string,
		authorize: boolean = false,
	): POSTLikeWithParamsHandler<ReqBody, RespBody, Params> =>
	async (body: ReqBody, params: Params, query?: object, headers?: object) =>
		handlerPOSTLikeWithParams(
			"PATCH",
			endpoint,
			authorize,
			"application/json",
			JSON.stringify(body),
			params,
			query,
			headers,
		);

export const createPUTWithParams =
	<ReqBody = unknown, RespBody = unknown, Params extends object = object>(
		endpoint: string,
		authorize: boolean = false,
	): POSTLikeWithParamsHandler<ReqBody, RespBody, Params> =>
	async (body: ReqBody, params: Params, query?: object, headers?: object) =>
		handlerPOSTLikeWithParams(
			"PUT",
			endpoint,
			authorize,
			"application/json",
			JSON.stringify(body),
			params,
			query,
			headers,
		);

export const createDELETEWithParams =
	<ReqBody = unknown, RespBody = unknown, Params extends object = object>(
		endpoint: string,
		authorize: boolean = false,
	): POSTLikeWithParamsHandler<ReqBody, RespBody, Params> =>
	async (body: ReqBody, params: Params, query?: object, headers?: object) =>
		handlerPOSTLikeWithParams(
			"DELETE",
			endpoint,
			authorize,
			"application/json",
			JSON.stringify(body),
			params,
			query,
			headers,
		);

export const createPOSTRaw =
	<RespBody = unknown>(
		endpoint: string,
		authorize: boolean = false,
		contentType: string = "application/json",
	): POSTLikeHandlerRaw<RespBody> =>
	async (body: BodyInit, query?: object) =>
		handlerPOSTLike("POST", endpoint, authorize, contentType, body, query);

export const createPATCHRaw =
	<RespBody = unknown>(
		endpoint: string,
		authorize: boolean = false,
		contentType: string = "application/json",
	): POSTLikeHandlerRaw<RespBody> =>
	async (body: BodyInit, query?: object) =>
		handlerPOSTLike("PATCH", endpoint, authorize, contentType, body, query);

export const createPUTRaw =
	<RespBody = unknown>(
		endpoint: string,
		authorize: boolean = false,
		contentType: string = "application/json",
	): POSTLikeHandlerRaw<RespBody> =>
	async (body: BodyInit, query?: object) =>
		handlerPOSTLike("PUT", endpoint, authorize, contentType, body, query);

export const createDELETERaw =
	<RespBody = unknown>(
		endpoint: string,
		authorize: boolean = false,
		contentType: string = "application/json",
	): POSTLikeHandlerRaw<RespBody> =>
	async (body: BodyInit, query?: object) =>
		handlerPOSTLike(
			"DELETE",
			endpoint,
			authorize,
			contentType,
			body,
			query,
		);

export const createPOSTWithParamsRaw =
	<RespBody = unknown, Params extends object = object>(
		endpoint: string,
		authorize: boolean = false,
		contentType: string = "application/json",
	): POSTLikeWithParamsHandlerRaw<RespBody, Params> =>
	async (body: BodyInit, params: Params, query?: object) =>
		handlerPOSTLikeWithParams(
			"POST",
			endpoint,
			authorize,
			contentType,
			body,
			params,
			query,
		);

export const createPATCHWithParamsRaw =
	<RespBody = unknown, Params extends object = object>(
		endpoint: string,
		authorize: boolean = false,
		contentType: string = "application/json",
	): POSTLikeWithParamsHandlerRaw<RespBody, Params> =>
	async (body: BodyInit, params: Params, query?: object) =>
		handlerPOSTLikeWithParams(
			"PATCH",
			endpoint,
			authorize,
			contentType,
			body,
			params,
			query,
		);

export const createPUTWithParamsRaw =
	<RespBody = unknown, Params extends object = object>(
		endpoint: string,
		authorize: boolean = false,
		contentType: string = "application/json",
	): POSTLikeWithParamsHandlerRaw<RespBody, Params> =>
	async (body: BodyInit, params: Params, query?: object) =>
		handlerPOSTLikeWithParams(
			"PUT",
			endpoint,
			authorize,
			contentType,
			body,
			params,
			query,
		);

export const createDELETEWithParamsRaw =
	<RespBody = unknown, Params extends object = object>(
		endpoint: string,
		authorize: boolean = false,
		contentType: string = "application/json",
	): POSTLikeWithParamsHandlerRaw<RespBody, Params> =>
	async (body: BodyInit, params: Params, query?: object) =>
		handlerPOSTLikeWithParams(
			"DELETE",
			endpoint,
			authorize,
			contentType,
			body,
			params,
			query,
		);

export const createPOSTWithFormData =
	<ReqBody extends FormData = FormData, RespBody = never>(
		endpoint: string,
		authorize: boolean = false,
	): POSTLikeHandler<ReqBody, RespBody> =>
	async (body: ReqBody, query?: object) =>
		handlerPOSTLike(
			"POST",
			endpoint,
			authorize,
			"multipart/form-data",
			body,
			query,
		);
