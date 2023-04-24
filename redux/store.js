import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { createWrapper } from 'next-redux-wrapper';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import authReducer, { logout } from './reducers/authSlices';
import { setAuthenticationError } from './reducers/errorSlices';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'loadingBar'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'],
};

const reducers = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  loadingBar: loadingBarReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat((_store) => (next) => (action) => {
    if (action.type.includes('rejected')) {
      if (action.payload?.code === 401) {
        _store.dispatch(setAuthenticationError(action.payload));
        _store.dispatch(logout());
      }
    }
    next(action);
  }),
});

export const wrapper = createWrapper(() => store, { debug: true });

export const persistor = persistStore(store);

export default store;
