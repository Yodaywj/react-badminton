import {Badge, Card, List} from "antd";
import React, {useEffect, useState} from "react";

export default function BulletinList ({bulletins}){
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [pageSize , setPageSize] = useState(6)
    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(()=>{
        if (screenWidth < 1200){
            setPageSize(4);
        } else setPageSize(6)
    },[screenWidth])
    return(
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
            }}
            pagination={{
                simple : true,
                pageSize : pageSize,
            }}
            dataSource={bulletins}
            renderItem={(item) => (
                <List.Item>
                    <Badge.Ribbon text={item.time}>
                        <Card
                            title={item.title}
                        >
                            {
                                <div style={{minHeight:`200px`}} dangerouslySetInnerHTML={{__html:item.content}} />
                            }
                        </Card>
                    </Badge.Ribbon>
                </List.Item>
            )}
        />
    )
}