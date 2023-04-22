import {UserContext} from "../index";
import {useContext, useState} from "react";
import {Button, Descriptions, Form, Input, message, Radio, Row} from "antd";
import {editUser} from "../../../services/userInfoLoader";

const UserInfo = ()=>{
    const deepData = useContext(UserContext);
    const user = deepData[0];
    const setUserInfo = deepData[1];
    const {form} = Form.useForm();
    const [isEditing,setIsEditing] = useState(false);
    const {mail,username,nickname,phone,gender} = user
    const editInfo = ()=>{
        setIsEditing(!isEditing);
    }
    const onFinish = (values)=>{
        const user = {...values,username:username}
        editUser(user).then(response=>{
            if (response.result){
                message.success(response.message);
                setUserInfo(response.newUser)
                setIsEditing(false);
            }else {
                message.error(response.message)
            }
        })
    }
    return (
        <>
            {!isEditing?
                <Descriptions title="个人信息" column={2}>
                    <Descriptions.Item label="用户名">{username}</Descriptions.Item>
                    <Descriptions.Item label="昵称">{nickname}</Descriptions.Item>
                    <Descriptions.Item label="邮箱">{mail}</Descriptions.Item>
                    <Descriptions.Item label="手机号">{phone}</Descriptions.Item>
                    <Descriptions.Item label="性别">{gender === 'male'? '男':'女'}</Descriptions.Item>
                </Descriptions>:
                <Form form={form} onFinish={onFinish} style={{maxWidth:`500px`}}
                      initialValues={{
                          nickname:nickname,
                          mail:mail,
                          phone:phone,
                          gender:gender,
                      }}
                >
                    <Form.Item name={`nickname`} label="昵称"
                               rules={[
                                   {
                                       required:true,
                                       message: '昵称仅允许由3-12位汉字、数字、字母和下划线组成',
                                       whitespace: true,
                                       pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_]{3,12}$/,
                                   },
                               ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name={`mail`} label="邮箱"
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
                        <Input />
                    </Form.Item>
                    <Form.Item name={`phone`} label="手机号"
                               rules={[
                                   {
                                       required: true,
                                       message: '手机格式错误',
                                       pattern: /^\d{1,15}$/,
                                   },
                               ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name={`gender`} label="性别">
                        <Radio.Group>
                            <Radio value="male"> 男 </Radio>
                            <Radio value="female"> 女 </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type={"primary"}>提交</Button>
                    </Form.Item>
                </Form>
            }
            <Row style={{marginTop:`50px`}}>
                <Button>重置密码</Button>
                <Button style={{marginLeft:`20px`}} type={"primary"} onClick={()=>editInfo()}>{isEditing?`取消`:`编辑信息`}</Button>
            </Row>
        </>
    );
}

export default UserInfo;