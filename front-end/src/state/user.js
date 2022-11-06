import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
	name: "user",
	initialState: {
		name: "Guest",
		profile: {},
		isAuthenticated: false,
		isUncle: false,
	},
	reducers: {
		setUser: (state, action) => {
			state.isAuthenticated = true;
			// state.name = action.payload.name;
			// state.profile = { ...action.payload.profile };
			//   state.isUncle = action.payload.profile.is_admin;
		},
		clearUser: (state, action) => {
			state.name = "Guest";
			state.isAuthenticated = false;
			localStorage.clear();
		},
	},
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
