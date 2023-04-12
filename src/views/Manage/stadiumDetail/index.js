import {Button, Tabs} from 'antd';
import {Link, useLoaderData} from "react-router-dom";
import Member from "./components/member";
import Courts from "./components/courts";
const StadiumDetail = () => {
    const {members,stadiumId,courtNumber} = useLoaderData();
    const items = [
        {
            label: '会员管理',
            key: '1',
            children: <Member members={members} stadiumId={stadiumId}/>,
        },
        {
            label: '场地管理',
            key: '2',
            children: <Courts courtNumber={courtNumber} stadiumId={stadiumId}/>,
        },
    ]
    return (
        <Tabs
            tabBarExtraContent={{left:<Link to={'/manage/stadium'}><Button style={{marginRight:`20px`}}>返回</Button></Link>}}
            defaultActiveKey="1"
            items={items}
        />
    );
}
export default StadiumDetail;