import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import { rootSaga } from './root-saga';

import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from "redux-saga";

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
    key: "root",        // persist everything
    storage: storage,   // use browser localStorage
    blacklist: ["categories, user"]
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
    sagaMiddleware
];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);