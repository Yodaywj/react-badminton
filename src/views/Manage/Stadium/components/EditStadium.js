import {Button, Cascader, Form, Input, InputNumber, message, Modal, Row} from 'antd';
import {useEffect, useState} from 'react';
import TextArea from "antd/es/input/TextArea";
import {ROOT_URL} from "../../../../utils/constant";
import axios from "axios";
import cities from '../../../../utils/cities'
const options = cities;

const CollectionCreateForm =  ({open, onCreate, onCancel, stadium,name,stadiumData}) => {
    const [form] = Form.useForm();


    return (
        <Modal
            open={open}
            okText="确认"
            cancelText="取消"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        if (name === '新增场馆'){
                            form.resetFields();
                        }
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                // initialValues={}
            >
                <Form.Item
                    name="stadiumName"
                    label="场馆名"
                    rules={[
                        {
                            required: true,
                            message: '请输入场馆名',
                        },
                    ]}

                >
                    <Input showCount={true}
                           maxLength={20}
                    />
                </Form.Item>
                <Row>
                    <Form.Item
                        name="area"
                        style={{marginRight: `20px`}}
                        label="省份/城市"
                        rules={[
                            {
                                required: true,
                                message: '请选择省份城市',
                            },
                        ]}
                    >
                        <Cascader
                            options={options}
                            placeholder="请选择"
                            style={{width:`200px`}}
                            onChange={(e)=>console.log(e)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="courtNumber"
                        label="场地数量"
                        rules={[
                            {
                                required: true,
                                message: '请选择场地数量',
                            },
                        ]}
                    >
                        <InputNumber min={1} max={100}/>
                    </Form.Item>
                </Row>
                <Form.Item name="address" label="详细地址">
                    <TextArea
                        autoSize={{
                            minRows: 2,
                            maxRows: 3,
                        }}
                        showCount={true}
                        maxLength={30}
                    />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="电话"
                    rules={[
                        {
                            required: true,
                            message: '请输入场馆联系电话',
                        },
                    ]}
                >
                    <Input showCount={true}
                           maxLength={15}/>
                </Form.Item>
                <Form.Item
                    name="remarks"
                    label="备注"
                >
                    <TextArea
                        autoSize={{
                            minRows: 2,
                            maxRows: 3,
                        }}
                        showCount={true}
                        maxLength={100}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
const EditStadium = ({stadium,name,stadiumData,setData}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [initialValues, setInitialValues] = useState([]);

    const onCreate = async (values) => {
        const {area:[province,city], ...rest} = values;
        values = {
            id: stadium.id,
            province: province,
            city: city,
            ...rest
        };
        if (name === '编辑'){
            await axios.post(`${ROOT_URL}/stadium/modify`,values).then(response => {
                if (response.data.result){
                    messageApi.open({
                        type: 'success',
                        content: response.data.message,
                    })
                    setData(stadiumData.map((item)=>{
                        if (item.id === values.id){
                            return {...values, owner:item.owner};
                        }else {
                            return item;
                        }
                    }))
                }else {
                    messageApi.open({
                        type: 'error',
                        content: response.data.message,
                    })
                }
            }).catch(error => {
                messageApi.open({
                    type: 'error',
                    content: error.message,
                })
            })
        }else if (name === '新增场馆'){
            await axios.post(`${ROOT_URL}/stadium/add`,values,{withCredentials:true}).then(response => {
                if (response.data.result){
                    messageApi.open({
                        type: 'success',
                        content: response.data.message,
                    })
                    values = {...values,id: response.data.id,owner:response.data.username}
                    setData([...stadiumData,{...values}]);
                }else {
                    messageApi.open({
                        type: 'error',
                        content: response.data.message,
                    })
                }
            }).catch(error => {
                messageApi.open({
                    type: 'error',
                    content: error.message,
                })
            })
        }
        setOpen(false);
    };
    return (
        <div>
            {contextHolder}
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                {name}
            </Button>
            <CollectionCreateForm
                name={name}
                stadium={stadium}
                open={open}
                stadiumData={stadiumData}
                setData={setData}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </div>
    );
};
export default EditStadium;