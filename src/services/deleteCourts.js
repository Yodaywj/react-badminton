import axios from "axios";
import {ROOT_URL} from "../utils/constant";

const deleteCourts = async (id)=> {
    await axios.delete(`${ROOT_URL}/courts/deleteAll/${id}`)
}

export default deleteCourts;