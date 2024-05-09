import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import globalReducer from "./reducers/global.reducer"
import globalSaga from './sagas/global.sagas';
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,

} from 'redux-persist';


const persistConfig = {
    key: 'counter', // key is required, this is the key for the local storage.
    storage, // storage is now required, defaults to localStorage.
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, globalReducer);
const reduxStore = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

// const reduxStore = createStore(globalReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(globalSaga);
export default reduxStore;