import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../utils/API";

export const fetchOptions = createAsyncThunk(
    "root/fetchOptions",
    async (userId, { signal }) => {
        const source = API.CancelToken.source();
        signal.addEventListener("abort", () => {
            source.cancel();
        });
        const response = await API.get(`/options`, {
            cancelToken: source.token
        });
        return response.data;
    }
);

export const rootSlice = createSlice({
    name: "root",
    initialState: {
        options: {
            initialized: false,
            data: {}
        }
    },
    reducers: {},
    extraReducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        [fetchOptions.fulfilled]: (state, action) => {
            state.options.initialized = true;
            state.options.data = action.payload.data;
        }
    }
});

// Action creators are generated for each case reducer function
export const {} = rootSlice.actions;

export default rootSlice.reducer;
