import {Avatar, Button, Col, Layout, List, message, Row, Tooltip, Typography, Badge, Popconfirm, Modal} from 'antd';
import React, { useState } from 'react';
import {MyHeader} from "../../layout/header";
import {heightOfHF} from "../../utils/constant";
import {MyFooter} from "../../layout/footer";
import {Content} from "antd/es/layout/layout";
import TextArea from "antd/es/input/TextArea";
import {useLoaderData} from "react-router-dom";
import {deleteComment, send} from "../../services/commentServices";
import dayjs from "dayjs";
import {DeleteOutlined} from "@ant-design/icons";

const Comment = () => {
    const [modal, contextHolder] = Modal.useModal();
    const {user,comments} = useLoaderData();
    const [data,setData] = useState(comments);
    const [comment,setComment] = useState('');
    console.log(user)
    const handleSend = async ()=>{
        if (!comment || comment.trim().length === 0){
            message.error(`评论不能为空`)
        }else {
            const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
            let nickname = user.nickname;
            if (!user.username){
                nickname = '游客';
            }
            let myComment = {
                content:comment,
                username:user.username,
                nickname:nickname,
                time:now,
                id:0}
            await send(myComment).then(response=>{
                if (response.result){
                    message.success(response.message);
                    setComment('')
                    myComment = {...myComment,id:response.id}
                    setData([myComment,...data])
                }
                else {
                    message.error(response.message);
                }
            })
        }
    }
    const handleDelete = async (comment)=>{
        modal.confirm(
            {
                centered:true,
                content:`确认删除该留言吗`,
                maskClosable:true,
                onOk:async ()=>{
                    await deleteComment(comment).then(response=>{
                        if (response.result){
                            message.success(response.message);
                            setData(data.filter(item=>item.id!==comment.id))
                        }else {
                            message.error(response.message);
                        }
                    })
                }
            }
        )
    }
    return (
        <>
            {contextHolder}
            <Layout style={{minHeight: `100vh`}}>
                <MyHeader user={user}/>
                <Content style={{minHeight: `100vh-${heightOfHF}px`, backgroundColor: "white"}}>
                    <Row justify={"center"} style={{marginTop:`60px`}}>
                        <Col span={20}>
                            <List
                                pagination={{
                                    pageSize:8
                                }}
                                dataSource={data}
                                renderItem={(item) => (
                                    <Badge.Ribbon text={item.time}>
                                        <List.Item
                                            key={item.id}
                                            extra={
                                            item.username === user.username || user.privilege === 'root'?
                                                <Tooltip title={`删除`} placement={"left"}>
                                                    <Button style={{marginTop:`25px`}} type={"text"} onClick={()=>handleDelete(item)}>
                                                        <DeleteOutlined/>
                                                    </Button>
                                                </Tooltip>
                                                :<></>
                                            }
                                            >
                                            <List.Item.Meta
                                                avatar={
                                                    <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item.nickname}`} />
                                                }
                                                title={<Tooltip title={`用户名: ${item.username}`}>{item.nickname}</Tooltip> }
                                                description={<div
                                                    style={{
                                                        maxWidth:`500px`,
                                                        wordWrap:`break-word`,
                                                        color:"black",
                                                        marginTop:`10px`
                                                }}>{item.content}</div>}
                                            />
                                        </List.Item>
                                    </Badge.Ribbon>
                                )}
                            />
                        </Col>
                    </Row>
                    <Row justify={"center"} align={"middle"} style={{marginTop:`10px`}}>
                        <Col span={10}>
                            <TextArea
                                allowClear={true}
                                maxLength={100}
                                showCount={true}
                                onChange={(event) => {
                                    setComment(event.target.value)
                                }}
                                value = {comment}/>
                        </Col>
                        <Col>
                            <Button onClick={handleSend} type={"primary"} style={{marginLeft:`20px`}}>
                                留言
                            </Button>
                        </Col>
                    </Row>
                </Content>
                <MyFooter/>
            </Layout>
        </>
    );
};
export default Comment;