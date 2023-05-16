import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Image, Layout, Row, Skeleton, Spin, Typography} from 'antd';
import '../../styles/layout.css'
import {MyHeader} from "../../layout/header";
import {MyFooter} from "../../layout/footer";
import {Link, useLoaderData} from "react-router-dom";
import shuttlecock from "../../assets/shuttlecock-blue.svg"
import manage from "../../assets/badminton-management.svg"
import courtShow from "../../assets/courtShow.jpg"
import bookingShow from "../../assets/bookingShow.jpg"
import './index.css'
import '../../styles/scrollbar.css'
import BulletinList from "./components/bulletinList";
import Chat from "../../components/Chat/Chat";
import {AppContext} from "../../index";
const {Content} = Layout;

const Home = () => {
    const {user, bulletins} = useLoaderData();
    const screenWidth = useContext(AppContext)
    const {Title, Text} = Typography;
    const [loading,setLoading] = useState(true);
    const [btnState,setBtnState] = useState({booking:false})
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
                            {screenWidth>720?
                                <Text strong={false} className={`text-secondary text-size-4`}>
                                用于羽毛球馆数字化管理的智慧门店
                                </Text>:
                                <>
                                    <Text strong={false} className={`text-secondary text-size-4`}>
                                        用于羽毛球馆数字化
                                    </Text>
                                    <Text strong={false} className={`text-secondary text-size-4`}>
                                    管理的智慧门店
                                    </Text>
                                </>
                            }
                        </Row>
                        <Row justify={"center"} style={{marginTop:`30px`}}>
                            <Link to={user.username?`/manage/userInfo`:`/user/login`}>
                                <Button type="primary" shape="round"  size={`large`} style={{marginRight:`10px`}}>
                                    开始使用
                                </Button>
                            </Link>
                            <Link to={`/booking`}
                                  onClick={()=>{setBtnState({...btnState,booking: true})}}
                            >
                                <Button shape="round"  size={`large`}
                                        loading={btnState.booking}>
                                    场馆预订
                                </Button>
                            </Link>
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
                <Row justify={"center"} className={`content-home-demo`} >
                    <Col>
                        <Row justify={"center"} style={{marginBottom:`20px`}}>
                            <Title level={2}>
                                场地管理
                            </Title>
                        </Row>
                        <Row justify={"center"}>
                            <Image width={screenWidth*0.4} src={courtShow} placeholder={<Skeleton/>}/>
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
                <Row justify={"center"} className={`content-home-demo`}>
                    <Col>
                        <Row justify={"center"}>
                            <Title level={2} style={{marginBottom:`20px`}}>
                                预订系统
                            </Title>
                        </Row>
                        <Row justify={"center"}>
                            <Image width={screenWidth*0.4} src={bookingShow} placeholder={<Skeleton/>}/>
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
                <Chat user={user}/>
            </Content>
            <MyFooter/>
        </Layout>
    );
};

export default Home;