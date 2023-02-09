import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000'
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body: { email: string, password: string }) => ({
                url: '/api/auth/login',
                method: 'POST',
                body
            })
        }),
    }) 
})

export const { useLoginUserMutation } = authApi