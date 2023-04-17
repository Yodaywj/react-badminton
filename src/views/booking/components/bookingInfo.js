import {Button, Col, Descriptions, Form, InputNumber, List, Modal, Row, Space, DatePicker, message} from "antd";
import {LikeOutlined, MessageOutlined, StarOutlined} from "@ant-design/icons";
import stadium from "../../../assets/badminton-stadium.png";
import React, {useState} from "react";
import axios from "axios";
import {ROOT_URL} from "../../../utils/constant";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import TextArea from "antd/es/input/TextArea";
import {bookCourt} from "../../../services/bookingLoader";
dayjs.extend(customParseFormat);
const disabledDate = (current) => {
    const today = dayjs().startOf('day');
    return current && current < today;
}
const IconText = ({icon, text}) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
const CollectionCreateForm =  ({open, onCreate,form,onCancel}) => {
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
                        onCreate(values);
                    })
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
            >
                <Form.Item
                    name="time"
                    label="时间"
                    rules={[
                        {
                            required:true,
                        }
                    ]}
                >
                    <DatePicker
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={disabledDate}
                        showTime={{
                            defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="duration"
                    label="时长"
                    rules={[
                        {
                            message:`时长范围为1-24`,
                            type:"number",
                            max:24,
                            min:1,
                        },
                    ]}
                >
                    <InputNumber style={{width:`120px`}} min={1} max={24} addonAfter={'小时'}/>
                </Form.Item>
                <Form.Item
                    name="remarks"
                    label="备注"
                >
                    <TextArea
                        autoSize={{
                            minRows: 2,
                            maxRows: 2,
                        }}
                        showCount={true}
                        maxLength={30}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}
const BookingInfo = ({setStadiums,sum,stadiums,isFilter,user})=>{
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [currentBooking, setCurrentBooking] = useState();
    const onCreate = (values)=> {
        values = {...values,time:values.time.format("YYYY-MM-DD HH:mm:ss"),username:user.username,stadiumId:currentBooking,courtId:0,state:'预订中',}
        setOpen(false);
        bookCourt(values).then(response=>{
            if (response.result){
                message.success(response.message);
            }else {
                message.error(response.message);
            }
        })
    }
    const onChange = (page,pageSize) => {
        if (!isFilter){
            axios.get(`${ROOT_URL}/booking/enquiry?page=${page}&size=${pageSize}`).then(response => {
                setPageSize(pageSize)
                setStadiums(response.data.stadiums);
                setCurrent(page);
            })
        } else {
            setCurrent(page);
        }
    };
    return(
        <>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    showSizeChanger:false,
                    current:current,
                    pageSize: pageSize,
                    total:sum,
                    showQuickJumper:true,
                    onChange:onChange,
                }}
                dataSource={stadiums}
                renderItem={(item) => (

                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o"/>,
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
                        ]}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src={stadium}
                            />
                        }
                    >
                        <List.Item.Meta
                            description={
                            <>
                                <Descriptions
                                    title={`我的场馆`}
                                    bordered
                                    extra={
                                        <Row>
                                            <Space size={"middle"}>

                                            </Space>
                                        </Row>
                                    }
                                    column={{
                                        xxl: 4,
                                        xl: 3,
                                        lg: 3,
                                        md: 3,
                                        sm: 2,
                                        xs: 1,
                                    }}
                                >
                                    <Descriptions.Item label="场馆名">{item.stadiumName}</Descriptions.Item>
                                    <Descriptions.Item label="省份">{item.province}</Descriptions.Item>
                                    <Descriptions.Item label="城市">{item.city}</Descriptions.Item>
                                    <Descriptions.Item label="详细地址">{item.address}</Descriptions.Item>
                                    <Descriptions.Item label="场地数量">{item.courtNumber}</Descriptions.Item>
                                    <Descriptions.Item label="电话">{item.phone}</Descriptions.Item>
                                    <Descriptions.Item label="备注">{item.remarks}</Descriptions.Item>
                                </Descriptions>
                                <Row>
                                    <Col push={20}>
                                        <Button onClick={()=> {
                                            setCurrentBooking(item.id)
                                            setOpen(true)
                                        }} type={"primary"} style={{marginTop:`50px`}}>预订</Button>
                                    </Col>
                                </Row>
                            </>}
                        />
                    </List.Item>
                )}
            />
            <CollectionCreateForm
                form={form}
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </>
    )
}
export default BookingInfo;