import React ,{Component} from 'react'
import {Icon, NavBar, WhiteSpace, WingBlank, Flex, Toast, Tag} from "antd-mobile";
import {storage, keys, url, lang} from "../../config/common";
import BigNumber from "bignumber.js";
import copy from "copy-text-to-clipboard";
import Utils from "../../config/utils";
import {assetService} from "../../components/service/service";
import Account from "../../components/account/account";
import {decimals} from "../../components/tx/decimals";
import {JsonRpc} from "../../service/jsonrpc";
const bs58 = require('bs58');

const jsonRpc = new JsonRpc();
const utils = new Utils();

function hexToBase58(hex) {
    return bs58.encode(hexToBytes(hex));
}

function hexToBytes(hex) {
    hex = hex.replace(/^0x/i, '');
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

class TransferDetail extends Component{

    constructor(props) {
        super(props);
        this.state = {
            state:"pending",
            txInfo:{},
            txState:'',
            tos:[],
            cmdType:'',
            blockNum:0,
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
            }).catch((e)=>{
                assetService.getPendingAndConfirming(current.tk).then(datas=>{
                    for(let d of datas){
                        if(hash === d.TxHash){
                            d.Fee = decimals.convert(new BigNumber(d.GasUsed).multipliedBy(new BigNumber(d.GasPrice)),"SERO")
                            that.setState({
                                txInfo:d,
                            })
                        }
                    }
                })
            })
        })

        that.getTxState().catch();
    }


    async getTxState(){
        let hash = this.props.match.params.hash;
        const data = await jsonRpc.seroRpcAsync("sero_getTransactionReceipt",[hash]);

        const rest = data.result;
        let txState = '';
        if(rest){
            if(new BigNumber(rest.status).comparedTo(0) === 1){
                txState=<Tag>{lang.e().page.txDetail.contractSuccess}</Tag>
            }else{
                txState=<Tag>{lang.e().page.txDetail.contractFailed}</Tag>
            }
        }
        const txRest = await jsonRpc.seroRpcAsync("sero_getTransactionByHash",[hash]);

        const txInfo = txRest.result;

        if(txInfo){
            if(rest){
                txInfo.Num = new BigNumber(rest.blockNumber).toNumber()
            }
            const cmd = txInfo.stx.Desc_Cmd;
            let cmdType = ''
            if(cmd){
                if(cmd.BuyShare){
                    cmdType = "Buy Share";
                }else if(cmd.RegistPool){
                    cmdType = "Regist Pool";
                }else if(cmd.ClosePool){
                    cmdType = "Close Pool";
                }else if(cmd.Contract){
                    cmdType = "Contract";
                }
            }

            const tos = [];

            if(!cmdType){
                if(txInfo.stx.Tx1.Outs_P){
                    for(let i=0;i<txInfo.stx.Tx1.Outs_P.length;i++){
                        let to = hexToBase58(txInfo.stx.Tx1.Outs_P[i].PKr);
                        if(txInfo.from !== to){
                            tos.push(to)
                        }
                    }
                }

                if(txInfo.stx.Tx1.Outs_C){
                    for(let i=0;i<txInfo.stx.Tx1.Outs_C.length;i++){
                        let to = hexToBase58(txInfo.stx.Tx1.Outs_C[i].PKr);
                        if(txInfo.from !== to){
                            tos.push(to)
                        }
                    }
                }
            }else{
                if (cmdType === "Contract"){
                    tos.push(txInfo.to)
                }
            }

            this.setState({
                blockNum:txInfo.Num,
                txState:txState,
                tos:tos,
                cmdType:cmdType
            })

        }

    }

    render() {
        const {txInfo,txState,tos,cmdType,blockNum} = this.state;
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

        return <div style={{height:document.documentElement.clientHeight,opacity:"pending" === txInfo.State ||txInfo.isConfirm?0.5:1}} className="transfer-detail-bg">
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

                        <Icon type={txInfo.State === "pending"|| txInfo.isConfirm?"icondengdaichuli":"iconchenggongtishi"} size="lg" className="transfer-detail-indiv0-icon"/>
                        <h3>{"pending" === txInfo.State || txInfo.isConfirm?lang.e().page.txDetail.pending:lang.e().page.txDetail.success}</h3>
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
                        <WhiteSpace size="lg" />
                        <Flex>
                            <Flex.Item>
                                <div style={{color:"#888"}}>
                                    {lang.e().page.txDetail.to}:
                                </div>
                            </Flex.Item>
                            <Flex.Item style={{flexBasis: "50%"}} >
                                {
                                    tos.map((to)=>{
                                        return to?<div>
                                            <div style={{overflowWrap: "break-word",fontSize:"10px"}}  onClick={()=>{
                                                copy(to);
                                                Toast.success("Copy Successfully", 1);
                                            }}>
                                                {to}
                                                <Icon type="iconcopy" className="transfer-detail-copy-icon"/>
                                            </div>
                                        </div>:""
                                    })
                                }
                            </Flex.Item>
                        </Flex>
                        <WhiteSpace size="lg" />
                        {
                            cmdType === 'Contract'?<Flex>
                                <Flex.Item>

                                </Flex.Item>
                                <Flex.Item style={{flexBasis: "50%"}} >
                                    {txState}
                                </Flex.Item>
                            </Flex>:cmdType
                        }

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
                                        {blockNum===99999999999?0:blockNum}
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