import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid4 } from "uuid";

export interface ListType {
  title: string;
  listId: string;
  createdAt: number;
}

const exampleList = {
  title: "example",
  listId: "1",
  createdAt: Date.now(),
};

const initialState: ListType[] = [exampleList];

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action) => {
      state.push({
        title: action.payload.title,
        listId: uuid4(),
        createdAt: Date.now(),
      });
    },
    editList: (
      state,
      action: PayloadAction<{ id: string; listName: string }>
    ) => {
      state.map((list) => {
        list.listId === action.payload.id
          ? (list.title = action.payload.listName)
          : list;
      });
    },
    deleteList: (state, action) =>
      state.filter((list) => list.listId !== action.payload.id),
  },
});

export const { deleteList, addList, editList } = listsSlice.actions;

export default listsSlice.reducer;
