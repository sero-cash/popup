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
    static propTypes = {
        form: formShape,
    };
    state = {
        payInfo: {
            payNo:'00000',
            to:'',
            gas:'0x0',
            gasPrice:'0x0',
            value:'0x0',
            cy:'SERO',
            data:'0x'
        },
        accountDetail: {},
        accountList:[],
        showAccount:false,
        valid:'',
    }

    componentDidMount() {

        try{
            if(plus && plus.nativeUI){
                plus.nativeUI.closeWaiting();
            }
        }catch (e) {
        }

        const that = this;
        const cachePayInfo = storage.get("seropay:info");

        this.getPayInfo(cachePayInfo);
        this.getAccount(cachePayInfo).then(()=>{
        }).catch((e)=>{
            that.setState({
                valid:typeof e === 'string'?e:e.message,
            })
        });

        storage.delete("seropay:info")
    }

    getPayInfo(cachePayInfo){
        const that = this;
        if(!cachePayInfo){
            // url.goPage(url.Home);
        }else{
            that.setState({
                payInfo:cachePayInfo
            })
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
                        valid:'Account not Exist! ',
                        accountDetail: {},
                        accountList:[],
                    })
                }else{
                    that.setState({
                        accountDetail:detail,
                        accountList:list,
                    })
                }
            }else{
                that.setState({
                    accountDetail:detail,
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
        const {valid,accountDetail,payInfo} = that.state;
        if(valid){
            Toast.fail(valid,3);
        }else if(payInfo.from && accountDetail.mainPKr !== payInfo.from){
            Toast.fail("The account you selected is not the designated payment account",3);
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
        const {payInfo,accountDetail} = this.state;
        let data = {}
        data.from = accountDetail.mainPKr;
        data.gas = payInfo.data;
        data.gasPrice = payInfo.data;
        data.value=payInfo.value;
        data.cy=payInfo.cy;
        data.data=payInfo.data;
        data.catg=payInfo.catg;
        data.tkt=payInfo.tkt;

        if (!password) {
            Toast.fail(lang.e().page.txTransfer.inputPassword)
        } else {
            try {
                Toast.loading(lang.e().toast.loading.sending,60)
                transactions.transfer(payInfo, password).then(hash=>{
                    Toast.success(lang.e().toast.success.send, 2)
                    storage.delete("seropay:info")
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

    render() {

        const {payInfo,accountDetail,accountList,showAccount} = this.state;

        const fee = decimals.convert(new BigNumber(payInfo.gas).multipliedBy(new BigNumber(payInfo.gasPrice)).toString(10),"SERO");
        const gasPrice = new BigNumber(payInfo.gasPrice).div(new BigNumber(10).pow(9)).toString(10);
        const amount = decimals.convert(payInfo.value,payInfo.cy);
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
                    <h4>{payInfo.payNo}</h4>
                    <h2>{amount} {payInfo.cy}</h2>
                </div>
                <List>
                    <InputItem editable={false} extra={<Icon type={"right"}/>} onClick={()=>this.switchAccount(true)} value={utils.ellipsisAddress(accountDetail.mainPKr)}>
                        <span className={"tdpy-span"}>{lang.e().page.txDetail.from}</span>
                    </InputItem>
                    <InputItem editable={false} value={utils.ellipsisAddress(payInfo.to)}>
                        <span className={"tdpy-span"}>{lang.e().page.txDetail.to}</span>
                    </InputItem>
                    <InputItem editable={false} value={`${amount} ${payInfo.cy}`}>
                        <span className={"tdpy-span"}>{lang.e().page.txDetail.amount}</span>
                    </InputItem>
                    <List.Item multipleLine extra={<span style={{color:'#000'}}>{fee} SERO</span>} wrap>
                        <span className={"tdpy-span"}>{lang.e().page.txDetail.fee}</span>
                        <List.Item.Brief>
                            <span style={{fontSize:'10px'}}>Gas: {new BigNumber(payInfo.gas,16).toString(10)} * GasPrice: {gasPrice} Gta</span>
                        </List.Item.Brief>
                    </List.Item>
                    <List.Item multipleLine wrap>
                        <span className={"tdpy-span"}>Data</span>
                        <List.Item.Brief>
                            <div className={"dataWr"}>
                                {payInfo.data}
                            </div>
                        </List.Item.Brief>
                    </List.Item>
                </List>

                <WhiteSpace/>
                <List>
                    <List.Item>
                        <Button type={"primary"} style={{background:'#42ab6c'}} onClick={()=>this.confirm()}>{lang.e().button.next}</Button>
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

export default ThirdPay