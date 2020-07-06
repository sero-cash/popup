import React, {Component} from 'react'
import {NavBar, Icon, WhiteSpace, WingBlank, InputItem, Button, Toast} from 'antd-mobile'
import {createForm, formShape} from 'rc-form';
import Account from "../../components/account/account";
import './create.css'
import sero from '../../sero.png'
import { storage,keys, config, url,lang} from "../../config/common";


let ac = new Account();

class Form extends React.Component {

    static propTypes = {
        form: formShape,
    };

    constructor(props) {
        super(props);
        this.state = {
            confirming: true,
            tipsShow:"none",
        }
    }

    componentWillMount() {

        this.nameDecorator = this.props.form.getFieldDecorator('name', {
            rules: [{required: true}],
        });
        this.passwordDecorator = this.props.form.getFieldDecorator('password', {
            rules: [{required: true}],
        });
        this.repasswordDecorator = this.props.form.getFieldDecorator('repassword', {
            rules: [{required: true}],
        });


    }

    checkConfirming = () => {
        this.props.form.validateFields((error, value) => {
            if (value["name"] && value["password"] && value["repassword"]) {
                this.setState({
                    confirming: false
                })
            }else{
                this.setState({
                    confirming: true
                })
            }
        })
    }

    submit() {
        let that = this;
        that.setState({
            confirming: true
        });
        this.props.form.validateFields((error, value) => {
            if (error == null) {
                try {
                    if(value["password"].length<8 || value["repassword"].length<8){
                        Toast.fail(lang.e().toast.error.passwordVerify,1);
                        that.setState({
                            confirming: false
                        });
                        return;
                    }
                    if (value["password"] !== value["repassword"]) {
                        Toast.fail(lang.e().toast.error.passwordNotMatch,1);
                        that.setState({
                            confirming: false
                        });
                        return
                    }
                    let data = ac.genWord();
                    if (data) {
                        ac.PreCreate(value["name"],value["password"],value["hint"],data).then(()=>{
                            that.setState({
                                confirming: false
                            });
                            url.goPage(url.AccountCreate2,url.AccountCreate1);
                        }).catch(e=>{
                            Toast.fail(e.message,2);
                            that.setState({
                                confirming: false
                            });
                        })
                    }
                }catch (e) {
                    console.log(e.message);
                    that.setState({
                        confirming: false
                    });
                }
            }

        });
    }

    render() {
        const {getFieldProps} = this.props.form;
        return (
            <div style={{background:"#f7f7f7",height:document.documentElement.clientHeight-45}}>
                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>

                <div style={{textAlign: "center"}}>
                    <img src={sero} width={40}/>
                    <h3>{lang.e().page.create.step1.title}</h3>
                </div>

                <WingBlank>
                    {this.nameDecorator(
                        <InputItem type="text" placeholder={lang.e().page.create.step1.walletName} onBlur={this.checkConfirming} onChange={this.checkConfirming} autoComplete="off" clear/>
                    )}
                    <WhiteSpace size="lg"/>
                    <div>
                    {this.passwordDecorator(
                        <InputItem type="password" placeholder={lang.e().page.create.step1.password} onBlur={this.checkConfirming} onChange={this.checkConfirming} onFocus={()=>{
                            this.setState({
                                tipsShow:"block"
                            })
                        }} onBlur={()=>{
                            this.setState({
                                tipsShow:"none"
                            })
                        }} autoComplete="new-password" clear/>
                    )}
                    <div style={{color:"#108ee9",fontSize:"12px",textAlign:"right",marginTop:"5px",display:`${this.state.tipsShow}`}}>{lang.e().page.create.step1.passwordTips}</div>
                    <WhiteSpace size="lg"/>
                    </div>
                    <div>
                        {this.repasswordDecorator(
                            <InputItem type="password" placeholder={lang.e().page.create.step1.rePassword} onBlur={this.checkConfirming}  onChange={this.checkConfirming} autoComplete="new-password" clear/>
                        )}
                        <WhiteSpace size="lg"/>
                    </div>
                    <InputItem type="text" placeholder={lang.e().page.create.step1.hint} {...getFieldProps('hint')} clear/>

                </WingBlank>
                <div className="btn-bottom">
                    <Button type="primary" style={{zIndex:"-1"}} onClick={() => {
                        this.submit()
                    }} disabled={this.state.confirming}>{lang.e().button.create}</Button>

                    {/*<Button type="primary" style={{zIndex:"-1"}} disabled={true}>{lang.e().button.openTip}</Button>*/}
                </div>
            </div>
        );
    }
}

const AccountCreateForm = createForm()(Form);

class AccountCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {

        return <div style={{height: document.documentElement.clientHeight}}>
            <NavBar
                mode="light"
                icon={<Icon type="left"/>}
                onLeftClick={() => {
                    url.goBack();
                }}
                rightContent={<span style={{color:"#108ee9"}} onClick={
                    ()=>{
                        url.goPage(url.ImportAccount,url.AccountCreate1)
                    }
                }>{lang.e().page.create.import}</span>}
            />

            <AccountCreateForm/>

        </div>
    }
}

export default AccountCreate