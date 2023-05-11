import {MyHeader} from "../../layout/header";
import {Button, Col, Image, Layout, Result, Row, Skeleton, Space, Spin} from "antd";
import {MyFooter} from "../../layout/footer";
import bg from '../../assets/badminton-court-2d.png'
import {heightOfHF} from "../../utils/constant";
import React, {createContext, Suspense, useContext, useEffect, useState} from "react";
import {Link, Outlet, useLoaderData} from "react-router-dom";
import NavUser from "./components/navigation";
import Chat from "../../components/Chat/Chat";
import {login} from "../../redux/userNavSlice";
import {AppContext} from "../../index";

export const HeightContext = createContext(null);
const User = () => {
    const {user} = useLoaderData()
    const {Content} = Layout;
    const [loading, setLoading] = useState(true);
    const screenWidth = useContext(AppContext);
    const [height,setHeight] = useState('login');

    return (
        <div style={{height: `100vh`}}>
            <MyHeader user={user}/>
            <Skeleton loading={false}>
                <Content>
                    <Row align={`middle`} justify={`center`} style={height!=='register'||screenWidth>720?{height: `calc(100vh - ${heightOfHF}px)`}:{}}>
                        <Col xs={{span: 0}} lg={{span: 7}}>
                            {loading && <Skeleton paragraph={{rows:10}}/>}
                            <Image style={{ display: !loading ? 'block' : 'none' }} onLoad={()=>{setLoading(false)}} src={bg}
                                   height={loading? 0:`calc(100vh - 152px)`} preview={false}/>
                        </Col>
                        <Col xs={{span: 24}} lg={{span: 12}}>
                            <Row justify={'center'}>
                                <Col style={{width:`180px`,marginBottom:`30px`}}>
                                    <NavUser/>
                                </Col>
                            </Row>
                            <Row justify={'center'}>
                                <HeightContext.Provider value={[height,setHeight]}>
                                    <Outlet/>
                                </HeightContext.Provider>
                            </Row>
                        </Col>
                    </Row>
                    <Chat user={user}></Chat>
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