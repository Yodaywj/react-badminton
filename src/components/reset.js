import {Button, Col, Form, Input, message, Modal, Radio, Row} from 'antd';
import React, {useEffect, useState} from 'react';
import {getCaptcha} from "../services/userInfoLoader";
const Reset = ({ open, onCreate, onCancel,user,text}) => {
    // const expirationTime = Date.now() + 60000;
    // localStorage.setItem('expirationTime', expirationTime);
    const expirationTime = localStorage.getItem('expirationTime');
    const remainingTime = expirationTime - Date.now();
    const [form] = Form.useForm();
    const [isCounting,setIsCounting] = useState(!!remainingTime);
    const [countdown, setCountdown] = useState(isCounting?Math.floor(remainingTime/1000):60);
    const [mail,setMail] = useState(user?user.mail:'');
    useEffect(() => {
        let timer = null;
        if (isCounting) {
            timer = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
        }

        if (countdown <= 0) {
            clearInterval(timer);
            setIsCounting(false);
            setCountdown(60);
            localStorage.removeItem('expiration');
        }

        return () => clearInterval(timer);
    }, [countdown, isCounting]);
    const getResetCaptcha = (mail,validate,form)=>{
        const expirationTime = Date.now() + 60000;
        localStorage.setItem('expirationTime', expirationTime);
        if (form.getFieldError("email").length === 0&& mail.trim() !== ''){
            setIsCounting(true);
            if (text === '快速登录'){
                getCaptcha(mail, 'login').then();
            }else getCaptcha(mail, 'reset').then();
        }else {
            message.error("请填写正确格式的邮箱").then()
        }
    }
    return (
        <Modal
            open={open}
            title={text}
            okText={text==="快速登录"?'登录':'重置'}
            cancelText="取消"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields(["captcha"]);
                        onCreate(values);
                    })
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    email:user?user.mail:'',
                }}
            >
                <Form.Item
                    extra={text==="快速登录"?"登录后自动注册":''}
                    name="email"
                    label="邮箱"
                    rules={[
                        {
                            type: 'email',
                            message: '该邮箱不合法',
                        },
                        {
                            required: true,
                            message: '请输入邮箱',
                        },
                    ]}
                >
                    <Input allowClear={true} onChange={(event)=>{setMail(event.target.value)}}/>
                </Form.Item>
                {text === "快速登录"?<></>:<Form.Item
                    name="password"
                    label="密码"
                    rules={[
                {
                    required: true,
                    message: '请输入8位以上的密码,至少包括一个字母和数字',
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[^\s]{8,15}$/,
                },
                    ]}
                hasFeedback
            >
                <Input.Password allowClear={true}/>
            </Form.Item>}
                <Form.Item label="验证码">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                name="captcha"
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the captcha you got!',
                                    },
                                ]}
                            >
                                <Input maxLength={6}/>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Button size={"middle"} disabled={isCounting} onClick={()=>{
                                getResetCaptcha(mail,form.isFieldsValidating,form)
                            }}>
                                {isCounting?`${countdown}秒后重新获取`:'获取验证码'}
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Reset;