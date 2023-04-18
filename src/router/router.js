import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../views/ErrorPage";
import Home from "../views/Home";
import Register from "../views/User/Register";
import User from "../views/User";
import Success from "../views/User/components/success";
import Login from "../views/User/Login";
import {loader as userDataLoader} from "../services/session";
import {loader as bulletinDataLoader} from "../services/bulletinLoader";
import {loader as homeLoader} from "../services/homeLoader"
import {loader as stadiumLoader} from "../services/stadiumLoader"
import {loader as stadiumDetailLoader} from "../services/stadiumDetailLoader"
import {loader as bookingLoader} from "../services/bookingLoader"
import BulletinBoard from "../views/Manage/BulletinBoard";
import Manage from "../views/Manage";
import Stadium from "../views/Manage/Stadium";
import {MyFooter} from "../layout/footer";
import StadiumDetail from "../views/Manage/stadiumDetail";
import Booking from "../views/booking";
import MyBooking from "../views/Manage/MyBooking";
import {myBookingLoader} from "../services/bookingLoader"


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
        loader: userDataLoader,
        errorElement:<ErrorPage/>,
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
        errorElement:<ErrorPage/>,
        children:[
            {
                path:"bulletin-board",
                element: <BulletinBoard/>,
                loader: bulletinDataLoader,
            },
            {
                path:"myBooking",
                element: <MyBooking/>,
                loader: myBookingLoader,
            },
            {
                path:"stadium",
                element: <Stadium/>,
                loader: stadiumLoader,
            },
            {
                path:"stadium/:stadiumId",
                element: <StadiumDetail/>,
                loader: stadiumDetailLoader,
            },
        ],
    },
    {
        path:"booking",
        element:<Booking/>,
        errorElement:<ErrorPage/>,
        loader: bookingLoader,
    },
    {
        path:"/test",
        errorElement:<ErrorPage/>,
        element:<MyFooter/>
    },
],{basename:"/"});

export default router;