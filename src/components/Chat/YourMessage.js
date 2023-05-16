import React from "react";
import {Avatar, Col, Row, Tooltip} from "antd";
import {UserOutlined} from "@ant-design/icons";

const YourMessage = ({name,message,avatar})=> {
    return (
        <Row align={"middle"} style={{marginTop:`10px`,marginBottom:`10px`}}>
            <Col>
                <Tooltip title={name}>
                    <Avatar icon={<UserOutlined />} />
                </Tooltip>
            </Col>
            <Col style={{marginLeft:`5px`}}>
                <div className={`your-message`}>
                    {message}
                </div>
            </Col>
        </Row>
    );
}

export default YourMessage;
