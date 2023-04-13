import {Descriptions, List, Row, Space} from "antd";
import {LikeOutlined, MessageOutlined, StarOutlined} from "@ant-design/icons";
import stadium from "../../../assets/badminton-stadium.png";
import React from "react";

const IconText = ({icon, text}) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
const BookingInfo = ({data})=>{
    return(
        <>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSize: 3,
                    showQuickJumper:true,
                }}
                dataSource={data}
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
                                    title={`我的场馆`}
                                    bordered
                                    extra={
                                        <Row>
                                            <Space size={"middle"}>

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
        </>
    )
}
export default BookingInfo;