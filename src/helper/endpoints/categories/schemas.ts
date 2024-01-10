import { ICategory } from "@usertypes/types";

export interface CategoryReqBody extends ICategory {
	roleIds?: string[];
	postIds?: string[];
}

export interface CategoriesRespBody {
	categories: ICategory[];
	page: number;
	size: number;
	total: number;
}
