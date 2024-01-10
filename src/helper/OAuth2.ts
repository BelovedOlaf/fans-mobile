import {
	DISCORD_CLIENT_ID,
	GOOGLE_ANDROID_CLIENT_ID,
	GOOGLE_IOS_CLIENT_ID,
	GOOGLE_WEB_CLIENT_ID,
	TWITTER_CLIENT_ID,
} from "@env";
import {
	ResponseType,
	makeRedirectUri,
	useAuthRequest,
} from "expo-auth-session";
import { Platform } from "react-native";

const googleClientId =
	Platform.OS === "ios"
		? GOOGLE_IOS_CLIENT_ID
		: Platform.OS === "android"
		? GOOGLE_ANDROID_CLIENT_ID
		: GOOGLE_WEB_CLIENT_ID;
const twitterClientId = TWITTER_CLIENT_ID;
const discordClientId = DISCORD_CLIENT_ID;

export const twitterDiscovery = {
	authorizationEndpoint: "https://twitter.com/i/oauth2/authorize",
	tokenEndpoint: "https://api.twitter.com/2/oauth2/token",
	revocationEndpoint: "https://api.twitter.com/2/oauth2/revoke",
};

export const googleDiscovery = {
	authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
	tokenEndpoint: "https://oauth2.googleapis.com/token",
	revocationEndpoint: "https://oauth2.googleapis.com/revoke",
	userInfoEndpoint: "https://www.googleapis.com/oauth2/v2/userinfo",
};

export const discordDiscovery = {
	authorizationEndpoint: "https://discord.com/oauth2/authorize",
	tokenEndpoint: "https://discord.com/api/v10/oauth2/token",
	revocationEndpoint: "https://discord.com/api/v10/oauth2/token/revoke",
	userInfoEndpoint: "https://discord.com/api/v10/users/@me",
};

const scheme = "fans.fyp.app";

export const useTwitterAuthRequest = (path: string) => {
	const redirectUri = makeRedirectUri({
		scheme,
		path,
	});

	return useAuthRequest(
		{
			responseType: ResponseType.Code,
			clientId: twitterClientId,
			redirectUri: redirectUri,
			usePKCE: true,
			scopes: ["tweet.read", "users.read"],
		},
		twitterDiscovery,
	);
};

export const useGoogleAuthRequest = (path: string) => {
	const redirectUri = makeRedirectUri({
		scheme,
		path,
	});

	return useAuthRequest(
		{
			responseType: ResponseType.Code,
			clientId: googleClientId,
			redirectUri: redirectUri,
			usePKCE: true,
			scopes: [
				"https://www.googleapis.com/auth/userinfo.email",
				"https://www.googleapis.com/auth/userinfo.profile",
			],
		},
		googleDiscovery,
	);
};

export const useDiscordAuthRequest = (path: string, bot: boolean = false) => {
	const redirectUri = makeRedirectUri({
		scheme,
		path,
	});

	return useAuthRequest(
		{
			responseType: ResponseType.Code,
			clientId: discordClientId,
			redirectUri: redirectUri,
			usePKCE: true,
			scopes: bot ? ["bot"] : ["identify", "email"],
		},
		discordDiscovery,
	);
};
