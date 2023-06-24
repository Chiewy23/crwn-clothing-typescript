import { expectSaga, testSaga } from "redux-saga-test-plan"
import { fetchCategoriesAsync, onFetchCategories, categoriesSaga } from "../category.saga"
import { call } from "typed-redux-saga";
import { getCategoriesAndDocuments } from "../../../utilities/firebase/firebase.utils";
import { fetchCategoriesFail, fetchCategoriesSuccess } from "../category.action";
import { throwError } from "redux-saga-test-plan/providers";
import { CATEGORIES_ACTION_TYPES } from "../category.types";

// ##### THESE CURRENTLY FAIL #####
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
            .isDone();
    });

    test("fetchCategoriesAync success", () => {
        const mockCategoriesArray = [
            { id: 1, name: " Category 1" },
            { id: 2, name: " Category 2" }
        ];

        return expectSaga(fetchCategoriesAsync)
            .provide([[call(getCategoriesAndDocuments), mockCategoriesArray]])
            .put(fetchCategoriesSuccess(mockCategoriesArray))
            .run();
    });

    test("fetchCategoriesAync failure", () => {
        const mockError = new Error("An error occurred");

        return expectSaga(fetchCategoriesAsync)
            .provide([[call(getCategoriesAndDocuments), throwError(mockError)]])
            .put(fetchCategoriesFail(mockError))
            .run();
    });
});