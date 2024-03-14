import { configureStore } from "@reduxjs/toolkit";
import listsReducer from "./listsSlice";
import itemsReducer from "./itemsSlice";

export const store = configureStore({
  reducer: { lists: listsReducer, items: itemsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
