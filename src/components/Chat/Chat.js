import React, {useState, useEffect, useRef, useId, memo} from "react";
import {Avatar, Col, FloatButton, List, Modal, Row, Tag, message as systemMessage, Button} from "antd";
import useWebSocket from 'react-use-websocket';
import {CustomerServiceOutlined, UserAddOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import "./chat.css"
import MyMessage from "./MyMessage";
import YourMessage from "./YourMessage";
import { v4 as uuidv4 } from 'uuid';

const Chat = ({user}) => {
    const uuid = uuidv4();
    const scrollableRef = useRef(null);
    const [name,setName] = useState(user.username?user.username:`游客${uuid}`)
    const [content,setContent] = useState([]);
    const [message,setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [numOfMessage,setNumOfMessage] = useState(0);
    const [connection,setConnection] = useState(false);
    useEffect(() => {
        scrollToBottom();
    });
    const scrollToBottom = () => {
        if (scrollableRef.current) {
            scrollableRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };
    const {
        sendMessage,
        // sendJsonMessage,
        // lastMessage,
        // lastJsonMessage,
        // readyState,
        // getWebSocket,
    } = useWebSocket( `ws://localhost:8080/chat/${name}`, {
        onOpen: () => setConnection(true),
        onMessage:(event)=>{
            const uuid = uuidv4();
            let nickname = '';
            let newMessage = <></>
            const receivedMSG = JSON.parse(event.data)
            if (user.username){
                nickname = user.nickname;
            }else {
                nickname = name;
            }
            if (receivedMSG.userId === name){
                newMessage = <MyMessage key={uuid} name={nickname} message={receivedMSG.text}/>
            }else {
                newMessage = <YourMessage key={uuid} name={receivedMSG.nickname?receivedMSG.nickname:receivedMSG.userId} message={receivedMSG.text}/>
            }
            if (receivedMSG.text != null){
                setContent(content.concat(newMessage))
                if (receivedMSG.userId !== name && !open){
                    setNumOfMessage(numOfMessage+1)
                }
            }
        },
        shouldReconnect: (closeEvent) => true,
    });
    const sendMyMessage = ()=>{
        const chatting = {...user,text:message,to:'all',userId:name,nickname:user.nickname}
        sendMessage(JSON.stringify(chatting))
        scrollToBottom();
    }
    return (
        <>
            <FloatButton
                tooltip={'聊天室'}
                shape="circle"
                badge={{
                    count: numOfMessage,
                }}
                icon={<CustomerServiceOutlined />}
                onClick={()=>{
                    setOpen(true)
                    if (connection){
                        systemMessage.success('聊天室连接成功');
                    }else systemMessage.error('聊天室连接失败');
                    setNumOfMessage(0)
                }}
            />
            <Modal
                width={800}
                centered={true}
                mask={false}
                title={
                    <Row
                        justify={"center"}
                        style={{
                            width: '100%',
                        }}
                    >
                        聊天室
                    </Row>
                }
                okText={'发送'}
                open={open}
                onOk={sendMyMessage}
                okButtonProps={{style:{marginTop:`8px`}}}
                onCancel={()=>{setOpen(false)}}
                cancelButtonProps={{style:{display:`none`}}}
            >
                <Row style={{height:`500px`,marginBottom:`8px`}}>
                    <Col>
                        <Row style={{marginBottom:`10px`}}>
                            <div ref={scrollableRef} style={{height:`400px`,width:`750px`,overflow:`auto`}}>
                                {content}
                            </div>
                        </Row>
                        <Row justify={"center"} style={{marginBottom:`10px`}}>
                            <Tag color={"geekblue"}>谢谢,我会尽快回复你</Tag>
                        </Row>
                        <Row style={{height:`70px`,width:`100%`}}>
                            <TextArea
                                allowClear={true}
                                maxLength={100}
                                value={message}
                                style={{height:`100%`,width:`800px`}}
                                onChange={(event) => {
                                    setMessage(event.target.value)
                                }}
                            />
                        </Row>
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default Chat;

