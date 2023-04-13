import {ROOT_URL} from "../utils/constant";
import {loader as session} from "./session"
import axios from "axios";
const loader = async ()=>{
    let user = {};
    let data;
    await session(`${ROOT_URL}/user/session`).then(response=>{
        user = response.user
    })
    await axios.get(`${ROOT_URL}/stadium/show`,{withCredentials:true}).then(response => {
        data = response.data.stadiums
    })
    return {user,data}
}

export {loader};