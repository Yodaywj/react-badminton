import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../views/ErrorPage";
import Home from "../views/Home";
import Register from "../views/User/Register";
import Test from "../views/Test";
import User from "../views/User";
import Success from "../views/User/components/success";
import Login from "../views/User/Login";
import {loader as userDataLoader} from "../services/session";
import {loader as bulletinDataLoader} from "../services/bulletinLoader";
import BulletinBoard from "../views/Manage/BulletinBoard";
import Manage from "../views/Manage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
        loader: userDataLoader,
    },
    {
        path: "/user",
        element: <User/>,
        loader: userDataLoader,
        children:[
            {
                path:"register",
                element: <Register/>,
            },
            {
                path:"success",
                element: <Success/>,
            },
            {
                path:"login",
                element: <Login/>,
            },
        ],
    },
    {
        path: "/manage",
        element: <Manage />,
        loader: userDataLoader,
        children:[
            {
                path:"bulletin-board",
                element: <BulletinBoard/>,
                loader: bulletinDataLoader,
            },
        ],
    },
    {
        path:"/test",
        element:<Test/>
    },
]);

export default router;