import axios from "axios";
import {ROOT_URL} from "../utils/constant";

const instance = axios.create({
    baseURL: ROOT_URL,
})

export default instance