import {Avatar, Dropdown} from "antd";
import {UserOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {logoutService} from "../services/logoutService";
import {ROOT_URL} from "../utils/constant";


export const UserDropdown = ({user})=> {
    let items = [{}];
    const [login, setLogin] = useState(user.username === '未登录');
    const [usernameInfo, setUsernameInfo] = useState(user.username)
    const handleLogin = () => {
        logoutService(`${ROOT_URL}/user/logout`);
        setLogin(true);
        setUsernameInfo("未登录")
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
            </div>
        </Dropdown>
    )
}