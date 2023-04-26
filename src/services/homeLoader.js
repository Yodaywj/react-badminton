import axios from "axios";
import {ROOT_URL} from "../utils/constant";
import instance from "./index";

export async function loader() {
    const urlSession = `${ROOT_URL}/user/session`;
    const urlBulletin = `${ROOT_URL}/bulletin-board/show`;
    let user = null;
    let bulletins = [];

    await axios.get(urlBulletin,{withCredentials:true}).then(response => {
        bulletins = response.data.bulletin;
    }).catch(() => {

    })

    await instance.get("/user/session",{withCredentials:true}).then(response => {
        console.log(response)
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