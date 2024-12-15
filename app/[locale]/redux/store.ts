import { configureStore } from "@reduxjs/toolkit";

import auth from "./auth/slice";
import user from "./user/slice";

const store = configureStore({
  reducer: {
    auth,
    user,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
