import {
	createGET,
	createPOST,
	createPUTWithParams,
	createDELETEWithParams,
	createGETWithParams,
} from "@helper/RequesterBase";
import { CategoryReqBody, CategoriesRespBody } from "./schemas";
import { IdParams } from "@usertypes/params";
import { ICategory } from "@usertypes/types";

export const getCategory = createGETWithParams<ICategory, IdParams>(
	"/categories/:id",
	true,
);

export const createCategory = createPOST<Partial<CategoryReqBody>, ICategory>(
	"/categories",
	true,
);

export const updateCategory = createPUTWithParams<
	Partial<CategoryReqBody>,
	never,
	IdParams
>("/categories/:id", true);

export const deleteCategory = createDELETEWithParams<IdParams, never, IdParams>(
	"/categories/:id",
	true,
);

export const getCategories = createGET<CategoriesRespBody>("/categories", true);
