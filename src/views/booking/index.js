import {Layout, Input, Row, Col} from 'antd';
import React from 'react';
import BookingInfo from "./components/bookingInfo";
import {MyHeader} from "../../layout/header";
import {useLoaderData} from "react-router-dom";
import {MyFooter} from "../../layout/footer";
import {heightOfHF} from "../../utils/constant";

const {Content} = Layout;
const {Search} = Input;
const Booking = () => {
    const {user,data} = useLoaderData();
    return(
        <>
            <Layout style={{minHeight:`100vh`}}>
                <MyHeader user = {user}/>
                <Content style={{minHeight:`100vh-${heightOfHF}px`,backgroundColor:"white"}}>
                    <Row>
                        <Search placeholder="input search loading with enterButton" loading enterButton />
                    </Row>
                    <Row>
                        <Col span={24}>
                            <BookingInfo data={data}/>
                        </Col>
                    </Row>
                </Content>
                <MyFooter/>
            </Layout>
        </>
    )
}
export default Booking;