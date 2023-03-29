import { Button, Result } from 'antd';
import {Link, useLocation} from "react-router-dom";
import React from "react";

const Success = () => {
    const {state:{title,message,homePath,loginPath}} = useLocation();
    return (
        <Result
            status="success"
            title={title}
            subTitle={message}
            extra={[
                <Button type="primary" key="console">
                    <Link to={loginPath}>
                        登录
                    </Link>
                </Button>,
                <Button key="buy">
                    <Link to={homePath}>
                        返回首页
                    </Link>
                </Button>,
            ]}
        />
    );
};
export default Success;