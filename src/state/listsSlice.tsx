import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid4 } from "uuid";

export type ListType = {
  title: string;
  listId: string;
  createdAt: number;
};

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
    deleteList: (state, action) =>
      state.filter((list) => list.listId !== action.payload.id),
    addList: (state, action) => {
      console.log(action.payload.title);
      state.push({
        title: action.payload.title,
        listId: uuid4(),
        createdAt: Date.now(),
      });
    },
  },
});

export const { deleteList, addList } = listsSlice.actions;

export default listsSlice.reducer;
