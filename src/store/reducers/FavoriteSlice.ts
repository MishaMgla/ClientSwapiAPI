import {
  createSlice,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import { People } from "../../models/People";
import { RootState } from "../store";

type FavoritesState = Record<string, People>;

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState: () => {
    const serializedState = localStorage.getItem("favorites");
    if (!serializedState) return {};
    return JSON.parse(serializedState) as FavoritesState;
  },
  reducers: {
    add(state, action) {
      state[action.payload.id] = action.payload;
    },
    remove(state, action) {
      delete state[action.payload];
    },
  },
});

export const localStorageMiddleware = createListenerMiddleware();
localStorageMiddleware.startListening({
  matcher: isAnyOf(favoriteSlice.actions.add, favoriteSlice.actions.remove),
  effect: (_, listenerApi) => {
    localStorage.setItem(
      "favorites",
      JSON.stringify((listenerApi.getState() as RootState).favorites),
    );
  },
});

export default favoriteSlice;
