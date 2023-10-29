import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	days: [],
	isLoading: false,
	error: null,
};

//GET di tutti i days
export const getDaysFromApi = createAsyncThunk("/days/getAllDays", async () => {
	try {
		const responce = await fetch(
			`${process.env.REACT_APP_SERVER_BASE_URL}/day`
		);
		return await responce.json();
	} catch (er) {
		console.log(er);
	}
});

const daysSlice = createSlice({
	name: "getDays",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getDaysFromApi.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getDaysFromApi.fulfilled, (state, action) => {
				state.isLoading = false;
				state.days = action.payload;
			})
			.addCase(getDaysFromApi.rejected, (state) => {
				state.isLoading = false;
				state.error = "error while receiving data from the server";
			});
	},
});

export const allDays = (state) => state.daysStore.days;
export const isDaysLoading = (state) => state.daysStore.isLoading;
export const daysError = (state) => state.daysStore.error;

export default daysSlice.reducer;
