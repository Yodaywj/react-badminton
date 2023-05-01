import React, {createContext, useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import router from "./router/router";
import {Provider} from "react-redux";
import store from "./store/store";
import './styles/global.css'
import './styles/text.css'
import {ConfigProvider} from "antd";
import locale from 'antd/locale/zh_CN';

const AppContext = createContext(window.innerWidth);
const App = ()=>{
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return(
        <AppContext.Provider value={screenWidth}>
            <Provider store={store}>
                <ConfigProvider locale={locale}>
                    <RouterProvider router={router}/>
                </ConfigProvider>
            </Provider>
        </AppContext.Provider>
    )
}
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

export {AppContext}

