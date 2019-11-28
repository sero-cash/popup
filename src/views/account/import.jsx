import React,{Component} from 'react'
import {Icon, InputItem, NavBar, TextareaItem, WingBlank, Button, Toast,WhiteSpace} from "antd-mobile";
import {url,lang} from "../../config/common";
import {createForm} from "rc-form";
import Account from "../../components/account/account";

const account = new Account();
class Form extends Component{

    constructor(props) {
        super(props);

        this.state={
            checkConfirming:true,
            tipsShow:"none"
        }
        this.nameDecorator = this.props.form.getFieldDecorator('name', {
            rules: [{required: true}],
        });

        this.wordDecorator = this.props.form.getFieldDecorator('word', {
            rules: [{required: true}],
        });
        this.passwordDecorator = this.props.form.getFieldDecorator('password', {
            rules: [{required: true}],
        });
        this.repasswordDecorator = this.props.form.getFieldDecorator('repassword', {
            rules: [{required: true}],
        });
        this.hindDecorator = this.props.form.getFieldDecorator('hint', {
            rules: [{required: false}],
        });

    }

    checkConfirming = () => {
        this.props.form.validateFields((error, value) => {
            if (value["name"] && value["word"] && value["password"] && value["repassword"] ) {
                this.setState({
                    checkConfirming: false
                })
            }else{
                this.setState({
                    checkConfirming: true
                })
            }
        })
    }

    import(){
        let that = this;
        that.setState({
            checkConfirming: true
        });
        this.props.form.validateFields((error, value) => {
            if (error == null) {
                if(value["password"].length<8 || value["repassword"].length<8){
                    Toast.fail(lang.e().toast.error.passwordVerify,1.5);
                    that.setState({
                        checkConfirming: false
                    });
                    return;
                }

                if(value["password"] !== value["repassword"]){
                    Toast.fail(lang.e().toast.error.passwordNotMatch,1.5);
                    that.setState({
                        checkConfirming: false
                    });
                }else{
                        Toast.loading(lang.e().toast.loading.importing,60);
                        setTimeout(function () {
                            account.importMnemonic(value["name"],value["hint"],value["word"],value["password"]).then(function (data) {
                                Toast.success(lang.e().toast.success.import,1.5);
                                setTimeout(function () {
                                    url.goPage(url.Home)
                                    // window.location.href="/"
                                },1000)
                            }).catch(error=>{
                                Toast.fail(error,2);
                                that.setState({
                                    checkConfirming: false
                                });
                            })
                        },500)

                }
            }
        })

    }

    render() {
        return <div>

            <WingBlank>
            <div style={{fontSize:"14px",color:"#64727e"}}>
                {lang.e().page.import.tips}
            </div>
            </WingBlank>
            <WhiteSpace size="lg"/>
            <div style={{background:"#f7f7f7"}}>
            <WingBlank>
                {
                    this.wordDecorator(<TextareaItem
                        placeholder={lang.e().page.import.inputTips}
                        rows='5'
                        style={{fontSize: ' 14px'}}
                    />)
                }
            </WingBlank>
            </div>
            <WhiteSpace size="lg"/>

            <div style={{background:"#f7f7f7"}}>
                <WingBlank>
                    {
                        this.nameDecorator(
                            <InputItem type="text" placeholder={lang.e().page.import.name} onBlur={this.checkConfirming} onChange={this.checkConfirming}  autoComplete="off"/>
                        )
                    }
                </WingBlank>
            </div>
            <WhiteSpace size="lg"/>

            <div style={{background:"#f7f7f7"}}>
            <WingBlank>
                {
                    this.passwordDecorator(
                        <InputItem type="password" placeholder={lang.e().page.import.password} onBlur={this.checkConfirming} onChange={this.checkConfirming} autoComplete="off" onFocus={()=>{
                            this.setState({
                                tipsShow:"block"
                            })
                        }} onBlur={()=>{
                            this.setState({
                                tipsShow:"none"
                            })
                        }}/>
                    )
                }
                <div style={{color:"#108ee9",fontSize:"12px",textAlign:"right",marginTop:"5px",display:`${this.state.tipsShow}`}}>{lang.e().page.create.step1.passwordTips}</div>
            </WingBlank>
            </div>
            <WhiteSpace size="lg"/>

            <div style={{background:"#f7f7f7"}}>
            <WingBlank>
                {
                    this.repasswordDecorator(
                        <InputItem type="password" placeholder={lang.e().page.import.rePassword} onBlur={this.checkConfirming} onChange={this.checkConfirming} autoComplete="new-password"/>
                    )
                }
            </WingBlank>
            </div>
            <WhiteSpace size="lg"/>

            <div style={{background:"#f7f7f7"}}>
            <WingBlank>
                {
                    this.hindDecorator(
                        <InputItem type="text" placeholder={lang.e().page.import.hint} onBlur={this.checkConfirming} onChange={this.checkConfirming} autoComplete="new-password"/>
                    )
                }
            </WingBlank>
            </div>

            <div className="btn-bottom">
                <Button type="primary" onClick={() => {
                    this.import()
                }} disabled={this.state.checkConfirming}>{lang.e().button.import}</Button>
            </div>

        </div>
    }
}

const ImportAccountForm = createForm()(Form);

class ImportAccount extends Component{

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
            >
                {lang.e().button.importWallet}
            </NavBar>
            <WhiteSpace size="lg"/>
            <ImportAccountForm/>
        </div>
    }
}

export default ImportAccount