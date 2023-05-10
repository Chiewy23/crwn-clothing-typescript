import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import { rootSaga } from './root-saga';

import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from "redux-saga";

export type RootState = ReturnType<typeof rootReducer>;
export type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
};

const persistConfig: ExtendedPersistConfig = {
    key: "root",        // persist everything
    storage: storage,   // use browser localStorage
    whitelist: ["cart"]
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