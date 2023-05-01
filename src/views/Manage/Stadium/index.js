import {Button, Descriptions, Image, List, message, Modal, Row, Skeleton, Space, Tooltip} from 'antd';
import React, {useContext, useState} from 'react';
import stadium from '../../../assets/badminton-stadium.png'
import {ExclamationCircleFilled, LikeOutlined, MessageOutlined, StarOutlined} from "@ant-design/icons";
import EditStadium from "./components/EditStadium";
import {Link, useLoaderData} from "react-router-dom";
import axios from "axios";
import {ROOT_URL} from "../../../utils/constant";
import deleteCourts from "../../../services/deleteCourts";
import {AppContext} from "../../../index";
const IconText = ({icon, text}) => (
    <Space style={{marginTop:`70px`}}>
        {React.createElement(icon)}
        {text}
    </Space>
);
const Stadium = () => {
    const [loadIMG,setLoadIMG] = useState(true)
    const screenWidth = useContext(AppContext);
    const {data} = useLoaderData();
    const [stadiumData, setStadiumData] = useState(data);
    const [messageApi, contextHolder] = message.useMessage();
    const { confirm } = Modal;
    const showConfirm = (id) => {
        confirm({
            title: '删除场馆',
            icon: <ExclamationCircleFilled />,
            content: '确定删除该场馆吗？',
            okText:`确认`,
            cancelText:`取消`,
            centered:true,
            onOk() {
                deleteStadium(id)
            },
            onCancel() {
            },
        });
    };
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
        await deleteCourts(id);
    }
    return (
        <>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSize: 3,
                    showQuickJumper:true,
                }}
                dataSource={stadiumData}
                renderItem={(item) => (

                    <List.Item
                        key={item.id}
                        // actions={[
                        //     <IconText icon={StarOutlined} text="156" key="list-vertical-star-o"/>,
                        //     <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
                        //     <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
                        // ]}
                        extra={
                            <Image
                                style={{ display: !loadIMG ? 'block' : 'none' }}
                                onLoad={()=>{setLoadIMG(false)}}
                                width={screenWidth>700?272:0}
                                alt="logo"
                                src={stadium}
                                placeholder={<Skeleton/>}
                            />
                        }
                    >
                        <List.Item.Meta
                            description={
                                <Descriptions
                                    title={<Tooltip title={item.id}>我的场馆 {stadiumData.indexOf(item) + 1}</Tooltip>}
                                    bordered
                                    extra={
                                    <Row>
                                        <Space size={"middle"}>
                                            <EditStadium stadium={item} name={'编辑'} stadiumData={stadiumData} setData={setStadiumData}/>
                                            <Button onClick={()=>showConfirm(item.id)}>删除</Button>
                                            <Link to={`/manage/stadium/${item.id}/${item.courtNumber}`}><Button>管理</Button></Link>
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