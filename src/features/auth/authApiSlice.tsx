import { apiSlice } from '../../app/services/auth'
import { logout } from './authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendLogout: build.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {

                }
            }
        })
    })
})