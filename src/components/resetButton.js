import {quickLogin, resetPassword, validateCaptcha} from "../services/userInfoLoader";
import {Button, message} from "antd";
import React, {useState} from "react";
import Reset from "./reset";

const ResetButton = ({text,user,style,setSuccess})=>{
    const [open, setOpen] = useState(false);
    const onCreate = async (values) => {
        let state = false;
        let type = text === '快速登录'?'login':'reset'
        await validateCaptcha(values.email,type,values.captcha).then(response=>{
            state = response.data.state;
        })
        if (state){
            if (text==='快速登录'){
                await quickLogin(values.email).then(response=>{
                    if (response.data.result){
                        message.success("登录成功")
                        setTimeout(()=>{setSuccess(true)},1000);
                    }else message.error("登录失败")
                }
                ).catch(error=>{
                    console.log(error)
                    message.error("登录失败")
                })
            }else {
                resetPassword(values.email,values.password).then();
                message.success("重置成功")
            }
            setOpen(false);
        }else message.error("验证码错误")
    };
    return(<>
        <Reset
            text={text}
            user={user}
            open={open}
            onCreate={onCreate}
            onCancel={() => {
                setOpen(false);
            }}
        />
        <Button style={style} size={"middle"} type={text === "重置密码"?"default":"link"} onClick={()=>setOpen(true)}>
            {text}
        </Button>
    </>)
}
export default ResetButton;