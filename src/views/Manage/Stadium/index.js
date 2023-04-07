import {Button, Descriptions, List, message, Row, Space} from 'antd';
import React, {useState} from 'react';
import stadium from '../../../assets/badminton-stadium.png'
import {LikeOutlined, MessageOutlined, StarOutlined} from "@ant-design/icons";
import EditStadium from "./components/EditStadium";
import {useLoaderData} from "react-router-dom";
import axios from "axios";
import {ROOT_URL} from "../../../utils/constant";

const IconText = ({icon, text}) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
const Stadium = () => {
    const {data} = useLoaderData();
    const [stadiumData, setStadiumData] = useState(data);
    const [messageApi, contextHolder] = message.useMessage();
    const deleteStadium = async (id)=>{
        await axios.delete(`${ROOT_URL}/stadium/delete/${id}`).then(response => {
            if (response.data.result){
                messageApi.open({
                    type: 'success',
                    content: response.data.message,
                })
                setStadiumData(stadiumData.filter(item=>item.id!==id))
            }else {
                messageApi.open({
                    type: 'error',
                    content: response.data.message,
                })
            }
        }).catch(error => {
            messageApi.open({
                type: 'error',
                content: error.message,
            })
        })
    }
    return (
        <>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSize: 3,
                }}
                dataSource={stadiumData}
                renderItem={(item) => (

                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o"/>,
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
                        ]}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src={stadium}
                            />
                        }
                    >
                        <List.Item.Meta
                            description={
                                <Descriptions
                                    title={`我的场馆 ${stadiumData.indexOf(item) + 1}`}
                                    bordered
                                    extra={
                                    <Row>
                                        <Space size={"middle"}>
                                            <Button onClick={()=>deleteStadium(item.id)}>删除</Button>
                                            <EditStadium stadium={item} name={'编辑'} stadiumData={stadiumData} setData={setStadiumData}/>
                                        </Space>
                                    </Row>
                                    }
                                    column={{
                                        xxl: 4,
                                        xl: 3,
                                        lg: 3,
                                        md: 3,
                                        sm: 2,
                                        xs: 1,
                                    }}
                                >
                                    <Descriptions.Item label="场馆名">{item.stadiumName}</Descriptions.Item>
                                    <Descriptions.Item label="省份">{item.province}</Descriptions.Item>
                                    <Descriptions.Item label="城市">{item.city}</Descriptions.Item>
                                    <Descriptions.Item label="详细地址">{item.address}</Descriptions.Item>
                                    <Descriptions.Item label="场地数量">{item.courtNumber}</Descriptions.Item>
                                    <Descriptions.Item label="电话">{item.phone}</Descriptions.Item>
                                    <Descriptions.Item label="备注">{item.remarks}</Descriptions.Item>
                                </Descriptions>}
                        />
                    </List.Item>
                )}
            />
            <EditStadium name={'新增场馆'} stadium={{}} stadiumData={stadiumData} setData={setStadiumData}/>
            {contextHolder}
        </>
    );
}
export default Stadium;