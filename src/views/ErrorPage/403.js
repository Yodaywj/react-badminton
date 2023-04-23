import { Button, Result } from 'antd';
import {Link} from "react-router-dom";
const FourZeroThree = () => (
    <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Link to={'/'}><Button type="primary">回到首页</Button></Link>}
    />
);
export default FourZeroThree;