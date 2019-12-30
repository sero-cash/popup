import React, {Component} from 'react'
import {Icon, List, NavBar} from "antd-mobile";
import {lang, url} from "../../../config/common";
import sero from "../../../logo.png";
import './about.css'

const urls = [
    {
        name: "Website",
        value: "https://sero.cash",
        url: "https://sero.cash"
    }, {
        name: "GitHub",
        value: "https://github.com/sero-cash/",
        url: "https://github.com/sero-cash/"
    }, {
        name: "Twitter",
        value: "@SEROdotCASH",
        url: ""
    }, {
        name: "Wechat",
        value: "@SERO9413",
        url: ""
    }]

class AboutUs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            version:"1.1.2"
        }
    }

    componentDidMount() {
        if(plus && plus.runtime){
            this.setState({
                version:plus.runtime.version
            })
        }
    }

    checkUpdate() {
        const that = this;
        const ua = navigator.userAgent;
        if (ua.indexOf('Html5Plus') > -1 && ua.indexOf('StreamApp') === -1) {
            let url = "http://popup-github.sero.cash/client.json";
            const localUtc = new Date().getTimezoneOffset() / 60;
            if (localUtc === -8) {
                url = "http://sero-cash.gitee.io/popup/client.json";
            }

            that.getReq(url,function (data,err) {
                if(data){
                    const rData = JSON.parse(data);
                    const rsp = rData[lang.e().key];
                    const version = rsp["version"];
                    console.log("latest version:"+version);
                    console.log("plus.runtime.version:"+plus.runtime.version);
                    if (version !== plus.runtime.version) {
                        plus.nativeUI.confirm(rsp["note"], function (event) {
                            if (0 === event.index) {
                                plus.runtime.openURL(rsp["url"]);
                            }
                        }, rsp["title"], [lang.e().button.update, lang.e().button.cancel]);
                    } else {
                        plus.nativeUI.alert(lang.e().toast.info.isLatest, function(){}, "SERO Popup", "OK");
                    }
                }
            })
        }
    }

    getReq(url,cb){
        const xhr = new plus.net.XMLHttpRequest();
        xhr.onreadystatechange = function () {
            switch ( xhr.readyState ) {
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                case 4:
                    if ( xhr.status === 200 ) {
                        cb(xhr.responseText,null);
                    } else {
                        cb(null,xhr.readyState);
                    }
                    break;
                default :
                    break;
            }
        }
        xhr.open( "GET", url);
        xhr.send();
    }


    render() {

        let abouts = [];
        let i = 0;
        urls.forEach(function (o) {
            abouts.push(
                <List.Item key={i++} arrow="horizontal" extra={<span style={{color: "#0066cc", flexBasis: "60%"}} onClick={() => {
                    if (o.url) {
                        url.goPage(url.browser(o.url))
                    }
                }}>{o.value}</span>}>{o.name}</List.Item>
            )
        })

        return (
            <div>
                <NavBar
                    mode="light"
                    leftContent={<Icon type="left" onClick={() => {
                        url.goBack()
                    }}/>}
                >
                    {lang.e().page.my.about}
                </NavBar>
                <div>
                    <div className="my-header"
                         style={{"height": document.documentElement.clientHeight * 0.15, padding: "30px 0px"}}>
                        <img src={sero} style={{width: "60px"}}/>

                    </div>
                    <List>
                        {abouts}
                        <List.Item key={i++} arrow="horizontal" onClick={
                            () => this.checkUpdate()
                        } extra={<span>{this.state.version}</span>}>Version</List.Item>
                    </List>
                </div>
            </div>
        )
    }
}

export default AboutUs