declare module "@env" {
	export const API_URL: string;
	export const BUILD_NUMBER: string | undefined;
	export const CDN_URL: string;
	export const DISCORD_CLIENT_ID: string;
	export const GOOGLE_ANDROID_CLIENT_ID: string;
	export const GOOGLE_IOS_CLIENT_ID: string;
	export const GOOGLE_WEB_CLIENT_ID: string;
	export const TWITTER_CONSUMER_KEY: string;
	export const TWITTER_CONSUMER_SECRET: string;
	export const STRIPE_PUBLISHABLE_KEY: string;
	export const AUTHORIZE_NET_API_LOGIN_ID: string;
	export const AUTHORIZE_NET_CLIENT_KEY: string;
	export const AUTHORIZE_NET_ENVIRONMENT: "SANDBOX" | "PRODUCTION";
	export const TWITTER_CLIENT_ID: string;
	export const GEM_EXCHANGE_RATE: string;
	export const PRODUCTION_MODE: string | undefined;
	export const SENTRY_DSN: string | undefined;
}
