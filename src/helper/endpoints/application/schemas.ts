export interface ApplicationRespBody {
	id: string;
	name: string;
	createdAt: string;
	icon?: string;
}

export interface ApplicationListRespBody {
	applications: ApplicationRespBody[];
}

export interface ApplicationReqBody {
	name: string;
}

export interface ApplicationIconReqBody {
	appId: string;
	icon: string;
}

export interface ApplicationUpdateParams {
	name: string;
}

export interface ApplicationIdParams {
	appId: string;
}
