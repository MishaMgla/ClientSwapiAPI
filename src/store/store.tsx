import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { peopleApi } from "../services/PeopleApi";
import { searchApi } from "../services/SearchApi";
import { localStorageMiddleware } from "./reducers/FavoriteSlice";
import favoriteSlice from "./reducers/FavoriteSlice";

const rootReducer = combineReducers({
  [peopleApi.reducerPath]: peopleApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
  favorites: favoriteSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      peopleApi.middleware,
      searchApi.middleware,
      localStorageMiddleware.middleware,
    ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
