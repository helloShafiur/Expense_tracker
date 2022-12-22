import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utilities/baseURL";

//Create Expense Action
export const createExpAction = createAsyncThunk(
  "expense/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //Get user token from Store
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      //Make http call here
      const { data } = await axios.post(`${baseURL}/expense`, payload, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Fetch All Expenses
export const fetchAllExpAction = createAsyncThunk(
  "expense/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //Get user token from Store
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      //Make http call here
      const { data } = await axios.get(
        `${baseURL}/expense?page=${payload}`,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Update Expense Action
export const updateExpAction = createAsyncThunk(
  "expense/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //Get user token from Store
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      //Make http call here
      const { data } = await axios.put(
        `${baseURL}/expense/${payload?.id}`,
        payload,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Slices
const expensesSlices = createSlice({
  name: "expenses",
  initialState: {},
  extraReducers: (builder) => {
    //Create Expense
    builder.addCase(createExpAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createExpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expenseCreated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createExpAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    //Fetch All Expenses
    builder.addCase(fetchAllExpAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllExpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expensesList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAllExpAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    //Update Expense
    builder.addCase(updateExpAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateExpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expenseUpdated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateExpAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });
  },
});

export default expensesSlices.reducer;
