import React ,{Component} from 'react'
import {Icon, NavBar, WhiteSpace, WingBlank, Flex, Toast} from "antd-mobile";
import {storage, keys, config, url, baseDecimal, lang} from "../../config/common";
import {Transactions} from '../../components/tx/transactions'
import BigNumber from "bignumber.js";
import copy from "copy-text-to-clipboard";
import Utils from "../../config/utils";

const utils = new Utils();
const transaction = new Transactions();
class TxReult extends Component{

    constructor(props) {
        super(props);
        this.state = {
            txInfo:{}
        }
    }

    componentDidMount() {
        let hash = this.props.match.params.hash;
        let txInfo = transaction.pendingTxInfo(hash);
        this.setState({
            txInfo:txInfo
        })
    }

    render() {
        const {txInfo} = this.state;


        return <div style={{height:document.documentElement.clientHeight}} className="transfer-detail-bg">
            <NavBar
                icon={<Icon type="left" style={{color:"#f7f7f7"}}/>}
                onLeftClick={() => {
                    // window.location.replace("/#/transfer/list");
                    url.goBack(url.transferList(txInfo.currency));
                }}
                style={{backgroundColor:"unset"}}
            >
                SERO
            </NavBar>
            <WhiteSpace size="lg"/>
            <WingBlank>
                <div className="transfer-detail" style={{height:document.documentElement.clientHeight*0.8}}>
                    <div className="transfer-detail-indiv0">
                        <Icon type="icondengdaichuli" style={{width:'50px',height:'50px',marginTop:'5px'}}/>
                        <h3>{lang.e().page.txDetail.pending}</h3>
                        <span  className="transfer-detail-indiv0-span">{new Date(txInfo.time*1000).toLocaleString()}</span>
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
                                    {txInfo.value} {txInfo.currency}
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
                                    <span>{txInfo.fee} SERO</span><br/>
                                    <span style={{fontSize:"10px",color:"#888"}}>=Gas({txInfo.gas}) * GasPrice({new BigNumber(txInfo.gasPrice).dividedBy(new BigNumber(10).pow(9)).toString(10)} Gta)</span>
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
                                <div style={{overflowWrap: "break-word",fontSize:"12px"}}  onClick={()=>{
                                    copy(txInfo.from);
                                    Toast.success("Copy Successfully", 1);
                                }}>
                                    {txInfo.from}
                                    <Icon type="iconcopy" className="transfer-detail-copy-icon"/>
                                </div>
                            </Flex.Item>
                        </Flex>
                        <WhiteSpace size="lg" />
                        <WhiteSpace size="lg" />
                        <Flex>
                            <Flex.Item>
                                <div style={{color:"#888"}}>
                                    {lang.e().page.txDetail.to}:
                                </div>
                            </Flex.Item>
                            <Flex.Item style={{flexBasis: "50%"}} >
                                <div>
                                    <div style={{overflowWrap: "break-word",fontSize:"12px"}}  onClick={()=>{
                                        copy(txInfo.to);
                                        Toast.success("Copy Successfully", 1);
                                    }}>
                                        {txInfo.to}
                                        <Icon type="iconcopy" className="transfer-detail-copy-icon"/>
                                    </div>
                                </div>
                            </Flex.Item>
                        </Flex>
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
                                    <div>
                                        {txInfo.block}
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
            <p className="transfer-detail-p"><a onClick={
                ()=>{
                    url.goPage(url.browser(`https://explorer.sero.cash/txsInfo.html?hash=${txInfo.hash}`), url.Home);
                }
            } style={{color:"#108ee9"}}>{lang.e().page.txDetail.goto}</a></p>
        </div>
    }
}

export default TxReult