import {Button, Result} from 'antd';
import {Link} from "react-router-dom";
const Warning = () => (
    <Result
        status="warning"
        title="There are some problems with your operation."
        extra={<Link to={'/'}><Button type="primary">home</Button></Link>}
    />
);
export default Warning;