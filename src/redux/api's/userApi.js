import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/user`,
        // baseUrl: `http://localhost:5000/api/user`,
        credentials: "include"
    }),
    tagTypes: ["url"],
    endpoints: (builder) => {
        return {
            getUrl: builder.query({
                query: id => {
                    return {
                        url: `/url/${id}`,
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                // transformErrorResponse: (err, { response, request }) => {
                //     if (response.status === 401) {
                //         localStorage.removeItem("auth")
                //     }
                //     return 401
                // },
                providesTags: ["url"]
            }),
            addUrl: builder.mutation({
                query: urlData => {
                    return {
                        url: "/url-create",
                        method: "POST",
                        body: urlData
                    }
                },
                invalidatesTags: ["url"],
                transformErrorResponse: err => err.data.message,
            }),
            updateUrl: builder.mutation({
                query: urlData => {
                    return {
                        url: `/url-update/${urlData._id}`,
                        method: "PUT",
                        body: urlData
                    }
                },
                invalidatesTags: ["url"]
            }),
            deleteUrl: builder.mutation({
                query: id => {
                    return {
                        url: `/url-remove/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["url"]
            }),

        }
    }
})

export const {
    useAddUrlMutation,
    useGetUrlQuery,
    useDeleteUrlMutation,
    useUpdateUrlMutation

} = userApi
