import { createAction, Action, ActionWithPayload } from "../../utilities/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;
export type FetchCategoriesFail = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, Error>

export const fetchCategoriesStart = (): FetchCategoriesStart => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categories: Category[]): FetchCategoriesSuccess => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFail = (error: Error): FetchCategoriesFail => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, error);