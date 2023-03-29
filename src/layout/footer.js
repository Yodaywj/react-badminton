import React from 'react';
import '../styles/footer.css'
import '../styles/layout.css'
import {Row, Space,Layout} from "antd";
export const MyFooter = ()=>{
    const {Footer} = Layout;
    return(
            <Footer className={'footer'}>
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
            </Footer>
    )
}