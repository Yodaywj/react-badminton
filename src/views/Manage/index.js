import {ScheduleOutlined, SlidersFilled, SnippetsOutlined} from '@ant-design/icons';
import {Layout, Menu, Switch, theme} from 'antd';
import React, {useState} from 'react';
import {Link, Outlet, useLoaderData} from "react-router-dom";
import {MyHeader} from "../../layout/header";
const {Content, Sider } = Layout;
const Manage = () => {
    const {user} = useLoaderData();
    const [collapsed, setCollapsed] = useState(false);
    const [siderTheme, setSiderTheme] = useState('light');
    const [mode, setMode] = useState('inline');
    const changeTheme = (value) => {
        setSiderTheme(value ? 'dark' : 'light');
    };
    const changeMode = (value) => {
        setMode(value ? 'vertical' : 'inline');
    };
    const items = [
        {
            key: 1,
            icon: <SlidersFilled />,
            label: <><Switch
                checked={siderTheme === 'dark'}
                onChange={changeTheme}
                checkedChildren="深色"
                unCheckedChildren="浅色"
                style={{marginRight:`8px`}}
            /><Switch
                checked={mode === 'vertical'}
                onChange={changeMode}
                checkedChildren="展开"
                unCheckedChildren="收起"
            /></>,
        },
    ]
    const mainItems = [
        user.privilege === 'root'?{
            key : 1,
            icon : <ScheduleOutlined />,
            label : <Link to={`bulletin-board`}>公告牌</Link>
        }:null,
        {
            key : 3,
            icon: <SnippetsOutlined />,
            label: <Link to={`stadium`}>我的场馆</Link>,
        }
    ]
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <MyHeader user = {user}/>
            <Layout>
                <Sider
                    collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                    width={200}
                    style={{
                        background: colorBgContainer,
                        position: 'fixed',
                        top: '8vh',
                        left: '0',
                    }}
                >
                    <Menu
                        theme={siderTheme}
                        mode={`inline`}
                        style={{
                            height: '50px',
                            borderRight: 0,
                        }}
                        items={items}
                        selectable={false}
                    />
                    <Menu
                        theme={siderTheme}
                        mode={mode}
                        style={{
                            borderRight: 0,
                            minHeight: '92vh'
                        }}
                        items={mainItems}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                        marginLeft: '200px',
                    }}
                >
                    <Content
                        style={{
                            padding: 24,
                            margin: '24px 0 0 0',
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
export default Manage;