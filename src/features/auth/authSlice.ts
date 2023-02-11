import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface TokenState {
    token: string | null
}

const initialState: TokenState = {
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ token: string }>) => {
            const { token } = action.payload
            state.token = token
        },
        logout: (state, action: PayloadAction<{ token: string }>) => {
            state.token = null
        }
    }
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer

export const selectCurrentToken = (state: RootState) => state.auth.token