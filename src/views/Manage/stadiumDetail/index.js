import {Tabs} from 'antd';
import {useLoaderData} from "react-router-dom";
import Member from "./components/member";

const onChange = (key) => {
    console.log(key);
};
const StadiumDetail = () => {
    const {members,stadiumId} = useLoaderData();
    const items = [
        {
            label: '会员管理',
            key: '1',
            children: <Member members={members} stadiumId={stadiumId}/>,
        },
        {
            label: '场地管理',
            key: '2',
            children: 'Tab 2',
        },
    ]
    return (
        <Tabs
            defaultActiveKey="1"
            items={items}
        />
    );
}
export default StadiumDetail;