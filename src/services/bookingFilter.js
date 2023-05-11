import axios from "axios";
import {ROOT_URL} from "../utils/constant";

const bookingFilter = async (values)=>{
    let newStadiums = {};
    let message;
    let result;

    const {stadiumName,courtNumber,province,city,stadiumId} = values;
    await axios.get(`${ROOT_URL}/booking/filter?
    stadiumName=${stadiumName}&courtNumber=${courtNumber}&province=${province}&city=${city}&stadiumId=${stadiumId}`)
        .then(
        response=>{
            newStadiums = response.data.stadiums;
            message = response.data.message;
            result = response.data.result;
        }
    ).catch(error => {
        message = error.message;
        result = false;
    })
    return {newStadiums,message,result};
}
export default bookingFilter;