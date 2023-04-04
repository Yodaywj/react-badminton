import React, {useState} from 'react';
import {Button, Card, Col, Image, Layout, Row, Typography} from 'antd';
import '../../styles/layout.css'
import {MyHeader} from "../../layout/header";
import {MyFooter} from "../../layout/footer";
import {useLoaderData} from "react-router-dom";
import shuttlecock from "../../assets/shuttlecock-blue.svg"
import manage from "../../assets/badminton-management.svg"
import './index.css'

const {Content} = Layout;

const Home = () => {
    const {user} = useLoaderData();
    const {Title, Text} = Typography;

    return (
        <Layout>
            <MyHeader user = {user}/>
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
                            <Text strong={false} className={`text-secondary text-size-4`}>
                                用于羽毛球馆数字化管理的智慧门店
                            </Text>
                        </Row>
                    </Col>
                </Row>
                <Row className={`content-home-second`}>
                    <Card
                        title="Card title"
                        bordered={false}
                        style={{
                            width: 300,
                        }}
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Row>
                <Row justify={"center"} className={`content-home-third`}>
                    <Image src={manage} preview={false}/>
                </Row>
                <Row justify={"center"}>

                </Row>
            </Content>
            <MyFooter/>
        </Layout>
    );
};

export default Home;