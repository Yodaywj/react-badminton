import {
    Alert,
    Button,
    Checkbox,
    Col,
    Form,
    Input, message,
    Row,
    Select,
} from 'antd';
import MyNotification from "./notification";
import {SmileOutlined} from "@ant-design/icons";
import React, {useContext, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {getCaptcha, register, validateCaptcha} from "../../../services/userInfoLoader";
import {HeightContext} from "../index";

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
    const [countdown, setCountdown] = useState(60);
    const [isCounting,setIsCounting] = useState(false);
    const [mail,setMail] = useState('');
    const [isShown, setIsShown] = useState(false)
    const [success, setSuccess] = useState(false);
    const [errorText, setErrorText] = useState('')
    const [username, setUsername] = useState('')
    const height = useContext(HeightContext)
    const setHeight = height[1];
    const getRegisterCaptcha = (mail,validate,form)=>{
        if (form.getFieldError("email").length === 0&& mail.trim() !== ''){
            setIsCounting(true);
            getCaptcha(mail, 'register').then();
        }else {
            message.error("请填写正确格式的邮箱").then()
        }
    }
    useEffect(()=>{
        setHeight('register')
        return(()=>{
            setHeight('login')
        })
    },[])
    useEffect(() => {
        let timer = null;
        if (isCounting) {
            timer = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
        }

        if (countdown === 0) {
            clearInterval(timer);
            setIsCounting(false);
            setCountdown(60);
        }

        return () => clearInterval(timer);
    }, [countdown, isCounting]);
    const [form] = Form.useForm();
//Transfer the information of form
    const onFinish = async (values) => {
        let state = false;
        await validateCaptcha(values.email,"register",values.captcha).then(response=>{
            state = response.data.state;
        })
        if (state) {
            const newUser = {
                username: values.username,
                mail: values.email,
                gender: 'male',
                nickname: values.nickname || values.username,
                password: values.password,
                phone: values.phone,
            }
            register(newUser).then(response => {
                if (response.data.result) {
                    setUsername(newUser.username);
                    setSuccess(true);
                } else {
                    setIsShown(true);
                    setErrorText('用户名已存在');
                }
            }).catch(error => {
                console.log(error);
            });
        } else {
            setErrorText("验证码错误")
            setIsShown(true);
        }
    };
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
                    <Input allowClear={true} onChange={(event)=>{setMail(event.target.value)}}/>
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
                    <Input allowClear={true}/>
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
                    <Input.Password allowClear={true}/>
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
                    <Input.Password allowClear={true}/>
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
                    <Input allowClear={true}/>
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
                        <Col>
                            <Button disabled={isCounting} onClick={()=>{
                                getRegisterCaptcha(mail,form.isFieldsValidating,form)
                            }}>
                                {isCounting?`${countdown}秒后重新获取`:'获取验证码'}
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item>
                    <Row>

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
                    message: `您的用户名为${username}`,
                    title: '注册成功',
                    homePath: '/',
                    loginPath: '/user/login',
                }}/>}
            </Form>
        </Col>
    );
};
export default Register;