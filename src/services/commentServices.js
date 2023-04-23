import {ROOT_URL} from "../utils/constant";
import axios from "axios";
import {loader as session} from "./session";

const showComment = async ()=>{
    let comments = [];
    await axios.get(`${ROOT_URL}/comment/showComment`).then(response=>{
        comments = response.data.comments;
    })
    return {comments};
}
const send = async (comment)=>{
    let result = false;
    let message;
    let id = 0;
    await axios.post(`${ROOT_URL}/comment/send`,comment).then(response=>{
        message = response.data.message;
        result = response.data.result;
        id = response.data.id;
    }).catch(error=>{
        message = error.message;
    })
    return {message,result,id}
}
const deleteComment = async (comment)=>{
    let result = false;
    let message;
    await axios.delete(`${ROOT_URL}/comment/delete`,{data:{comment}}).then(response=>{
        message = response.data.message;
        result = response.data.result;
    }).catch(error=>{
        message = error.message;
    })
    return {message,result};
}
const loader = async ()=>{
    let user = {};
    let comments = [];

    await session(`${ROOT_URL}/user/session`).then(response=>{
        user = response.user
    })
    await showComment().then(response=>{
        comments = response.comments;
    })
    return {user,comments};
}

export {loader,showComment,send,deleteComment}