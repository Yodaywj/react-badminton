import React, {useEffect, useState} from 'react';
import {Col, Image, Layout, Row, Skeleton, Spin, Typography} from 'antd';
import '../../styles/layout.css'
import {MyHeader} from "../../layout/header";
import {MyFooter} from "../../layout/footer";
import {useLoaderData} from "react-router-dom";
import shuttlecock from "../../assets/shuttlecock-blue.svg"
import manage from "../../assets/badminton-management.svg"
import courtShow from "../../assets/courtShow.jpg"
import bookingShow from "../../assets/bookingShow.jpg"
import './index.css'

import BulletinList from "./components/bulletinList";

const {Content} = Layout;

const Home = () => {
    const {user, bulletins} = useLoaderData();
    const {Title, Text,Paragraph} = Typography;
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        setLoading(false)
    }, []);

    return (
        <Layout>
            <MyHeader user = {user}/>
            <Content className={`content-home`}>
                <Row className={`content-home-intro`}>
                    <Col span={24}>
                        <Row justify={"center"}>
                            <Spin size={"large"} spinning={loading}>
                                <Image src={shuttlecock} preview={false}/>
                            </Spin>
                        </Row>
                        <Row justify={"center"}>
                            <Title level={1}>
                                尚羽智店
                            </Title>
                        </Row>
                        <Row justify={"center"}>
                            <Text strong={false} className={`text-secondary text-size-4`}>
                                用于羽毛球馆数字化管理的智慧门店
                            </Text>
                        </Row>
                    </Col>
                </Row>
                <Row className={`content-home-second`}>
                    <Col span={24}>
                        <Row justify={"center"}>
                            <Title level={2} style={{marginBottom:`25px`}}>
                                公告板
                            </Title>
                        </Row>
                        <Skeleton loading={loading} active={true}>
                            <BulletinList bulletins={bulletins}/>
                        </Skeleton>
                    </Col>
                </Row>
                <Row justify={"center"} className={`content-home-third`} >
                    <Col>
                        <Image width={600} src={courtShow} preview={false}/>
                    </Col>
                    <Col style={{marginLeft:`300px`}}>
                        <Row justify={"center"} style={{marginTop:`40px`}}>
                            <Title level={2}>
                                场地管理
                            </Title>
                        </Row>
                        <Row justify={"center"} style={{marginTop:`25px`}}>
                            <Text strong={false} className={`text-secondary text-size-4`}>
                                通过数字化系统
                            </Text>
                        </Row>
                        <Row justify={"center"}>
                            <Text strong={false} className={`text-secondary text-size-4`}>
                                助你更好管理场馆
                            </Text>
                        </Row>
                    </Col>
                </Row>
                <Row justify={"center"} className={`content-home-third`}>
                    <Col>
                        <Image width={600} src={bookingShow} preview={false}/>
                    </Col>
                    <Col style={{marginLeft:`300px`}}>
                        <Row justify={"center"} style={{marginTop:`40px`}}>
                            <Title level={2}>
                                预订系统
                            </Title>
                        </Row>
                        <Row justify={"center"} style={{marginTop:`25px`}}>
                            <Text strong={false} className={`text-secondary text-size-4`}>
                                在线预订场馆
                            </Text>
                        </Row>
                        <Row justify={"center"}>
                            <Text strong={false} className={`text-secondary text-size-4`}>
                                随时了解预订详情
                            </Text>
                        </Row>
                    </Col>
                </Row>
                <Row justify={"center"} className={`content-home-third`}>
                    <Image width={700} src={manage} preview={false}/>
                </Row>
            </Content>
            <MyFooter/>
        </Layout>
    );
};

export default Home;