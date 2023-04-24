import courtImage from "../../../../assets/badminton-court-2d.png";
import {
    Button,
    Col,
    Descriptions,
    Form,
    Image,
    Statistic,
    Modal,
    Row,
    Radio,
    InputNumber,
    message,
    Drawer,
    Tag,
} from "antd";
import {List} from 'antd';
import React, {useState} from 'react';
import switchLight from "../../../../services/switchLight";
import setNewCourt from "../../../../services/setNewCourt";
import {bookingsForCourt} from "../../../../services/bookingLoader";
const Courts = ({data,stadiumId}) => {
    const [form] = Form.useForm();
    const [switchAll, setSwitchAll] = useState(`已关闭`)
    const {Countdown} = Statistic;
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState({})
    const [openSetting,setOpenSetting] = useState(false);
    const [bookingDetail,setBookingDetail] = useState(<></>);
    const bookingDetails = async (stadiumId,id)=>{
        await bookingsForCourt(stadiumId,id).then(response=>{
            setBookingDetail(
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        pageSize: 3,
                    }}
                    dataSource={response.bookings}
                    renderItem={(item) => (
                        <List.Item
                            key={item.id}
                        >
                            <Descriptions column={1}>
                                <Descriptions.Item label="用户">{item.username}</Descriptions.Item>
                                <Descriptions.Item label="时间">{item.time}</Descriptions.Item>
                                <Descriptions.Item label="时长">{item.duration}</Descriptions.Item>
                                <Descriptions.Item label="状态">{item.state}</Descriptions.Item>
                                <Descriptions.Item label="备注">{item.remarks}</Descriptions.Item>
                            </Descriptions>
                        </List.Item>
                    )}
                />
            )
        })
        setOpen(true)
    }
    const transformTag = (state)=>{
        let newState;
        if (state === '空闲'){
            newState = <Tag color={"green"}>空闲</Tag>;
        }else if (state === '使用中'){
            newState = <Tag color={"blue"}>使用中</Tag>;
        }else if (state === '已预订'){
            newState = <Tag color={"purple"}>已预订</Tag>;
        }else newState = <Tag color={"red"}>error</Tag>;
        return newState
    }
    const onCreate = async (values) => {
        let {hour,minute} = values;
        if (hour<10){
            hour = `0${hour}`
        }else {
            hour = hour.toString();
        }
        if (minute<10){
            minute = `0${minute}`
        }else {
            minute = minute.toString();
        }
        const newCountdown = `${hour}:${minute}:00`
        const newCourt = {
            id:editing.id,
            stadiumId:editing.stadiumId,
            light:editing.light,
            countdown:newCountdown,
            state:values.state,
        };
        await setNewCourt(newCourt).then(response=>{
            if (response.result){
                newCourt.state = transformTag(newCourt.state)
                let {countdown} = response
                console.log(countdown)
                countdown = Date.now()+Number(countdown)*1000;
                setCourts(courts.map(current => {
                    if (current.id === editing.id) {
                        return {...newCourt,countdown:countdown}
                    } else return current;
                }))
                message.success(response.message);
            }else {
                message.error(response.message);
            }
        })
        setOpenSetting(false);
    };
    data = data.map(item=>{
        const newState = transformTag(item.state);
        return {...item,state:newState}
    })
    const [courts, setCourts] = useState(data);
    const controlLight = async (stadiumId,id,light) => {
        light = light === "开启中"? "已关闭":"开启中";
        await switchLight(stadiumId,id,light).then(result=>{
            if (result.result){
                if (id === 0){
                    setSwitchAll(switchAll === "开启中"? "已关闭":"开启中")
                    setCourts(courts.map(current => {
                        return {...current, light: light};
                    }))
                }else {
                    setCourts(courts.map(current => {
                        if (current.id === id) {
                            return {...current, light: light};
                        } else return current;
                    }))
                }
                message.success(result.message);
            }else {
                message.error(result.message);
            }
        })
    }
    return (
        <>
            <Drawer closable={false} title={`预订`} open={open} onClose = {()=>{setOpen(false)}}>
                {bookingDetail}
            </Drawer>
            <Row justify={"end"}>
                <Button
                        type={switchAll === "已关闭"? 'default':'primary'}
                        onClick={() => controlLight(stadiumId,0,switchAll)}>
                    {switchAll === "已关闭"? '一键开启':'一键关闭'}
                </Button>
            </Row>
            <List
                itemLayout={`vertical`}
                size="large"
                grid={{
                    gutter: 20,
                    column: 2,
                }}
                pagination={{
                    pageSize: 6,
                }}
                dataSource={courts}
                renderItem={(item) => (
                    <List.Item
                        style={{marginBottom: `50px`}}
                        key={item.id}
                    >
                        <Row justify="space-between">
                            <Col xs={{ span: 0}} lg={{ span: 12}}>
                                <Image
                                    height={500}
                                    src={courtImage}
                                    preview={false}
                                />
                            </Col>
                            <Col xs={{ span: 24}} lg={{ span: 12}}>
                                <Row>
                                    <Descriptions
                                        title={`场地 ${item.id}`}
                                        bordered
                                        column={1}
                                    >
                                        <Descriptions.Item label="状态">
                                            {item.state}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="倒计时">
                                            <Countdown value={item.countdown}/>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="灯控">{
                                            item.light==='开启中'?
                                                <Tag color={"cyan"}>{item.light}</Tag>:
                                                <Tag>{item.light}</Tag>
                                        }
                                        </Descriptions.Item>
                                        <Descriptions.Item label="预订时间">
                                            <Button type={"dashed"} onClick={()=>{bookingDetails(item.stadiumId,item.id)}}>详情</Button>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Row>
                                <Row style={{marginTop:`50px`}}>
                                    <Button style={{marginRight:`10px`}}
                                            type={item.light === "已关闭"? 'default':'primary'}
                                            onClick={() => controlLight(item.stadiumId,item.id,item.light)}>
                                        {item.light === "开启中"? '关闭':'开启'}
                                    </Button>
                                    <Button onClick={() => {
                                        setOpenSetting(true);
                                        setEditing(item)
                                    }}>设置</Button>
                                </Row>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
            <Modal
                centered={true}
                open={openSetting}
                title="场地设置"
                okText="确认"
                cancelText="取消"
                onCancel={() => setOpenSetting(false)}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            onCreate(values);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{hour:0,minute:0,state:`空闲`}}
                >
                    <Form.Item name="state" label="状态" rules={[
                        {
                            required: true,
                            message: '请选择场地状态',
                        },
                    ]}>
                        <Radio.Group
                            buttonStyle="solid"
                        >
                            <Radio.Button value="空闲">空闲</Radio.Button>
                            <Radio.Button value="使用中">使用中</Radio.Button>
                            <Radio.Button value="已预订">已预订</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="倒计时">
                        <Row>
                            <Col span={5}>
                                <Form.Item name="hour" rules={[
                                    {
                                        type:"number",
                                        required: true,
                                        message: '选择范围为0-23',
                                        max:23,
                                        min:0,
                                    },
                                ]}>
                                    <InputNumber max={99} min={-1} addonAfter="时"/>
                                </Form.Item>
                            </Col>
                            <Col push={1} span={5}>
                                <Form.Item name="minute"  rules={[
                                    {
                                        type:"number",
                                        required: true,
                                        message: '选择范围为0-59',
                                        max:59,
                                        min:0,
                                    },
                                ]}>
                                    <InputNumber max={99} min={-1} addonAfter="分"/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
export default Courts;