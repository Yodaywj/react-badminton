import {Button, Descriptions, Drawer, message, Modal, Popconfirm, Row, Space, Table, Tag} from 'antd';
import {useLoaderData} from "react-router-dom";
import {getStadium} from "../../../services/stadiumDetailLoader";
import React, {memo, useContext, useEffect, useState} from "react";
import {deleteBooking} from "../../../services/bookingLoader";
import {tableScroll} from "../../../utils/constant";
import {AppContext} from "../../../index";

const MyBooking = () => {
    const screenWidth = useContext(AppContext);
    let {bookingMessage, result, myBooking} = useLoaderData();
    const nameFilter = Array.from(new Set(myBooking.map((item) => item.stadiumName))).map((name) => {
            return { text: name, value: name };
        })

    const [bookingData, setBookingData] = useState(myBooking);
    const [modal, contextHolder] = Modal.useModal();
    const [open, setOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null)
    const cancelBooking = async (id)=>{
        await deleteBooking(id).then(response=>{
            const {result,info} = response;
            if (result){
                message.success(info);
                setBookingData(bookingData.filter(item=>item.id!==id))
            }else {
                message.error(info);
            }
        })
    }
    const onClose = () => {
        setOpen(false);
    };
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
    const showStadium = (stadiumId) => {
        getStadium(stadiumId).then(response => {
            const {stadium} = response
            if (response.result){setDrawerContent(
                <Descriptions
                    // layout={`vertical`}
                    bordered
                    extra={
                        <Row>
                            <Space size={"middle"}>

                            </Space>
                        </Row>
                    }
                    column={1}
                >
                    <Descriptions.Item label="场馆名">{stadium.stadiumName}</Descriptions.Item>
                    <Descriptions.Item label="省份">{stadium.province}</Descriptions.Item>
                    <Descriptions.Item label="城市">{stadium.city}</Descriptions.Item>
                    <Descriptions.Item label="详细地址">{stadium.address}</Descriptions.Item>
                    <Descriptions.Item label="场地数量">{stadium.courtNumber}</Descriptions.Item>
                    <Descriptions.Item label="电话">{stadium.phone}</Descriptions.Item>
                    <Descriptions.Item label="备注">{stadium.remarks}</Descriptions.Item>
                </Descriptions>)}else {
                setDrawerContent(<h3>{response.message}</h3>)
            }
            setOpen(true);
        })
    }
    const columns = [
        {
            title: '场馆名',
            dataIndex: 'stadiumName',
            key: 'stadiumName',
            filters: nameFilter,
            filterSearch: true,
            onFilter: (value, record) => record.stadiumName === value,
            render: (text, record) => {
                return (
                    <Button style={{padding: 0}} type={`link`} onClick={() => {
                        showStadium(record.stadiumId)
                    }}>{text}</Button>
                )
            }
        },
        {
            title: '场地号',
            dataIndex: 'courtId',
            key: 'courtId',
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
            title: '时长(小时)',
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
                        return <Tag color={"red"}>预订失败</Tag>;
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
                    <Popconfirm
                        title={`取消预订`}
                        description={`确认取消预订吗?`}
                        onCancel={()=>{cancelBooking(record.id)}}
                        okText="否"
                        cancelText="是"
                        okType={"default"}
                        cancelButtonProps={{type:"primary"}}
                    >
                        <Button type={"link"} style={{padding: 0}}>取消</Button>
                    </Popconfirm>
                )
            },
        },
    ];
    useEffect(()=>{
        if (!result){
            message.error(bookingMessage);
        }
    },[])
    return (
        <>
            {contextHolder}
            <Drawer width={screenWidth>720?378:screenWidth} closable={screenWidth<720} title="场馆信息" placement="right" onClose={onClose} open={open}>
                {drawerContent}
            </Drawer>
            <Table scroll={tableScroll} columns={columns} dataSource={bookingData} rowKey={(record) => record.id}/>
        </>
    )
};
export default MyBooking;