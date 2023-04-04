import {ROOT_URL} from "../utils/constant";
import axios from "axios";

export async function loader() {
    const url = `${ROOT_URL}/bulletin-board/show`
    let data;
    await axios.get(url,{withCredentials:true}).then(response => {
        console.log(response);
        data = response.data.bulletin;
    }).catch(error => {
        console.log(error)
    })
    return {data}
}
