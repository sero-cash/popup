import React, {Component} from 'react'
import {WhiteSpace, Card, Icon, List, NavBar, Button, Modal, Toast, SwipeAction, Badge} from 'antd-mobile'
import Account from "../../components/account/account";
import Utils from "../../config/utils";
import Layout from "../layout/layout";
import logo from '../../sero.png'
import QRCode from 'qrcode';
import copy from "copy-text-to-clipboard/index"
import './home.css'
import {url, lang, storage, keys} from "../../config/common";
import BigNumber from "bignumber.js";
import {Price} from '../../components/tx/price';
import {decimals} from "../../components/tx/decimals";
import {assetService} from "../../components/service/service";
import NONT from '../../icons/NONT.png';
import HAPY from '../../icons/HAPY.png';
import VERYBOOM from '../../icons/VERYBOOM.png';

const priceService = new Price();

let utils = new Utils();
let Item = List.Item;
let Brief = Item.Brief;
let account = new Account();

let homeInterverId0 = null;
let homeInterverId = null;
// let homeInterverId2 = null;
let homeInterverId3 = null;
let healthCheckCount = 0;

class Home extends Component {

    constructor(props) {
        super(props);
        let _assets = storage.get(keys.account.assets);
        if(_assets){
            _assets =  this._objToMap(_assets)
        }else{
            _assets = new Map();
        }
        let detail = storage.get(keys.account.current);

        this.state = {
            accountHtml: [],
            address: "",
            assetsHtml: [],
            seroPriceInfo: {},
            current: '',
            account: '',
            detail: detail,
            assets: _assets,
            healthy:'normal',//red dead,yellow syncing,green:normal
            healthData:'',
            tk:'',
            confirmingMap:new Map()
        }
    }

    componentDidMount() {
        let that = this;
        try {
            that.accounts().then();
            // that.calSeroTotal();

            if(!homeInterverId0){
                homeInterverId0 = setInterval(function () {
                    account.getCurrent().then(current=>{
                        clearInterval(homeInterverId0);
                        if (!current || !current.address) {
                            Toast.info(lang.e().toast.info.createWallet,1.5);
                            setTimeout(function () {
                                url.goPage(url.AccountCreate1, url.Home);
                            },1000)
                        }else{
                            that.accounts().then();
                            // that.calSeroTotal();
                        }
                    }).catch((e)=>{
                    });
                },1000);
            }

            if(homeInterverId){
                clearInterval(homeInterverId);
            }
            homeInterverId = setInterval(function () {
                that.accounts().then();
            },  5 * 1000)

            if(homeInterverId3){
                clearInterval(homeInterverId3);
            }
            homeInterverId3 = setInterval(function () {
                that.getSyncState();
            },  1 * 1000)

        } catch (e) {
            console.log(e)
        }
    }



    getSyncState(){
        let that = this;
        if(that.state.tk){
            assetService.getSyncState(that.state.tk).then(data=>{
                if(data){
                    let healthy = 'normal'
                    if(data.health === true){
                        if(data.isSyncing=== true){
                            healthy = 'syncing'
                            healthCheckCount ++
                        }else{
                            healthy = 'normal'
                            healthCheckCount =0
                        }
                    }else{
                        healthy = 'dead'
                        healthCheckCount =0
                    }
                    that.setState({
                        healthy:healthy,
                        healthData:data
                    })
                }
            }).catch(e=>{
                that.setState({
                    healthy:'dead'
                })
            })
        }
    }

    async showWallet (that){
        let modalId;
        // const that = this;
        const list = await account.Details();
        let items = [];
        if (list) {
            for (let ac of list) {
                // const data = await assetService.getSyncState(ac.tk);
                items.push(
                    <Item thumb={<Icon type={ac.avatar} className="icon-avatar"/>} multipleLine onClick={() => {
                        account.setCurrent(ac).then(()=>{
                            that.accounts().then();
                            modalId.close();
                        });
                    }}>
                        {ac.name}({ac.mainPKr})
                        {/*<Brief>{utils.ellipsisAddress(ac.address)}</Brief>*/}
                    </Item>
                )
            }
        }
        modalId = Modal.alert(
            <div>
                <span>{lang.e().page.wallet.selectWallet}</span>
                <Icon type="iconsetting" className="icon-select-account-setting" onClick={() => {
                    modalId.close();
                    url.goPage(url.WalletManager, url.Home);
                    // window.location.replace("/#/walletManage")
                }}/>
            </div>
            , <div style={{maxHeight: '400px',overflowY: 'scroll'}}>
                <List>
                    {items}
                </List>
            </div>,[
                {text:lang.e().button.ok}
            ])
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

    async accounts() {
        const that = this;
        const current = await account.getCurrent();
        that.setState({
            current: current,
        })

        if (current) {
            const detail = await account.Detail(current.address);
            const assets = await assetService.balanceOf(detail.tk);
            if(assets){
                storage.set(keys.account.assets,that._mapToObj(assets))
            }
            const confirmingMap = await assetService.getPendingAndConfirmingGroupByCy(detail.tk);
            that.setState({
                detail: detail,
                account: account,
                tk:detail.tk,
                assets: assets,
                confirmingMap:confirmingMap
            })
        }
    }

    _mapToObj(strMap) {
        let obj = Object.create(null);
        for (let [k, v] of strMap) {
            obj[k] = v;
        }
        return obj;
    }


    _objToMap(obj) {
        let strMap = new Map();
        for (let k of Object.keys(obj)) {
            strMap.set(k, obj[k]);
        }
        return strMap;
    }

    renLogo =(cy)=>{
        if(cy === "NONT"){
            return NONT
        }else if(cy === "HAPY"){
            return HAPY
        }else if(cy === "VERYBOOM"){
            return VERYBOOM
        }
        return logo
    }

    render() {
        let that = this;
        let assetsArr = [];
        let {current, detail, assets,healthy,healthData,confirmingMap} = this.state;
        let mainPKr = "";
        let currentPKr = "";
        let seroTotal = 0;
        let syncState = "check-circle"
        let stateColor="green"
        let stateDesc = lang.e().toast.loading.synchronizing;
        if(healthy === "normal"){
            syncState = "check-circle"
            stateColor="green"
            stateDesc=''
        }else if(healthy === "syncing"){
            syncState = "loading"
            stateColor="yellow"
        }else if(healthy === "dead"){
            syncState = "cross-circle"
            stateColor="red"
            stateDesc='Synchronization failed!'
        }

        const tempConfirmMap = new Map();
        for(let [k,v] of confirmingMap){
            tempConfirmMap.set(k,v)
        };

        if (current && detail) {
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
                    const txNum  = tempConfirmMap.get(cy);
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
                                    <Badge text={txNum}/>
                                    <Brief>
                                        {/*<div className="home-list-item-money">{that.state.seroPriceInfo.type}{cyAmount.toFixed(3)}</div>*/}
                                        <div className="home-list-item-number">{amount}</div>
                                    </Brief>
                                  </div>}

                                  align="top"
                                  thumb={
                                      <div className="currency-icon-border"><img src={that.renLogo(cy)} width={16}/></div>
                                  }
                                  multipleLine
                                  onClick={() => {
                                      url.goPage("/transfer/list/" + cy)
                                  }}>

                                <p className="home-list-item-name">{cy}</p>
                            </Item>
                        </SwipeAction>
                    )

                    tempConfirmMap.delete(cy);
                })
            }

            if (assetsArr.length === 0) {
                const cy = "SERO"
                const txNum  = tempConfirmMap.get(cy);
                assetsArr.push(
                    <SwipeAction
                        style={{backgroundColor: 'gray'}}
                        autoClose
                        right={[
                            {
                                text: 'Transfer',
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
                                <Badge text={tempConfirmMap.get(cy)}/>
                                <Brief>
                                    <div className="home-list-item-number">0.00</div>
                                </Brief>
                            </div>}
                              align="top"
                              thumb={<div className="currency-icon-border"><img src={that.renLogo(cy)} width={16}/></div>}
                              multipleLine
                              onClick={() => {
                                  url.goPage(url.transferList(cy), url.Home);
                              }}
                        >
                            <p className="home-list-item-name">{cy}</p>
                        </Item>
                    </SwipeAction>
                )

                tempConfirmMap.delete(cy);
            }

            for(let [cy,v] of tempConfirmMap){
                assetsArr.push(
                    <SwipeAction
                        style={{backgroundColor: 'gray'}}
                        autoClose
                        right={[
                            {
                                text: 'Transfer',
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
                                <Badge text={v}/>
                                <Brief>
                                    <div className="home-list-item-number">0.00</div>
                                </Brief>
                            </div>}
                              align="top"
                              thumb={<div className="currency-icon-border"><img src={that.renLogo(cy)} width={16}/></div>}
                              multipleLine
                              onClick={() => {
                                  url.goPage(url.transferList(cy), url.Home);
                              }}
                        >
                            <p className="home-list-item-name">{cy}</p>
                        </Item>
                    </SwipeAction>
                )

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
                            if(plus && plus.barcode){
                                url.goPage(url.scan("transfer"), url.Home)
                            }
                        }
                    }/>}
                    onLeftClick={()=>{this.showWallet(this)}}
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
                        {/*<Card.Footer extra={<span>{that.state.seroPriceInfo.type}{new BigNumber(seroTotal).toFixed(3)}</span>}/>*/}
                        <Card.Footer extra={<span>
                            <span style={{fontSize:'14px'}}>Block Height: {healthData.latestBlock?healthData.latestBlock:0}</span>
                            &nbsp;<Icon type="iconhelp" className="icon-pkr" onClick={() => {
                                this.modalTips(lang.e().modal.blockHeight)
                            }}/>
                        </span>}/>
                    </Card>
                </div>

                <div className="am-list">
                    <div className="am-list-header" style={{background: "#fdfdfd"}}>
                        <div className="home-list-title">
                            <Icon type={syncState} color={stateColor} size="small" style={{width:"14px",height:"14px"}}/> {lang.e().page.wallet.Assets} {<span style={{fontSize:'12px'}}>{stateDesc}</span>}
                        </div>
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