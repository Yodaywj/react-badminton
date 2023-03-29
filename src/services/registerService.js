import axios from 'axios';

const registerService = (url,data,message)=> {
    axios.post(url, data)
        .then(response => {
            console.log(response.data);
            console.log(response)
        })
        .catch(error => {
            console.log(error);
            message = error;
        });
}

export default registerService;