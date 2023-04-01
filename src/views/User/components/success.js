import { Button, Result } from 'antd';
import {Link, useLocation} from "react-router-dom";
import React from "react";
import {useDispatch} from "react-redux";
import {login} from "../../../redux/userNavSlice";

const Success = () => {
    const {state:{title,message,homePath,loginPath}} = useLocation();
    const dispatch = useDispatch();
    return (
        <Result
            status="success"
            title={title}
            subTitle={message}
            extra={[
                <Button type="primary" key="console" onClick={()=>dispatch(login())}>
                        登录
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