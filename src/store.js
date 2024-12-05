import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/login/login";
import editReducer from "./features/edit/edit";

export const store = configureStore({
  devTools: true,
  reducer: {
    auth: authReducer,
    edit: editReducer,
  },
});
