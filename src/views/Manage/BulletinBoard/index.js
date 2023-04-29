import {Button, Card, Input, List, Badge, message, Modal, Row, Tag} from 'antd';
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

const BulletinBoard = () => {
    const deepData = useContext(UserContext);
    const user = deepData[0];
    let {data,count,view} = useLoaderData();
    const newData = data.map(item => ({...item, editing: false}));
    const [bulletins, setBulletins] = useState(newData);
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
                handleDelete(id)
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
    const handleSave = (id, content, title) => {
        const url = `${ROOT_URL}/bulletin-board/save`;
        const data = {id: id, content: content, title: title}
        axios.post(url, data).then(response => {
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
        setBulletins(bulletins.map((item) => {
            if (item.id === id) {
                return {...item, editing: false};
            } else {
                return item;
            }
        }))
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
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                pagination={{
                    simple: true,
                    pageSize: 6,
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
                                            onClick={() => handleSave(item.id, item.content, item.title)}
                                        /> : <EditOutlined key={`${item.id}edit`} onClick={() => handleEdit(item.id)}/>,
                                    <DeleteOutlined key={`${item.id}delete`} onClick={() => showConfirm(item.id)}/>,
                                ]}
                            >
                                {item.editing ?
                                    <ReactQuill
                                        theme="snow"
                                        value={item.content}
                                        onChange={(value) => {
                                            handleQuill(value, item.id)
                                        }}
                                    />
                                    :
                                    <div style={{overflow:`auto`,height: `260px`}} dangerouslySetInnerHTML={{__html: item.content}}/>
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