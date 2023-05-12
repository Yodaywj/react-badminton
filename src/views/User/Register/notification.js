import { notification } from 'antd';
const MyNotification = ({message,description,icon}) => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = ({message,description,icon}) => {
        api.open({
            duration: 8,
            message: message,
            description:description,
            icon: icon,
        });
    };
    return (
        <>
            {contextHolder}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a type="primary" onClick={()=>openNotification({message, description, icon})}>
                用户须知
            </a>
        </>
    );
};
export default MyNotification;