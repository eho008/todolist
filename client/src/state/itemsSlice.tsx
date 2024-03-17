import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL: string = "http://localhost:5000/lists/";

export interface ItemType {
  content: string;
  id: string;
  listId: string;
  checked: boolean;
  important: boolean;
}

const initialState: FetchItemsType = {
  items: [],
  status: "idle",
  ignore: false,
};

interface FetchItemsType {
  items: ItemType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  ignore: boolean;
}

export const fetchItems = createAsyncThunk(
  "lists/fetchItems",
  async (listId: string) => {
    try {
      const response = await axios.get(
        BASE_URL.concat(listId).concat("/todos")
      );

      return response.data;
    } catch (err) {
      let errorMessage = "Failed to fetch lists";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      return errorMessage;
    }
  }
);

export const addNewItem = createAsyncThunk(
  "lists/addNewItem",
  async (item: ItemType) => {
    try {
      const response = await axios.post(
        BASE_URL.concat(item.listId).concat("/todos"),
        item
      );
      return response.data;
    } catch (err) {
      let errorMessage = "Failed to fetch lists";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      return errorMessage;
    }
  }
);

export const updateItem = createAsyncThunk(
  "lists/updateItem",
  async (item: ItemType) => {
    try {
      const response = await axios.put(
        BASE_URL.concat(`${item.listId}/todos/${item.id}`),
        item
      );
      return response.data;
    } catch (err) {
      let errorMessage = "Failed to fetch lists";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      return errorMessage;
    }
  }
);

export const delItem = createAsyncThunk(
  "lists/delItem",
  async (item: { listId: string; id: string }) => {
    try {
      const response = await axios.delete(
        BASE_URL.concat(`${item.listId}/todos/${item.id}`)
      );

      return response.data;
    } catch (err) {
      let errorMessage = "Failed to fetch lists";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      return errorMessage;
    }
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    /*
    addItem: (
      state,
      action: PayloadAction<{ id: string; listsItem: string }>
    ) => {
      state.items.push({
        content: action.payload.listsItem,
        listId: action.payload.id,
        id: uuid4(),
        checked: false,
      });
    },
    editItem: (
      state,
      action: PayloadAction<{
        id: string;
        listsItem?: string;
        checked?: boolean;
      }>
    ) => {
      state.items.map((item) => {
        if (action.payload.listsItem) {
          item.id === action.payload.id
            ? (item.content = action.payload.listsItem)
            : item;
        } else if (action.payload.checked) {
          item.id === action.payload.id ? (item.checked = !item.checked) : item;
        }
      });
    },

    deleteItem: (state, action) => {
      state.items.filter((item) => item.id !== action.payload.id);
    }, */
  },
  extraReducers(builder) {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        action.payload.map((items: ItemType) => {
          if (!state.items.find((item) => item.id === items.id)) {
            state.items.push(items);
          }
        });
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.items = [];
        state.error = action.error.message;
      })
      .addCase(
        addNewItem.fulfilled,
        (state, action: PayloadAction<ItemType>) => {
          state.items.push(action.payload);
        }
      )
      .addCase(updateItem.fulfilled, (state, action) => {
        state.items.map((item) => {
          item.listId === action.payload.listId
            ? ((item.content = action.payload.content),
              (item.checked = action.payload.checked),
              (item.important = action.payload.important))
            : item;
        });
      })
      .addCase(delItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item: ItemType) => item.id !== action.payload
        );
      });
  },
});

export default itemsSlice.reducer;
