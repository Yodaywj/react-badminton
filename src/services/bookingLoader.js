import {ROOT_URL} from "../utils/constant";
import {loader as session} from "./session"
import axios from "axios";
const loader = async ()=>{
    let user = {};
    let data;
    let sum;
    await session(`${ROOT_URL}/user/session`).then(response=>{
        user = response.user
    })
    await axios.get(`${ROOT_URL}/booking/enquiry?page=1&size=5`).then(response => {
        data = response.data.stadiums;
        sum = response.data.sum;
    })
    return {user,data,sum}
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
    let message = '';
    let result;
    let myBooking = [];
    await axios.get(`${ROOT_URL}/booking/myBooking`,{withCredentials:true}).then(response=>{
        result = true;
        myBooking = response.data.myBooking;
    }).catch(error=>{
        message = error.message;
        result = false;
    })
    return {message,result,myBooking}
}
export {loader, bookCourt, myBookingLoader};