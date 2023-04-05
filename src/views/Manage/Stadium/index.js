import {Avatar, Button, Descriptions, List, Space} from 'antd';
import React from 'react';
import stadium from '../../../assets/badminton-stadium.png'
import {LikeOutlined, MessageOutlined, StarOutlined} from "@ant-design/icons";
const data = Array.from({
    length: 23,
}).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://joesch.moe/api/v1/random?key=${i}`,
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));
const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
const Stadium = () => (
    <List
        itemLayout="vertical"
        size="large"
        pagination={{
            onChange: (page) => {
                console.log(page);
            },
            pageSize: 3,
        }}
        dataSource={data}
        footer={
            <div>
                <b>ant design</b> footer part
            </div>
        }
        renderItem={(item) => (
            <List.Item
                key={item.title}
                actions={[
                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
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
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={
                        <Descriptions
                            title="Responsive Descriptions"
                            bordered
                            extra={<Button type="primary">Edit</Button>}
                            column={{
                                xxl: 4,
                                xl: 3,
                                lg: 3,
                                md: 3,
                                sm: 2,
                                xs: 1,
                            }}
                        >
                            <Descriptions.Item label="场馆名">Cloud Database</Descriptions.Item>
                            <Descriptions.Item label="省份">Prepaid</Descriptions.Item>
                            <Descriptions.Item label="城市">18:00:00</Descriptions.Item>
                            <Descriptions.Item label="详细地址">$80.00</Descriptions.Item>
                            <Descriptions.Item label="场地数量">$20.00</Descriptions.Item>
                            <Descriptions.Item label="电话">$60.00</Descriptions.Item>
                            <Descriptions.Item label="备份">
                                Data disk type: MongoDB
                                Database version: 3.4
                                Package: dds.mongo.mid
                                Storage space: 10 GB
                                Replication factor: 3
                                Region: East China 1
                            </Descriptions.Item>
                        </Descriptions>}
                />
                {item.content}
            </List.Item>
        )}
    />
);
export default Stadium;