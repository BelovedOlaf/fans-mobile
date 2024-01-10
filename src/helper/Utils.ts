import { CDN_URL } from "@env";

type cdnURLType = {
	(path: string): string;
	(path: string | undefined): string | undefined;
};

/**
 * Converts relative CDN URL to absolute URL if it's not already absolute
 * @param path Relative CDN URL
 */
export const cdnURL = ((path: string | undefined): string | undefined => {
	if (!path) return path;

	if (typeof path !== "string") {
		return path;
	}

	if (
		path.startsWith("blob:") ||
		path.startsWith("data:") ||
		path.startsWith("http:") ||
		path.startsWith("https:")
	)
		return path;

	if (path.startsWith("/")) path = path.substring(1);
	return CDN_URL + path;
}) as cdnURLType;

/**
 * Converts a string to base64url encoded string
 * @param data The string to encode
 * @returns The base64url encoded string
 */
export function btoaurl(data: string): string {
	if (typeof window === "undefined") {
		return Buffer.from(data).toString("base64url");
	} else {
		return window
			.btoa(data)
			.replace(/\+/g, "-")
			.replace(/\//g, "_")
			.replace(/=/g, "");
	}
}

/**
 * Converts a base64url encoded string to a string
 * @param data The base64url encoded string
 * @returns The decoded string
 */
export function atoburl(data: string): string {
	if (typeof window === "undefined") {
		return Buffer.from(data, "base64url").toString();
	} else {
		return window.atob(data.replace(/-/g, "+").replace(/_/g, "/"));
	}
}
