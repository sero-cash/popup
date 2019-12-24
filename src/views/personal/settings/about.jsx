import React, {Component} from 'react'
import {Icon, List, NavBar} from "antd-mobile";
import {lang, url} from "../../../config/common";
import sero from "../../../logo.png";
import './about.css'

const urls = [
    {
        name: "Website",
        value:"https://sero.cash",
        url: "https://sero.cash"
    }, {
        name: "GitHub",
        value:"https://github.com/sero-cash/",
        url: "https://github.com/sero-cash/"
    }, {
        name: "Twitter",
        value:"@SEROdotCASH",
        url: ""
    }, {
        name: "Wechat",
        value:"@SERO9413",
        url: ""
    }]

class AboutUs extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {

    }

    checkUpdate(){
        //TODO wap2app其它初始化代码

        /************升级检测代码开始********** */
        const ua = navigator.userAgent;
        //Html5Plus环境，但不是流应用环境
        if(ua.indexOf('Html5Plus')>-1 && ua.indexOf('StreamApp')==-1){
            let url = "http://sero-cash.gitee.io/popup";//检查更新地址
            const localUtc = new Date().getTimezoneOffset() / 60;
            if (localUtc === -8){

            }



            var req = {//升级检测数据
                "appid": plus.runtime.appid,
                "version": plus.runtime.version
            };

            wap2app.ajax.get(url, req, function(rsp) {
                if(rsp && rsp.status){
                    //需要更新，提示用户
                    plus.nativeUI.confirm(rsp.note, function(event) {
                        if(0 == event.index) {//用户点击了“立即更新”按钮
                            plus.runtime.openURL(rsp.url);
                        }
                    }, rsp.title, ["立即更新", "取　　消"]);
                }
            });
        }
        /************升级检测代码结束********** */
    }

    render() {

        let abouts = [];
        let i=0;
        urls.forEach(function (o) {
            abouts.push(
                <List.Item key={i++} extra={<span style={{color:"#0066cc",flexBasis: "60%"}} onClick={() => {
                    if(o.url){
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
                        <div style={{color:"#888"}}>v1.0.4</div>
                    </div>
                    <List>
                        {abouts}
                    </List>
                </div>
            </div>
        )
    }
}

export default AboutUs