import { PRODUCTION_MODE } from "@env";

export interface IFeatureGateData {
	/**
	 * Description of the feature gate
	 */
	description: string;

	/**
	 * If true, the feature gate is enabled in production
	 */
	production: boolean;
}

export const featureGates = {
	"2023_10-chat": {
		description: "Chat feature",
		production: true,
	},
	"2023_10-search": {
		description: "Search feature",
		production: false,
	},
	"2023_10-swan-job-2": {
		description: "Prince 2.0 Job",
		production: false,
	},
	"2023_10-video-calls": {
		description: "Video calls feature",
		production: false,
	},
	"2023_11-custom-videos": {
		description: "Custom videos feature",
		production: false,
	},
	"2023_12-fans-profile": {
		description: "Fans profile",
		production: false,
	},
	"2023_10-random-future-stuff": {
		description: "Random future stuff",
		production: false,
	},
	"2023_10-discord-integration": {
		description: "Discord integration",
		production: false,
	},
	"2023_10-user-lists": {
		description: "User lists",
		production: false,
	},
	"2023_11-referral-links": {
		description: "Referral links",
		production: false,
	},
	"2023_11-twitter-oauth2": {
		description: "Twitter OAuth2 integration",

		production: false,
	},
	"2023_11-notes": {
		description: "Notes feature",
		production: false,
	},
	"2023_11-chat-selections": {
		description: "Chat selections",
		production: false,
	},
	"2023_11_story_share_options": {
		description: "Story share options",
		production: false,
	},
	"2023_11_mobile_header_members_view": {
		description: "Members viewing option in profile header",
		production: false,
	},
} satisfies Record<string, IFeatureGateData>;

export type ValidFeatureGateNames = keyof typeof featureGates;

export const getInitialFeatureGates = (
	isProduction: boolean = PRODUCTION_MODE === "1",
): Set<ValidFeatureGateNames> => {
	const result = new Set<ValidFeatureGateNames>();

	for (const featureGateName in featureGates) {
		const featureGate =
			featureGates[featureGateName as ValidFeatureGateNames];
		if (isProduction && !featureGate.production) continue;

		result.add(featureGateName as ValidFeatureGateNames);
	}

	return result;
};
