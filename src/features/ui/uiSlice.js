import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    counter : null,
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setCounter: (state, action) => {
            state.counter = action.payload;
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;