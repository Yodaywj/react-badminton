import {
    Button,
    Col,
    Descriptions,
    Form,
    InputNumber,
    List,
    Modal,
    Row,
    Space,
    DatePicker,
    message,
    Skeleton, Tooltip, Image
} from "antd";
import {CopyOutlined, LikeOutlined, MessageOutlined, StarFilled, StarOutlined} from "@ant-design/icons";
import stadium from "../../../assets/badminton-stadium.png";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {ROOT_URL} from "../../../utils/constant";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import TextArea from "antd/es/input/TextArea";
import {bookCourt} from "../../../services/bookingLoader";
import {AppContext} from "../../../index";
import Icon from "../../../components/icon";
import {addBookmark, deleteBookmark} from "../../../services/bookmark";
dayjs.extend(customParseFormat);
const disabledDate = (current) => {
    const today = dayjs().startOf('day');
    return current && current < today;
}
const IconText = ({icon, text}) => (
    <Space>
        {icon}
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
                            required:true,
                        },
                        {
                            message:`时长范围为0.5-24`,
                            type:"number",
                            max:24,
                            min:0.5,
                        },
                    ]}
                >
                    <InputNumber style={{width:`120px`}} min={0} max={99} addonAfter={'小时'}/>
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
const BookingInfo = ({setStadiums,sum,stadiums,isFilter,user,bookmarks})=>{
    const [myBookmarks,setMyBookmarks] = useState(bookmarks);
    const [loadIMG,setLoadIMG] = useState(true)
    const screenWidth = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [currentBooking, setCurrentBooking] = useState([]);
    const [loading, setLoading] = useState(true);
    const markBooking = (id,star)=>{
        if (star){
            setMyBookmarks([...myBookmarks,id])
            if (user.username){
                addBookmark(user.username,id);
            }else message.info('请登录后收藏场馆').then();

        }else {
            setMyBookmarks(myBookmarks.filter(item=>item!==id))
            if (user.username){
                deleteBookmark(user.username,id);
            }else message.info('请登录后收藏场馆').then();
        }
    }
    useEffect(() => {
        setLoading(false)
    }, []);
    const onCreate = (values)=> {
        if (!user.username){
            message.error("请登录后预订")
        }else {
            values = {...values,time:values.time.format("YYYY-MM-DD HH:mm:ss"),
                id: null,
                username:user.username,
                stadiumId:currentBooking[0],
                stadiumName:currentBooking[1],
                courtId:0,
                state:'预订中',}
            form.resetFields();
            setOpen(false);
            message.loading("预订中",0).then();
            bookCourt(values).then(response=>{
                message.destroy();
                if (response.result){
                    message.success(response.message);
                }else {
                    message.error(response.message);
                }
            })
        }
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
                    <Skeleton loading={loading} active={true} avatar={true} paragraph={{rows:5}}>
                        <List.Item
                            key={item.id}
                            // actions={[
                                // <IconText icon={<StarOutlined  style={{fontSize:`20px`}}/>} key="list-vertical-star-o"/>,
                                // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
                                // <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
                            extra={
                                <>
                                    {loadIMG && <Skeleton/>}
                                    <Image
                                        style={{ display: !loadIMG ? 'block' : 'none' }}
                                        onLoad={()=>{setLoadIMG(false)}}
                                        width={screenWidth>700?272:0}
                                        alt="logo"
                                        src={stadium}
                                        placeholder={<Skeleton/>}
                                    />
                                </>
                            }
                        >
                            <List.Item.Meta
                                description={
                                <>
                                    <Descriptions
                                        title={<Tooltip title={
                                            <>
                                                <Row>
                                                    <Col span={22}>
                                                        {item.id}
                                                    </Col>
                                                    <Col span={2}
                                                         style={{cursor:"pointer",height:`50%`}}
                                                         onClick={()=>{
                                                             navigator.clipboard.writeText(item.id).then(r => {});
                                                         }}>
                                                        <Icon/>
                                                    </Col>
                                                </Row>
                                            </>
                                        }>查看编号</Tooltip>}
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
                                    <Row style={{marginTop:`75px`}}>
                                        <Col push={1}>
                                            {myBookmarks.includes(item.id)?
                                                <StarFilled key={`${item.id}filled`} onClick={()=>markBooking(item.id,false)}  style={{fontSize:`20px`,color:`gold`}}/>:
                                                <StarOutlined key={`${item.id}outlined`} onClick={()=>markBooking(item.id,true)}   style={{fontSize:`20px`}}/>
                                            }
                                        </Col>
                                        <Col push={20}>
                                            <Button onClick={()=> {
                                                setCurrentBooking([item.id,item.stadiumName])
                                                setOpen(true)
                                            }} type={"primary"}>预订</Button>
                                        </Col>
                                    </Row>
                                </>}
                            />
                        </List.Item>
                    </Skeleton>
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