import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ListType = {
  title: string;
  items: string[];
};

const exampleList = { title: "example", items: ["first", "second", "third"] };

const initialState: ListType[] = [exampleList];

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ id: string; listsItem: string }>
    ) =>
      state.map((list) =>
        list.title === action.payload.id
          ? {
              title: list.title,
              items: [...list.items, action.payload.listsItem],
            }
          : list
      ),
    deleteList: (state, action) =>
      state.filter((list) => list.title !== action.payload.id),
    addList: (state, action: PayloadAction<{ title: string }>) => [
      ...state,
      { title: action.payload.title, items: [] },
    ],
    deleteItem: (state, action) =>
      state.map((list) =>
        list.title === action.payload.listId
          ? {
              title: list.title,
              items: list.items.filter((item) => item !== action.payload.item),
            }
          : list
      ),
  },
});

export const { addItem, deleteList, addList, deleteItem } = listsSlice.actions;

export default listsSlice.reducer;
