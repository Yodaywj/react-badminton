import axios from 'axios';

export const registerService = (url,data) => {
    return axios.get(url,data)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
            return null;
        });
};