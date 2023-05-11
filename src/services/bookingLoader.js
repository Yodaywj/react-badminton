import {ROOT_URL} from "../utils/constant";
import {loader as session} from "./session"
import axios from "axios";
const loader = async ()=>{
    let user = {};
    let data;
    let sum;
    let bookmarks;
    await session(`${ROOT_URL}/user/session`).then(response=>{
        user = response.user
    })
    await axios.get(`${ROOT_URL}/booking/enquiry?page=1&size=5`).then(response => {
        data = response.data.stadiums;
        sum = response.data.sum;
    })
    const {username} = user;
    await axios.get(`${ROOT_URL}/bookmark/getBookmarks/${username}`).then(response => {
        bookmarks = response.data.bookmarks;
    })
    return {user,data,sum,bookmarks}
}
const bookCourt = async (values)=>{
    let message;
    let result;
    await axios.post(`${ROOT_URL}/booking/bookCourt`,values).then(response=>{
        message = response.data.message;
        result = response.data.result;
        }
    ).catch(error=>{
        result = false;
        message = error.message;
    })
    return {message, result}
}
const myBookingLoader = async ()=>{
    let bookingMessage = '';
    let result;
    let myBooking = [];
    await axios.get(`${ROOT_URL}/booking/myBooking`,{withCredentials:true}).then(response=>{
        result = true;
        myBooking = response.data.myBooking;
    }).catch(error=>{
        bookingMessage = error.message;
        result = false;
    })
    return {bookingMessage,result,myBooking}
}
const deleteBooking = async (id)=>{
    let result = false;
    let info;
    await axios.delete(`${ROOT_URL}/booking/deleteBooking/${id}`).then(response=>{
        if (response.data.result){
            result = true;
            info = response.data.message;
        }else info = '响应出错';
    }).catch(error=>{
        info = error.message
    })
    return{result,info}
}
const bookingManage = async (stadiumId)=>{
    let bookings = [];
    await axios.get(`${ROOT_URL}/booking/bookingManage/${stadiumId}`).then(response=>{
        bookings = response.data.bookings;
    })
    return {bookings}
}
const setBooking = async (id,courtId,state)=>{
    let result = false;
    let resultMessage;
    await axios.patch(`${ROOT_URL}/booking/setBooking/?id=${id}&courtId=${courtId}&state=${state}`).then(response=>{
        result = response.data.result;
        resultMessage = response.data.message;
    }).catch(error=>{
        resultMessage = error.message;
    })
    return {result,resultMessage}
}
const hideBooking = async (id)=>{
    let result = false;
    let info;
    await axios.patch(`${ROOT_URL}/booking/hideBooking/${id}`).then(response=>{
        if (response.data.result){
            result = true;
            info = response.data.message;
        }else info = '响应出错';
    }).catch(error=>{
        info = error.message
    })
    return{result,info}
}
const bookingsForCourt = async (stadiumId,id)=>{
    let bookings = [];
    await axios.get(`${ROOT_URL}/booking/bookingsForCourt/?stadiumId=${stadiumId}&courtId=${id}`).then(response=>{
        bookings = response.data.bookings;
    })
    return {bookings};
}
export {loader, bookCourt, myBookingLoader,deleteBooking,bookingManage,setBooking,hideBooking,bookingsForCourt};