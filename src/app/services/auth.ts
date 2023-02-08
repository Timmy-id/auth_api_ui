import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { 
    BaseQueryFn, 
    FetchArgs,
    FetchBaseQueryError
} from '@reduxjs/toolkit/query'
import { setCredentials } from '../../features/auth/authSlice'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token

        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error && result?.error?.status === 403) {
        console.log('Sending refresh tokens')

        // Access the refresh route to get new access tokens
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if (refreshResult?.data) {
            // store the new access tokens
            api.dispatch(setCredentials({ ...refreshResult.data }))

            // Retry the initial query
            result = await baseQuery(args, api, extraOptions)
        } else {
            // if (refreshResult?.error?.status === 403) {
            //     refreshResult.error.data.message = 'Your session has expired'
            // }
            return refreshResult
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['User'],
    endpoints: builder => ({})
})