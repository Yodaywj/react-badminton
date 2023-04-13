import React from 'react';
import {Col, Row, Layout, Avatar, Switch, Image, Tooltip} from "antd";
import logo from "../assets/badminton-icon.svg";
import '../styles/header.css'
import {Link} from "react-router-dom";
import {GithubOutlined} from "@ant-design/icons";
import {UserDropdown} from "../components/userDropdown";
import stadiumIcon from "../assets/stadiumIcon.svg"

export const MyHeader = ({user}) => {
    const logoWidth = 2;
    const {Header} = Layout;
    return (
        <Header className={'header'}>
            <Row style={{height: "100%"}} align={"middle"}>
                <Col span={logoWidth} style={{height: "80%"}}>
                    <Link to={`/`}>
                        <img className={`logo`} src={logo} alt={`logo`}/>
                    </Link>
                </Col>
                <Col span={24-logoWidth}>
                    <Row justify={"end"}>
                        <Col>
                            <Tooltip title={`场地预订`}>
                                <Link to={`/booking`}>
                                    <div className={`badge-1 relative`}>
                                        <Avatar size={45} className={`Avatar-stadium all-center`}  icon={<Image preview={false} src={stadiumIcon}></Image>}></Avatar>
                                    </div>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col>
                            <UserDropdown user = {user}/>
                        </Col>
                        <Col>
                            <Tooltip title={`github项目地址`}>
                                <a href={`https://github.com/Yodaywj`} className={`my-a`} target={`_blank`}>
                                    <div className={`badge-1 relative`}>
                                        <Avatar size={35} className={`Avatar-git all-center`}  icon={<GithubOutlined/>}></Avatar>
                                    </div>
                                </a>
                            </Tooltip>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Header>
    )
}