import { configureStore } from "@reduxjs/toolkit";
// import { authReducer } from "./slices/authSlice";
import ReduxProvider from "./ReduxProvider";

// Slices Re-exports
// import { updateUserIsLoaded, updateUserIsSignedIn, updateVezraUser } from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    // auth: authReducer,
  },
});

export default ReduxProvider;
// export { authReducer, updateUserIsLoaded, updateUserIsSignedIn, updateVezraUser };
export type RootState = ReturnType<typeof store.getState>;
export type VezraDispatch = typeof store.dispatch;
