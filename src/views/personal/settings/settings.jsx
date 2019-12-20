import React, {Component} from 'react'
import {NavBar, Modal, Icon, WingBlank, WhiteSpace, List, Toast, InputItem, Button} from 'antd-mobile'
import {config, url, lang} from "../../../config/common";
import {assetService} from "../../../components/service/service";

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            network: [],
            showNetwork: false,
        }
    }

    componentDidMount() {
        config.init();

        this.setState({
            network: [

                {
                    id: "1",
                    network: "main",
                    name: "华南(成都)",
                    rpc: "http://148.70.169.73:8545",
                },
                {
                    id: "1",
                    network: "main",
                    name: "华南(成都)",
                    rpc: "http://140.143.83.98:8545",
                },
                {
                    id: "2",
                    network: "main",
                    name: "华南(广州)",
                    rpc: "http://129.204.197.105:8545",
                },
                {
                    id: "3",
                    network: "main",
                    name: "JAPAN",
                    rpc: "http://52.199.145.159:8545",
                }
            ]
        })
    }


    clearData = () => {
        try {
            Toast.loading("Clearing...")
            assetService.clearData().then(res=>{
                Toast.success(lang.e().toast.success.clear,2)
                setTimeout(function () {
                    Modal.alert(lang.e().modal.clearData, lang.e().modal.clearTip, [{
                        text: lang.e().button.confirm, onPress: () => {
                            window.location.href="./"
                        },
                    }])
                },2000)
            }).catch(err=>{
                Toast.fail(err,3)
                console.log(err)
            })
        } catch (e) {
            Toast.fail(e.message,3)
            console.log("clear Data:",e.message)
        }
    }

    setRpc(rpc){
        if(rpc){
            config.setRpc(rpc)
            assetService.init()
        }
        this.setState({
            showNetwork: false
        })
    }

    actionSheet(data){
        let op = [];
        data.forEach(value=>{
            op.push({
                text:value.url,
                onPress:()=>{
                    window.location.href=value.url+"#/";
                }
            })
        })
        Modal.operation(op)
    }

    render() {
        let that = this;
        let {network} = this.state;

        return <div style={{height: document.documentElement.clientHeight - 45}}>
            <div className="layout-top">
                <NavBar
                    mode="light"
                    leftContent={<Icon type="left"/>}
                    onLeftClick={() => {
                        url.goBack()
                    }}
                >
                    {lang.e().page.my.settings}
                </NavBar>

            </div>
            <div style={{marginTop: "45px"}}>
                <WhiteSpace size="lg"/>
                <List>
                    <WingBlank size="lg">
                        <List.Item extra={
                            <span style={{fontSize: "14px"}}>{lang.e().value}</span>
                        } arrow="horizontal"
                                   onClick={() => {
                                       Modal.operation([
                                           {
                                               text: lang.en_US.value, onPress: () => {
                                                   config.setLanguage(lang.en_US.key);
                                                   url.goPage(url.Settings + "?" + new Date());
                                               }
                                           },
                                           {
                                               text: lang.zh_CN.value, onPress: () => {
                                                   config.setLanguage(lang.zh_CN.key);
                                                   url.goPage(url.Settings + "?" + new Date());
                                               }
                                           },
                                           {
                                               text: lang.ja_JP.value, onPress: () => {
                                                   config.setLanguage(lang.ja_JP.key);
                                                   url.goPage(url.Settings + "?" + new Date());
                                               }
                                           },
                                           {
                                               text: lang.be_BY.value, onPress: () => {
                                                   config.setLanguage(lang.be_BY.key);
                                                   url.goPage(url.Settings + "?" + new Date());
                                               }
                                           },
                                           {
                                               text: lang.ko_KR.value, onPress: () => {
                                                   config.setLanguage(lang.ko_KR.key);
                                                   url.goPage(url.Settings + "?" + new Date());
                                               }
                                           }
                                       ])
                                   }}
                        ><span>{lang.e().page.setting.language}</span></List.Item>
                        <List.Item extra={
                            <span style={{fontSize: "14px"}}>{config.moneyType.toUpperCase()}</span>
                        } arrow="horizontal" onClick={() => {
                            Modal.operation([
                                {
                                    text: "USD", onPress: () => {
                                        config.setMoneyType("usd")
                                        this.setState({
                                            moneyType: "usd"
                                        })
                                    }
                                },
                                {
                                    text: "CNY", onPress: () => {
                                        config.setMoneyType("cny")
                                        this.setState({
                                            moneyType: "cny"
                                        })
                                    }
                                }
                            ])
                        }}><span>{lang.e().page.setting.unit}</span></List.Item>
                        <List.Item extra={
                            <span style={{fontSize: "14px"}}>{config.host.rpc}</span>
                        } arrow="horizontal" onClick={() => {
                            this.setState({
                                showNetwork: true
                            })
                        }}><span>{lang.e().page.setting.node}</span></List.Item>

                        <List.Item  arrow="horizontal" onClick={() => {
                            url.goPage(url.HistoryPKr,url.Settings)
                        }}><span>{lang.e().page.setting.pkr}</span></List.Item>

                        {
                            plus?
                            <List.Item  arrow="horizontal" onClick={() => {
                                window.location.href="./enter.html"
                            }}><span>Select  Wallet Source</span></List.Item>:""
                        }

                    </WingBlank>
                </List>

                <WhiteSpace/>
                <List>
                    <List.Item onClick={() => {
                        Modal.alert(lang.e().modal.clearData, lang.e().modal.confirmClear, [{
                            text: lang.e().button.cancel, onPress: () => {
                            }
                        }, {
                            text: lang.e().button.confirm, onPress: () => {
                                this.clearData()
                            },
                        }])
                    }}>
                        <div style={{color: "red", textAlign: "center"}}>{lang.e().page.my.clear}</div>
                    </List.Item>
                </List>

                <Modal
                    popup
                    visible={this.state.showNetwork}
                    onClose={() => {
                        this.setState({
                            showNetwork: false
                        })
                    }}
                    animationType="slide-up"
                >
                    <List renderHeader={() => <div>{lang.e().page.setting.node}</div>} className="popup-list">
                        {network.map((v, index) => (
                            <List.Item key={index} onClick={() => {
                                this.setRpc(v.rpc);
                            }}>{v.rpc}({v.name})</List.Item>
                        ))}
                        <List.Item>
                            <InputItem placeholder={"Input node host"} id="customer"/>
                            <div style={{marginTop:"15px"}}>
                                <Button type="primary" onClick={()=>{
                                    let customer = document.getElementById("customer").value;
                                    this.setRpc(customer);
                                }}>{lang.e().button.confirm}</Button>
                            </div>
                        </List.Item>
                    </List>

                </Modal>
            </div>
        </div>
    }
}

//
// function actionSheet(data) {
//     var btns = [];
//     for(var i =0;i<data.length;i++){
//         btns.push({title:data[i].url})
//     }
//
//     plus.nativeUI.actionSheet(
//         {
//             title:"Select node host",
//             buttons:btns
//         },
//         function(e){
//             var i=e.index;
//             if(i<=0){
//                 actionSheet(data);
//             }else{
//                 var _url = data[i-1].url;
//                 // embed=plus.webview.create(_url, 'SERO Popup', {"titleNView": false,statusbar:{"background": "#f7f7f7"}});
//                 ws.show();
//                 ws.loadURL(_url, {Referer:'https://sero.cash/'});
//             }
//
//         }
//     );
// }

export default Settings