import {MyHeader} from "../../layout/header";
import {Col, Image, Layout, Row, Skeleton, Space, Spin} from "antd";
import {MyFooter} from "../../layout/footer";
import bg from '../../assets/badminton-court-2d.png'
import {heightOfHF, imageFallback} from "../../utils/constant";
import React, {useEffect, useState} from "react";
import {Outlet, useLoaderData} from "react-router-dom";
import NavUser from "./components/navigation";

const User = () => {
    const {user} = useLoaderData()
    const {Content} = Layout;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <div style={{height: `100vh`}}>
            <MyHeader user={user}/>
            <Skeleton loading={loading}>
                <Content>
                    <Row align={`middle`} justify={`center`} style={{height: `calc(100vh - ${heightOfHF}px)`}}>
                        <Col xs={{span: 0}} lg={{span: 7}}>
                            <Image src={bg} placeholder={<Skeleton/>} fallback={imageFallback}
                                   height={`calc(100vh - 152px)`} preview={false}/>
                        </Col>
                        <Col xs={{span: 24}} lg={{span: 12}}>
                            <Space direction="vertical" size="middle" style={{display: 'flex'}}>
                                <Row justify={'center'}>
                                    <Col span={7}>
                                        <NavUser/>
                                    </Col>
                                </Row>
                                <Row justify={'center'}>
                                    <Outlet/>
                                </Row>
                            </Space>
                        </Col>
                    </Row>
                </Content>
            </Skeleton>
            <Row>
                <Col span={24}>
                    <MyFooter/>
                </Col>
            </Row>
        </div>
    )
};

export default User;