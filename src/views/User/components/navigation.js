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
];
const NavUser = () => {
    const [current, setCurrent] = useState()
    const navigate = useNavigate();
    const useNav = useSelector(state => state.userNav.value)
    const dispatch = useDispatch()
    useEffect(
        ()=>{
            navigate(current)
        },[current]
    )
    useEffect(() => {
        if (useNav === '/user/login'){
            setCurrent(useNav);
            dispatch(change('/user'))
        }
    }, [useNav]);

    const onClick = (e) => {
        setCurrent(e.key);
    };
    return (
        <>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}  style={{borderRadius:'15px',background:'#f5f5f5'}}/>
        </>
    );
};
export default NavUser;