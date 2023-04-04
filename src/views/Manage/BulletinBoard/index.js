import {Button, Card, Input, List, Badge, message} from 'antd';
import {DeleteOutlined, EditOutlined, SaveOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import ReactQuill from "react-quill";
import {useLoaderData} from "react-router-dom";
import {ROOT_URL} from "../../../utils/constant";
import axios from "axios";
const BulletinBoard = () => {
    let {data} = useLoaderData();
    const newData = data.map(item => ({ ...item, editing: false }));
    const [loading, setLoading] = useState(true);
    const [bulletins ,setBulletins] = useState(newData);
    const [messageApi, contextHolder] = message.useMessage();
    const handleEdit = (id)=> {
        setBulletins(bulletins.map((item)=>{
            if (item.id === id) {
                return { ...item, editing: true };
            } else {
                return item;
            }
        }))
    }
    const handleSave = (id,content,title)=> {
        const url = `${ROOT_URL}/bulletin-board/save`;
        const data = {id:id, content:content,title:title}
        axios.post(url, data).then(response => {
            if (response.data.result){
                messageApi.open({
                    type: 'success',
                    content: response.data.message,
                })
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
        setBulletins(bulletins.map((item)=>{
            if (item.id === id) {
                return { ...item, editing: false };
            } else {
                return item;
            }
        }))
    }
    const handleInput = (event,id)=>{
        setBulletins(bulletins.map((newItem)=>{
            if (newItem.id === id) {
                return { ...newItem, title: event.target.value };
            } else {
                return newItem;
            }
        }))
    }
    const handleQuill = (value,id)=>{
        setBulletins(bulletins.map((newItem)=>{
            if (newItem.id === id) {
                return { ...newItem, content: value };
            } else {
                return newItem;
            }
        }))
    }
    const handleDelete = async (id)=> {
        const url = `${ROOT_URL}/bulletin-board/delete/${id}`
        await axios.delete(url).then(response => {
            if (response.data.result){
                messageApi.open({
                    type: 'success',
                    content: response.data.message,
                })
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
        setBulletins(bulletins.filter(item => item.id !== id))
    }
    const handleAdd =  async ()=> {
        const urlAdd = `${ROOT_URL}/bulletin-board/add`
        const urlShow = `${ROOT_URL}/bulletin-board/show`
        await axios.put(urlAdd).then(response => {
            if (response.data.result){
                messageApi.open({
                    type: 'success',
                    content: response.data.message,
                })
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
        await axios.get(urlShow,{withCredentials:true}).then(response => {
            const newData = response.data.bulletin;
            let addedItems = newData.filter((item) => !data.some((oldItem) => oldItem.id === item.id));
            data = newData;
            addedItems = addedItems.map(item => ({ ...item, editing: true }));
            setBulletins(bulletins.concat(addedItems))
        }).catch(error => {
            messageApi.open({
                type: 'error',
                content: error.message,
            })
        })

    }
    useEffect(() => {
        setLoading(false);
    }, []);
    return(
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
                    simple : true,
                    pageSize : 8,
                }}
                dataSource={bulletins}
                renderItem={(item) => (
                    <List.Item>
                        <Badge.Ribbon text={item.time}>
                            <Card
                                loading={loading}
                                title={item.editing?
                                    <Input
                                        key={`${item.id}input`}
                                        value={item.title}
                                        onChange={(event) => { handleInput(event, item.id) }}
                                    />: item.title}
                                actions={[
                                    item.editing?
                                        <SaveOutlined
                                            key={`${item.id}save`}
                                            onClick={()=>handleSave(item.id,item.content,item.title)}
                                        />:<EditOutlined key={`${item.id}edit`} onClick={()=>handleEdit(item.id)}/>,
                                    <DeleteOutlined key={`${item.id}delete`} onClick={()=>handleDelete(item.id)}/>,
                                ]}
                            >
                                {item.editing?
                                    <ReactQuill
                                        theme="snow"
                                        value={item.content}
                                        onChange={(value) => { handleQuill(value, item.id) }}
                                    />
                                    :
                                    <div dangerouslySetInnerHTML={{__html:item.content}} />
                                }
                            </Card>
                        </Badge.Ribbon>
                    </List.Item>
                )}
            />
            <Button type={'primary'} onClick={handleAdd}>新增公告</Button>
            {contextHolder}
        </>
    );
}
export default BulletinBoard;