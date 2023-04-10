import {Badge, Card, List} from "antd";
import React from "react";

export default function BulletinList ({bulletins}){
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
                pageSize : 6,
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