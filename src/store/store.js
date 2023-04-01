import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "../redux/counterSlice";
import userNavReducer from "../redux/userNavSlice";
import userInfoReducer from "../redux/userInfoSlice";
export default configureStore({
    reducer: {
        counter: counterReducer,
        userNav: userNavReducer,
        userInfo: userInfoReducer,
    },
})