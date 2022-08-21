import React, {Component} from 'react'
import {NavBar, Icon, Toast, Modal, List, ActionSheet, Button} from "antd-mobile";
import {storage, url, keys, lang, config} from "../../config/common";
import BigNumber from 'bignumber.js'
import Account from '../../components/account/account'
import {Transactions} from "../../components/tx/transactions";
import Web3 from 'sero-web3'
import {decimals} from "../../components/tx/decimals";
import {assetService} from "../../components/service/service";
import copy from "copy-text-to-clipboard/index"
import './dapp.css'
import {pkrCrypte,pkrEncrypt,pkrDecrypt} from 'jsuperzk/dist/protocol/superzk/pkr'
import utils,{toString,isNewVersion} from 'jsuperzk/dist/utils/utils'



let web3 = new Web3();

const transactions = new Transactions();
const account = new Account();
const data = {
    messageId: 1,
    method: "init",
    data: "success"
}

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

const operation = {
    method: {
        init: "init",
        accountDetail: "accountDetail",
        accountList: "accountList",
        executeContract: "executeContract",
        call: "call",
        estimateGas: "estimateGas",
        getInfo: "getInfo",
        pkrCrypto: "pkrCrypto",
        pkrEncrypt: "pkrEncrypt",
        pkrDecrypt: "pkrDecrypt",
        goPage: "goPage",
    }
}


let browserData = {
    barColor:"#f7f7f7",
    barMode:"light",
    navColor:"#F7F7F7",
    navMode:"dark",
    navTitle:"Browser"
}

class Browser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            hasListener: false,
            navTitle: "Browser",
            password: "",
            showTxInfo: false,
            barColor:"#f7f7f7",
            barMode:"light",
            data: null,
            cb: undefined
        }
    }

    componentWillMount() {
        let url = this.props.match.params.url;
        url = decodeURIComponent(url);
        this.setState({
            url: url,
        })
    }

    setPassword = (password) => {
        this.setState({password: password})
    }

    componentDidMount() {
        const that = this;

        browserData = {
            barColor:"#f7f7f7",
            barMode:"light",
            navColor:"#F7F7F7",
            navMode:"dark",
            navTitle:"Browser"
        }

        this.initTile();

        web3.setProvider(new web3.providers.HttpProvider(config.seroRpc()))

        let intervalId = window.sessionStorage.getItem("browserData")
        if(intervalId){
            clearInterval(intervalId)
        }
        intervalId = setInterval(function () {

            if (plus && plus.navigator) {
                plus.navigator.setStatusBarBackground(browserData.navColor);
                plus.navigator.setStatusBarStyle(browserData.navMode);
            }

            that.setState({
                barColor: browserData.barColor,
                barMode:browserData.barMode,
                navTitle: browserData.navTitle
            })
        },200)
        window.sessionStorage.setItem("browserData",intervalId)
    }

    initTile = () => {
        let that = this;
        window.addEventListener("message", this.receiveMessage, {passive: true});
        let url = this.props.match.params.url;
        if (url.indexOf("http") === -1) {
            setTimeout(function () {
                const childFrameObj = document.getElementById('ifrModel');
                if(childFrameObj){
                    browserData.navTitle = childFrameObj.contentWindow.document.title
                }
            }, 200)
        } else {
            that.setState({
                navTitle: "Browser"
            })
        }
    }



    initDApp = (data) => {
        if (data && data !== "success") {

            browserData.navTitle= data.name
            if (data.name && data.contractAddress && data.github && data.author && data.url && data.logo) {
                if (data.url && data.url.indexOf("http") === -1) {
                    data.url = "http://" + data.url
                    data.logo = "http://" + data.logo
                }
                this.storageDapp(data)
            }

            if(data.navMode && data.navColor && data.barMode && data.barColor) {
                browserData.barColor = data.barColor
                browserData.barMode =  data.barMode
                browserData.navMode = data.navMode;
                browserData.navColor = data.navColor;

            }

        }
        console.log("browserData>>",data,browserData);
        return "success"
    }

    getInfo = () => {
        return new Promise(function (resolve,reject) {
            let data = {}
            data.language = lang.e().key;
            data.rpc = config.seroRpc();
            try{
                if(plus && plus.device){
                    data.uuid = plus.device.uuid;
                    resolve(data)
                }else{
                    resolve(data)
                }
            }catch (e) {
                console.log('getInfo fail:',e.message);
                resolve(data)
            }
        })
    }

    async getAccountList(msg){
        try {
            let addresses = storage.get(keys.account.addresses);
            let rest = [];
            if (addresses) {
                const current = await account.getCurrent();
                for (let address of addresses) {
                    let detail = await account.Detail(address)
                    const assets = await assetService.balanceOf(detail.tk);
                    const tkts = await assetService.ticketsOf(detail.tk);
                    rest.push({Name: detail.name, PK: detail.address, MainPKr: detail.mainPKr, Balance: assets,Tickets:tkts, IsCurrent: address === current.address})
                }
            }
            msg.data=rest
            return msg
        } catch (e) {
            msg.data = null
            msg.error = e.message
            return msg
            // Toast.fail(e.message,3)
        }
    }

    async getAccountDetail(address, msg){
        try {
            if (address) {
                // let detail = storage.get(keys.detailKey(address));
                let detail = await account.Detail(address)
                const assets = await assetService.balanceOf(detail.tk);
                const tkts = await assetService.ticketsOf(detail.tk);
                msg.data = {Name: detail.name, PK: detail.address, MainPKr: detail.mainPKr, Balance: assets,Tickets:tkts}
                return msg
            }
        } catch (e) {
            msg.data = null
            msg.error = e.message
            return msg
            // Toast.fail(e.message,3)
        }
    }

    call = (data, msg) => {
        try {
            let rest = web3.sero.call(data, "latest");
            msg.data = rest
            return msg
        } catch (e) {
            msg.data = "0x"
            msg.error = e.message
            return msg
            // Toast.fail(e.message,3)
        }
    }

    estimateGas = (data, msg) => {
        try {
            let rest = web3.sero.estimateGas(data);
            msg.data = rest
            return msg
        } catch (e) {
            msg.data = "0x0"
            msg.error = e.message
            console.error(e)
            return msg
            // Toast.fail(e.message,3)
        }
    }

    async pkrCrypto(data){
        const detail = await account.Detail(data.pk)
        let isNew = isNewVersion(utils.toBuffer(detail.tk));
        if(!isNew){
            return new Promise((resovel,reject)=>{
                reject("Only support v2 account");
            })
        }else{
            const rest = pkrCrypte(data.data,detail.mainPKr,detail.tk,data.pkr);
            return toString(rest);
        }
    }

    async pkrEncrypt(data){
        const rest = pkrEncrypt(data.data,data.pkr);
        return toString(rest);
    }

    async pkrDecrypt(data){
        const detail = await account.Detail(data.pk)
        let isNew = isNewVersion(utils.toBuffer(detail.tk));
        if(!isNew){
            return new Promise((resovel,reject)=>{
                reject("Only support v2 account");
            })
        }else{
            const rest = pkrDecrypt(data.data,detail.mainPKr,detail.tk);
            return toString(rest);
        }
    }

    goPage(path){
        if(path && path.indexOf("scan/")){
            if(plus && plus.barcode){
                url.goPage(path)
            }
        }else{
            url.goPage(path)
        }
    }

    executeContract = (data, cb) => {
        try {
            if (!data) {
                return
            }
            if (data && !data.cy) {
                data.cy = "SERO"
            }

            if (data && !data.gas) {
                data.gas = "0x" + new BigNumber("4700000").toString(16);
            }

            if (data && !data.gasPrice) {
                data.gasPrice = "0x" + new BigNumber("1000000000").toString(16);
            }

            if (data && !data.value) {
                data.value = "0x0";
            }

            this.setState({
                showTxInfo: true,
                data: data,
                cb: cb
            })
        } catch (e) {
            Toast.fail(e.message, 3)
            cb("")
        }
    }

    submit = (data) => {
        const {cb} = this.state;
        try {
            Modal.prompt(lang.e().button.transfer, <div>

            </div>, [{
                text: lang.e().button.cancel, onPress: () => {
                    console.log("cancel");
                    cb("")
                    this.setState({
                        showTxInfo: false,
                    })
                }
            }, {
                text: lang.e().button.confirm, onPress: (password) => {
                    if (!password) {
                        Toast.fail(lang.e().page.txTransfer.inputPassword)
                    } else {
                        try {
                            Toast.loading(lang.e().toast.loading.sending,60)
                            transactions.transfer(data, password).then(hash=>{
                                Toast.success(lang.e().toast.success.send, 2)
                                cb(hash)
                                this.setState({
                                    showTxInfo: false,
                                })
                            }).catch(error=>{
                                const err = typeof error === 'string'?error:error.message;
                                if(err){
                                    if (err.indexOf("wrong passphrase") > -1) {
                                        Toast.fail(lang.e().toast.error.passwordError, 2);
                                        cb("")
                                    } else {
                                        Toast.fail(err, 3);
                                        cb("")
                                    }
                                }else{
                                    Toast.fail(JSON.stringify(error), 3);
                                }
                            })
                        } catch (e) {
                            Toast.fail(e.message);
                            cb("")
                        }
                    }
                }
            }], "secure-text", null, [lang.e().page.txTransfer.inputPassword])
        } catch (e) {
            Toast.fail(e.message, 3)
        }
    }

    modifyGasPrice = (data) => {
        try {
            Modal.prompt("Set gas price", <div>

            </div>, [{
                text: lang.e().button.cancel, onPress: () => {
                    console.log("cancel");
                }
            }, {
                text: lang.e().button.confirm, onPress: (gasPrice) => {
                    if (!gasPrice) {
                        Toast.fail(`Please input gas price (GTa)`)
                    } else {
                        try {
                            data.gasPrice = "0x"+ new BigNumber(gasPrice).multipliedBy(1e9).toString(16)
                            data.feeValue = "0x"+new BigNumber(data.gas).multipliedBy(new BigNumber(data.gasPrice)).toString(16);
                            this.setState({
                                data: data
                            })
                        } catch (e) {
                            Toast.fail(e.message);
                        }
                    }
                }
            }], "text", null, [`Please input gas price (GTa)`])
        } catch (e) {
            Toast.fail(e.message, 3)
        }
    }


    storageDapp = (data) => {
        try {
            let list = storage.get(keys.dapp.list);
            if (!list || list.length === 0) {
                list = [data.contractAddress]
                storage.set(keys.dapp.list, list)
            } else {
                let tempList = [];
                let has = false;
                for (let v of list) {
                    if (v === data.contractAddress) {
                        has = true;
                        break
                    }
                }
                if (!has) {
                    tempList.push(data.contractAddress)
                }
                storage.set(keys.dapp.list, tempList.concat(list))
            }

            storage.set(keys.dappsInfoKey(data.contractAddress), data)
        } catch (e) {
            Toast.fail(e.message, 3)
        }
    }

    /***
     *
     * {
     *     operation:nit
     *     data:success
     * }
     * @param event
     */
    receiveMessage = (event) => {
        let that = this;
        if (event !== undefined && event.data) {
            let msg = event.data;
            console.log("popup receive msg: ", msg);
            if (msg.method) {
                if (msg.method === operation.method.init) {
                    msg.data = that.initDApp(msg.data);
                    that.sendMessage(msg);
                } else if (msg.method === operation.method.accountDetail) {
                    that.getAccountDetail(msg.data,msg).then(msg=>{
                        that.sendMessage(msg);
                    })
                } else if (msg.method === operation.method.accountList) {
                    that.getAccountList(msg).then(msg=>{
                        that.sendMessage(msg);
                    })
                } else if (msg.method === operation.method.executeContract) {
                    that.executeContract(msg.data.tx, (txHash)=>{
                        if(txHash){
                            msg.data = txHash;
                        }else{
                            const ifrm = document.getElementsByClassName("h5-iframe");
                            if(ifrm && ifrm.length>0){
                                ifrm[0].focus();
                            }
                            msg.data = "";
                            msg.error = "Operation cancel";
                        }
                        that.sendMessage(msg);
                    });
                } else if (msg.method === operation.method.call) {
                    that.sendMessage(that.call(msg.data,msg));
                } else if (msg.method === operation.method.estimateGas) {
                    that.sendMessage(that.estimateGas(msg.data,msg));
                } else if (msg.method === operation.method.getInfo) {
                    that.getInfo().then(data=>{
                        msg.data= data;
                        that.sendMessage(msg);
                    }).catch(error=>{
                        msg.error=error
                        that.sendMessage(msg);
                    });
                } else if (msg.method === operation.method.pkrCrypto) {
                    that.pkrCrypto(msg.data).then(rest=>{
                        msg.data= rest;
                        that.sendMessage(msg);
                    }).catch(e=>{
                        msg.error= typeof e === 'string'?e:e.message;
                        that.sendMessage(msg);
                    });
                }  else if (msg.method === operation.method.pkrEncrypt) {
                    that.pkrEncrypt(msg.data).then(rest=>{
                        msg.data= rest;
                        that.sendMessage(msg);
                    }).catch(e=>{
                        msg.error= typeof e === 'string'?e:e.message;
                        that.sendMessage(msg);
                    });
                }  else if (msg.method === operation.method.pkrDecrypt) {
                    that.pkrDecrypt(msg.data).then(rest=>{
                        msg.data= rest;
                        that.sendMessage(msg);
                    }).catch(e=>{
                        msg.error= typeof e === 'string'?e:e.message;
                        that.sendMessage(msg);
                    });
                } else if(msg.method === operation.method.goPage){
                    that.goPage(msg.data)
                }else {
                    that.sendMessage("operation method is invalid !");
                }
            } else {
                that.sendMessage("operation method is required !");
            }
        }
    };


    sendMessage = (msg) => {
        // console.log("popup send msg: ", msg);
        const childFrameObj = document.getElementById('ifrModel');
        if(childFrameObj){
            childFrameObj.contentWindow.postMessage(msg, '*');
        }
    };

    dataList = [
        {method:'share', icon:<Icon type={"iconshare"}/>, title: lang.e().button.share },
        {method:'copy', icon:<Icon type={"iconcopy"}/>, title: lang.e().button.copyLink },
        {method:'fresh', icon:<Icon type={"iconrefresh"}/>, title: lang.e().button.refresh },
    ];

    share = (_url)=>{
        if(plus && plus.share){
            plus.share.sendWithSystem({type:'text',content:this.state.navTitle,href:_url}, function(){
                console.log('分享成功');
            }, function(e){
                console.log('分享失败：'+JSON.stringify(e));
            });
        }
    }

    copyLink =(_url)=>{
        copy(_url);
        Toast.success(lang.e().toast.success.copy, 1);
    }

    refresh = (_url)=>{
        const childFrameObj=document.getElementById("ifrModel");
        childFrameObj.src = _url;
    }

    showActionSheet = () => {
        const that = this;
        let data = this.dataList;
        if(!plus || !plus.share){
            data = this.dataList.slice(1);
        }
        ActionSheet.showShareActionSheetWithOptions({
                options: data,
                // title: 'title',
                // message: 'I am description, description, description',
            },
            (buttonIndex) => {
                if(data && data[buttonIndex]){
                    const mtd = data[buttonIndex].method;
                    switch (mtd) {
                        case 'share':
                            that.share(that.state.url)
                            break
                        case 'copy':
                            that.copyLink(that.state.url)
                            break
                        case 'fresh':
                            that.refresh(that.state.url)
                            break
                    }
                }
            });
    }

    render() {

        const {barMode,barColor,data,cb} = this.state;


        return <div>
            <NavBar
                mode={barMode}
                style={{background:barMode==="light"?"":barColor}}
                leftContent={<Icon type="left" style={{color: barMode === "light"?"":"#fff"}}/>}
                rightContent={<div className={"browser-right"} style={{background: barMode === "light"?"#fff":"none"}}>
                    <div><Icon type={"ellipsis"} size={"md"} onClick={this.showActionSheet}/></div>
                    <div className={"ant-divider ant-divider-vertical ant-divider-dashed"}></div>
                    <div><Icon type={"cross"} size={"md"} onClick={
                        () => {
                            // window.location.replace("/#/dapp")
                            window.removeEventListener("message", this.receiveMessage, false);
                            url.goBack();

                            if(plus && plus.navigator){
                                plus.navigator.setStatusBarBackground("#F7F7F7");
                                plus.navigator.setStatusBarStyle("dark");
                            }
                            browserData = {
                                barColor:"#f7f7f7",
                                barMode:"light",
                                navColor:"#F7F7F7",
                                navMode:"dark",
                                navTitle:"Browser"
                            }
                        }
                    }/></div>
                </div>}
                className="layout-top"
                onLeftClick={() => {
                    // window.location.replace("/#/dapp")
                    history.back();
                }}
            >
                {this.state.navTitle}
            </NavBar>
            <iframe className="h5-iframe"
                    style={{width: '100%', height: this.state.iFrameHeight, overflow: 'visible', marginTop: "45px"}}
                    onLoad={() => {
                        this.setState({
                            "iFrameHeight": document.documentElement.clientHeight - 45
                        });
                    }}
                    id="ifrModel"
                    ref="iframe"
                    src={this.state.url}
                    width="100%"
                    height={this.state.iFrameHeight}
                    frameBorder="no" border="0"
            />
            <Modal
                popup
                maskClosable
                visible={this.state.showTxInfo}
                animationType="slide-up"
            >
                {
                    data && <List>
                        <List.Item extra={<span>{data.from}</span>}>{lang.e().page.txDetail.from}</List.Item>
                        <List.Item extra={
                            <span>{decimals.convert(data.value, data.cy).toString(10)} {data.cy}</span>}>{lang.e().page.txDetail.amount}</List.Item>
                        <List.Item extra={<span>{data.data}</span>}>Data</List.Item>
                        <List.Item arrow="horizontal" onClick={()=>{
                            this.modifyGasPrice(data);
                        }} extra={
                            <div>
                                {decimals.convert(new BigNumber(data.gas).multipliedBy(new BigNumber(data.gasPrice)), "SERO").toString(10)}<br/>
                                <span style={{
                                    fontSize: '12px',
                                    color: "#ddd"
                                }}>{new BigNumber(data.gas).toString(10)}(Gas) * {new BigNumber(data.gasPrice).dividedBy(new BigNumber(10).pow(9)).toString(10)}(GTa)</span><br/>
                            </div>
                        }>
                            {lang.e().page.txDetail.fee}
                        </List.Item>
                        <List.Item>
                            <div style={{width: "100%", float: "left", display: "flex"}}>
                                <div style={{width: "25%", marginRight: "15px"}}>
                                    <Button onClick={() => {
                                        this.setState({showTxInfo: false})
                                        if(cb){
                                            cb("")
                                        }
                                    }}>{lang.e().button.cancel}</Button>
                                </div>
                                <div style={{width: "70%"}}>
                                    <Button type="primary" onClick={() => {
                                        this.submit(data)
                                    }}>{lang.e().button.confirm}</Button>
                                </div>
                            </div>
                        </List.Item>
                    </List>
                }
            </Modal>
        </div>


    }
}

export default Browser