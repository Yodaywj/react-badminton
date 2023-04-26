import {Button, Cascader, Form, Input, InputNumber, Modal, Row, message} from 'antd';
import {useState} from 'react';
import cities from '../../../utils/cities'
import bookingFilter from "../../../services/bookingFilter";
const CollectionCreateForm =  ({open, onCreate,form,onCancel}) => {
    return(
        <Modal
            open={open}
            okText="确认"
            cancelText="取消"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        const {area,courtNumber,stadiumName} = values;
                        if (area === undefined || area === null){
                            values.area = ["0","0"]
                        }
                        if (courtNumber === undefined || courtNumber === null){
                            values.courtNumber = 0;
                        }
                        if (stadiumName === undefined || stadiumName === null){
                            values.stadiumName = '';
                        }
                        onCreate(values);
                    })
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
                            message: '场馆名不合法',
                            pattern:/^[\u4e00-\u9fa5a-zA-Z0-9]+$/,
                        },
                    ]}
                >
                    <Input showCount={true}
                           maxLength={20}
                           allowClear={true}
                    />
                </Form.Item>
                <Row>
                    <Form.Item
                        name="area"
                        style={{marginRight: `20px`}}
                        label="省份/城市"
                    >
                        <Cascader
                            options={cities}
                            placeholder="请选择"
                            style={{width: `200px`}}
                        />
                    </Form.Item>
                    <Form.Item
                        name="courtNumber"
                        label="场地数量"
                    >
                        <InputNumber min={1} max={100}/>
                    </Form.Item>
                </Row>
            </Form>
        </Modal>
    )
}
const Filter = ({sum,setNum,setIsFilter,setStadiums}) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const onCreate = async (values) => {
        const {area: [province, city], ...rest} = values;
        values = {
            province: province,
            city: city,
            ...rest
        };
        setOpen(false)
        bookingFilter(values).then(response=>{
            if (response.result){
                if (response.newStadiums.length === sum){
                    setIsFilter(false);
                }else {
                    setIsFilter(true);
                }
                setNum(response.newStadiums.length)
                setStadiums(response.newStadiums);
                message.success(response.message);
            }else {
                message.error(response.message);
            }
        })
    }
    return (
        <>
            <Button size={"large"} type={"default"} onClick={()=>setOpen(true)}>筛选</Button>
            <CollectionCreateForm
                form={form}
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </>
    );
};
export default Filter;