import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const LISTS_URL: string = "http://localhost:5000/lists";

export interface ListType {
  title: string;
  listId: string;
  createdAt: number;
}
interface FetchListsType {
  lists: ListType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

const initialState: FetchListsType = { lists: [], status: "idle" };

export const fetchLists = createAsyncThunk("lists/fetchlists", async () => {
  try {
    const response = await axios.get(LISTS_URL);
    return [...response.data.lists];
  } catch (err) {
    let errorMessage = "Failed to fetch lists";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return errorMessage;
  }
});

export const addNewList = createAsyncThunk(
  "lists/addNewList",
  async (list: { title: string; listId: string; createdAt: number }) => {
    try {
      const response = await axios.post(LISTS_URL, list);
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

export const updateList = createAsyncThunk(
  "lists/updateList",
  async (list: { title: string; listId: string }) => {
    try {
      const response = await axios.put(
        LISTS_URL.concat(`/${list.listId}`),
        list
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

export const delList = createAsyncThunk(
  "lists/delList",
  async (list: { listId: string }) => {
    try {
      const response = await axios.delete(LISTS_URL.concat(`/${list.listId}`));
      console.log(response.data);
      return response.data;
    } catch (err) {
      let errorMessage = "Failed to fetch lists";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.log(errorMessage);
      return errorMessage;
    }
  }
);

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    /* addList: (state, action) => {
      state.lists.push({
        title: action.payload.title,
        listId: uuid4(),
        createdAt: Date.now(),
      });
    },
    editList: (
      state,
      action: PayloadAction<{ listId: string; title: string }>
    ) => {
      state.lists.map((list) => {
        list.listId === action.payload.listId
          ? (list.title = action.payload.title)
          : list;
      });
    },
    deleteList: (state, action) => {
      state.lists.filter((list) => list.listId !== action.payload.id);
    }, */
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lists = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = "failed";
        state.lists = [];
        state.error = action.error.message;
      })
      .addCase(
        addNewList.fulfilled,
        (
          state,
          action: PayloadAction<{
            listId: string;
            title: string;
            createdAt: number;
          }>
        ) => {
          state.lists.push(action.payload);
        }
      )
      .addCase(updateList.fulfilled, (state, action) => {
        state.lists.map((list) => {
          list.listId === action.payload.listId
            ? (list.title = action.payload.title)
            : list;
        });
      })
      .addCase(delList.fulfilled, (state, action) => {
        state.lists = state.lists.filter(
          (list) => list.listId !== action.payload
        );
      });
  },
});

export default listsSlice.reducer;
