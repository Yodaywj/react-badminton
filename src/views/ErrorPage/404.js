import { Button, Result } from 'antd';
import {Link} from "react-router-dom";
const FourZeroFour = () => (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link to={'/'}><Button type="primary">回到首页</Button></Link>}
    />

);
export default FourZeroFour;