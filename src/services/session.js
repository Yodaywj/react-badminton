import axios from "axios";
import {ROOT_URL} from "../utils/constant";

export async function loader() {
    const url = `${ROOT_URL}/user/session`;
    let user = null;

    await axios.get(url,{withCredentials:true}).then(response => {
        if (response.data.result){
            user = response.data.user;
        }else {
            user = {username: false}
        }
    }).catch(() => {
        user = {username: false}
    })
    return {user};
}