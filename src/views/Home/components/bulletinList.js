import {Badge, Card, Image, List, Modal} from "antd";
import React, {useEffect, useState} from "react";
import {UnorderedListOutlined} from "@ant-design/icons";
export default function BulletinList ({bulletins}){
    bulletins = bulletins.sort((a, b) => {
        if (a.weight === 0) {
            return 1;
        } else if (b.weight === 0) {
            return -1;
        } else {
            return a.weight - b.weight;
        }
    });
    // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    // const [pageSize , setPageSize] = useState(6)
    const showDetails = (title,content)=>{
        Modal.info({
            width:'800px',
            centered:true,
            icon:<UnorderedListOutlined/> ,
            maskClosable:true,
            title: title,
            content: <div style={{maxHeight:`500px`,overflow:"auto"}} dangerouslySetInnerHTML={{__html:content}} />,
        });
    }
    // useEffect(() => {
    //     function handleResize() {
    //         setScreenWidth(window.innerWidth);
    //     }
    //     window.addEventListener('resize', handleResize);
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);
    // useEffect(()=>{
    //     if (screenWidth < 1200){
    //         setPageSize(3);
    //     } else setPageSize(3)
    // },[screenWidth])
    return(
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 1,
                lg: 1,
                xl: 3,
                xxl: 3,
            }}
            pagination={{
                simple : true,
                pageSize : 3,
            }}
            dataSource={bulletins}
            renderItem={(item) => (
                <List.Item>
                    <Badge.Ribbon text={item.time}>
                        <Card
                            hoverable
                            onClick={()=>showDetails(item.title,item.content)}
                            title={item.title}

                        >
                            {
                                <div style={{
                                    overflow:"auto",
                                    height:`200px`}}
                                     dangerouslySetInnerHTML={{
                                         __html: `${item.content}`}} />
                            }
                        </Card>
                    </Badge.Ribbon>
                </List.Item>
            )}
        />
    )
}