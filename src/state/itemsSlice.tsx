import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid4 } from "uuid";

export interface ItemType {
  content: string;
  id: string;
  listId: string;
  checked: boolean;
}

const initialState: ItemType[] = [
  { content: "first", id: uuid4(), listId: "1", checked: false },
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
        id: uuid4(),
        checked: false,
      });
    },
    editItem: (
      state,
      action: PayloadAction<{ id: string; listsItem?: string }>
    ) => {
      state.map((item) => {
        if (action.payload.listsItem) {
          item.id === action.payload.id
            ? (item.content = action.payload.listsItem)
            : item;
        } else {
          item.id === action.payload.id ? (item.checked = !item.checked) : item;
        }
      });
    },

    deleteItem: (state, action) =>
      state.filter((item) => item.id !== action.payload.itemId),
  },
});

export const { deleteItem, addItem, editItem } = itemsSlice.actions;
export default itemsSlice.reducer;
