import React from 'react';
import {Col, Row,Layout} from "antd";
import logo from "../assets/badminton-icon.svg";
import '../styles/header.css'
import {Link} from "react-router-dom";

export const MyHeader = ({menu})=>{
    const logoWidth = 2;
    const {Header} = Layout;
    return(
            <Header className={'header'}>
                <Row>
                    <Col span={logoWidth} className={'h-100'}>
                        <Link to={`/`}>
                            <img className={`logo`} src={logo} alt={`logo`}/>
                        </Link>
                    </Col>
                    <Col span={6} offset={16} className={'h-100 vertical'}>
                        {menu}
                    </Col>
                </Row>
            </Header>
    )
}