import {Button, Col, Row, Tabs, Tag, Typography} from 'antd';
import {Link, useLoaderData} from "react-router-dom";
import Member from "./components/member";
import Courts from "./components/courts";
import BookingManage from "./components/bookingManage";
const StadiumDetail = () => {
    const {members,stadiumId,courts,stadiumName} = useLoaderData();

    let data = courts.map(item => {
        const countdown = Number(item.countdown)*1000+Date.now();
        return {...item, countdown: countdown};
    })
    const items = [
        {
            label: '场地管理',
            key: '1',
            children: <Courts data={data} stadiumId={stadiumId}/>,
        },
        {
            label: '会员管理',
            key: '2',
            children: <Member members={members} stadiumId={stadiumId}/>,
        },
        {
            label: '预订管理',
            key: '3',
            children: <BookingManage stadiumId={stadiumId} courtsNum={courts.length}/>,
        },
    ]
    return (
        <>
            <Row justify={"end"}>
                <Tag color={`gold`}>{`编号: ${stadiumId}`}</Tag>
            </Row>
            <Row justify={"center"}>
                <Col>
                    <Typography.Title
                        level={3}
                    >{stadiumName}</Typography.Title>
                </Col>
            </Row>
                <Tabs
                    tabBarExtraContent={{left:<Link to={'/manage/stadium'}><Button style={{marginRight:`20px`}}>返回</Button></Link>}}
                    defaultActiveKey="1"
                    items={items}
                />
        </>
    );
}
export default StadiumDetail;