import axios from "axios";
import {ROOT_URL} from "../utils/constant";

export async function loader() {
    const url = `${ROOT_URL}/stadium/show`;
    let data = [];

    await axios.get(url,{withCredentials:true}).then(response => {
        data = response.data.stadiums
    }).catch(() => {
    })

    return {data};
}