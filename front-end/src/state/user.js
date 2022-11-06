import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
	name: "user",
	initialState: {
		profile: {
			display_name:"Guest"
		},
		isAuthenticated: false,
		isVerified: false,
		isUncle: false,
	},
	reducers: {
		setUser: (state, action) => {
			state.isAuthenticated = true;
			state.isVerified = action.payload.sms_verified;
			state.profile = { ...action.payload };
			state.isUncle = action.payload.is_uncle;
		},
		verifyUser: (state, action) => {
			state.isVerified = true;
		},
		clearUser: (state, action) => {
			state.isAuthenticated = false;
			state.isVerified = false;
			state.isUncle = false;
			localStorage.clear();
		},
	},
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser,verifyUser } = userSlice.actions;

export default userSlice.reducer;
