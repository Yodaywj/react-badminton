import { Button, Result } from 'antd';
import {Link} from "react-router-dom";
const Failure = () => (
    <Result
        status="error"
        title="Submission Failed"
        subTitle="Please login to access."
        extra={
            <Link to={'/'}>
                <Button type="primary" key="console">
                    home
                </Button>,
            </Link>
        }
    >
    </Result>
);
export default Failure;