import {Layout, Input, Row, Col, Skeleton} from 'antd';
import React, {useEffect, useState} from 'react';
import BookingInfo from "./components/bookingInfo";
import {MyHeader} from "../../layout/header";
import {useLoaderData} from "react-router-dom";
import {MyFooter} from "../../layout/footer";
import {heightOfHF} from "../../utils/constant";
import Filter from "./components/filter";
import Chat from "../../components/Chat/Chat";

const {Content} = Layout;
const Booking = () => {
    const {data, user, sum, bookmarks} = useLoaderData();
    const [stadiums, setStadiums] = useState(data);
    const [num, setNum] = useState(sum);
    const [isFilter, setIsFilter] = useState(false);

    return (
        <>
            <Layout style={{minHeight: `100vh`}}>
                <MyHeader user={user}/>
                <Content style={{minHeight: `100vh-${heightOfHF}px`, backgroundColor: "white"}}>
                    <Row justify={"center"} style={{marginTop: `10px`}}>
                        <Filter sum={sum} num={num} setStadiums={setStadiums} setNum={setNum} setIsFilter={setIsFilter}/>
                    </Row>
                    <Row justify={"center"}>
                        <Col span={21}>
                            <BookingInfo user={user} stadiums={stadiums} setStadiums={setStadiums} sum={num}
                                         isFilter={isFilter} bookmarks={bookmarks}/>
                        </Col>
                    </Row>
                    <Chat user={user}/>
                </Content>
                <MyFooter/>
            </Layout>
        </>
    )
}
export default Booking;