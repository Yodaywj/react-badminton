import {Avatar, Dropdown, message} from "antd";
import {UserOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ROOT_URL} from "../utils/constant";
import axios from "axios";
import {useDispatch} from "react-redux";
import {logout} from "../redux/userInfoSlice";


export const UserDropdown = ({user})=> {
    let items = [{}];
    const [messageApi, contextHolder] = message.useMessage();
    const Navigate = useNavigate();
    const [login, setLogin] = useState(!user.username);
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const url = `${ROOT_URL}/user/logout`
        let message;
        let result;
        await axios.delete(url,{withCredentials:true})
            .then(response => {
                message = response.data.message;
                result = response.data.result;
            })
            .catch(error => {
                result = false;
                message = error.message;
            });
        messageApi.open({
            type:result? 'success':'error',
            content: message,
        })
        setLogin(true);
        dispatch(logout);
       setTimeout(()=>{ Navigate('/')},1000)

    }
    if (login){
        items = [
            {
                key: '1',
                label: (
                    <Link to={`/user/login`}>
                        登录
                    </Link>
                ),
            },
            {
                key: '2',
                label: (
                    <Link to={`/user/register`}>
                        注册
                    </Link>
                ),
            },
        ];
    }else {
        items = [
            {
                key: '1',
                label: `用户: ${user.username}`,
            },
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