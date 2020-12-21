import React, {Component} from 'react'
import { WhiteSpace, Icon, List} from 'antd-mobile'
import Layout from "../layout/layout";
import './personal.css'
import { config, url, lang} from "../../config/common";
import sero from '../../logo.png'

class Personal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'my',
            hidden: false,
            fullScreen: false,
            helpUrl:"https://wiki.sero.cash/en/index.html?file=Tutorial/popup_QA",
        }
    }

    componentDidMount() {
       this.setHelpUrl();
    }

    setHelpUrl(){
        const tLang = lang.e().key;
        let helpUrl = "https://wiki.sero.cash/en/index.html?file=Tutorial/popup_QA";
        if (tLang === "zh_CN") {
            helpUrl="https://wiki.sero.cash/zh/index.html?file=Tutorial/popup_QA"
        } else if (tLang === "ja_JP") {
            helpUrl="https://wiki.sero.cash/en/index.html?file=Tutorial/popup_qa_jp"
        } else if (tLang === "be_BY") {
            helpUrl="https://wiki.sero.cash/en/index.html?file=Tutorial/popup_qa_rusia"
        } else if (tLang === "ko_KR") {
            helpUrl="https://wiki.sero.cash/en/index.html?file=Tutorial/popup_kr_qa"
        }
        this.setState({
            helpUrl:helpUrl
        })
    }

    render() {
        return <Layout selectedTab="my">
            <div style={{textAlign: 'center'}}>
                <div className="my-header" style={{"height": document.documentElement.clientHeight * 0.15, padding: "30px 0px"}}>
                    <img src={sero} style={{width:"60px"}}/>
                </div>
                <WhiteSpace size="lg"/>

                <div>
                    <div style={{background:"#f7f7f7"}}>
                        <List>
                            <List.Item
                                onClick={()=>{
                                    url.goPage(url.AddressList,url.Personal)
                                }}
                                arrow="horizontal"
                                thumb={<Icon type="iconAddressbook-" color="gray"/>}><span>{lang.e().page.my.addressBook}</span></List.Item>
                        </List>
                    </div>
                    <WhiteSpace size="lg"/>

                    <div style={{background:"#f7f7f7"}}>
                        <List>
                                <List.Item arrow="horizontal" thumb={<Icon type="iconwallet" color="gray"/>} onClick={()=>{
                                    url.goPage(url.WalletManager,url.Personal);
                                }} ><span>{lang.e().page.my.walletManage}</span></List.Item>
                        </List>
                    </div>
                    <WhiteSpace size="lg"/>

                    <div style={{background:"#f7f7f7"}}>
                            <List>
                                <List.Item arrow="horizontal" thumb={<Icon type="iconsetting" color="gray"/>} onClick={()=>{
                                    url.goPage(url.Settings,url.Personal);
                                }}><span >{lang.e().page.my.settings}</span></List.Item>
                                <List.Item arrow="horizontal" thumb={<Icon type="iconTermsofUse" color="gray"/>} onClick={()=>{
                                    url.goPage(url.browser(config.language==="zh_CN"?"termOfUse-cn.html":"termOfUse.html"),url.Personal)
                                }}
                                ><span >{lang.e().page.my.termOfUse}</span></List.Item>

                                <List.Item arrow="horizontal" thumb={<Icon type="iconfaq" color="gray"/>} onClick={()=>{
                                    url.goPage(url.browser(this.state.helpUrl),url.Personal)
                                }}><span >{lang.e().page.my.help}</span></List.Item>

                                <List.Item arrow="horizontal" thumb={<Icon type="iconaboutus" color="gray"/>} onClick={()=>{
                                    url.goPage(url.About,url.Personal)
                                }}><span >{lang.e().page.my.about}</span></List.Item>
                            </List>
                    </div>
                    <WhiteSpace size="lg"/>

                </div>

            </div>

        </Layout>
    }
}

export default Personal