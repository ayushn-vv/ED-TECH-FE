import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authRedux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Persist Config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Persist only auth
};

// Root Reducer
const rootReducer = combineReducers({
  auth: authReducer,
  // property: propertyReducer
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// Persistor
export const persistor = persistStore(store);

// 🔥 Typed Redux Types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Default Export
export default store;
