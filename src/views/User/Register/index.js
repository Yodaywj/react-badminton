import {
    Alert,
    Button,
    Checkbox,
    Col,
    Form,
    Input,
    Row,
    Select,
} from 'antd';
import MyNotification from "./notification";
import {SmileOutlined} from "@ant-design/icons";
import React, {useEffect, useRef, useState} from "react";
import generateCode from "../../../utils/captcha";
import drawCaptcha from "../../../utils/generateCaptchaImage";
import {ROOT_URL} from "../../../utils/constant";
import axios from "axios";
import {Navigate} from "react-router-dom";

const {Option} = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const Register = () => {
    //Validation
    const [code, setCode] = useState(generateCode)
    const [isShown, setIsShown] = useState(false)
    const [success,setSuccess] = useState(false);
    const canvasRef = useRef(null);
    const [errorText, setErrorText] = useState('')
    const [username, setUsername] = useState('')
    const handleClick = () => {
        setCode(generateCode());
        drawCaptcha(200, 50, code, canvasRef)
    }
    useEffect(() => {
        drawCaptcha(200, 50, code, canvasRef)
    }, [code]);
    const [form] = Form.useForm();
//Transfer the information of form
    const onFinish = (values) => {
        if (values.captcha.toUpperCase() === code.toUpperCase()) {
            const newUser = {
                username: values.username,
                mail: values.email,
                gender: 'male',
                nickname: values.nickname || values.username,
                password: values.password,
                phone: values.phone,
            }
            const url = `${ROOT_URL}/user/register`;
            axios.post(url, newUser)
                .then(response => {
                    console.log(response)
                    if (response.data.result) {
                        setUsername(newUser.username);
                        setSuccess(true);
                    }
                    else {
                        handleClick();
                        setIsShown(true);
                        setErrorText('用户名已存在');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            setErrorText("验证码错误")
            setIsShown(true);
            handleClick();
        }
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    return (
    <Col span={24}>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    prefix: '86',
                }}
                style={{
                    maxWidth: 600,
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="E-mail"
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
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: '请输入8-15位字母开头的的用户名,仅包括数字、字母和下划线',
                            pattern: /^[a-zA-Z]\w{7,14}$/,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: '请输入8位以上的密码,至少包括一个字母和数字',
                            pattern: /^(?=.*[A-Za-z])(?=.*\d)[^\s]{8,15}$/,
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请确认密码',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次密码不一致'));
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    name="nickname"
                    label="Nickname"
                    tooltip="What do you want others to call you?"
                    rules={[
                        {
                            message: '昵称仅允许由3-12位汉字、数字、字母和下划线组成',
                            whitespace: true,
                            pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_]{3,12}$/,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item label="Captcha" extra="Click to change, no case sensitive">
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
                    </Row>
                </Form.Item>
                <Form.Item>
                    <Row>
                        <Col span={12} offset={12} onClick={handleClick}>
                            <canvas ref={canvasRef} width={200} height={50} style={{cursor: "pointer"}}/>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the <MyNotification
                        description={
                            `This is a website created by Yang Wenjun.
                            Click the agreement means you have known that`
                        }
                        message={`Tip`}
                        icon={<SmileOutlined style={{color: '#108ee9'}}/>}
                    />
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Row>
                        <Col push={12}>
                            {isShown && <Alert message={errorText} type="error" showIcon closable
                                               afterClose={() => setIsShown(false)}/>}
                        </Col>
                    </Row>
                </Form.Item>
                {success && <Navigate to="/user/success" state={{
                    message:`您的用户名为${username}`,
                    title:'注册成功',
                    homePath:'/',
                    loginPath:'/user/login',
                }} />}
            </Form>
        </Col>
    );
};
export default Register;