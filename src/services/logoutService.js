import axios from "axios";

export const logoutService = (url) => {
    axios.delete(url,{withCredentials:true})
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.error(error);
        });
};