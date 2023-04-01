import { createSlice } from '@reduxjs/toolkit'

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        userInfo: {
            username:'',
            nickname:'',
            mail:'',
            phone:'',
            privilege:'',
            gender:'',
            password:'',
        },
    },
    reducers: {
        login: (state , action) => {
            state.userInfo = action.payload;
        },
        logout: (state) => {
            state.userInfo = {username:'',
                nickname:'',
                mail:'',
                phone:'',
                privilege:'',
                gender:'',
                password:'',}
        },
    },
})

// Action creators are generated for each case reducer function
export const { logout, login} = userInfoSlice.actions
export default userInfoSlice.reducer