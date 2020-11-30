import React, {Component} from 'react'
import {NavBar, Icon, WhiteSpace, Toast, WingBlank, Modal, Button, TextareaItem, List} from 'antd-mobile'
import {createForm, formShape} from "rc-form";
import Address from "../../../components/address/address";
import Utils from "../../../config/utils";
import sero from "../../../sero.png";
import {validPkr} from "jsuperzk/dist/wallet/wallet"
import './address.css'
import { storage,keys, config, url,lang} from "../../../config/common";

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
        if(!this.props.address){
            // window.location.replace("/#/address")
            url.goPage(url.AddressList,url.WalletManager)
            return
        }
        this.nameDecorator = this.props.form.getFieldDecorator('name', {
            rules: [{required: true}],
            initialValue:this.props.address.name || ''
        });
        this.addressDecorator = this.props.form.getFieldDecorator('address', {
            rules: [{required: true}],
            initialValue:this.props.address.address || ''
        });
        this.descDecorator = this.props.form.getFieldDecorator('desc', {
            rules: [{required: false}],
            initialValue:this.props.address.desc || ''
        });
    }

    submit() {
        let that = this;
        this.props.form.validateFields((error, value) => {
            if (error == null) {
                if(!validPkr(value["address"])){
                    Toast.fail(lang.e().toast.error.invalidAddress,1)
                }else{
                    try{
                        address.remove(this.props.address.address);

                        address.add({
                            name:value["name"],
                            address:value["address"],
                            desc:value["desc"]
                        });
                        Toast.success(lang.e().toast.success.save,1);
                        setTimeout(function () {
                            // window.location.replace("/#/address/detail/"+value["address"])
                            url.goBack();
                            // url.goPage(url.addressDetail(value["address"]),url.AddressList)
                        },1000)
                    }catch (e) {
                        Toast.fail(e.message,1)
                    }
                }
            }else{
                if(error.name){
                    Toast.fail(error.name.errors[0].message,1);
                }else if(error.address){
                    Toast.fail(error.address.errors[0].message,1);
                }
            }
        });
    }

    render() {
        return (
            <div>
                <div className="layout-top">
                    <NavBar
                        mode="light"
                        leftContent={lang.e().button.cancel}
                        onLeftClick={()=>{
                            url.goBack();
                        }}
                        rightContent={<span style={{color:"#108ee9"}} onClick={()=>{this.submit()}}>{lang.e().button.save}</span>}
                    >
                        {lang.e().page.addressBook.detail}
                    </NavBar>
                </div>
                <WhiteSpace size="lg"/>
                <div style={{marginTop:"45px"}}>
                    <div>
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
                                    autoFocus
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
                                    title=""
                                    placeholder={lang.e().page.addressBook.address}
                                    name="address"
                                    ref={el => this.autoFocusInst = el}
                                    autoHeight
                                    clear
                                    style={{fontSize:"14px"}}
                                    editable={false}
                                    rows={4}
                                />
                            )}
                        </div>
                        <WhiteSpace size="lg"/>
                        <div style={{background:"#fdfdfd"}}>
                            {this.descDecorator(
                                <TextareaItem
                                    title=""
                                    clear
                                    placeholder={lang.e().page.addressBook.description}
                                    name="desc"
                                    ref={el => this.autoFocusInst = el}
                                    autoHeight
                                    onBlur={this.checkConfirming}
                                />
                            )}
                        </div>
                    </div>

                    <WhiteSpace size="lg"/>
                    <Button onClick={() => {
                        Modal.alert(lang.e().button.deleteAddress,lang.e().modal.sure,[{
                            text:lang.e().button.cancel,onPress:()=>{}
                        },{
                            text:lang.e().button.confirm,onPress:()=>{
                                address.remove(this.props.address.address);
                                Toast.success("Delete Successfully",1);
                                setTimeout(function () {
                                    // window.location.replace("/#/address/")
                                    url.goPage(url.AddressList,url.WalletManager);
                                },1000)
                            }
                        }])
                    }} ><span style={{color:"red"}}>{lang.e().button.deleteAddress}</span></Button>
                </div>
            </div>

        );
    }
}

const EditAddressForm = createForm()(Form);

class AddressEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address:'',
            save:false
        }
    }

    componentWillMount() {
        const pk = this.props.match.params.address;
        const data = address.info(pk);
        this.setState({
            address: data
        })
    }


    render() {
        return <div style={{height: document.documentElement.clientHeight-45}}>
                <EditAddressForm address={this.state.address} save={this.state.save}/>
        </div>
    }
}

export default AddressEdit