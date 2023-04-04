import {Button, Card, Input, List} from 'antd';
import {DeleteOutlined, EditOutlined, SaveOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import ReactQuill from "react-quill";
import {useLoaderData} from "react-router-dom";
import {ROOT_URL} from "../../../utils/constant";
import axios from "axios";
const BulletinBoard = () => {
    const {data} = useLoaderData();
    const newData = data.map(item => ({ ...item, editing: false }));
    const [loading, setLoading] = useState(true);
    const [bulletins ,setBulletins] = useState(newData);
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
            console.log(response);
        }).catch(error => {
            console.log(error)
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
            console.log(response);
        }).catch(error => {
            console.log(error)
        })
        setBulletins(bulletins.filter(item => item.id !== id))
    }
    const handleAdd =  ()=> {
        
        // setBulletins([...bulletins,{id:7,content:`7`,title:`7`}])
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
                        <Card
                            loading={loading}
                            title={item.editing?
                                <Input
                                    key={`${item.id}input`}
                                    showCount maxLength={20}
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
                    </List.Item>
                )}
            />
            <Button type={'primary'} onClick={handleAdd}>新增公告</Button>
        </>
    );
}
export default BulletinBoard;