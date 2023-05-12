import React, {useState, useEffect, useRef, useId, memo} from "react";
import {Col, FloatButton, Modal, Row, Tag, message as systemMessage, Input, Drawer, List, Avatar} from "antd";
import useWebSocket from 'react-use-websocket';
import {CustomerServiceOutlined} from "@ant-design/icons";
import "./chat.css"
import MyMessage from "./MyMessage";
import YourMessage from "./YourMessage";
import { v4 as uuidv4 } from 'uuid';
import {useSelector} from "react-redux";

const { TextArea } = Input;
const Chat = ({user}) => {
    const userInfo = useSelector(state => state.userInfo.userInfo)
    const uuid = uuidv4();
    const randomName = `游客${uuid}`;
    const [address] = useState(uuid);
    const scrollableRef = useRef(null);
    const [name,setName] = useState(user.username?user.username:randomName)
    const [nickname] = useState(user.username? user.nickname:randomName);
    const [onlineUsers,setOnlineUsers] = useState([]);
    const [count,setCount] = useState(0);
    const [content,setContent] = useState([]);
    const [message,setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [drawer,setDrawer] = useState(false);
    const [numOfMessage,setNumOfMessage] = useState(0);
    const [connection,setConnection] = useState(false);
    useEffect(() => {
        scrollToBottom();
    }, );
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
    } = useWebSocket( `wss://yangwenjun.cn:8080/chat/${name}/${nickname}/${address}`, {
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
            if (receivedMSG.users !== undefined){
                const newUsers = Array.from(new Set(receivedMSG.users.map(JSON.stringify))).map(JSON.parse);
                setCount(newUsers.length);
                setOnlineUsers(newUsers);
            }
        },
        onError:()=>setConnection(false),
        onClose:()=>{setConnection(false)},
        shouldReconnect: (closeEvent) => true,
    });
    const sendMyMessage = ()=>{
        if (message.trim().length !== 0){
            const chatting = {...user,text:message,to:'all',userId:name,nickname:user.nickname}
            sendMessage(JSON.stringify(chatting))
            setMessage('');
        }
    }
    const enterSend = (event)=>{
        event.preventDefault();
        sendMyMessage();
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
            <Drawer
                style={{height:`100%`}}
                zIndex={9999}
                title="在线用户"
                placement="right"
                onClose={()=>setDrawer(false)}
                open={drawer}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={onlineUsers}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                title={item.nickname}
                                description={<Tag color={"blue"}>{`用户名: ${item.username===item.nickname?"无":item.username}`}</Tag>}
                            />
                        </List.Item>
                    )}
                />
            </Drawer>
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
                            <div style={{height:`400px`,width:`750px`,overflow:`auto`}}>
                                {content}
                                <div ref={scrollableRef}></div>
                            </div>
                        </Row>
                        <Row justify={"center"} style={{marginBottom:`10px`}}>
                            <Tag onClick={()=>setDrawer(true)} style={{cursor:"pointer"}} color={"geekblue"}>{`当前在线人数:${count}`}</Tag>
                        </Row>
                        <Row style={{height:`70px`,width:`100%`}}>
                            <TextArea
                                onPressEnter={enterSend}
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

