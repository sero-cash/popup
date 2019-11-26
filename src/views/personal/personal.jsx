import React, {Component} from 'react'
import { WhiteSpace, WingBlank, Icon, Flex, List,Badge} from 'antd-mobile'
import Layout from "../layout/layout";
import './personal.css'
import {storage, keys, config, url, baseDecimal, lang} from "../../config/common";
import sero from '../../logo.png'

class Personal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'my',
            hidden: false,
            fullScreen: false,
        }
    }

    render() {
        return <Layout selectedTab="my">
            <div style={{textAlign: 'center'}}>
                <div className="my-header" style={{"height": document.documentElement.clientHeight * 0.15, padding: "30px 0px"}}>
                    <img src={sero} style={{width:"60px"}}/>
                </div>

                {/*<div style={{background:"#f7f7f7"}}>*/}

                {/*    <Flex style={{textAlign: 'center'}}>*/}
                {/*        <Flex.Item>*/}
                {/*            <List>*/}
                {/*                <List.Item*/}
                {/*                    onClick={()=>{*/}
                {/*                        // window.location.replace("/#/address")*/}
                {/*                        url.goPage(url.AddressList,url.Personal)*/}
                {/*                    }}*/}
                {/*                    thumb={<Icon type="iconAddressbook-" color="gray"/>}><span>Address Book</span></List.Item>*/}
                {/*            </List>*/}
                {/*        </Flex.Item>*/}
                {/*        <Flex.Item>*/}
                {/*            <List>*/}
                {/*                <List.Item thumb={<Icon type="iconNotification" color="gray"/>} extra={<Badge text={77} overflowCount={55} />}><span>Notifycations</span></List.Item>*/}
                {/*            </List>*/}
                {/*        </Flex.Item>*/}
                {/*    </Flex>*/}

                {/*</div>*/}
                <WhiteSpace size="lg"/>
                <div>
                    <div style={{background:"#f7f7f7"}}>

                        <List>
                            <List.Item
                                onClick={()=>{
                                    // window.location.replace("/#/address")
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
                                    // window.location.replace("/#/walletManage")
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