import {resetPassword, validateCaptcha} from "../services/userInfoLoader";
import {Button, message} from "antd";
import React, {useState} from "react";
import Reset from "./reset";

const ResetButton = ({text,user})=>{
    const [open, setOpen] = useState(false);
    const onCreate = async (values) => {
        let state = false;
        await validateCaptcha(values.email,"reset",values.captcha).then(response=>{
            state = response.data.state;
        })
        if (state){
            resetPassword(values.email,values.password).then();
            setOpen(false);
            message.success("重置成功")
        }else message.error("验证码错误")
    };
    return(<>
        <Reset
            user={user}
            open={open}
            onCreate={onCreate}
            onCancel={() => {
                setOpen(false);
            }}
        />
        <Button size={"middle"} type={text === "重置密码"?"default":"link"} onClick={()=>setOpen(true)}>
            {text}
        </Button>
    </>)
}
export default ResetButton;