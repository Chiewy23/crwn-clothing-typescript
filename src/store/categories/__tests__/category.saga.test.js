import { testSaga } from "redux-saga-test-plan"
import { fetchCategoriesAsync, onFetchCategories, categoriesSaga } from "../category.saga"
import { call } from "typed-redux-saga";
import { CATEGORIES_ACTION_TYPES } from "../category.types";

// THESE CURRENTLY FAIL
describe("category sagas", () => {
    test("categoriesSaga", () => {
        testSaga(categoriesSaga)
            .next()
            .all([call(onFetchCategories)])
            .next()
            .isDone();
    });

    test("onFetchCategories", () => {
        testSaga(onFetchCategories)
            .next()
            .takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
            .next()
            isDone();
    });
});