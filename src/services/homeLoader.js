import axios from "axios";
import {ROOT_URL} from "../utils/constant";

export async function loader() {
    const urlSession = `${ROOT_URL}/user/session`;
    const urlBulletin = `${ROOT_URL}/bulletin-board/show`;
    let user = null;
    let bulletins = [];

    await axios.get(urlBulletin,{withCredentials:true}).then(response => {
        bulletins = response.data.bulletin;
    }).catch(() => {

    })

    await axios.get(urlSession,{withCredentials:true}).then(response => {
        if (response.data.result){
            user = response.data.user;
        }else {
            user = {username: '未登录'}
        }
    }).catch(() => {
        user = {username: '未登录'}
    })
    return {user, bulletins};
}