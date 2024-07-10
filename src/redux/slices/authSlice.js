import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api's/authApi";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        user: JSON.parse(localStorage.getItem("auth"))
    },
    reducers: {},
    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.user = payload
        })
        .addMatcher(authApi.endpoints.logout.matchFulfilled, (state, { payload }) => {
            state.user = null
        })
})

export default authSlice.reducer