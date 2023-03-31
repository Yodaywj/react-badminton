import {CaretLeftOutlined, IdcardOutlined, MailOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {change} from "../../../redux/userNavSlice";
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
    const userNav = useSelector(state => state.userNav.value)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(
        ()=>{
            navigate(userNav)
        },[userNav]
    )
    const onClick = (e) => {
        dispatch(change(e.key));
    };
    return (
        <>
            <Menu onClick={onClick} selectedKeys={[userNav]} mode="horizontal" items={items}  style={{borderRadius:'15px',background:'#f5f5f5'}}/>
        </>
    );
};
export default NavUser;