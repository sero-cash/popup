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
                        <div style={{color:"#888"}}>v1.0.1</div>
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