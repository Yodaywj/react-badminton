import React from 'react';
import {Col, Row, Layout, Avatar, Dropdown} from "antd";
import logo from "../assets/badminton-icon.svg";
import '../styles/header.css'
import {Link} from "react-router-dom";
import {GithubOutlined, UserOutlined} from "@ant-design/icons";
import {UserDropdown} from "../components/userDropdown";

export const MyHeader = ({user}) => {
    const logoWidth = 2;
    const {Header} = Layout;
    return (
        <Header className={'header'}>
            <Row style={{height: "8vh"}} align={"middle"}>
                <Col span={logoWidth} style={{height: "80%"}}>
                    <Link to={`/`}>
                        <img className={`logo`} src={logo} alt={`logo`}/>
                    </Link>
                </Col>
                <Col span={24-logoWidth}>
                    <Row justify={"end"}>
                        <Col>
                            <UserDropdown user = {user}/>
                        </Col>
                        <Col>
                            <a href={`https://github.com/Yodaywj`} className={`my-a`} target={`_blank`}>
                                <div className={`badge-1 relative`}>
                                    <Avatar size={35} className={`Avatar-git all-center`}  icon={<GithubOutlined/>}></Avatar>
                                </div>
                            </a>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Header>
    )
}