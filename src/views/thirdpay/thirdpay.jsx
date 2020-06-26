import React,{Component} from 'react';
import { createForm, formShape } from 'rc-form';
import {List, InputItem, WhiteSpace, Button, Icon, NavBar, Modal, Toast} from 'antd-mobile';
import './thirdpay.css'
import {lang, url,storage} from "../../config/common";
import {utils} from '../../config/utils';
import {decimals} from "../../components/tx/decimals";
import BigNumber from "bignumber.js";
import Account from "../../components/account/account";
import {Transactions} from "../../components/tx/transactions";

const account = new Account();
const transactions = new Transactions();

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
    moneyKeyboardWrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

class Form extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        form: formShape,
    };
    state = {
        accountDetail: {},
        accountList:[],
        showAccount:false,
        valid:'',
        cachePayInfo:{
            payNo:'',
            to:'',
            gas:'0x0',
            gasPrice:'0x0',
            value:'0x0',
            cy:'SERO',
            data:'0x'
        },
    }

    componentDidMount() {
        this.init();
    }

    init(){
        const that = this;
        that.initPayInfo();
        let interId = sessionStorage.getItem("thirdPayInterId");
        if(interId){
            clearInterval(interId);
        }
        interId = setInterval(function(){
            try{
                if(plus && plus.nativeUI){
                    plus.nativeUI.closeWaiting();
                }
            }catch (e) {
            }

            that.initPayInfo();
        },1000)
        sessionStorage.setItem("thirdPayInterId",interId);
    }

    initPayInfo() {
        const that = this;
        const cachePayInfo = storage.get("seropay:info");
        if(cachePayInfo && cachePayInfo.type ==="thirdpay"){
            that.getAccount(cachePayInfo).then(()=>{
            }).catch((e)=>{
                that.setState({
                    valid:typeof e === 'string'?e:e.message,
                })
            });
            that.setState({
                cachePayInfo:cachePayInfo
            })
            storage.delete("seropay:info")
        }
    }

    async getAccount(cachePayInfo){
        const that = this;
        if(cachePayInfo){
            let list = await account.Details();
            let detail = await account.getCurrent();
            if(cachePayInfo.from){
                let existAccount = false;
                for(let d of list){
                    if(d.mainPKr === cachePayInfo.from){
                        detail = await account.Detail(d.address);
                        list=[detail];
                        existAccount=true;
                    }
                }
                if(!existAccount){
                    that.setState({
                        valid:`Account[${cachePayInfo.from}] not Exist! `,
                        accountDetail: {},
                        accountList:[],
                    })
                }else{
                    that.setState({
                        accountDetail:list&&list.length>0?list[0]:{},
                        accountList:list,
                    })
                }
            }else{
                that.setState({
                    accountDetail:list&&list.length>0?list[0]:{},
                    accountList:list,
                })
            }
        }
    }

    switchAccount (flag){
        const that = this;
        that.setState({
            showAccount:flag
        })
    }

    selectAccount(detail){
        const that = this;
        that.setState({
            accountDetail:detail,
            showAccount:false
        })
    }

    confirm =()=>{
        const that = this;
        const {valid,accountDetail,cachePayInfo} = that.state;
        if(!accountDetail || !accountDetail.mainPKr){
            Toast.fail("Please Select Account From",3);
        }else if(valid){
            Toast.fail(valid,3);
        }else if(cachePayInfo.from && accountDetail.mainPKr !== cachePayInfo.from){
            Toast.fail(lang.e().toast.error.useFrom,3);
        }else{
            Modal.prompt(
                lang.e().page.txTransfer.inputPassword,
                '',
                [
                    { text: lang.e().button.cancel },
                    { text: lang.e().button.confirm, onPress: password => that.submit(password) },
                ],
                'secure-text',
            )
        }
    }

    submit = (password)=>{
        const that = this;
        const {accountDetail,cachePayInfo} = this.state;
        let data = {}
        data.from = accountDetail.address;
        data.to=cachePayInfo.to;
        data.gas = cachePayInfo.gas;
        data.gasPrice = cachePayInfo.gasPrice;
        data.value=cachePayInfo.value;
        data.cy=cachePayInfo.cy;
        data.data=cachePayInfo.data;
        data.catg=cachePayInfo.catg;
        data.tkt=cachePayInfo.tkt;
        if (!password) {
            Toast.fail(lang.e().page.txTransfer.inputPassword)
        } else {
            try {
                Toast.loading(lang.e().toast.loading.sending,60)
                transactions.transfer(data, password).then(hash=>{
                    Toast.success(lang.e().toast.success.send, 2);
                    storage.delete("seropay:info");

                    that.callbackApp(cachePayInfo.appInf,hash)

                }).catch(error=>{
                    if(typeof error === "object"){
                        error = error.message;
                    }
                    if (error.indexOf("wrong passphrase") > -1) {
                        Toast.fail(lang.e().toast.error.passwordError, 2);
                    } else {
                        Toast.fail(error, 3);
                    }
                })
            } catch (e) {
                Toast.fail(e.message);
            }
        }
    }


     callbackApp(appInfo,hash) {
        if(!appInfo){
            setTimeout(function () {
                url.goPage(url.payResult(hash))
            },2000)
        }else{
            const txParams = {hash:hash};
            if(plus&&plus.os){
                if ( plus.os.name === "Android" ) {
                    plus.runtime.launchApplication( {pname:appInfo.pname,newTask:false,extra: txParams}
                        , function ( e ) {
                            Toast.fail("Can not open launcher",3);
                        } );
                } else if ( plus.os.name === "iOS" ) {
                    const iosParams = jsonToUrlParams(txParams);
                    plus.runtime.launchApplication( {action:`${appInfo.action}&${iosParams}`}, function ( e ) {
                        Toast.fail("Can not open launcher",3);
                    } );
                }
            }else{
                setTimeout(function () {
                    url.goPage(url.payResult(hash))
                },2000)
            }
        }
    }

    render() {

        const {accountDetail,accountList,showAccount,cachePayInfo} = this.state;

        const fee = decimals.convert(new BigNumber(cachePayInfo.gas).multipliedBy(new BigNumber(cachePayInfo.gasPrice)).toString(10),"SERO");
        const gasPrice = new BigNumber(cachePayInfo.gasPrice).div(new BigNumber(10).pow(9)).toString(10);
        const amount = decimals.convert(cachePayInfo.value,cachePayInfo.cy);
        return (
            <div>
                <NavBar
                    mode="light"
                    style={{background: "#f7f7f7"}}
                    leftContent={<Icon type="left"/>}
                    onLeftClick={()=>{url.goBack()}}
                >
                    <span>{lang.e().button.transfer}</span>
                </NavBar>
                <div style={{textAlign:'center'}}>
                    <h4>{cachePayInfo.payNo}</h4>
                    <h2>{amount} {cachePayInfo.cy}</h2>
                </div>
                <List>
                    <InputItem editable={false} extra={<Icon type={"right"}/>} onClick={()=>this.switchAccount(true)} value={utils.ellipsisAddress(accountDetail.mainPKr)}>
                        <span className={"tdpy-span"}>{lang.e().page.txDetail.from}</span>
                    </InputItem>
                    <InputItem editable={false} value={utils.ellipsisAddress(cachePayInfo.to)}>
                        <span className={"tdpy-span"}>{lang.e().page.txDetail.to}</span>
                    </InputItem>
                    <InputItem editable={false} value={`${amount} ${cachePayInfo.cy}`}>
                        <span className={"tdpy-span"}>{lang.e().page.txDetail.amount}</span>
                    </InputItem>
                    <List.Item multipleLine extra={<span style={{color:'#000'}}>{fee} SERO</span>} wrap>
                        <span className={"tdpy-span"}>{lang.e().page.txDetail.fee}</span>
                        <List.Item.Brief>
                            <span style={{fontSize:'10px'}}>Gas: {new BigNumber(cachePayInfo.gas,16).toString(10)} * GasPrice: {gasPrice} Gta</span>
                        </List.Item.Brief>
                    </List.Item>
                    <List.Item multipleLine wrap>
                        <span className={"tdpy-span"}>Data</span>
                        <List.Item.Brief>
                            <div className={"dataWr"}>
                                {cachePayInfo.data}
                            </div>
                        </List.Item.Brief>
                    </List.Item>
                </List>

                <WhiteSpace/>
                <List>
                    <List.Item>
                        <Button type={"primary"} style={{background:'#42ab6c',zIndex:'999'}} onClick={()=>this.confirm()}>{lang.e().button.next}</Button>
                    </List.Item>
                </List>

                <div  className={"tdp-remark"}>
                    <p>{lang.e().page.txTransfer.thirdpay}<br/><br/></p>
                </div>

                <Modal
                    popup
                    visible={showAccount}
                    onClose={()=>this.switchAccount(false)}
                    animationType="slide-up"
                >
                    <List renderHeader={() => <div>{lang.e().page.wallet.selectWallet}</div>} className="popup-list">
                        {accountList.map((act, index) => (
                            <List.Item key={index}
                                       arrow="horizontal"
                                       multipleLine
                                       thumb={<Icon type={act.avatar}/>}
                                       onClick={()=>{this.selectAccount(act)}}>
                                {act.name}
                                <List.Item.Brief>{utils.ellipsisAddress(act.mainPKr)}</List.Item.Brief>
                            </List.Item>
                        ))}
                        <List.Item key={"bt"}>{""}</List.Item>
                    </List>
                </Modal>
            </div>

        );
    }
}

const ThirdPayForm = createForm()(Form);

class ThirdPay extends Component{

    constructor(props) {
        super(props);

        this.state={

        }
    }

    render() {
        return (
            <div>
                <ThirdPayForm/>
            </div>
        );
    }

}


function jsonToUrlParams(data){
    var keys = Object.keys(data);;
    var urlArr = [];
    for(var i=0;i<keys.length;i++){
        var key = keys[i];
        var value = data[key];
        urlArr.push([key,value].join("="));
    }
    return urlArr.join("&");
}

export default ThirdPay