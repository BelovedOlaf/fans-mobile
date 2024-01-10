// This file is supposed to be synced between app and backend
// app: helper/endpoints/auth/schemas.ts
// backend: web/routes/auth/schemas.ts

import {
	IOAuth2LinkedAccount,
	IProfile,
	IUserInfo,
} from "../../CommonAPISchemas";

export interface AuthPasswordRegisterReqBody {
	email: string;
	username: string;
	password: string;
}

export interface TokenRespBody {
	token: string;
}

export interface AuthPasswordLoginReqBody {
	email: string;
	password: string;
}

export interface AuthForgotPasswordReqBody {
	email: string;
}

export interface AuthVerifyCodeReqBody {
	code: string;
	email: string;
}

export interface AuthVerifyRegisterReqBody {
	code: string;
	email: string;
	username: string;
	password: string;
}

export interface AuthResendReqBody {
	email: string;
	username?: string;
}

export interface AuthResetPasswordReqBody {
	email: string;
	password: string;
}

export type AuthUserInfoRespBody = IUserInfo & {
	profile?: IProfile;
	gems: number;
	balance: number;
	gemsAmount: number;
	payoutBalance: number;
	bookmarkPostIds: string[];
};

export interface AuthOAuth2AuthorizeReqParams {
	provider: string;
}

export interface AuthOAuth2AuthorizeReqBody {
	code: string;
	redirectUri: string;
	codeVerifier?: string;
}

export interface AuthOAuth2LinkReqParams {
	provider: string;
}

export interface AuthOAuth2LinkReqBody {
	code: string;
	redirectUri: string;
	codeVerifier?: string;
}

export interface AuthOAuth2LinkRespBody {
	linkedAccount: IOAuth2LinkedAccount;
}

export interface AuthOAuth2LinkListRespBody {
	links: {
		[provider: string]: {
			id: string;
			accountId: string;
			email: string;
			name: string;
			avatarUrl?: string;
			linkedAt: string;
		};
	};
}
