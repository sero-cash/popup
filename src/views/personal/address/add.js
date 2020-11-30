import React, {Component} from 'react'
import {NavBar, Icon, WhiteSpace, Toast, WingBlank, InputItem, Button,TextareaItem} from 'antd-mobile'
import {createForm, formShape} from "rc-form";
import Address from "../../../components/address/address";
import Utils from "../../../config/utils";
import sero from "../../../sero.png";
import {validPkr} from "jsuperzk/dist/wallet/wallet"
import './address.css'
import {storage, keys, config, url, baseDecimal, lang} from "../../../config/common";

const utils = new Utils();
const address = new Address();
class Form extends React.Component {

    static propTypes = {
        form: formShape,
    };

    constructor(props) {
        super(props);
        this.state = {
            confirming: true
        }
    }

    componentWillMount() {
        const {getFieldDecorator ,setFieldsValue } = this.props.form;
        this.nameDecorator = getFieldDecorator('name', {
            rules: [{required: true}],
        });
        this.addressDecorator = getFieldDecorator('address', {
            rules: [{required: true}],
        });
        this.descDecorator = getFieldDecorator('desc', {
            rules: [{required: false}],
        });

        setFieldsValue({
            address:this.props.address
        })
    }

    checkConfirming = () => {
        let that = this;
        this.props.form.validateFields((error, value) => {
            if(value["name"] && value["address"]){
                that.setState({
                    confirming:false
                })
            }else{
                that.setState({
                    confirming:true
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
                if(!validPkr(value["address"])){
                    Toast.fail(lang.e().toast.error.invalidAddress,1)
                    that.setState({
                        confirming: false
                    });
                }else{
                    try{
                        address.add({
                            name:value["name"],
                            address:value["address"],
                            desc:value["desc"]
                        });
                        Toast.success(lang.e().toast.success.add,1);
                        setTimeout(function () {
                            // window.location.replace("/#/address/")
                            url.goBack();
                        },1000)
                    }catch (e) {
                        console.log(e.message);
                        Toast.fail(e.message,1)
                        that.setState({
                            confirming: false
                        });
                    }
                }
            }
        });
    }

    render() {
        const {getFieldProps} = this.props.form;
        return (
            <div style={{background:"#f7f7f7"}}>
                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>
                <div style={{textAlign: "center"}}>
                    <img src={sero} width={40}/>
                </div>
                <WhiteSpace size="lg"/>
                <div>
                    {this.nameDecorator(
                        <TextareaItem
                            className="textarea-bottom"
                            title=""
                            placeholder={lang.e().page.addressBook.name}
                            name="name"
                            ref={el => this.autoFocusInst = el}
                            autoHeight
                            clear
                            onBlur={this.checkConfirming}
                            style={{fontSize:"14px"}}
                        />
                    )}
                </div>
                <WhiteSpace size="lg"/>
                <div>
                    {this.addressDecorator(
                        <TextareaItem
                            className="textarea-bottom"
                            title=""
                            clear
                            placeholder={lang.e().page.addressBook.address}
                            name="address"
                            ref={el => this.autoFocusInst = el}
                            rows={4}
                            count={150}
                            autoHeight
                            onBlur={this.checkConfirming}
                            style={{fontSize:"14px",width:"92%"}}
                        />
                    )}
                    <Icon type="iconscan"
                          className="address-add-iconscan"
                          onClick={()=>{
                             url.goPage(url.scan("address"),url.AddressAdd)
                          }}
                    />
                </div>
                <WhiteSpace size="lg"/>
                <div style={{background:"#fdfdfd"}}>
                    {this.descDecorator(
                        <TextareaItem
                            className="textarea-bottom"
                            title=""
                            clear
                            placeholder={lang.e().page.addressBook.description}
                            name="desc"
                            ref={el => this.autoFocusInst = el}
                            autoHeight
                            onBlur={this.checkConfirming}
                            style={{fontSize:"14px"}}
                        />
                    )}
                </div>
                <div className="btn-bottom">
                    <Button type="primary" onClick={() => {
                        this.submit()
                    }} disabled={this.state.confirming}>{lang.e().button.add}</Button>
                </div>
            </div>
        );
    }
}

const AddAddressForm = createForm()(Form);

class AddressAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.setState({
        })
    }


    render() {
        return <div style={{background:"#f7f7f7",height: document.documentElement.clientHeight-45}}>
            <div className="layout-top">
                <NavBar
                    mode="light"
                    leftContent={<Icon type="left"/>}
                    onLeftClick={()=>{
                        url.goBack()
                    }}
                >
                    {lang.e().page.addressBook.add}
                </NavBar>

            </div>
            <WhiteSpace size="lg"/>
            <div style={{marginTop:"45px"}}>
                <AddAddressForm address={this.props.match.params.address}/>
            </div>
        </div>
    }
}

export default AddressAdd