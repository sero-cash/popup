import React, {Component} from 'react'
import {NavBar, TabBar, Icon} from 'antd-mobile'
import './layout.css'
import {storage, keys, config, url, baseDecimal, lang} from "../../config/common";

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div>

            {this.props.children}

            <div className="tabbar">
                <TabBar>
                    <TabBar.Item
                        icon={<Icon type="iconcopper-coin-line"/>}
                        selectedIcon={<Icon type="iconcopper-coin-line1"/>}
                        title={lang.e().navbar.wallet}
                        key="home"
                        selected={this.props.selectedTab === 'home'}
                        onPress={()=>{
                            url.goPage(url.Home,"")
                        }}
                    >
                    </TabBar.Item>
                    {/*<TabBar.Item*/}
                    {/*    icon={<Icon type="iconStaking"/>}*/}
                    {/*    selectedIcon={<Icon type="iconStaking1"/>}*/}
                    {/*    title="Stake"*/}
                    {/*    key="stake"*/}
                    {/*    selected={this.props.selectedTab === 'stake'}*/}
                    {/*    onPress={()=>{*/}
                    {/*        url.goPage(url.Stake,"")*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*</TabBar.Item>*/}
                    <TabBar.Item
                        icon={<Icon type="icondapp"/>}
                        selectedIcon={<Icon type="icondapp1"/>}
                        title={lang.e().navbar.dapp}
                        key="dapp"
                        selected={this.props.selectedTab === 'dapp'}
                        onPress={()=>{
                            url.goPage(url.DApp,"")
                        }}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<Icon type="iconmy2"/>}
                        selectedIcon={<Icon type="iconmy1"/>}
                        title={lang.e().navbar.my}
                        key="my"
                        selected={this.props.selectedTab === 'my'}
                        onPress={()=>{
                            url.goPage(url.Personal,"")
                        }}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>

        </div>
    }
}

export default Layout