import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid4 } from "uuid";

type ItemType = {
  content: string;
  itemId: string;
  listId: string;
};

const initialState: ItemType[] = [
  { content: "first", itemId: uuid4(), listId: "1" },
];

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ id: string; listsItem: string }>
    ) => {
      state.push({
        content: action.payload.listsItem,
        listId: action.payload.id,
        itemId: uuid4(),
      });
    },

    deleteItem: (state, action) =>
      state.filter((item) => item.itemId !== action.payload.itemId),
  },
});

export const { deleteItem, addItem } = itemsSlice.actions;
export default itemsSlice.reducer;
