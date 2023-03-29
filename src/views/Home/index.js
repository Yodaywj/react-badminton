import React, {useState} from 'react';
import {Button, Layout, Menu} from 'antd';
import '../../styles/layout.css'
import {MyHeader} from "../../layout/header";
import {MyFooter} from "../../layout/footer";
import {CaretDownOutlined} from "@ant-design/icons";
import {Link, useLoaderData} from "react-router-dom";
import Login from "../User/Login";
import {logoutService} from "../../services/logoutService";
import {ROOT_URL} from "../../utils/constant";

const {Content} = Layout;

const Home = () => {
    const {user} = useLoaderData();
    const logOut = user.username !== '未登录'
    const handleLogout = ()=> {
        logoutService(`${ROOT_URL}/user/logout`)
    }

    return (
        <Layout className={`v-100`}>
            <MyHeader/>
            <Content>
                <div>
                    <Link to={'/user'}>
                        {user.username}
                    </Link>
                    {logOut && <Button onClick={handleLogout}>退出登录</Button>}
                    <Login/>
                </div>
            </Content>
            <MyFooter className={`footer-bottom`}/>
        </Layout>
    );
};

export default Home;