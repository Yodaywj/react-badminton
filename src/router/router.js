import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../views/ErrorPage";
import Home from "../views/Home";
import Register from "../views/User/Register";
import Test from "../views/Test";
import User from "../views/User";
import Success from "../views/User/components/success";
import Login from "../views/User/Login";
import {loader as homeLoader} from "../services/session";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
        loader: homeLoader,
    },
    {
        path: "/user",
        element: <User/>,
        children:[
            {
                index:false,
                element:<User/>,
            },
            {
                path:"register",
                element: <Register/>,
            },
            {
                path:"success",
                element: <Success/>,
                errorElement: <ErrorPage/>,
            },
            {
                path:"login",
                element: <Login/>,
            },
        ],
    },
    {
        path:"/test",
        element:<Test/>
    },
]);

export default router;