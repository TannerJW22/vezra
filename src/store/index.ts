import { configureStore } from "@reduxjs/toolkit";
// import { authReducer } from "./slices/authSlice";
import { studentPageReducer } from "./slices/studentPageSlice";
import ReduxProvider from "./Provider";

// Slices Re-exports
// import { updateUserIsLoaded, updateUserIsSignedIn, updateVezraUser } from "./slices/authSlice";
import { setGlobalFilter, setSorting, setTableData, setTable } from "./slices/studentPageSlice";

export const store = configureStore({
	reducer: {
		// auth: authReducer,
		studentPage: studentPageReducer,
	},
});

export default ReduxProvider;
// export { authReducer, updateUserIsLoaded, updateUserIsSignedIn, updateVezraUser };
export { setGlobalFilter, setSorting, setTableData, setTable };
export type RootState = ReturnType<typeof store.getState>;
export type VezraDispatch = typeof store.dispatch;
