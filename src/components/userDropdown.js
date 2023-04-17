import {Avatar, Dropdown, message} from "antd";
import {UserOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {ROOT_URL} from "../utils/constant";
import axios from "axios";


export const UserDropdown = ({user})=> {
    let items = [{}];
    const [messageApi, contextHolder] = message.useMessage();
    const [login, setLogin] = useState(user.username === '未登录');

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
        if (user.privilege === 'root'){
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
                    label: <Link to={`/manage/bulletin-board`}>公告板</Link>
                },
                {
                    key: '4',
                    label: <Link to={`/`}>退出登录</Link>,
                    onClick: handleLogin,
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
                    label: <Link to={`/manage`}>场馆管理</Link>
                },
                {
                    key: '4',
                    label: <Link to={`/`}>退出登录</Link>,
                    onClick: handleLogin,
                },
            ];
        }
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