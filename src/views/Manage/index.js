import {ContactsOutlined, ScheduleOutlined, SlidersFilled, SnippetsOutlined, StarOutlined} from '@ant-design/icons';
import {Layout, Menu, message, Row, Skeleton, Switch, theme} from 'antd';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {Link, Outlet, useLoaderData} from "react-router-dom";
import {MyHeader} from "../../layout/header";
import stadiumGrey from "../../assets/stadiumGrey.svg"
import Failure from "../ErrorPage/failure";
import Chat from "../../components/Chat/Chat";
import {AppContext} from "../../index";
const {Content, Sider } = Layout;
const Manage = () => {
    const screenWidth = useContext(AppContext);
    const {user} = useLoaderData();
    const [userInfo,setUserInfo] = useState(user);
    const deepData = [userInfo,setUserInfo];
    const [collapsed, setCollapsed] = useState(screenWidth <= 700);
    const [siderTheme, setSiderTheme] = useState('light');
    const [mode, setMode] = useState(true);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        setLoading(false)
        if (screenWidth<700){
            message.info('建议使用电脑端访问个人中心')
        }
    }, []);
    const changeTheme = (value) => {
        setSiderTheme(value ? 'dark' : 'light');
    };
    const changeMode = (value) => {
        setMode(!value);
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
                checked={mode === false}
                onChange={changeMode}
                checkedChildren="收起"
                unCheckedChildren="展开"
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
            key : 2,
            icon: <ContactsOutlined />,
            label: <Link to={`userInfo`}>个人信息</Link>,
        },
        {
            key : 3,
            icon: <SnippetsOutlined />,
            label: <Link to={`myBooking`}>我的预订</Link>,
        },
        {
            key : 4,
            icon: <img  src={stadiumGrey} width={16} alt={'我的场馆'}/>,
            label: <Link to={`stadium`}>我的场馆</Link>,
        },
        {
            key : 5,
            icon: <StarOutlined />,
            label: <Link to={`myBookmarks`}>收藏场馆</Link>,
        },
    ]
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    if (user.username === false){
        return (
            <Row justify={"center"} align={"middle"} style={{height:`100vh`,width:`100vw`}}>
                <Failure/>
            </Row>
        )
    }
    else return (
        <Layout style={{ minHeight: '100vh' }}>
            {mode && <MyHeader user={userInfo}/>}
            <Layout>
                <Sider
                    collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                    width={screenWidth>700?200:screenWidth}
                    style={{
                        background: colorBgContainer,
                        position: 'fixed',
                        top: mode ? '72px' : `0`,
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
                        mode={`inline`}
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
                        marginLeft: collapsed? '80px':'200px',
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
                        <UserContext.Provider value={deepData}>
                            <Skeleton loading={loading} active={true} paragraph={{rows:20}}>
                                <Outlet />
                            </Skeleton>
                        </UserContext.Provider>
                        <Chat user={user}/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
export default Manage;
export const UserContext = createContext(null);
