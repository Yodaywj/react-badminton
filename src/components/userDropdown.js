import {Avatar, Button, Dropdown, message} from "antd";
import {UserOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {ROOT_URL} from "../utils/constant";
import axios from "axios";
import {useDispatch} from "react-redux";
import {logout} from "../redux/userInfoSlice";
import ResetButton from "./resetButton";


export const UserDropdown = ({user}) => {
    let items = [{}];
    const [messageApi, contextHolder] = message.useMessage();
    const Navigate = useNavigate();
    const [login, setLogin] = useState(!user.username);
    const dispatch = useDispatch();
    const [success, setSuccess] = useState(false)
    useEffect(() => {
        if (success){
            setSuccess(false)
            Navigate('/manage/userInfo');
        }
    }, [success]);

    const handleLogin = async () => {
        const url = `${ROOT_URL}/user/logout`
        let message;
        let result;
        await axios.delete(url, {withCredentials: true})
            .then(response => {
                message = response.data.message;
                result = response.data.result;
                localStorage.removeItem("user");
            })
            .catch(error => {
                result = false;
                message = error.message;
            });
        messageApi.open({
            type: result ? 'success' : 'error',
            content: message,
        })
        setLogin(true);
        dispatch(logout);
        setTimeout(() => {
            Navigate('/')
        }, 1000)

    }
    if (login) {
        items = [
            {
                key: '1',
                label: (
                    <>
                        <ResetButton setSuccess={setSuccess} isButton={true} button={<Button style={{color:'black'}} type={"link"}>登录</Button>} text={"快速登录"}/>
                    </>
                ),
            },
            {
                key: '2',
                label: (
                    <Link to={`/user/register`}>
                        <Button style={{color:'black'}} type={"link"}>注册</Button>
                    </Link>
                ),
            },
        ];
    } else {
        items = [
            // {
            //     key: '1',
            //     label: `用户: ${user.username}`,
            // },
            {
                key: '2',
                label: `昵称: ${user.nickname}`,
            },
            {
                key: '3',
                label: <Link to={`/manage/userInfo`}>个人中心</Link>
            },
            {
                key: '4',
                label: '退出登录',
                onClick: handleLogin,
            },
        ];
    }
    return (
        <Dropdown
            menu={{
                items
            }}
            placement="bottom"
        >
            <div className={`badge-1 relative`}>
                <Avatar size={35} className={`Avatar-user all-center`} icon={<UserOutlined/>}/>
                {contextHolder}
            </div>
        </Dropdown>
    )
}