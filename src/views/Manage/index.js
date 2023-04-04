import {LaptopOutlined, NotificationOutlined, ScheduleOutlined, SlidersFilled, UserOutlined} from '@ant-design/icons';
import {Layout, Menu, Switch, theme} from 'antd';
import React, {useState} from 'react';
import {Outlet, useLoaderData} from "react-router-dom";
import {MyHeader} from "../../layout/header";
const {Content, Sider } = Layout;
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});
const Manage = () => {
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
        {
            key : 1,
            icon : <ScheduleOutlined />,
            label : `公告牌`
        },
    ]
    const {user} = useLoaderData();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <MyHeader user = {user}/>
            <Layout>
                <Sider
                    collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                    width={200}
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <Menu
                        theme={siderTheme}
                        mode={`inline`}
                        style={{
                            height: '6%',
                            borderRight: 0,
                        }}
                        items={items}
                        selectable={false}
                    />
                    <Menu
                        theme={siderTheme}
                        mode={mode}
                        style={{
                            height: '94%',
                            borderRight: 0,
                        }}
                        items={mainItems}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                        minHeight : '92vh'
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
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
export default Manage;