import React, {useState} from 'react';
import {Layout, Menu} from 'antd';
import '../../styles/layout.css'
import './index.css'
import {MyHeader} from "../../layout/header";
import {MyFooter} from "../../layout/footer";
import {CaretDownOutlined} from "@ant-design/icons";
import {Link, useLoaderData} from "react-router-dom";
import Login from "../User/Login";

const {Content} = Layout;
const items = [];
for (let i = 0; i < 5; i += 1) {
    items.push({
        label: `Item ${i}`,
        key: i

    });
}
const menu = () => {
    return (
        <Menu
            className={'menu'}
            mode="horizontal"
            items={items}
            overflowedIndicator={<CaretDownOutlined/>}
            selectable={false}
        />
    )
}
const Home = () => {
    const {user} = useLoaderData();

    return (
        <Layout className={`v-100`}>
            <MyHeader menu={menu()}/>
            <Content>
                <div>
                    <Link to={'/user'}>
                        {user.username}
                    </Link>
                    <Login/>
                </div>
            </Content>
            <MyFooter className={`footer-bottom`}/>
        </Layout>
    );
};

export default Home;