import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Button, Checkbox, Col, Form, Input} from 'antd';
import './index.css'
import {Link} from "react-router-dom";
import axios from "axios";
import {ROOT_URL} from "../../../utils/constant";
import {loader} from "../../../services/session";
const Login = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        // const loginData = {
        //     username: values.username,
        //     password: values.password,
        // }
        const url = `${ROOT_URL}/user/login`;
        axios.post(url,values,{withCredentials:true}).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
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
                            // pattern: /^[a-zA-Z]\w{7,14}$/,
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
                          // pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/,
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
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Link className="login-form-forgot" to={'/'}>
                        Forgot password
                    </Link>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Link to={`/user/register`}>
                        <Button>
                            注册
                        </Button>
                    </Link>
                </Form.Item>
            </Form>
        </Col>
    );
};
export default Login;