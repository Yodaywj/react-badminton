import instance from "./index";
import axios from "axios";
import {ROOT_URL} from "../utils/constant";

const addBookmark = (username,stadiumId)=>{
    instance.post(`/bookmark/addBookmark/?username=${username}&stadiumId=${stadiumId}`).then()
}
const deleteBookmark = (username,stadiumId)=>{
    instance.delete(`/bookmark/deleteBookmark/?username=${username}&stadiumId=${stadiumId}`).then()
}
const loader = async ({params})=>{
    let stadiums = [];
    let user = {};
    await axios.get( `${ROOT_URL}/user/session`,{withCredentials:true}).then(response => {
        if (response.data.result){
            user = response.data.user;
        }else {
            user = {username: false}
        }
    }).catch(() => {
        user = {username: false}
    })
    if (user.username){
        await instance.get(`/bookmark/getMarkedStadiums/${user.username}`).then(response=>{
            stadiums = response.data.stadiums;
        })
    }
    return {stadiums,user};
}

export {addBookmark,deleteBookmark,loader}