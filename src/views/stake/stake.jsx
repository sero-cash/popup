import React, {Component} from 'react'
import {NavBar,Icon} from 'antd-mobile'
import Layout from "../layout/layout";
import { storage,keys, config, url,baseDecimal} from "../../config/common";

class Stake extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return <Layout selectedTab="stake">
                <div className="layout-top">
                    <NavBar
                        mode="light"
                        leftContent={<Icon type="iconMenu"/>}
                        rightContent={<Icon type="iconscan"/>}
                    >
                        Stake
                    </NavBar>
                </div>

                <div style={{textAlign:'center'}}>
                    <div className="my-header">

                    </div>
                </div>
            </Layout>
    }
}

export default Stake