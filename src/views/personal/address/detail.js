import React, {Component} from 'react'
import {NavBar, Icon, WhiteSpace, Toast, WingBlank, List, Button,TextareaItem} from 'antd-mobile'
import Address from "../../../components/address/address";
import sero from "../../../sero.png";
import copy from "copy-text-to-clipboard/index"
import './address.css'
import {storage, keys, config, url, baseDecimal, lang} from "../../../config/common";

const address = new Address();

class AddressDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: ''
        }
    }

    componentDidMount() {
        const pk = this.props.match.params.address;
        if(!pk){
            // window.location.replace("/#/address")
            url.goPage(url.AddressList,url.WalletManager)
            return
        }
        const data = address.info(pk);
        this.setState({
            address: data
        })
    }


    render() {

        const {address} = this.state;

        return <div style={{height: document.documentElement.clientHeight - 45}}>
            <div className="layout-top">
                <NavBar
                    mode="light"
                    leftContent={<Icon type="left"/>}
                    onLeftClick={() => {
                        // window.location.replace("/#/address/")
                        url.goBack();
                    }}
                    rightContent={<Icon type="iconedit" style={{color:"#108ee9"}} onClick={()=>{
                        url.goPage(url.addressEdit(address.address),url.addressDetail(address.address))
                        // window.location.replace("/#/address/edit/"+address.address);
                    }}/>}
                >
                    {lang.e().page.addressBook.detail}
                </NavBar>

            </div>
            <WhiteSpace size="lg"/>
            <div style={{marginTop: "45px"}}>
                <div style={{textAlign: "center"}}>
                    <WhiteSpace size="lg"/>
                    <img src={sero} width={40}/>
                    <WhiteSpace size="lg"/>
                </div>
                <List style={{background:"#fdfdfd"}}>
                    <List.Item wrap>
                        <span style={{color:"gray",fontSize:"12px"}}>{lang.e().page.addressBook.name}</span>
                        <List.Item.Brief>
                            <div style={{color:"#333",fontSize:"16px"}}>
                                {address.name}
                            </div>
                        </List.Item.Brief>
                    </List.Item>
                    <List.Item wrap>
                        <span style={{color:"gray",fontSize:"12px"}}>{lang.e().page.addressBook.address}</span><br/>
                        <div className="list-address">{address.address}</div>
                        <Icon type="iconcopy" style={{
                            position: "relative",
                            float: "right",
                            color: "gray",
                            top: "-5px"
                        }} onClick={()=>{
                            copy(address.address);
                            Toast.success(lang.e().toast.success.copy, 1);
                        }}
                        />
                    </List.Item>

                    <List.Item wrap>
                        <span style={{color:"gray",fontSize:"12px"}}>{lang.e().page.addressBook.description}</span>
                        <List.Item.Brief>
                            <div style={{color:"#333",fontSize:"16px"}}>
                                {address.desc}
                            </div>
                        </List.Item.Brief>
                    </List.Item>
                </List>
            </div>
        </div>
    }
}

export default AddressDetail