import React, { useState, useEffect } from 'react';
import {CheckOutlined, CopyOutlined} from "@ant-design/icons";

function Icon() {
    const [icon, setIcon] = useState(<CopyOutlined/>);

    const handleClick = () => {
        setIcon(<CheckOutlined/>);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIcon(<CopyOutlined/>);
        }, 1500);

        return () => {
            clearTimeout(timeout);
        };
    }, [icon]);

    return (
        <div onClick={handleClick}>
            {icon}
        </div>
    );
}

export default Icon;
