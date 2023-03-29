import {MyHeader} from "../../layout/header";
import {Col, Image, Layout, Row, Space, Spin} from "antd";
import {MyFooter} from "../../layout/footer";
import bg from '../../assets/badminton-court-rg.png'
import {imageFallback} from "../../utils/constant";
import {useEffect, useRef, useState} from "react";
import {Outlet} from "react-router-dom";
import NavUser from "./components/navigation";

const User = () => {
    const {Content} = Layout;
    const [loading,setLoading] = useState(false);

    return (
        <Layout>
            <MyHeader/>
            <Content className={`vh-80-w-100`}>
                <Row  align={`middle`} style={{height:'100%'}} justify={`center`}>
                    <Col xs={{ span: 0}} lg={{ span: 7}} style={{height:'100%'}}>
                        <Spin spinning={loading}>
                            <Image src={bg} fallback={imageFallback} style={{height:"80vh"}}/>
                        </Spin>
                    </Col>
                    <Col xs={{ span: 24}} lg={{ span: 12}}>
                        <Space direction="vertical" size="large" style={{ display: 'flex'}}>
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
            <MyFooter/>
        </Layout>
    )
};

export default User;