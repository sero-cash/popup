import React, {Component} from 'react'
import {Grid, SearchBar,Toast,Modal,List,Button,Checkbox,Icon} from 'antd-mobile'
import Layout from "../layout/layout";
import {storage, keys, url, lang,config} from "../../config/common";
import './dapp.css'
import {versionControlDataEn,versionControlDataCn,popupDataEn,popupDataCn} from './dapp-data'

let dataRecent =[];

const AgreeItem = Checkbox.AgreeItem;

class DApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:versionControlDataEn,
            popupData:popupDataEn,
            modal2:false,
            dapp:'',
            dappUrl:'',
            visitDApp:true,
            read:false,
            now:0,
        }
    }

    componentDidMount() {

        if(config.isZH()){
            this.setState({
                data:versionControlDataCn,
                popupData:popupDataCn
            })
        }else{
            this.setState({
                data:versionControlDataEn,
                popupData:popupDataEn
            })
        }

        if(plus && plus.navigator){
            plus.navigator.setStatusBarBackground("#F7F7F7");
            plus.navigator.setStatusBarStyle("dark");
        }

    }

    showModal = (e,flag) => {
        const read = storage.get(keys.dappsRead(e.text));
        let url = e.url;
        if(flag){
            url = e.url + "?" + new Date().getTime();
        }
        this.setState({
            "modal2": true,
            "dapp":e.text,
            "dappUrl":url,
            "read":read,
            "visitDApp":!read,
        });
    }

    onClose = () => {
        this.setState({
            "modal2": false,
        });
    }

    visitDApp(flag,name){
        const {dapp} = this.state;
        storage.set(keys.dappsRead(dapp),!flag)
        this.setState({
            visitDApp: flag,
            read:!flag
        });
    }

    read=()=>{
        if(lang.e().key==="zh_CN"){
            url.goPage(url.browser("https://sero.cash/app/disclaimer/index-zh.html"),url.DApp)
        }else{
            url.goPage(url.browser("https://sero.cash/app/disclaimer/index-en.html"),url.DApp)
        }
    }

    clearRecent(){
        storage.delete(keys.dapp.list);
        this.setState({
            now:new Date().getTime()
        })
    }

    render() {

        const {data,popupData,visitDApp,read} = this.state;

        console.log("read>>>> ",read)
        let dapps = storage.get(keys.dapp.list);
        if(dapps) {
            dataRecent=[];
            let tripMap = new Map();
            for(let contractAddress of dapps){
                if(!tripMap.get(contractAddress) === true){
                    tripMap.set(contractAddress,true);
                    let dapp = storage.get(keys.dappsInfoKey(contractAddress));
                    dataRecent.push({
                        icon: <div className="dapp-icon">
                            <img src={dapp.logo} className="dapp-img"/>
                        </div>,
                        text: dapp.name,
                        url: dapp.url,
                    })
                    if(dataRecent.length>=8){
                        break
                    }
                }
            }
        }else{
            dataRecent = [];
        }

        return <Layout selectedTab="dapp">
            <div className="layout-top" style={{color:"#f7f7f7"}}>
                <SearchBar placeholder={lang.e().page.dapp.search} maxLength={200} onSubmit={(val) => {
                    // window.location.replace("/#/browser/"+encodeURIComponent(val));
                    if(val){
                        if(val.indexOf("http")>-1){
                            url.goPage(url.browser(val), url.DApp);
                        }else{
                            Toast.fail(lang.e().page.dapp.invalidDApp,3)
                        }
                    }

                }}/>
            </div>

            <div style={{padding:'45px 0 60px',overflow:'scroll',background:"#fdfdfd"}} >
                <div className="sub-title">{lang.e().page.dapp.popup} </div>
                <div style={{textAlign: 'center'}}>
                    <Grid data={popupData} activeStyle={false}  onClick={
                        (e,index)=>{
                            url.goPage(url.browser(e.url+"?"+new Date().getTime()),url.DApp);
                        }
                    } hasLine={false}/>
                </div>

                <div className="sub-title">{lang.e().page.dapp.recommended} </div>
                <div style={{textAlign: 'center'}}>
                    <Grid data={data} activeStyle={false} style={{height:document.documentElement.clientHeight*0.3}} onClick={
                        (e,index)=>{
                            this.showModal(e,true)
                        }
                    } hasLine={false}/>
                </div>

                <div>
                    {
                        dataRecent.length>0?<div style={{height:'auto'}}>
                            <div className="sub-title">
                                {lang.e().page.dapp.recent}
                                <div className="sub-title2" onClick={()=>{
                                    this.clearRecent();
                                }}>
                                    <Icon type={"iconclear"}/>
                                </div>
                            </div>
                            <div style={{textAlign: 'center'}}>
                                <Grid data={dataRecent} activeStyle={false} onClick={
                                    (e,index)=>{
                                        this.showModal(e)
                                    }
                                } hasLine={false}/>

                            </div>
                        </div>:""
                    }
                </div>
            </div>

            <Modal
                popup
                visible={this.state.modal2}
                onClose={()=>this.onClose()}
                animationType="slide-up"
            >
                <List renderHeader={() => <div><h3>{lang.e().modal.dappTip1}</h3></div>} >
                    <List.Item key={"1"}>
                        <p className="popup-list">{lang.e().modal.dappTip2}<a onClick={()=>{this.read()}}>{lang.e().modal.dappTip3}</a>{lang.e().modal.dappTip4}</p>
                        <AgreeItem data-seed="logId" defaultChecked={read} onChange={e => this.visitDApp(!e.target.checked)}>
                            {lang.e().modal.haveRead}
                        </AgreeItem>
                    </List.Item>

                    <List.Item>
                        <Button type="primary" disabled={visitDApp} onClick={()=>{
                            this.onClose();
                            url.goPage(url.browser(this.state.dappUrl),url.DApp);
                        }}>{lang.e().button.confirm}</Button>
                    </List.Item>
                </List>
            </Modal>

        </Layout>
    }
}

export default DApp