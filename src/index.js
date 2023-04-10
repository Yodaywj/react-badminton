import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import router from "./router/router";
import {Provider} from "react-redux";
import store from "./store/store";
import './styles/global.css'
import './styles/text.css'
import {ConfigProvider} from "antd";
import locale from 'antd/locale/zh_CN';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider locale={locale}>
                <RouterProvider router={router}/>
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
);



