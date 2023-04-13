import {Avatar, Button, Descriptions, Drawer, message, Popconfirm, Table, Tag, Modal} from 'antd';
import React, {useEffect, useState} from "react";
import EditMember from "./editMember";
import axios from "axios";
import {ROOT_URL} from "../../../../utils/constant";
import {ExclamationCircleFilled, UserOutlined} from "@ant-design/icons";
import { MenuOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './member.css'

const {confirm} = Modal
const Row = ({ children, ...props }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props['data-row-key'],
    });
    const style = {
        ...props.style,
        transform: CSS.Transform.toString(
            transform && {
                ...transform,
                scaleY: 1,
            },
        )?.replace(/translate3d\(([^,]+),/, 'translate3d(0,'),
        transition,
        ...(isDragging
            ? {
                position: 'relative',
                zIndex: 9999,
            }
            : {}),
    };
    return (
        <tr {...props} ref={setNodeRef} style={style} {...attributes}>
            {React.Children.map(children, (child) => {
                if (child.key === 'sort') {
                    return React.cloneElement(child, {
                        children: (
                            <MenuOutlined
                                ref={setActivatorNodeRef}
                                style={{
                                    touchAction: 'none',
                                    cursor: 'move',
                                }}
                                {...listeners}
                            />
                        ),
                    });
                }
                return child;
            })}
        </tr>
    );
};
const Member = ({members,stadiumId}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [open, setOpen] = useState(false);
    const [showInfo, setShowInfo] = useState(false)
    const [editing, setEditing] = useState([false,{}]);
    const [drawerContent , setDrawerContent] = useState('')
    const [drawerMemberName , setDrawerMemberName] = useState('')
    const [newMembers,setNewMembers] = useState(members);
    const [userExist,setUserExist] = useState(false);
    const [userInfo,setUserInfo] = useState({})
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            setTableMembers((previous) => {
                const activeIndex = previous.findIndex((i) => i.memberName === active.id);
                const overIndex = previous.findIndex((i) => i.memberName === over?.id);
                return arrayMove(previous, activeIndex, overIndex);
            });
        }
    };
    const showDrawer = (remarks,memberName) => {
        setDrawerContent(remarks);
        setDrawerMemberName(`${memberName}的备注`)
        setOpen(true);
    };
    const showUserInfo = async (memberName)=> {
        await axios.get(`${ROOT_URL}/user/showUserInfo/?memberName=${memberName}`).then(response => {
            if (response.data.user){
                setUserExist(true);
                setUserInfo(response.data.user);
            }else {
                setUserExist(false);
                setUserInfo({message:`该会员非本站注册用户`,username:memberName})
            }
        }).catch(error => {
            message.error(error.message);
        })
        setShowInfo(true);
    }
    const closeInfo = ()=>{
        setShowInfo(false)
    }
    const handleEdit = (item)=> {
        setEditing([true,item]);
    }
    const onClose = () => {
        setOpen(false);
    }
    const [levelFilter,setLevelFilter] = useState(newMembers.map((item)=>{
        item = {text:item.level,value: item.level}
        return item;
    }))
    const [memberNameFilter,setMemberNameFilter] = useState(newMembers.map((item)=>{
        item = {text:item.tableMemberName,value: item.tableMemberName}
        return item;
    }))
    useEffect(()=>{
        setMemberNameFilter(newMembers.map((item)=>{
            item = {text:item.memberName,value: item.memberName}
            return item;
        }));
        setLevelFilter(newMembers.map((item)=>{
            item = {text:item.level,value: item.level}
            return item;
        }))
    },[newMembers])
    const columns = [
        {
            key: 'sort',
        },
        {
            title: '用户名',
            dataIndex: 'tableMemberName',
            filters: memberNameFilter,
            filterSearch: true,
            onFilter: (value, record) => record.memberName.indexOf(value) === 0,
        },
        {
            title: '开始时间',
            dataIndex: 'startTime',
            sorter: (a, b) => a.startTime - b.startTime,
        },
        {
            title: '过期时间',
            dataIndex: 'expiredTime',
            sorter: (a, b) => a.expiredTime - b.expiredTime,
        },
        {
            title: '余额(元)',
            dataIndex: 'balance',
            sorter: (a, b) => a.balance - b.balance,
        },
        {
            title: '会员等级',
            dataIndex: 'level',
            filters: levelFilter,
            onFilter: (value, record) => record.level.indexOf(value) === 0,
        },
        {
            title: '备注',
            dataIndex: 'remarks',
        },
        {
            title: '操作',
            dataIndex: 'action',
        },
    ];
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };
    const confirmDelete = async (memberName,stadiumId) => {
        memberName = [memberName]
        await axios.delete(`${ROOT_URL}/member/delete/${stadiumId}/${memberName}`).then(response=>{
            if (response.data.result){
                message.success(response.data.message);
                setTableMembers(tableMembers.filter(item=>item.memberName!==memberName[0]))
            }else {
                message.error(response.data.message);
            }
        }).catch(error=>{
            message.error(error.message);
        })
    };
    const updateMembers = ()=> {
        return newMembers.map((item) => {
            const {remarks, memberName} = item
            item = {
                ...item,
                tableMemberName: <Button type={"link"} onClick={()=>showUserInfo(memberName)}>{memberName}</Button>,
                preRemarks: remarks,
                remarks:
                    <Tag className={`tag-btn`} color={"geekblue"} onClick={() => showDrawer(remarks, memberName)}>
                        详情
                    </Tag>,
                action:
                    <>
                        <Tag className={`tag-btn`} color={"blue"} onClick={() => handleEdit(item)}>
                            编辑
                        </Tag>
                        <Popconfirm
                            title="删除会员"
                            description="确定删除该会员的信息吗?"
                            onConfirm={() => confirmDelete(item.memberName, item.stadiumId)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Tag className={`tag-btn`} color={"magenta"}>
                                删除
                            </Tag>
                        </Popconfirm>
                    </>,
            }
            return item
        });
    }
    const [tableMembers,setTableMembers] = useState(updateMembers());
    useEffect(()=>{
        setTableMembers(updateMembers());
    },[newMembers])
    const handleAdd = ()=>{
        setEditing([true,'register',stadiumId])
    }
    const handleDeleteAll = (selectedRowKeys,stadiumId)=>{
        confirm({
            title: '一键删除会员信息',
            icon: <ExclamationCircleFilled />,
            content: `确认删除 ${selectedRowKeys} 的会员信息吗?`,
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            centered: true,
            onOk() {
                axios.delete(`${ROOT_URL}/member/delete/${stadiumId}/${selectedRowKeys}`).then(response=>{
                    if (response.data.result){
                        message.success(response.data.message);
                        setTableMembers(tableMembers.filter(item=>!selectedRowKeys.some(RowKey=>RowKey === item.memberName)))
                    }else {
                        message.error(response.data.message);
                    }
                }).catch(error=>{
                    message.error(error.message);
                })
            },
        });
    }
    return (
        <>
            <Drawer title={`${drawerMemberName}`} placement="right" onClose={onClose} open={open} closable={false}>
                <div dangerouslySetInnerHTML={{__html: drawerContent}}/>
            </Drawer>
            <Drawer title={<><Avatar style={{marginRight:'15px'}} icon={<UserOutlined/>}/>用户ID: {userInfo.username}</>}
                    placement="right"
                    onClose={closeInfo}
                    open={showInfo}
                    closable={false}>
                {userExist? <Descriptions
                    bordered
                    column={1}
                >
                    <Descriptions.Item label="昵称">{userInfo.nickname}</Descriptions.Item>
                    <Descriptions.Item label="手机">{userInfo.phone}</Descriptions.Item>
                    <Descriptions.Item label="邮箱">{userInfo.mail}</Descriptions.Item>
                    <Descriptions.Item label="性别">{userInfo.gender}</Descriptions.Item>
                </Descriptions>:<h3>{userInfo.message}</h3>
                }
            </Drawer>
            <DndContext onDragEnd={onDragEnd}>
                <SortableContext
                    items={tableMembers.map((i) => i.memberName)}
                    strategy={verticalListSortingStrategy}
                >
                    <Table
                        rowSelection={rowSelection}
                        components={tableMembers.length !== 0?{
                        body: {
                            row: Row,
                        },
                    }:{}} columns={columns} dataSource={tableMembers} rowKey={`memberName`} pagination={{showQuickJumper:true}}/>
                </SortableContext>
            </DndContext>
            <Button
                onClick={handleAdd}
                type="primary"
                style={{marginRight:`15px`}}
            >
                添加会员
            </Button>
            {selectedRowKeys.length !== 0 &&
                <Button
                    onClick={()=>handleDeleteAll(selectedRowKeys,stadiumId)}
                    type="default"
                    danger={true}
                >
                    一键删除
                </Button>
            }
            <EditMember editing={editing} setEditing={setEditing} newMembers={newMembers} setNewMembers={setNewMembers}/>
        </>
    )
}
export default Member;