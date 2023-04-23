import { Button, Result } from 'antd';
import {Link} from "react-router-dom";
const FiveZeroZero = () => (
    <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Link to={'/'}><Button type="primary">回到首页</Button></Link>}
    />
);
export default FiveZeroZero;