import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Button, Checkbox, Col, Form, Input, message, Row} from 'antd';
import './index.css'
import {Link, Navigate} from "react-router-dom";
import axios from "axios";
import {ROOT_URL} from "../../../utils/constant";
import React, {useEffect, useRef, useState} from "react";
import Cookies from 'js-cookie';
import generateCode from "../../../utils/captcha";
import drawCaptcha from "../../../utils/generateCaptchaImage";
const Login = () => {
    const [success,setSuccess] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [handleClick, setHandleClick] = useState(()=>{});
    const [code, setCode] = useState(generateCode)
    const canvasRef = useRef(null);
    const handleCaptchaClick = () => {
        setCode(generateCode());
        drawCaptcha(200, 50, code, canvasRef)
    }
    useEffect(() => {
        drawCaptcha(200, 50, code, canvasRef)
    }, [code]);
    const msgSuccess = () => {
        messageApi.open({
            type: 'success',
            content: '登录成功',
        });
    };

    const errorWrong = () => {
        messageApi.open({
            type: 'error',
            content: '登录失败，用户名或密码不正确',
        });
    };
    const errorNull = () => {
        messageApi.open({
            type: 'error',
            content: '验证码错误',
        });
    };
    const onFinish = (values) => {
        if (values.captcha.toUpperCase() === code.toUpperCase()) {
            const url = `${ROOT_URL}/user/login`;
            axios.post(url,values,{withCredentials:true}).then(response => {
                if (response.data.result){
                    // if (values.remember){
                    //     Cookies.set('auth', response.data.token, { expires: 7 });
                    // }
                    setHandleClick(msgSuccess);
                    setTimeout(()=>{setSuccess(true)},1000);
                }else {
                    setHandleClick(errorWrong)
                    handleCaptchaClick();
                }
            }).catch(error => {
                console.log(error);
                handleCaptchaClick();
            })
        }else {
            setHandleClick(errorNull)
            handleCaptchaClick();
        }
    };
    return (
        <Col span={12}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: false,
                }}
                onFinish={onFinish}
                size={'large'}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                        {
                            message: '用户名格式不正确',
                            pattern: /^[a-zA-Z]\w{7,14}$/,
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                        {
                          pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/,
                          message:'密码格式不正确',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item extra="点击图片切换，不区分大小写">
                    <Row>
                        <Col span={10}>
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
                        <Col span={10} offset={1} onClick={handleCaptchaClick}>
                            <canvas ref={canvasRef} width={200} height={50} style={{cursor: "pointer"}}/>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>7天免密登录</Checkbox>
                    </Form.Item>

                    <Link className="login-form-forgot" to={'/'}>
                        忘记密码
                    </Link>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleClick}>
                        登录
                    </Button>
                </Form.Item>
                {contextHolder}
                {success && <Navigate to="/" />}
            </Form>
        </Col>
    );
};
export default Login;