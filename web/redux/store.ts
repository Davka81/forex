import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import uiReducer from "./slices/ui";
import webReducer from "./slices/web";

const rootReducer = combineReducers({
  ui: uiReducer,
  web: webReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;