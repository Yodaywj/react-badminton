import {Button, Col, Descriptions, Image, List, message, Row, Skeleton, Space, Tooltip} from "antd";
import stadium from "../../../assets/badminton-stadium.png";
import Icon from "../../../components/icon";
import {StarFilled, StarOutlined} from "@ant-design/icons";
import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../../index";
import {addBookmark, deleteBookmark} from "../../../services/bookmark";
import {useLoaderData} from "react-router-dom";

export const MyBookmarks = ()=>{
    const {stadiums,user} = useLoaderData();
    const [myBookmarks,setMyBookmarks] = useState(stadiums.map(item=>{
        return item.id;
    }));
    const [loadIMG,setLoadIMG] = useState(true)
    const screenWidth = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const markBooking = (id,star)=>{
        if (star){
            setMyBookmarks([...myBookmarks,id])
            addBookmark(user.username,id)
        }else {
            setMyBookmarks(myBookmarks.filter(item=>item!==id))
            deleteBookmark(user.username,id);
        }
    }
    useEffect(() => {
        setLoading(false)
    }, []);
    return(
        <>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSize: 3,
                    showQuickJumper:true,
                }}
                dataSource={stadiums}
                renderItem={(item) => (
                    <Skeleton loading={loading} active={true} avatar={true} paragraph={{rows:5}}>
                        <List.Item
                            key={item.id}
                            // actions={[
                            // <IconText icon={<StarOutlined  style={{fontSize:`20px`}}/>} key="list-vertical-star-o"/>,
                            // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
                            // <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
                            extra={
                                <>
                                    {loadIMG && <Skeleton/>}
                                    <Image
                                        style={{ display: !loadIMG ? 'block' : 'none' }}
                                        onLoad={()=>{setLoadIMG(false)}}
                                        width={screenWidth>700?272:0}
                                        alt="logo"
                                        src={stadium}
                                        placeholder={<Skeleton/>}
                                    />
                                </>
                            }
                        >
                            <List.Item.Meta
                                description={
                                    <>
                                        <Descriptions
                                            title={<Tooltip title={
                                                <>
                                                    <Row>
                                                        <Col span={22}>
                                                            {item.id}
                                                        </Col>
                                                        <Col span={2}
                                                             style={{cursor:"pointer",height:`50%`}}
                                                             onClick={()=>{
                                                                 navigator.clipboard.writeText(item.id).then(r => {});
                                                             }}>
                                                            <Icon/>
                                                        </Col>
                                                    </Row>
                                                </>
                                            }>查看编号</Tooltip>}
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
                                        </Descriptions>
                                        <Row style={{marginTop:`75px`}}>
                                            <Col push={1}>
                                                {myBookmarks.includes(item.id)?
                                                    <StarFilled key={`${item.id}filled`} onClick={()=>markBooking(item.id,false)}  style={{fontSize:`20px`,color:`gold`}}/>:
                                                    <StarOutlined key={`${item.id}outlined`} onClick={()=>markBooking(item.id,true)}   style={{fontSize:`20px`}}/>
                                                }
                                            </Col>
                                        </Row>
                                    </>}
                            />
                        </List.Item>
                    </Skeleton>
                )}
            />
        </>
    )
}