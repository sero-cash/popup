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

const data = [
    {
        icon: <div className="dapp-icon"><img src={sero}  className="dapp-img"/></div>,
        text: `Explorer`,
        url:"https://explorer.sero.cash",
    },
    // {
    //     icon: <div className="dapp-icon"><img src={sero} style={{witdh:"36px",height:"36px"}}/></div>,
    //     text: `SERO`,
    //     url:"https://sero.cash",
    // },
    {
        icon: <div className="dapp-icon"><img src={sero}  className="dapp-img"/></div>,
        text: `Wiki`,
        url:"https://wiki.sero.cash",
    },
    {
        icon: <div className="dapp-icon"><img src="https://edenworkroom.github.io/dapp/dapp.png"  className="dapp-img"/></div>,
        text: `SC Tool`,
        url:"http://edenworkroom.gitee.io/sctool/",
    },
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
        icon: <div className="dapp-icon"><img src="http://alpha-live.gitee.io/alpha/logo.png"  className="dapp-img"/></div>,
        text: `ALPHA`,
        url:"http://alpha-live.gitee.io/alpha/index.html",
    },
];

class DApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: ['1', '2', '3'],
        }
    }

    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                // data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }

    render() {

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

            <div style={{marginTop:"45px",background:"#fdfdfd"}}>
            </div>



            <div className="sub-title">{lang.e().page.dapp.recommended} </div>
            <div style={{textAlign: 'center'}}>
                <Grid data={data} activeStyle={false} onClick={
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

            <div style={{minHeight:"45px"}}>

            </div>

        </Layout>
    }
}

export default DApp