import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const urlApi = createApi({
    reducerPath: "urlApi",
    baseQuery: fetchBaseQuery({ baseUrl:
        //  `${import.meta.env.VITE_BACKEND_URL}/api/url`,
         `http://localhost:5000/api/url`,
          credentials: "include"
         }),
    tagTypes: ["url"],
    endpoints: (builder) => {
        return {
            getPubllicUrl: builder.query({
                query: id => {
                    return {
                        url: `/${id}`,
                        method: "GET",

                    }
                },
                transformResponse: data => data.result
            }),

        }
    }
})

export const { useGetPubllicUrlQuery } = urlApi
