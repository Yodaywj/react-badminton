import React from 'react';
import '../styles/footer.css'
import '../styles/layout.css'
import {Col, Row, Space} from "antd";

export const MyFooter = () => {
    return (
        <footer className={'footer'}>
            <Row justify={"center"} className={`h-100`} align={"middle"}>
                <Col style={{height:`70%`}}>
                    <Space direction="vertical" size="small">
                        <Row>
                <span className={'w-100'}>
                Ant Design ©2023
                </span>
                        </Row>
                        <Row>
                <span className={'w-100'}>
                Created by Yang Wenjun
                </span>
                        </Row>
                    </Space>
                </Col>
            </Row>
        </footer>
    )
}