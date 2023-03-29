import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './test.css'
import Captcha from "../../utils/generateCaptchaImage";
const { Header, Content, Footer } = Layout;
const Test = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Captcha/>
    );
};
export default Test;
