import React, {useEffect, useState} from "react";
import {Button, Form, message, Modal, Popconfirm, Radio, Select, Space, Table, Tag} from "antd";
import {bookingManage, hideBooking, setBooking} from "../../../../services/bookingLoader";

const CreateForm =  ({open, onCreate,form,onCancel,options,bookingId}) => {
    return(
        <Modal
            open={open}
            okText="确认"
            cancelText="取消"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        values = {...values,id:bookingId}
                        onCreate(values);
                        onCancel();
                    })
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{courtId:0}}
            >
                <Form.Item
                    label={`状态`}
                    name="state"
                    rules={[
                        {
                            required:true
                        }
                    ]}
                >
                    <Radio.Group
                        buttonStyle="solid"
                    >
                        <Radio.Button value="预订中">预订中</Radio.Button>
                        <Radio.Button value="预订成功">预订成功</Radio.Button>
                        <Radio.Button value="预订失败">预订失败</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label={`场地号`}
                    name={`courtId`}
                    dependencies={['state']}
                    rules={[
                        {
                            required:true
                        }
                    ]}>
                    <Select
                        style={{
                            width: 120,
                        }}
                        options={options}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}
const BookingManage = ({stadiumId,courtsNum}) => {
    const [form] = Form.useForm();
    const [bookings,setBookings] = useState([])
    const [bookingId,setBookingId] = useState();
    useEffect(()=>{
        bookingManage(stadiumId).then(response=>{
            const data = response.bookings;
            setBookings(data);
        })
    },[])
    const [modal, contextHolder] = Modal.useModal();
    const [settingOpen,setSettingOpen] = useState(false);
    const deleteBooking = async (id)=>{
        await hideBooking(id).then(response=>{
            const {result,info} = response;
            if (result){
                message.success(info);
                setBookings(bookings.filter(item=>item.id!==id))
            }else {
                message.error(info);
            }
        })
    }
    function createCourtNum(length,type) {
        const arr = [];
        if (type === 'filter'){
            for (let i = 0; i <= length; i++) {
                const obj = {
                    text: i ,
                    value: i
                };
                arr.push(obj);
            }
        }else {
            for (let i = 0; i <= length; i++) {
                const obj = {
                    value: i ,
                    label: i
                };
                arr.push(obj);
            }
        }
        return arr;
    }
    const options = createCourtNum(courtsNum,'options');
    const courtIdFilter = createCourtNum(courtsNum,'filter')
    const finishSetting = async (values)=>{
        const {id,courtId,state} = values;
        await setBooking(id,courtId,state).then(response=>{
            if (response.result){
                message.success(response.resultMessage);
                setBookings(bookings.map(item=>{
                    if (item.id === id){
                        return {...item,courtId:courtId,state:state}
                    }else return item;
                }))
            }else {
                message.error(response.resultMessage)
            }
        })
    }
    const showRemarks = (remarks) => {
        modal.info({
            maskClosable: true,
            icon: <></>,
            title: '备注',
            content: (
                <>
                    {remarks}
                </>
            ),
        });
    }
    const columns = [
        {
            title: '场地号',
            dataIndex: 'courtId',
            key: 'courtId',
            filters: courtIdFilter,
            onFilter: (value, record) => record.courtId === value,
        },
        {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
            sorter: (a, b) => {
                const timeA = new Date(a.time).getTime();
                const timeB = new Date(b.time).getTime();
                return timeA - timeB;
            },
        },
        {
            title: '时长',
            key: 'duration',
            dataIndex: 'duration',
        },
        {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            filters: [
                {
                    text: '预订中',
                    value: '预订中',
                },
                {
                    text: '预订失败',
                    value: '预订失败',
                },
                {
                    text: '预订成功',
                    value: '预订成功',
                },
            ],
            onFilter: (value, record) => record.state === value,
            render: (text) => {
                switch (text) {
                    case '预订中':
                        return <Tag color={"green"}>预订中</Tag>;
                    case '预订成功':
                        return <Tag color={"blue"}>预订成功</Tag> ;
                    case '预订失败':
                        return <Tag color={"red"}>预订失败</Tag>
                    default:
                        return <Tag>未知</Tag>;
                }
            },
        },
        {
            title: '备注',
            key: 'remarks',
            dataIndex: 'remarks',
            render: (_, record) => {
                return (
                    <Button style={{padding: 0}} type={`link`} onClick={() => {
                        showRemarks(record.remarks)
                    }}>详情</Button>
                )
            }
        },
        {
            title: '操作',
            key: 'action',
            render:(_,record)=>{
                return(
                    <Space>
                        <Popconfirm
                            title={`删除预订`}
                            description={<><p>确认删除预订吗?</p><p>删除后用户将收到预订失败的消息</p></>}
                            onCancel={()=>{deleteBooking(record.id)}}
                            okText="否"
                            cancelText="是"
                            okType={"default"}
                            cancelButtonProps={{type:"primary"}}
                        >
                            <Button type={"link"} style={{padding: 0}}>删除</Button>
                        </Popconfirm>
                        <Button type={"link"} style={{padding: 0}} onClick={()=> {
                            setBookingId(record.id)
                            setSettingOpen(true);
                        }}>设置</Button>
                    </Space>
                )
            },
        },
    ];
    return (
        <>
            {contextHolder}
            <Table columns={columns} dataSource={bookings} rowKey={(record) => record.id}/>
            <CreateForm
                bookingId = {bookingId}
                options = {options}
                form={form}
                open={settingOpen}
                onCreate={finishSetting}
                onCancel={() => {
                    setSettingOpen(false);
                }}
            />
        </>
    )
};
export default BookingManage;