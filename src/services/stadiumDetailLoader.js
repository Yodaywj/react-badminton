import axios from "axios";
import {ROOT_URL} from "../utils/constant";

export async function loader({params}) {
    const url = `${ROOT_URL}/member/show/${params.stadiumId}`;
    const {stadiumId,courtNumber} = params;
    const id = stadiumId;
    let members = [];
    let courts = [];
    let stadiumName = ''

    await axios.get(url).then(response => {
        members = response.data.members
    })
    await axios.get(`${ROOT_URL}/courts/getAll/${id}/${courtNumber}`).then(response=>{
        courts = response.data.courts;
    })
    await axios.get(`${ROOT_URL}/stadium/getName/${params.stadiumId}`).then(response=>{
        stadiumName = response.data.stadiumName;
    })
    return {members,stadiumId,courts,stadiumName};
}
const getStadium = async (stadiumId)=>{
    let stadium = {};
    let message='';
    let result;
    await axios.get(`${ROOT_URL}/stadium/getStadium/${stadiumId}`).then(response=>{
        stadium = response.data.stadium;
        result = response.data.result;
        message = response.data.message;
    })
    return {stadium,message,result}
}
export {getStadium}