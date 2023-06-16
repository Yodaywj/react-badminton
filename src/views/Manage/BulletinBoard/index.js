import {Button, Card, Input, List, Badge, message, Modal, Row, Tag, InputNumber} from 'antd';
import {DeleteOutlined, EditOutlined, ExclamationCircleFilled, SaveOutlined} from "@ant-design/icons";
import React, {useContext, useEffect, useState} from "react";
import ReactQuill from "react-quill";
import {useLoaderData} from "react-router-dom";
import {ROOT_URL} from "../../../utils/constant";
import axios from "axios";
import 'react-quill/dist/quill.snow.css';
import {UserContext} from "../index";
import Warning from "../../ErrorPage/warning";
import FourZeroThree from "../../ErrorPage/403";
import {number} from "sockjs-client/lib/utils/random";
import {AppContext} from "../../../index";

const BulletinBoard = () => {
    const screenWidth = useContext(AppContext);
    let pageSize;
    switch (true) {
        case (screenWidth<992):
            pageSize = 3;
            break;
        case (screenWidth<1200):
            pageSize = 4;
            break;
        default:
            pageSize = 6;
    }
    const deepData = useContext(UserContext);
    const user = deepData[0];
    let {data,count,view} = useLoaderData();
    const newData = data.map(item => ({...item, editing: false}));
    const [bulletins, setBulletins] = useState(newData.sort((a, b) => {
        if (a.weight === 0) {
            return 1;
        } else if (b.weight === 0) {
            return -1;
        } else {
            return a.weight - b.weight;
        }
    }));
    const [messageApi, contextHolder] = message.useMessage();
    const { confirm } = Modal;
    const showConfirm = (id) => {
        confirm({
            title: '删除公告',
            icon: <ExclamationCircleFilled />,
            content: '确定删除该公告吗？',
            okText:`确认`,
            cancelText:`取消`,
            centered:true,
            onOk() {
                handleDelete(id).then();
            },
            onCancel() {
            },
        });
    };
    const handleEdit = (id) => {
        setBulletins(bulletins.map((item) => {
            if (item.id === id) {
                return {...item, editing: true};
            } else {
                return item;
            }
        }))
    }
    const handleSave = (id, content, title,weight) => {
        const url = `${ROOT_URL}/bulletin-board/save`;
        const data = {id: id, content: content, title: title, weight:weight}
        axios.post(url, data).then(response => {
            if (response.data.result) {
                messageApi.open({
                    type: 'success',
                    content: response.data.message,
                }).then();
            } else {
                messageApi.open({
                    type: 'error',
                    content: response.data.message,
                }).then()
            }
        }).catch(error => {
            messageApi.open({
                type: 'error',
                content: error.message,
            })
        })
        const newBulletins = [...bulletins].sort((a, b) => {
            if (a.weight === 0) {
                return 1;
            } else if (b.weight === 0) {
                return -1;
            } else {
                return a.weight - b.weight;
            }
        });
        setBulletins(newBulletins.map((item) => {
            if (item.id === id) {
                return {...item, editing: false};
            } else {
                return item;
            }
        }));
        console.log(newBulletins)
    }
    const handleInput = (event, id) => {
        setBulletins(bulletins.map((newItem) => {
            if (newItem.id === id) {
                return {...newItem, title: event.target.value};
            } else {
                return newItem;
            }
        }))
    }
    const handleWeight = (event, id) => {
        setBulletins(bulletins.map((newItem) => {
            let {value} = event.target;
            value = value.trim();
            if (isNaN(value)||value===''){
                value = 0;
            }else value = parseInt(value);
            if (newItem.id === id) {
                return {...newItem, weight: value};
            } else {
                return newItem;
            }
        }))
    }
    const handleQuill = (value, id) => {
        setBulletins(bulletins.map((newItem) => {
            if (newItem.id === id) {
                return {...newItem, content: value};
            } else {
                return newItem;
            }
        }))
    }
    const handleDelete = async (id) => {
        const url = `${ROOT_URL}/bulletin-board/delete/${id}`
        await axios.delete(url).then(response => {
            if (response.data.result) {
                messageApi.open({
                    type: 'success',
                    content: response.data.message,
                })
                setBulletins(bulletins.filter(item => item.id !== id))
            } else {
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
    const handleAdd = async () => {
        const urlAdd = `${ROOT_URL}/bulletin-board/add`
        const urlShow = `${ROOT_URL}/bulletin-board/show`
        await axios.post(urlAdd).then(response => {
            if (response.data.result) {
                messageApi.open({
                    type: 'success',
                    content: response.data.message,
                })
            } else {
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
        await axios.get(urlShow, {withCredentials: true}).then(response => {
            const newData = response.data.bulletin;
            let addedItems = newData[0];
            addedItems = {...addedItems,editing:true};
            setBulletins([{...addedItems},...bulletins])
        }).catch(error => {
            messageApi.open({
                type: 'error',
                content: error.message,
            })
        })

    }
    if (user.privilege !== 'root')return (
        <Row justify={"center"} align={"middle"}>
            <FourZeroThree/>
        </Row>
    )
    return (
        <>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 1,
                    lg: 2,
                    xl: 3,
                    xxl: 3,
                }}
                pagination={{
                    simple: true,
                    pageSize: pageSize,
                }}
                dataSource={bulletins}
                renderItem={(item) => (
                    <List.Item>
                        <Badge.Ribbon text={item.time}>
                            <Card
                                title={item.editing ?
                                    <Input
                                        key={`${item.id}input`}
                                        value={item.title}
                                        onChange={(event) => {
                                            handleInput(event, item.id)
                                        }}
                                    /> : item.title}
                                actions={[
                                    item.editing ?
                                        <SaveOutlined
                                            key={`${item.id}save`}
                                            onClick={() => handleSave(item.id, item.content, item.title,item.weight)}
                                        /> : <EditOutlined key={`${item.id}edit`} onClick={() => handleEdit(item.id)}/>,
                                    <DeleteOutlined key={`${item.id}delete`} onClick={() => showConfirm(item.id)}/>,
                                ]}
                            >
                                {item.editing ?
                                    <>
                                        weight:<Input
                                        style={{width:`100px`,marginBottom:`10px`,marginLeft:`5px`}}
                                        key={`${item.id}weight`}
                                        value={isNaN(item.weight)?'':item.weight}
                                        onChange={(event) => {
                                            handleWeight(event, item.id)
                                        }}
                                    />
                                        <ReactQuill
                                            theme="snow"
                                            value={item.content}
                                            onChange={(value) => {
                                                handleQuill(value, item.id)
                                            }}
                                        />
                                    </>
                                    :
                                    <>
                                        <Tag color={"geekblue"} >{item.weight}</Tag>
                                        <div style={{overflow:`auto`,height: `260px`}} dangerouslySetInnerHTML={{__html: item.content}}/>
                                    </>
                                }
                            </Card>
                        </Badge.Ribbon>
                    </List.Item>
                )}
            />
            <Row justify={"end"} style={{marginTop:`10px`}}>
                <Tag color={"green"} >首页访问数:{count}</Tag>
                <Tag color={"gold"} style={{marginLeft:`10px`}}>API调用数:{view}</Tag>
            </Row>
            <Button type={'primary'} onClick={handleAdd}>新增公告</Button>
            {contextHolder}
        </>
    );
}
export default BulletinBoard;