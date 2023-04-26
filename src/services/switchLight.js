import axios from "axios";
import {ROOT_URL} from "../utils/constant";

const switchLight = async (stadiumId,id,light,courtNumber)=> {
    let message;
    let result;
    await axios.patch(`${ROOT_URL}/courts/switchLight`,{stadiumId,id,light,courtNumber}).then(response=>{
        result = response.data.result;
        message = response.data.message;
    }).catch(error => {
        result = false;
        message = error.message;
    })
    return {message,result};
}

export default switchLight;