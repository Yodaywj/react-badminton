import {Button, Cascader, Form, Input, InputNumber, message, Modal, Row, Tag} from 'antd';
import {useState} from 'react';
import TextArea from "antd/es/input/TextArea";
import {ROOT_URL} from "../../../../utils/constant";
import axios from "axios";
import cities from '../../../../utils/cities'
import deleteCourts from "../../../../services/deleteCourts";
const options = cities;

const CollectionCreateForm =  ({open, onCreate, onCancel, name, form}) => {


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
                        />
                    </Form.Item>
                    <Form.Item
                        extra={<Tag style={{marginTop:`3px`}} color={`red`}>更改场地数量将重置场地状态</Tag>}
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
    const [form] = Form.useForm();

    const onCreate = async (values) => {
        const {area:[province,city], ...rest} = values;
        values = {
            id: stadium.id,
            province: province,
            city: city,
            ...rest
        };
        if (name === '编辑'){
            if (stadium.courtNumber !== values.courtNumber){
                await deleteCourts(values.id);
            }
            await axios.post(`${ROOT_URL}/courts/pushNewCourts`, {stadiumId:values.id,number:values.courtNumber}).catch(error => {
                messageApi.open({
                    type: 'error',
                    content: error.message,
                })
            })
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
            let id;
            await axios.post(`${ROOT_URL}/stadium/add`,values,{withCredentials:true}).then(response => {
                if (response.data.result){
                    id = response.data.id
                    messageApi.open({
                        type: 'success',
                        content: response.data.message,
                    })
                    values = {...values,id: id,owner:response.data.username}
                    setData([{...values},...stadiumData]);
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
            await axios.post(`${ROOT_URL}/courts/pushNewCourts`, {stadiumId:id,number:values.courtNumber}).catch(error => {
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
                    form.setFieldsValue({
                        stadiumName : stadium.stadiumName,
                        area : name==='新增场馆'?[]:[stadium.province,stadium.city],
                        courtNumber:stadium.courtNumber,
                        address:stadium.address,
                        phone:stadium.phone,
                        remarks:stadium.remarks,
                    })
                }}
            >
                {name}
            </Button>
            <CollectionCreateForm
                form={form}
                name={name}
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </div>
    );
};
export default EditStadium;