import React, {Component} from 'react'
import {WhiteSpace, InputItem, TextareaItem, WingBlank, Icon, NavBar, Button, Toast, Modal, List} from 'antd-mobile'
import {lang, url} from "../../config/common";
import Account from "../../components/account/account";
import {validPkr} from "jsuperzk/dist/wallet/wallet"
import {createForm} from 'rc-form';
import {Transactions} from "../../components/tx/transactions";
import {decimals} from "../../components/tx/decimals";
import BigNumber from "bignumber.js";
import {assetService} from "../../components/service/service";

let account = new Account()
const defaultFee = "0.00002500";

class Form extends Component {

    constructor(props) {
        super(props);
        this.amountDecorator = this.props.form.getFieldDecorator('amount', {
            rules: [{required: true}],
        });
        this.addressDecorator = this.props.form.getFieldDecorator('address', {
            rules: [{required: true}],
        });

        this.state = {
            confirming: false,
            total: 0,
        }

    }

    checkConfirming = () => {
        let that = this;
        this.props.form.validateFields((error, value) => {
            if (value["amount"] && value["address"]) {
                that.setState({
                    total: new BigNumber(value["amount"]).toString(10)
                })
            }
        })
    }

    componentDidMount() {
        if (this.props.address) {
            if (!validPkr(this.props.address)) {
                Toast.fail(lang.e().toast.error.invalidAddress, 2)
            } else {
                let that = this;
                const {setFieldsValue} = this.props.form;
                setFieldsValue({
                    address: that.props.address
                })
            }
        }
    }

    submit() {
        let that = this;
        that.setState({
            confirming: true
        });
        this.props.form.validateFields((error, value) => {
            if (!value["address"]) {
                Toast.fail(lang.e().page.txTransfer.inputAddress, 1.5)
                that.setState({
                    confirming: false
                });
                return
            }
            if (!value["amount"] || parseFloat(value["amount"]) === 0) {
                Toast.fail(lang.e().page.txTransfer.inputAmount, 1.5)
                that.setState({
                    confirming: false
                });
                return
            }
            if (this.props.currency === "SERO") {
                if (new BigNumber(value["amount"]).plus(new BigNumber(defaultFee)).comparedTo(new BigNumber(that.props.amount)) === 1) {
                    Toast.fail(lang.e().toast.error.notEnough, 1.5)
                    that.setState({
                        confirming: false
                    });
                    return
                }
            } else {
                account = new Account();
                account.getCurrent().then(detail=>{
                    assetService.balanceOf(detail.tk).then(data=>{
                        if(data && typeof data === 'object'){
                            data.forEach((amount,cy)=>{
                                if(cy ===  'SERO'){
                                    if (new BigNumber(defaultFee).comparedTo(amount) === 1) {
                                        Toast.fail(lang.e().toast.error.notEnoughFee, 1.5)
                                        that.setState({
                                            confirming: false
                                        });
                                    }
                                    if (new BigNumber(value["amount"]).comparedTo(new BigNumber(that.props.amount)) === 1) {
                                        Toast.fail(lang.e().toast.error.notEnough, 1.5)
                                        that.setState({
                                            confirming: false
                                        });
                                    }
                                }
                            })
                        }
                    })
                });
            }

            if (!validPkr(value["address"])) {
                Toast.fail(lang.e().toast.error.invalidAddress, 1.5)
                that.setState({
                    confirming: false
                });
                return
            }
            {
                if (error == null) {
                    Modal.prompt(lang.e().page.txTransfer.inputPassword, lang.e().page.txTransfer.passwordMsg, [{
                        text: lang.e().button.cancel, onPress: () => {
                            that.setState({
                                confirming: false
                            });
                        }
                    }, {
                        text: lang.e().button.confirm, onPress: (password) => {
                            if (!password) {
                                Toast.fail(lang.e().page.txTransfer.inputPassword, 1.5);
                                that.setState({
                                    confirming: false
                                });
                                return
                            }
                            Toast.loading(lang.e().toast.loading.sending,120)
                            const transaction = new Transactions(that.props.pk);
                            let tx = {
                                // from:,
                                to: value["address"],
                                // data:"",
                                cy: that.props.cy,
                                value: decimals.mul(value["amount"], that.props.cy, 0),
                                gas: 25000,
                                gasPrice: 1000000000,

                                catg:"TEST",
                                tkt:'0xeb4048b2de59c8427e8c856d3f47a369d427b8d602c14d737955ccd84c06ebe0',
                            }

                            transaction.transfer(tx, password).then(data=>{
                                if (data) {
                                    Toast.success(lang.e().toast.success.send, 2)
                                    setTimeout(function () {
                                        url.goPage(url.transferDetail(data), url.transferList(that.props.cy))
                                    }, 1500)
                                }
                            }).catch(e=>{
                                if(typeof e === "object"){
                                    e = e.message;
                                }
                                if (e.indexOf("wrong passphrase") > -1) {
                                    Toast.fail(lang.e().toast.error.passwordError, 2);
                                } else if (e.indexOf("no enough") > -1) {
                                    Toast.fail(lang.e().toast.error.notEnough, 2);
                                } else {
                                    Toast.fail(e, 3);
                                }
                                that.setState({
                                    confirming: false
                                });
                            })

                        }
                    }], 'secure-text', null, [lang.e().page.txTransfer.inputPassword]);
                }
            }
        });
    }

    render() {
        let {cy, amount} = this.props;
        return <div>
            <div className='coin'>
                <WingBlank>
                    <div className='title'>
                        <div className='left'><strong>{cy}</strong></div>
                        <div className='right'>
                            {amount}
                        </div>
                    </div>
                    <div className='content'>
                        {
                            this.amountDecorator(
                                <InputItem
                                    placeholder={lang.e().page.txTransfer.inputAmount}
                                    type='money'
                                    name='amount'
                                    moneyKeyboardAlign='left'
                                    onBlur={this.checkConfirming}
                                    onChange={this.checkConfirming}
                                />
                            )
                        }
                    </div>
                </WingBlank>
            </div>

            <WhiteSpace size="lg"/>
            <div className='address'>
                <WingBlank>
                    <div className='title'>
                        <div className='left'>{lang.e().page.txTransfer.address}</div>
                        <div className='right'>
                        </div>
                    </div>
                    <div className='content'>
                        {
                            this.addressDecorator(
                                <TextareaItem
                                    placeholder={lang.e().page.txTransfer.inputAddress}
                                    rows='4'
                                    name='address'
                                    style={{fontSize: ' 12px'}}
                                    onBlur={this.checkConfirming}
                                    onChange={this.checkConfirming}
                                />
                            )
                        }
                        <Icon type="iconAddressbook-" className="transfer-address" onClick={() => {
                            url.goPage(url.addressSelect(cy), url.transfer(cy + (this.props.address ? "/" + this.props.address : "")))
                        }}/>
                    </div>
                </WingBlank>
            </div>
            <WhiteSpace size="lg"/>
            <div className='fee'>
                <WingBlank>
                    <div className='title'>
                        <div className='left'>{lang.e().page.txTransfer.fee} </div>
                        <div className='right' style={{textAlign: 'right'}}>
                            <span style={{fontSize: '14px'}}>{defaultFee} SERO</span><br/>
                            <span style={{
                                fontSize: '12px',
                                color: "rgb(136, 136, 136)"
                            }}>Gas(25000) * GasPrice(1Gta)</span>
                        </div>
                    </div>
                </WingBlank>
            </div>
            <WhiteSpace size="lg"/>
            <div className='fee'>
                <WingBlank>
                    <div className='title'>
                        <div className='left'>{lang.e().page.txTransfer.total} </div>
                        <div className='right' style={{textAlign: 'right'}}>
                            {
                                "SERO" === this.props.cy ? <div>
                                    <span style={{
                                        fontSize: '14px',
                                        color: "#333",
                                        fontWeight: "bold"
                                    }}>{new BigNumber(this.state.total).plus(new BigNumber(defaultFee)).toString(10)}</span> {this.props.cy}
                                </div> : <div>
                                    <span style={{
                                        fontSize: '14px',
                                        color: "#333",
                                        fontWeight: "bold"
                                    }}>{this.state.total}</span> {this.props.cy}
                                    <br/><span style={{
                                    fontSize: '14px',
                                    color: "#333",
                                    fontWeight: "bold"
                                }}>+ {defaultFee}</span> SERO
                                </div>
                            }

                        </div>
                    </div>
                </WingBlank>
            </div>
            <WhiteSpace/>

            <div className="btn-bottom">
                <Button type="primary" disabled={this.state.confirming} onClick={()=>{this.submit()}} >{lang.e().button.next}</Button>
                {/*<Button type="primary" disabled={true}>{lang.e().button.openTip}</Button>*/}
            </div>
        </div>
    }

}

const TransferForm = createForm()(Form);

class Transfer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            amount: 0,
            currency: 'SERO',
            current: '',
            detail: {}
        }
    }

    componentDidMount() {
        const that = this;
        that.init().then();
    }

    async init(){
        const that = this;
        const currency = that.props.match.params.currency;
        const current = await account.getCurrent();
        // account = new Account(current.address);
        const detail = await account.Detail(current.address);
        const data = await assetService.balanceOf(detail.tk);
        if(data && typeof data === 'object'){
            data.forEach((amount,cy)=>{
                if(cy ===  currency){
                    amount = decimals.convert(amount, currency);
                    that.setState({
                        amount: amount,
                    })
                }
            })
        }
        that.setState({
            currency: currency,
            current: current,
            detail: detail,
        })
    }

    render() {
        const {currency, detail, amount} = this.state;
        return <div style={{height: document.documentElement.clientHeight}}>
            <NavBar
                mode="light"
                icon={<Icon type="left"/>}
                onLeftClick={() => {
                    url.goBack();
                }}
                rightContent={<Icon type="iconscan" onClick={

                    () => {
                        url.goPage(url.scan("transfer",currency), url.transfer(currency))
                    }
                }/>}
            >
                {lang.e().button.transfer}
            </NavBar>
            <TransferForm amount={amount} tk={detail.tk} cy={currency} address={this.props.match.params.address}/>

        </div>
    }

}

export default Transfer