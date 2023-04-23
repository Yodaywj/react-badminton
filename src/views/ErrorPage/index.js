import {useRouteError} from "react-router-dom"
import FourZeroThree from "./403";
import FourZeroFour from "./404";
import FiveZeroZero from "./500";
import Warning from "./warning";
import {Row} from "antd";

export default function ErrorPage() {
    const error = useRouteError();
    let page;
    switch (error.status) {
        case 403:
            page = <FourZeroThree />;
            break;
        case 404:
            page = <FourZeroFour />;
            break;
        case 500:
            page = <FiveZeroZero />;
            break;
        default:
            page = <Warning />;
    }
    return (
        <>
            <Row justify={"center"} align={"middle"} style={{height:`100vh`,width:`100vw`}}>
                {page}
            </Row>
        </>);
}
