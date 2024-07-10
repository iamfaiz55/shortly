import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl:
         `${import.meta.env.VITE_BACKEND_URL}/api/admin`,
        //  `http://local:5000/api/admin`,
          credentials: "include" }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {
            getAdminUsers: builder.query({
                query: () => {
                    return {
                        url: "/get-users",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                // transformErrorResponse: (err, { response }) => {
                //     if (response.status === 401) {
                //         return 401
                //     }
                //     return err
                // },
                providesTags: ["admin"]
            }),
            getAdminUserUrls: builder.query({
                query: id => {
                    return {
                        url: `/user/url/${id}`,
                        method: "GET",
                    }
                },
                transformResponse: data => data.result,
                invalidatesTags: ["admin"]
            }),
            updateAdminUser: builder.mutation({
                query: userData => {
                    return {
                        url: `/update-user/${userData._id}`,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["admin"],
                // transformErrorResponse: err => err.data.message
            }),

        }
    }
})

export const {

    useGetAdminUsersQuery,
    useUpdateAdminUserMutation,
    useLazyGetAdminUserUrlsQuery
} = adminApi
