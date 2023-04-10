import {Button, Drawer, message, Popconfirm, Table, Tag} from 'antd';
import {useEffect, useState} from "react";
import EditMember from "./editMember";
import axios from "axios";
import {ROOT_URL} from "../../../../utils/constant";

const Member = ({members,stadiumId}) => {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState([false,{}]);
    const [drawerContent , setDrawerContent] = useState('')
    const [drawerMemberName , setDrawerMemberName] = useState('')
    const [newMembers,setNewMembers] = useState(members);
    const showDrawer = (remarks,memberName) => {
        setDrawerContent(remarks);
        setDrawerMemberName(memberName)
        setOpen(true);
    };
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
        item = {text:item.memberName,value: item.memberName}
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
            title: '用户名',
            dataIndex: 'memberName',
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
    const confirmDelete = (memberName,stadiumId) => {
        axios.delete(`${ROOT_URL}/member/delete/${stadiumId}/${memberName}`,{
            data: {
                memberName:memberName,
                stadiumId:stadiumId,
            }
        }).then(response=>{
            if (response.data.result){
                message.success(response.data.message);
                setTableMembers(tableMembers.filter(item=>item.memberName!==memberName))
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
                preRemarks: remarks,
                remarks:
                    <Tag style={{cursor: `pointer`}} color={"geekblue"} onClick={() => showDrawer(remarks, memberName)}>
                        详情
                    </Tag>,
                action:
                    <>
                        <Tag style={{cursor: `pointer`}} color={"blue"} onClick={() => handleEdit(item)}>
                            编辑
                        </Tag>
                        <Popconfirm
                            title="删除会员"
                            description="确定删除该会员的信息吗?"
                            onConfirm={() => confirmDelete(item.memberName, item.stadiumId)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Tag style={{cursor: `pointer`}} color={"magenta"}>
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
    return (
        <>
            <Drawer title={`${drawerMemberName} 备注`} placement="right" onClose={onClose} open={open} closable={false}>
                <div dangerouslySetInnerHTML={{__html: drawerContent}}/>
            </Drawer>
            <Table columns={columns} dataSource={tableMembers} rowKey={`memberName`}/>
            <Button
                onClick={handleAdd}
                type="primary"

            >
                Add a row
            </Button>
            <EditMember editing={editing} setEditing={setEditing} newMembers={newMembers} setNewMembers={setNewMembers}/>
        </>
    )
}
export default Member;