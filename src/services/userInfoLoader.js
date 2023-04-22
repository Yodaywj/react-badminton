import {ROOT_URL} from "../utils/constant";
import axios from "axios";

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
export {editUser};