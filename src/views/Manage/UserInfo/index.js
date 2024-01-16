import {UserContext} from "../index";
import {useContext, useEffect, useState} from "react";
import {Avatar, Button, Descriptions, Form, Image, Input, message, Radio, Row, Upload} from "antd";
import {editUser} from "../../../services/userInfoLoader";
import ResetButton from "../../../components/resetButton";
import ImgCrop from 'antd-img-crop';
import "./index.css"
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {ROOT_URL} from "../../../utils/constant";

const UserInfo = ()=>{
    const deepData = useContext(UserContext);
    const user = deepData[0];
    const setUserInfo = deepData[1];
    const avatar = deepData[2];
    const setUserAvatar = deepData[3];
    const {form} = Form.useForm();
    const [isEditing,setIsEditing] = useState(false);
    const {mail,username,nickname,phone,gender} = user
    const [imageUrl, setImageUrl] = useState();
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
    const blobToImage = (blob) => {
        return new Promise(resolve => {
            const url = URL.createObjectURL(blob)
            let img = new Image()
            img.onload = () => {
                URL.revokeObjectURL(url)
                resolve(img)
            }
            img.src = url
        })
    }
    /* 头像上传相关函数*/
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    useEffect(()=>{

    },[])
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!').then();
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
            message.error('Image must smaller than 5MB!').then();
        }
        return isJpgOrPng && isLt2M;
    };
    const [loading, setLoading] = useState(false);
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
                cursor:"pointer",
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    /* 头像上传相关函数*/
    return (
        <div id={"main-box"}>
            {!isEditing?
                <Descriptions title="个人信息" column={1}>
                    <Descriptions.Item>
                        <ImgCrop rotationSlider>
                            <Upload
                                style={{cursor:"pointer"}}
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={`${ROOT_URL}/user/uploadAvatar`}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                                data={{username:username}}
                            >
                                {!avatar ? (
                                    <img
                                        src={"http://localhost:8080/user/getAvatar/Neo_Young"}
                                        alt="avatar"
                                        style={{
                                            cursor:"pointer",
                                            width: '102%',
                                            borderRadius: '8px',
                                        }}
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                        </ImgCrop>
                    </Descriptions.Item>
                    <Descriptions.Item label="用户名">{username}</Descriptions.Item>
                    <Descriptions.Item label="昵称">{nickname}</Descriptions.Item>
                    <Descriptions.Item label="邮箱">{mail}</Descriptions.Item>
                    <Descriptions.Item label="手机号">{phone}</Descriptions.Item>
                    <Descriptions.Item label="性别">{gender === 'male'? '男':'女'}</Descriptions.Item>
                </Descriptions>:
                <Form form={form} onFinish={onFinish} style={{maxWidth:`500px`}}
                      initialValues={{
                          username:username,
                          nickname:nickname,
                          mail:mail,
                          phone:phone,
                          gender:gender,
                      }}
                >
                    <Form.Item
                        name="avatar"
                    >
                        <ImgCrop rotationSlider>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                        </ImgCrop>
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="用户名"
                    >
                        <Input disabled={true}/>
                    </Form.Item>
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
                        <Input allowClear={true}/>
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
                        <Input disabled={true}/>
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
                        <Input allowClear={true}/>
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
                <ResetButton text = {'重置密码'} user={user}/>
                <Button style={{marginLeft:`20px`}} type={"primary"} onClick={()=>editInfo()}>{isEditing?`取消`:`编辑信息`}</Button>
            </Row>
        </div>
    );
}

export default UserInfo;