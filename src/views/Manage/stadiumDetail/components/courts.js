import courtImage from "../../../../assets/badminton-court-2d.png";
import {Button, Col, Descriptions, Image, Row} from "antd";
import { Avatar, List, Space } from 'antd';
import React, {useState} from 'react';
import {LikeOutlined, MessageOutlined, StarOutlined} from "@ant-design/icons";
import axios from "axios";
import {ROOT_URL} from "../../../../utils/constant";
const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const Courts = ({courtNumber,stadiumId}) => {
    const data = Array.from({
        length: courtNumber,
    }).map((_, i) => ({
        state: '空闲',
        name: `场地 ${i+1}`,
        countdown: '00:00:00',
        nextBooking: '无',
        light:false,
    }));
    axios.post(`${ROOT_URL}/courts/pushNewCourts`,{stadiumId:stadiumId, number:courtNumber}).then(response=>{
        console.log(response);
    }).catch(error=>{
        console.log(error);
    })
    const [courts, setCourts] = useState(data);
    const controlLight = (name)=>{
        setCourts(courts.map(current => {
            if (current.name === name){
                return {...current, light: !current.light};
            }else return current;
        }))
    }
    return(
        <List
            itemLayout={`vertical`}
            size="large"
            grid={{
                gutter: 20,
                column: 2,
            }}
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 6,
            }}
            dataSource={courts}
            renderItem={(item) => (
                <List.Item
                    style={{marginBottom:`50px`}}
                    key={item.name}
                >
                    <Row justify="space-between">
                        <Col>
                            <Image
                                height={500}
                                src={courtImage}
                                preview={false}
                            />
                        </Col>
                        <Col xxl={12}>
                            <Descriptions
                                title={item.name}
                                bordered
                                column={1}
                            >
                                <Descriptions.Item label="状态">{item.state}</Descriptions.Item>
                                <Descriptions.Item label="倒计时">{item.countdown}</Descriptions.Item>
                                <Descriptions.Item label="灯控">{item.light? `开`:`关`}</Descriptions.Item>
                                <Descriptions.Item label="预订时间">{item.nextBooking}</Descriptions.Item>
                            </Descriptions>
                            <Button onClick={()=>controlLight(item.name)}>开启</Button>
                        </Col>
                    </Row>
                </List.Item>
            )}
        />
    );
}
export default Courts;