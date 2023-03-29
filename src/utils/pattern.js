
export const validateUsername = (username)=>{
    const regex = /^[a-zA-Z]\w{7,14}$/;
    return regex.test(username);
}