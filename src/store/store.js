import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "../redux/counterSlice";
import userNavReducer from "../redux/userNavSlice";
export default configureStore({
    reducer: {
        counter: counterReducer,
        userNav: userNavReducer,
    },
})