import axios from "axios";
import {ROOT_URL} from "../utils/constant";

const setNewCourt = async (court)=>{
    let message;
    let result;
    let countdown = false;
    await axios.patch(`${ROOT_URL}/courts/setNewCourt`,court).then(response=>{
        message = response.data.message;
        result = response.data.result;
        countdown = response.data.countdown
    }).catch(error=>{
        result = false;
        message = error.message;
    })
    return {result,message,countdown}
}
export default setNewCourt;