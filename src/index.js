import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {LocaleProvider} from 'antd-mobile';
import * as serviceWorker from './serviceWorker';
import * as syncWorker from './syncWorker';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import {appPlus} from "./components/app/app-plus";
import {config} from "./config/common";
import './index.css'


ReactDOM.render(
    <LocaleProvider locale={enUS}>
        <App/>
    </LocaleProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();

syncWorker.register();

appPlus.init();

setTimeout(function () {
    config.init()
    },1000
)

sessionStorage.clear();
