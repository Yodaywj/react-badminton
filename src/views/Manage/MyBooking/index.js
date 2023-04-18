import {Space, Table} from 'antd';
import {useLoaderData} from "react-router-dom";

const columns = [
    {
        title: '场馆名',
        dataIndex: 'stadiumName',
        key: 'stadiumName',
        // render: (text) => <a>{text}</a>,
    },
    {
        title: '场地号',
        dataIndex: 'courtId',
        key: 'courtId',
    },
    {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: '时长',
        key: 'duration',
        dataIndex: 'duration',
    },
    {
        title: '状态',
        key: 'state',
        dataIndex: 'state',
        // render: (_, record) => (
        //     <Space size="middle">
        //         <a>Invite {record.name}</a>
        //         <a>Delete</a>
        //     </Space>
        // ),
    },
    {
        title: '备注',
        key: 'remarks',
        dataIndex: 'remarks',
    },
];
const MyBooking = () => {
    const {message,result,myBooking} = useLoaderData();
    console.log(myBooking)
    return(
        <Table columns={columns} dataSource={myBooking} />
    )
};
export default MyBooking;