import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from '../reducers';
import { IStore } from '../interfaces/store';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'config',
    // 'app',
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

// @ts-ignore
const store: IStore = createStore(
  persistedReducer,
  applyMiddleware(thunk),
);

export const persistor = persistStore(store);

export default store;
