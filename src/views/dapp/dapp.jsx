import React, {Component} from 'react'
import {Grid, WhiteSpace, SearchBar,Carousel,Toast} from 'antd-mobile'
import Layout from "../layout/layout";
import {storage, keys, config, url, baseDecimal, lang} from "../../config/common";
import sero from '../../sero.png'
import './dapp.css'

let dataRecent =[
    // {
    //     icon: <div className="dapp-icon"><img src={sero} style={{witdh:"36px",height:"36px"}}/></div>,
    //     text: `Token Tracker`,
    //     url:"https://wiki.sero.cash",
    // }
];

const versionControlData = [
    {
        icon: <div className="dapp-icon"><img src="https://asnowhero.gitee.io/asnow-popup/logo.png"  className="dapp-img"/></div>,
        text: `ASNOW`,
        url:"https://asnowhero.gitee.io/asnow-popup/",
    },
    {
        icon: <div className="dapp-icon"><img src="http://sanguo.artfuture.store/slg/icon.png"  className="dapp-img"/></div>,
        text: `超零三国`,
        url:"http://sanguo.artfuture.store/slg/slg.html",
    },
    {
        icon: <div className="dapp-icon"><img src="http://47.92.113.69/logo.png"  className="dapp-img"/></div>,
        text: `ACES`,
        url:"http://47.92.113.69/",
    },
    {
        icon: <div className="dapp-icon"><img src="https://alpha-live.gitee.io/alpha/logo.png"  className="dapp-img"/></div>,
        text: `ALPHA`,
        url:"https://alpha-live.gitee.io/alpha/index.html",
    },
    {
        icon: <div className="dapp-icon"><img src="http://liutyler.gitee.io/goFighting/logo.png"  className="dapp-img"/></div>,
        text: `GO Fighting`,
        url:"http://liutyler.gitee.io/goFighting",
    },
    {
        icon: <div className="dapp-icon"><img src="http://table.supernode.vip:3000/logo192.png"  className="dapp-img"/></div>,
        text: `Table Game`,
        url:"http://table.supernode.vip:3000/",
    },
    {
        icon: <div className="dapp-icon"><img src="https://edenworkroom.gitee.io/market/logo.png"  className="dapp-img"/></div>,
        text: `Rhino Market`,
        url:"https://edenworkroom.gitee.io/market/",
    },
    {
        icon: <div className="dapp-icon"><img src="https://fpsc2019.github.io/fpsc-popup/logo.png"  className="dapp-img"/></div>,
        text: `HAPY`,
        url:"https://fpsc2019.github.io/fpsc-popup/",
    },
]

const showDataVersion = ['1.1.3']


class DApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    icon: <div className="dapp-icon"><img src={sero}  className="dapp-img"/></div>,
                    text: `Explorer`,
                    url:"https://explorer.sero.cash",
                },
                {
                    icon: <div className="dapp-icon"><img src={sero}  className="dapp-img"/></div>,
                    text: `Wiki`,
                    url:"https://wiki.sero.cash",
                },
                {
                    icon: <div className="dapp-icon"><img src="https://edenworkroom.github.io/dapp/dapp.png"  className="dapp-img"/></div>,
                    text: `SC Tool`,
                    url:"https://edenworkroom.gitee.io/sctool/",
                }
            ],
        }
    }

    componentDidMount() {
        const that = this;
        if(plus && plus.runtime){
            const dataBase = that.state.data;
            const version = plus.runtime.version;
            showDataVersion.forEach((v)=>{
                if(version === v){
                    const cdata = dataBase.concat(versionControlData);
                    that.setState({
                        data:cdata,
                    })
                }
            })
        }else{
            const dataBase = that.state.data;
            const cdata = dataBase.concat(versionControlData);
            that.setState({
                data:cdata,
            })
        }

    }

    render() {

        const {data} = this.state;
        let dapps = storage.get(keys.dapp.list);
        if(dapps) {
            dataRecent=[];
            let tripMap = new Map();
            for(let contractAddress of dapps){
                if(!tripMap.get(contractAddress) === true){
                    tripMap.set(contractAddress,true);
                    let dapp = storage.get(keys.dappsInfoKey(contractAddress));
                    dataRecent.push({
                        icon: <div className="dapp-icon"><img src={dapp.logo} className="dapp-img"/>
                        </div>,
                        text: dapp.name,
                        url: dapp.url,
                    })
                }
            }
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
                <div className="sub-title">{lang.e().page.dapp.recommended} </div>
                <div style={{textAlign: 'center'}}>
                    <Grid data={data} activeStyle={false}  onClick={
                        (e,index)=>{
                            url.goPage(url.browser(e.url),url.DApp)
                        }
                    } hasLine={false}/>
                </div>

                <div>
                    {
                        dataRecent.length>0?<div>
                            <div className="sub-title">{lang.e().page.dapp.recent} </div>
                            <div style={{textAlign: 'center'}}>
                                <Grid data={dataRecent} activeStyle={false} onClick={
                                    (e,index)=>{
                                        url.goPage(url.browser(e.url),url.DApp)
                                    }
                                } hasLine={false}/>

                            </div>
                        </div>:""
                    }
                </div>
            </div>

        </Layout>
    }
}

export default DApp