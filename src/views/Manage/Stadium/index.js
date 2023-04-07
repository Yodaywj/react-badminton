import {Descriptions, List, Space} from 'antd';
import React, {useState} from 'react';
import stadium from '../../../assets/badminton-stadium.png'
import {LikeOutlined, MessageOutlined, StarOutlined} from "@ant-design/icons";
import EditStadium from "./components/EditStadium";
import {useLoaderData} from "react-router-dom";

const IconText = ({icon, text}) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
const Stadium = () => {
    const {data} = useLoaderData();
    const [stadiumData, setStadiumData] = useState(data);
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
                                    extra={<EditStadium stadium={item} name={'编辑'} stadiumData={stadiumData} setData={setStadiumData}/>}
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
            <EditStadium name={'新增场馆'} stadium={{province:null}} stadiumData={stadiumData} setData={setStadiumData}/>
        </>
    );
}
export default Stadium;