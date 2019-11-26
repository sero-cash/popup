import React, {Component} from 'react'
import {WhiteSpace, Card, Icon, List, NavBar, Button, Modal, Toast, SwipeAction} from 'antd-mobile'
import Account from "../../components/account/account";
import Utils from "../../config/utils";
import Layout from "../layout/layout";
import logo from '../../sero.png'
import QRCode from 'qrcode';
import copy from "copy-text-to-clipboard/index"
import './home.css'
import {url, lang} from "../../config/common";
import BigNumber from "bignumber.js";
import {Price} from '../../components/tx/price';
import {decimals} from "../../components/tx/decimals";
import {assetService} from "../../components/service/service";

const priceService = new Price();

let utils = new Utils();
let Item = List.Item;
let Brief = Item.Brief;
let account = new Account();

let homeInterverId = null;
let homeInterverId2 = null;
let homeInterverId3 = null;
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accountHtml: [],
            address: "",
            assetsHtml: [],
            seroPriceInfo: {},
            current: '',
            account: '',
            detail: '',
            assets: new Map(),
            healthy:'normal',//red dead,yellow syncing,green:normal
        }
    }

    componentDidMount() {
        let that = this;
        try {
            that.accounts();
            that.calSeroTotal();

            setTimeout(function () {
                let current = account.getCurrent();
                if (!current || !current.address) {
                    Toast.info(lang.e().toast.info.createWallet,1.5);
                    setTimeout(function () {
                        url.goPage(url.AccountCreate1, url.Home);
                    },1500)
                }

                that.accounts();
                that.calSeroTotal();
            }, 1500)


            if(homeInterverId){
                clearInterval(homeInterverId);
            }
            homeInterverId = setInterval(function () {
                if(that.state.healthy !== 'syncing'){
                    that.accounts();
                }
            },  10 * 1000)


            if(homeInterverId3){
                clearInterval(homeInterverId3);
            }
            homeInterverId3 = setInterval(function () {
                that.getSyncState();
            },  1 * 1000)


            if(homeInterverId2){
                clearInterval(homeInterverId2);
            }
            homeInterverId2 = setInterval(function () {
                that.calSeroTotal();
            },  60 * 1000)

        } catch (e) {
            console.log(e)
        }
    }

    getSyncState=()=>{
        let that = this;
        assetService.getSyncState().then(data=>{
            if(data){
                if(data.health === true){
                    if(data.isSyncing=== true){
                        that.setState({
                            healthy:'syncing'
                        })
                    }else{
                        that.setState({
                            healthy:'normal'
                        })
                    }
                }else{
                    that.setState({
                        healthy:'dead'
                    })
                }
            }
        }).catch(e=>{
            that.setState({
                healthy:'dead'
            })
        })
    }

    showWallet = () => {
        let modalId;
        const list = account.Details();
        let items = [];
        if (list) {
            for (let ac of list) {
                items.push(
                    <Item thumb={<Icon type={ac.avatar} className="icon-avatar"/>} multipleLine onClick={() => {
                        account.setCurrent(ac);
                        this.accounts();
                        modalId.close();
                    }}>
                        {ac.name}
                        {/*<Brief>{utils.ellipsisAddress(ac.address)}</Brief>*/}
                    </Item>
                )
            }
        }
        modalId = Modal.alert(
            <div>
                <span>Select Wallet</span>
                <Icon type="iconsetting" className="icon-select-account-setting" onClick={() => {
                    modalId.close();
                    url.goPage(url.WalletManager, url.Home);
                    // window.location.replace("/#/walletManage")
                }}/>
            </div>
            , <div>
                <List>
                    {items}
                </List>
            </div>)

    }

    showQrCode = (pkr) => {
        Modal.alert("QR-Code", <div>
            <canvas id="qrImg"/>
            <p style={{marginTop: '0', fontSize: '12px', overflowWrap: "break-word"}}>{pkr}</p>
            <Button className='copyTxt' size="small" onClick={() => {
                copy(pkr);
                Toast.success(lang.e().toast.success.copy, 1);
            }}>Copy</Button>
        </div>, [{
            "text": "Close"
        }])

        let canvas = document.getElementById('qrImg')
        QRCode.toCanvas(canvas, pkr, function (error) {
            if (error) console.error(error)
        })
    }

    modalTips(msg){
        Modal.alert(lang.e().modal.help,msg,[{text:lang.e().button.ok}])
    }

    calSeroTotal() {
        let that = this;
        priceService.seroTotal(1, function (res) {
            that.setState({
                seroPriceInfo: res
            })
        })
    }

    accounts() {
        let current = account.getCurrent();
        if (current) {
            account = new Account(current.address);
            let detail = account.Detail();
            // let assets = acmng.balancesOf(detail.tk);
            this.setState({
                current: current,
                account: account,
                detail: detail,
            })

            assetService.balanceOf(detail.tk).then(assets=>{
                this.setState({
                    assets: assets,
                })
            }).catch(err=>{
                console.log(err);
            })

        }
    }

    render() {
        let that = this;
        let assetsArr = [];
        let {current, detail, assets,healthy} = this.state;
        let mainPKr = "";
        let currentPKr = "";
        let seroTotal = 0;
        let syncState = "check-circle"
        let stateColor="green"
        if(healthy === "normal"){
            syncState = "check-circle"
            stateColor="green"
        }else if(healthy === "syncing"){
            syncState = "loading"
            stateColor="yellow"
        }else if(healthy === "dead"){
            syncState = "cross-circle"
            stateColor="red"
        }

        console.log("render healthy :",healthy);

        if (current) {
            mainPKr = detail.mainPKr;
            currentPKr = detail.currentPKr;
            if (assets) {
                let i = 0;
                assets.forEach(function (value, cy) {
                    let cyAmount = 0;
                    let amount = decimals.convert(value, cy);
                    if (cy === "SERO") {
                        if (that.state.seroPriceInfo.total) {
                            cyAmount = new BigNumber(decimals.convert(new BigNumber(that.state.seroPriceInfo.total).multipliedBy(new BigNumber(value)), cy));
                        }
                    }
                    seroTotal = new BigNumber(seroTotal).plus(cyAmount)
                    assetsArr.push(
                        <SwipeAction key={i++}
                                     style={{backgroundColor: 'gray'}}
                                     autoClose
                                     right={[
                                         {
                                             text: lang.e().button.transfer,
                                             onPress: () => {
                                                 url.goPage(url.transfer(cy)), url.Home
                                             },
                                             style: {backgroundColor: '#24bdd2', color: 'white'},
                                         }
                                     ]}
                                     onOpen={() => {
                                         url.goPage(url.transfer(cy)), url.Home
                                     }}
                                     onClose={() => console.log('global close')}
                        >
                            <Item extra={
                                <div>
                                    <div className="home-list-item-number">{amount}</div>
                                    <Brief>
                                        <div
                                            className="home-list-item-money">{that.state.seroPriceInfo.type}{cyAmount.toFixed(3)}</div>
                                    </Brief>
                                </div>} align="top"
                                  thumb={<div className="currency-icon-border"><img src={logo} width={16}/>
                                  </div>} multipleLine
                                  onClick={() => {
                                      url.goPage("/transfer/list/" + cy)
                                  }}>
                                <p className="home-list-item-name">{cy}</p>
                            </Item>
                        </SwipeAction>
                    )
                })
            }


            if (assetsArr.length === 0) {
                assetsArr = <SwipeAction
                    style={{backgroundColor: 'gray'}}
                    autoClose
                    right={[
                        {
                            text: 'Transfer',
                            onPress: () => {
                                url.goPage(url.transfer("SERO")), url.Home
                            },
                            style: {backgroundColor: '#24bdd2', color: 'white'},
                        }
                    ]}
                    onOpen={() => {
                        url.goPage(url.transfer("SERO")), url.Home
                    }}
                    onClose={() => console.log('global close')}
                >
                    <Item extra={
                        <div>
                            <div className="home-list-item-number">0.00</div>
                            <Brief>
                                <div className="home-list-item-money">$ 0.00</div>
                            </Brief>
                        </div>}
                          align="top"
                          thumb={<div className="currency-icon-border"><img src={logo} width={16}/></div>}
                          multipleLine
                          onClick={() => {
                              url.goPage(url.transferList("SERO"), url.Home);
                          }}
                    >
                        <p className="home-list-item-name">SERO</p>
                    </Item>
                </SwipeAction>
            }
        }
        return <Layout selectedTab="home">
            <div className="layout-top">
                <NavBar
                    mode="light"
                    style={{background: "#f7f7f7"}}
                    leftContent={<Icon type="iconMenu"/>}
                    rightContent={<Icon type="iconscan" onClick={
                        () => {
                            url.goPage(url.scan("transfer"), url.Home)
                        }
                    }/>}
                    onLeftClick={this.showWallet}
                >
                    {lang.e().navbar.wallet}
                </NavBar>

                <div style={{margin: "5px", background: "#fdfdfd"}}>
                    <Card>
                        <Card.Header
                            thumb={<div><Icon className="icon-avatar" type={current.avatar} size="lg" onClick={() => {
                                url.goPage(url.manage(current.address), url.Home);
                            }}/></div>}
                            title={current.name}
                            extra={<Icon type="ellipsis" onClick={() => {
                                url.goPage(url.manage(current.address), url.Home);
                            }}/>}
                        />
                        <Card.Body style={{padding: "0px 15px 6px"}}>
                            <div>
                        <span style={{color: "#f6c23e"}}>
                            <Icon type="iconhelp" className="icon-pkr" onClick={() => {
                                this.modalTips(lang.e().modal.mainPKr)
                            }}
                            />{lang.e().page.wallet.mainPKr}:</span>
                                <span> {utils.ellipsisAddress(mainPKr)}</span>
                                <Icon type="iconqr-code" className="icon-qrcode" onClick={() => {
                                    // this.showQrCode(mainPKr)
                                    url.goPage(url.receive(current.address, "mainPKr"), url.Home);
                                }}/>
                            </div>
                            <div>
                        <span style={{color: "#f6c23e"}}>
                            <Icon type="iconhelp" className="icon-pkr" onClick={() => {
                                this.modalTips(lang.e().modal.pkr)
                            }}
                            />{lang.e().page.wallet.PKr}:</span>
                                <span> {utils.ellipsisAddress(currentPKr)}</span>
                                <Icon type="iconqr-code" className="icon-qrcode" onClick={() => {
                                    // this.showQrCode(currentPKr)
                                    url.goPage(url.receive(current.address, "pkr"), url.Home);
                                }}/>
                            </div>
                        </Card.Body>
                        <Card.Footer
                            extra={<span>{that.state.seroPriceInfo.type}{new BigNumber(seroTotal).toFixed(3)}</span>}/>
                    </Card>
                </div>

                <div className="am-list">
                    <div className="am-list-header" style={{background: "#fdfdfd"}}>
                        <div className="home-list-title"><Icon type={syncState} color={stateColor} size="small" style={{width:"14px",height:"14px"}}/> {lang.e().page.wallet.Assets}</div>
                    </div>
                </div>
                <WhiteSpace size="lg"/>
            </div>
            <div className="assets-wrap" style={{
                marginTop: '270px',
                background: "#fdfdfd",
                height: document.documentElement.clientHeight - 270,
                overflowY: 'scroll'
            }}>
                <List>
                    {assetsArr}
                </List>
                <div style={{height: "50px"}}>
                </div>
            </div>
        </Layout>
    }
}

export default Home