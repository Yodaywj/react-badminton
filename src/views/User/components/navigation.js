import {AppstoreOutlined, CaretLeftOutlined, IdcardOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import {useEffect, useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
const items = [
    {
        label: '登录',
        key: '/user/login',
        icon: <MailOutlined />,
    },
    {
        label: '注册',
        key: '/user/register',
        icon: <IdcardOutlined />,
    },
    {
        label: '返回',
        key: '/',
        icon: <CaretLeftOutlined />,

    },
];
const NavUser = () => {
    const [current, setCurrent] = useState('/user/login');
    const navigate = useNavigate();
    useEffect(
        ()=>{
            navigate(current)
        },[current]
    )
    const onClick = (e) => {
        setCurrent(e.key);
    };
    return (
        <>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}  style={{borderRadius:'15px'}}/>
        </>
    );
};
export default NavUser;