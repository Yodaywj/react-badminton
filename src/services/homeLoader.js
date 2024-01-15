import axios from "axios";
import {ROOT_URL} from "../utils/constant";

export async function loader() {
    const urlSession = `${ROOT_URL}/user/session`;
    const urlBulletin = `${ROOT_URL}/bulletin-board/show`;
    let user = null;
    let bulletins = [];
    const jwt = localStorage.getItem("user");

    await axios.get(urlBulletin,{withCredentials:true}).then(response => {
        bulletins = response.data.bulletin;
    }).catch(() => {

    })

    await axios.get(urlSession,{withCredentials:true,params:{jwt:jwt?jwt:"null"}}).then(response => {
        if (response.data.result){
            user = response.data.user;
        }else {
            user = {username: false}
        }
    }).catch(() => {
        user = {username: false}
    })
    return {user, bulletins};
}