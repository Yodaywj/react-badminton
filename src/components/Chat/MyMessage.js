import React from "react";
import {Avatar, Col, Row, Tooltip} from "antd";
import {UserOutlined} from "@ant-design/icons";

const MyMessage = ({ message,name,avatar }) => {
    return (
        <Row justify={"end"} style={{marginTop:`10px`,marginBottom:`10px`}}>
            <Col style={{marginRight:`5px`}}>
                <div className={`my-message`}>
                    {message}
                </div>
            </Col>
            <Col>
                <Tooltip title={name}>
                    <Avatar size={38} shape="square" style={{ backgroundColor: '#87d068'}} icon={<UserOutlined />} />
                </Tooltip>
            </Col>
        </Row>
    );
};

export default MyMessage;
