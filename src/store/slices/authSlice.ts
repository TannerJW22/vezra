import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Implementation Pending / Unecessary? // <<--(

// import { type VezraUser } from "types";

// type AuthSlice = {
// 	userIsLoaded: boolean;
// 	userIsSignedIn: boolean;
// 	user: Partial<VezraUser>;
// };

// const initialState: AuthSlice = {
// 	userIsLoaded: false,
// 	userIsSignedIn: false,
// 	user: {},
// };

// export const authSlice = createSlice({
// 	name: "auth",
// 	initialState,
// 	reducers: {
// 		updateUserIsLoaded: (state, action: PayloadAction<boolean>) => {
// 			state.userIsLoaded = action.payload;
// 		},

// 		updateUserIsSignedIn: (state, action: PayloadAction<boolean>) => {
// 			state.userIsSignedIn = action.payload;
// 		},

// 		updateVezraUser: (state, action: PayloadAction<Partial<VezraUser>>) => {
// 			state.user = { ...state.user, ...action.payload };
// 		},
// 	},
// });

// export const authReducer = authSlice.reducer;
// export const { updateUserIsLoaded, updateUserIsSignedIn, updateVezraUser } = authSlice.actions;
