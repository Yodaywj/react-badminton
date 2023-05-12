import {ROOT_URL} from "../utils/constant";
import axios from "axios";
import request from "./index";

const editUser = async (user)=>{
    let result = false;
    let message = '';
    let newUser = {};
    await axios.patch(`${ROOT_URL}/user/editUser`,user,{withCredentials:true}).then(response=>{
        result = response.data.result;
        message = response.data.message;
        newUser = response.data.user;
    }).catch(error=>{
        message = error.message;
    })
    return {result,message,newUser};
}
const register = (newUser)=>{
    return request.post(`${ROOT_URL}/user/register`,newUser)
}
const getCaptcha = (mail,type)=>{
    return request.get(`/user/getCaptcha/?mail=${mail}&type=${type}`)
}
const validateCaptcha = async (mail,type,code)=>{
    return await request.get(`/user/validateCaptcha/?mail=${mail}&type=${type}&code=${code}`)
}
const resetPassword = (mail,password)=>{
    return request.patch(`/user/resetPassword/?mail=${mail}&password=${password}`)
}
export {editUser,register,getCaptcha,validateCaptcha,resetPassword};