import {Button, Result} from 'antd';
import {Link} from "react-router-dom";
const Warning = () => (
    <Result
        status="warning"
        title="There are some problems with your operation."
        extra={<Button type="primary"><Link to={'/'}>Back Home</Link></Button>}
    />
);
export default Warning;