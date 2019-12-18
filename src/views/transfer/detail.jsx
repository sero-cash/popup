import React ,{Component} from 'react'
import {Icon, NavBar, WhiteSpace, WingBlank, Flex, Toast} from "antd-mobile";
import {storage, keys, url, lang} from "../../config/common";
import BigNumber from "bignumber.js";
import copy from "copy-text-to-clipboard";
import Utils from "../../config/utils";
import {assetService} from "../../components/service/service";
import Account from "../../components/account/account";
import {decimals} from "../../components/tx/decimals";

const utils = new Utils();

class TransferDetail extends Component{

    constructor(props) {
        super(props);
        this.state = {
            state:"pending",
            txInfo:{}
        }
    }

    componentDidMount() {
        let that = this;
        let hash = this.props.match.params.hash;
        const account = new Account()
        account.getCurrent().then(current=>{
            assetService.getTxDetail(current.tk,hash).then((tx)=>{
                that.setState({
                    txInfo:tx,
                })
            })
        })
    }

    render() {
        const {txInfo} = this.state;
        let time;
        let assets;
        assets = txInfo.Tkn;
        let assetDiv=[] ;
        if(assets){
            let i=0;
            assets.forEach(function (value,cy) {
                let val = new BigNumber(decimals.convert(value,cy))
                if (val.comparedTo(0) === -1) {
                    if(cy === "SERO"){
                        if(txInfo.Num!==99999999999){
                            if(val.plus(txInfo.Fee).comparedTo(0) === -1){
                                val = val.plus(txInfo.Fee);
                            }
                        }
                    }
                    if(val.comparedTo(0)!== 0){
                        assetDiv.push(<div key={i++}>
                            {val.toString(10)} {cy}
                        </div>)
                    }
                }else{
                    assetDiv.push(<div key={i++}>
                        +{val.toString(10)} {cy}
                    </div>)
                }
            })
        }

        if(txInfo && txInfo.Time){
            time = utils.formatDate(txInfo.Time)
        }

        return <div style={{height:document.documentElement.clientHeight}} className="transfer-detail-bg">
            <NavBar
                icon={<Icon type="left" style={{color:"#f7f7f7"}}/>}
                onLeftClick={() => {
                    // window.location.replace("/#/transfer/list");
                    url.goBack();
                }}
                style={{backgroundColor:"unset"}}
            >
                {lang.e().page.txDetail.title}
            </NavBar>
            <WhiteSpace size="lg"/>
            <WingBlank>
                <div className="transfer-detail" style={{height:document.documentElement.clientHeight*0.8}}>
                    <div className="transfer-detail-indiv0">

                        <Icon type={txInfo.State === "pending"?"icondengdaichuli":"iconchenggongtishi"} size="lg" className="transfer-detail-indiv0-icon"/>
                        <h3>{"pending" === txInfo.State?lang.e().page.txDetail.pending:lang.e().page.txDetail.success}</h3>
                        <span  className="transfer-detail-indiv0-span">{time}</span>

                    </div>
                    <div className="transfer-detail-indiv1">
                        <Flex>
                            <Flex.Item>
                                <div style={{color:"#888"}}>
                                    {lang.e().page.txDetail.amount}:
                                </div>
                            </Flex.Item>
                            <Flex.Item style={{flexBasis: "50%"}} >
                                <div>
                                    {assetDiv}
                                </div>
                            </Flex.Item>
                        </Flex>
                        <WhiteSpace size="lg" />
                        <WhiteSpace size="lg" />
                        <Flex>
                            <Flex.Item>
                                <div style={{color:"#888"}}>
                                    {lang.e().page.txDetail.fee}:
                                </div>
                            </Flex.Item>
                            <Flex.Item style={{flexBasis: "50%"}} >
                                <div>
                                    <span>{new BigNumber(txInfo.Fee).toString(10)} SERO</span><br/>
                                    <span style={{fontSize:"10px",color:"#888"}}>=Gas({txInfo.GasUsed}) * GasPrice({new BigNumber(txInfo.GasPrice).dividedBy(new BigNumber(10).pow(9)).toString(10)} Gta)</span>
                                </div>
                            </Flex.Item>
                        </Flex>
                        <WhiteSpace size="lg" />
                        <WhiteSpace size="lg" />
                        <Flex>
                            <Flex.Item>
                                <div style={{color:"#888"}}>
                                    {lang.e().page.txDetail.from}:
                                </div>
                            </Flex.Item>
                            <Flex.Item style={{flexBasis: "50%"}} >
                                <div style={{overflowWrap: "break-word",fontSize:"10px"}}  onClick={()=>{
                                    copy(txInfo.From);
                                    Toast.success("Copy Successfully", 1);
                                }}>
                                    {txInfo.From}
                                     <Icon type="iconcopy" className="transfer-detail-copy-icon"/>
                                </div>
                            </Flex.Item>
                        </Flex>
                        {/*<WhiteSpace size="lg" />*/}
                        {/*{*/}
                        {/*    txInfo.to === txInfo.From ?"":<Flex>*/}
                        {/*        <Flex.Item>*/}
                        {/*            <div style={{color:"#888"}}>*/}
                        {/*                {lang.e().page.txDetail.to}:*/}
                        {/*            </div>*/}
                        {/*        </Flex.Item>*/}
                        {/*        <Flex.Item style={{flexBasis: "50%"}} >*/}
                        {/*            <div>*/}
                        {/*                <div style={{overflowWrap: "break-word",fontSize:"10px"}}  onClick={()=>{*/}
                        {/*                    copy(txInfo.to);*/}
                        {/*                    Toast.success("Copy Successfully", 1);*/}
                        {/*                }}>*/}
                        {/*                    {txInfo.to}*/}
                        {/*                    <Icon type="iconcopy" className="transfer-detail-copy-icon"/>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}

                        {/*        </Flex.Item>*/}
                        {/*    </Flex>*/}
                        {/*}*/}


                    </div>
                    <div>
                        <WingBlank>
                            <Flex>
                                <Flex.Item>
                                    <div style={{color:"#888"}}>
                                        {lang.e().page.txDetail.hash}:
                                    </div>
                                </Flex.Item>
                                <Flex.Item style={{flexBasis: "50%"}} >
                                    <div  onClick={()=>{
                                        copy(this.props.match.params.hash);
                                        Toast.success("Copy Successfully", 1);
                                    }}>
                                        {utils.ellipsisHash(this.props.match.params.hash)}
                                        <Icon type="iconcopy" className="transfer-detail-copy-icon"/>
                                    </div>
                                </Flex.Item>
                            </Flex>
                            <WhiteSpace size="lg" />
                            <Flex>
                                <Flex.Item>
                                    <div style={{color:"#888"}}>
                                        {lang.e().page.txDetail.block}:
                                    </div>
                                </Flex.Item>
                                <Flex.Item style={{flexBasis: "50%"}} >
                                    <div style={{color:"#007bff"}}>
                                        {txInfo.Num===99999999999?"0":txInfo.Num}
                                    </div>
                                </Flex.Item>
                            </Flex>
                        </WingBlank>
                        {/*<div>*/}
                        {/*    <img width={100} height={100} style={{*/}
                        {/*        position: "relative",*/}
                        {/*        float: "right",*/}
                        {/*        bottom: "30px",*/}
                        {/*        right:"10px"*/}
                        {/*    }}/>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </WingBlank>
            <p className="transfer-detail-p"><a onClick={()=>{
                url.goPage(url.browser(`https://explorer.sero.cash/txsInfo.html?hash=${txInfo.BlockHash}`), url.transferDetail(this.props.match.params.hash));
            }} style={{color:"#108ee9"}}>{lang.e().page.txDetail.goto}</a></p>
        </div>
    }
}

export default TransferDetail