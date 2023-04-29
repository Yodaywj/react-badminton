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

export {editUser,register};