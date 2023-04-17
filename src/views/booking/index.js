import {Layout, Input, Row, Col} from 'antd';
import React, {useState} from 'react';
import BookingInfo from "./components/bookingInfo";
import {MyHeader} from "../../layout/header";
import {useLoaderData} from "react-router-dom";
import {MyFooter} from "../../layout/footer";
import {heightOfHF} from "../../utils/constant";
import Filter from "./components/filter";

const {Content} = Layout;
const Booking = () => {
    const {data,user,sum} = useLoaderData();
    const [stadiums, setStadiums] = useState(data);
    const [num,setNum] = useState(sum);
    const [isFilter,setIsFilter] = useState(false);
    return(
        <>
            <Layout style={{minHeight:`100vh`}}>
                <MyHeader user = {user}/>
                <Content style={{minHeight:`100vh-${heightOfHF}px`,backgroundColor:"white"}}>
                    <Row justify={"center"} style={{marginTop:`10px`}}>
                        <Filter num={num} setStadiums={setStadiums} setNum={setNum} setIsFilter={setIsFilter}/>
                    </Row>
                    <Row justify={"center"}>
                        <Col span={21}>
                            <BookingInfo user={user} stadiums={stadiums} setStadiums={setStadiums} sum={num} isFilter={isFilter}/>
                        </Col>
                    </Row>
                </Content>
                <MyFooter/>
            </Layout>
        </>
    )
}
export default Booking;