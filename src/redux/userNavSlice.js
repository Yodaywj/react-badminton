import { createSlice } from '@reduxjs/toolkit'

export const userNavSlice = createSlice({
    name: 'userNav',
    initialState: {
        value: '/user/login',
    },
    reducers: {
        login: (state) => {
            state.value = '/user/login'
        },
        register: (state) => {
            state.value = '/user/register'
        },
        change: (state , action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { login, change, register} = userNavSlice.actions
export default userNavSlice.reducer