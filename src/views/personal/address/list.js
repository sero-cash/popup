import React, {Component} from 'react'
import {NavBar, Icon, WhiteSpace, List,Toast,WingBlank} from 'antd-mobile'
import Address from "../../../components/address/address";
import Utils from "../../../config/utils";
import sero from "../../../sero.png"
import "./address.css"
import copy from "copy-text-to-clipboard";
import {storage, keys, config, url, baseDecimal, lang} from "../../../config/common";

let utils = new Utils();
const address = new Address();
const Item = List.Item;
const Brief = Item.Brief;

class AddressList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addressHtml:[]
        }
    }

    componentDidMount() {
        this.load();
    }

    load(){
        const that = this;
        const addresses = address.List();
        let tempArray = [];
        let i=0;
        for(let ad of addresses){
            tempArray.push(
                <Item wrap thumb={<img src={sero}/>} key={i++}
                >
                    {ad.name}<br/>
                    <div className="list-address" onClick={()=>{
                        url.goPage(url.addressDetail(ad.address),url.AddressList);
                    }}>{ad.address}</div>
                    <Icon type="iconcopy" style={{
                        position: "relative",
                        float: "right",
                        color: "gray",
                    }} onClick={()=>{
                        copy(ad.address);
                        Toast.success(lang.e().toast.success.copy, 1);
                    }}
                    />
                    <Brief>{ad.desc}</Brief>
                </Item>
            )
        }
        if(tempArray.length === 0 ){
            tempArray = <div style={{textAlign:"center",background:"#f7f7f7",padding:"15px 0"}}>
                <Icon type="iconwushuju" style={{width:"100px",height:"100px"}}/><br/>
                <span style={{color:"gray"}}>{lang.e().page.txList.noData}</span>
            </div>
        }
        this.setState({
            addressHtml:tempArray
        })
    }

    render() {
        return <div>
            <div className="layout-top">
                <NavBar
                    mode="light"
                    leftContent={<Icon type="left"/>}
                    onLeftClick={()=>{
                        url.goBack();
                    }}
                    rightContent={<Icon type="iconadd" onClick={()=>{
                        url.goPage(url.AddressAdd,url.AddressList)
                    }}/>}
                >
                    {lang.e().page.addressBook.title}
                </NavBar>

            </div>
            <WhiteSpace size="lg"/>
            <div style={{marginTop:"45px"}}>
                <List>
                    {this.state.addressHtml}
                </List>
            </div>
        </div>
    }
}

export default AddressList