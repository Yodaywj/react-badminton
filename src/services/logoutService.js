import axios from "axios";

export const logoutService = async (url) => {
    await axios.delete(url,{withCredentials:true})
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.error(error);
        });
};