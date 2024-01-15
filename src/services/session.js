import axios from "axios";
import {ROOT_URL} from "../utils/constant";

export async function loader() {
    const url = `${ROOT_URL}/user/session`;
    let user = null;
    let avatar = null;
    const jwt = localStorage.getItem("user");

    await axios.get(url,{
        withCredentials:true,
        params:{jwt:jwt?jwt:"null"}
    }).then(response => {
        if (response.data.result){
            user = response.data.user;
            avatar = response.data.avatar;
        }else {
            user = {username: false}
        }
    }).catch(() => {
        user = {username: false}
    })
    return {user,avatar};
}