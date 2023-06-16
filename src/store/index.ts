import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { updateUserIsLoaded, updateUserIsSignedIn, updateVezraUser } from "./slices/authSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});

export { store };

export { authReducer, updateUserIsLoaded, updateUserIsSignedIn, updateVezraUser };
