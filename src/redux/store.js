import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api's/userApi";
import { authApi } from "./api's/authApi";
import authSlice from "./slices/authSlice";
import { urlApi } from "./api's/urlApi";
import { adminApi } from "./api's/adminApi";


const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [urlApi.reducerPath]: urlApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        auth: authSlice

    },
    middleware: def => [...def(), userApi.middleware, authApi.middleware, urlApi.middleware, adminApi.middleware]
})

export default reduxStore