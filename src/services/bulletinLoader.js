import {ROOT_URL} from "../utils/constant";
import axios from "axios";

export async function loader() {
    const url = `${ROOT_URL}/bulletin-board/show`
    let data;
    let count;
    let view;
    await axios.get(url,{withCredentials:true}).then(response => {
        data = response.data.bulletin;
        count = response.data.count;
        view = response.data.view;
    }).catch(error => {

    })
    return {data,count,view}
}
