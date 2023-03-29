import React, {useState} from 'react';
import {Button, Col, Image, Layout, Row, Typography} from 'antd';
import '../../styles/layout.css'
import {MyHeader} from "../../layout/header";
import {MyFooter} from "../../layout/footer";
import {Link, useLoaderData} from "react-router-dom";
import {logoutService} from "../../services/logoutService";
import {ROOT_URL} from "../../utils/constant";
import shuttlecock from "../../assets/shuttlecock-blue.svg"
import './index.css'
import Paragraph from "antd/es/skeleton/Paragraph";

const {Content} = Layout;

const Home = () => {
    const {user} = useLoaderData();
    const [logout, setLogout] = useState(user.username !== '未登录');
    const [usernameInfo, setUsernameInfo] = useState(user.username)
    const { Title,Text} = Typography;
    const handleLogout = ()=> {
        logoutService(`${ROOT_URL}/user/logout`);
        setLogout(false);
        setUsernameInfo("未登录")
    }

    return (
        <Layout className={`v-100`}>
            <MyHeader/>
            <Content className={`content-home`}>
                <Row className={`content-home-intro`}>
                    <Col span={24}>
                        <Row justify={"center"}>
                            <Image src={shuttlecock} preview={false}/>
                        </Row>
                        <Row justify={"center"}>
                            <Title level={1}>
                                尚羽智店
                            </Title>
                        </Row>
                        <Row justify={"center"}>
                            <Text>
                                用于羽毛球馆数字化管理的智慧门店
                            </Text>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Link to={'/user'}>
                        {usernameInfo}
                    </Link>
                    {logout && <Button onClick={handleLogout}>退出登录</Button>}
                </Row>
            </Content>
            <MyFooter className={`footer-bottom`}/>
        </Layout>
    );
};

export default Home;