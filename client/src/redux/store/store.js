import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/userSlices";
import expensesReducer from "../slices/expense/expensesSlices";

const store = configureStore({
  reducer: {
    users: userReducer,
    expepnses: expensesReducer,
  },
});

export default store;
