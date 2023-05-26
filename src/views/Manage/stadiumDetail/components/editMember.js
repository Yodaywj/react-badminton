import {Button, Col, DatePicker, Drawer, Form, Input, InputNumber, message, Row, Space} from 'antd';
import ReactQuill from "react-quill";
import React, {useContext} from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import axios from "axios";
import {ROOT_URL} from "../../../../utils/constant";
import locale from "antd/locale/zh_CN";
import {AppContext} from "../../../../index";

dayjs.extend(customParseFormat);
const EditMember = ({editing,setEditing,newMembers,setNewMembers}) => {
    const screenWidth = useContext(AppContext);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const onClose = () => {
        setEditing([false,{}]);
    };
    const handleSubmit = ()=> {
        form.submit();
    }
    const onFinish = async (values)=> {
        const startTime = values.dateTime[0].format(`YYYY-MM-DD`);
        const expiredTime = values.dateTime[1].format(`YYYY-MM-DD`);
        delete values.dateTime;
        if (editing[1]==='register'){
            const member = {...values, stadiumId:editing[2], startTime:startTime,expiredTime:expiredTime}
            await axios.post(`${ROOT_URL}/member/add`,member).then(response=>{
                if (response.data.result){
                    setNewMembers([member,...newMembers])
                    console.log(newMembers)
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
            }).catch(error=>{
                messageApi.open({
                    type: 'error',
                    content: error.message,
                })
            })
        }else {
            const member = {...values, memberName: editing[1].memberName, stadiumId:editing[1].stadiumId, startTime:startTime,expiredTime:expiredTime}
            await axios.patch(`${ROOT_URL}/member/edit`,member).then(response=>{
                if (response.data.result){
                    setNewMembers(newMembers.map(item=>{
                        if (item.memberName === editing[1].memberName){
                            return member;
                        }else {
                            return item;
                        }
                    }))
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
            }).catch(error=>{
                messageApi.open({
                    type: 'error',
                    content: error.message,
                })
            })
        }
        setEditing([false,{}]);
    }

    const fillForm = ()=>{
        form.setFieldsValue({
            balance:editing[1].balance,
            level:editing[1].level,
            dateTime:[dayjs(editing[1].startTime),dayjs(editing[1].expiredTime)],
            remarks:editing[1].preRemarks,
        })
    }
    return (
        <>
            {contextHolder}
            <Drawer
                title={editing[1]==='register'?`新增会员`:`编辑${editing[1].memberName}的会员信息`}
                width={screenWidth>720?720:screenWidth}
                onClose={onClose}
                open={editing[0]}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        {editing[1]!=='register'&&<Button type="link" onClick={fillForm}>
                            填写原信息
                        </Button>}
                        <Button onClick={()=>form.resetFields()}>重置</Button>
                        <Button onClick={handleSubmit} type="primary">
                            提交
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" onFinish={onFinish} form={form}
                >
                    {editing[1]==='register'&&<Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="memberName"
                                label="用户名"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名',
                                    },
                                ]}
                            >
                                <Input style={{width:`100%`}} placeholder="请输入用户名"/>
                            </Form.Item>
                        </Col>
                    </Row>}
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="balance"
                                label="余额"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入余额',
                                    },
                                ]}
                            >
                                <InputNumber style={{width:`100%`}} placeholder="请输入余额"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="level"
                                label="会员等级"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入会员等级',
                                    },
                                ]}
                            >
                                <Input placeholder="请输入会员等级"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="dateTime"
                                label="会员期限"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择日期',
                                    },
                                ]}
                            >
                                <DatePicker.RangePicker
                                    locale={locale}
                                    style={{
                                        width: '100%',
                                    }}
                                    getPopupContainer={(trigger) => trigger.parentElement}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="remarks"
                                label="备注"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入备注',
                                    },
                                ]}
                            >
                                <ReactQuill
                                    theme="snow"
                                    placeholder={`请输入备注`}
                                    style={{minHeight:`300px`}}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};
export default EditMember;