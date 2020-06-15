import React,{Component} from 'react';
import {Icon, NavBar, Result, WhiteSpace} from 'antd-mobile';
import {lang, url} from "../../config/common";
import './thirdpay.css';
import {JsonRpc} from "../../service/jsonrpc";
import BigNumber from "bignumber.js";

const jsonRpc = new JsonRpc();

class PayResult extends Component{

    constructor(props) {
        super(props);
        this.state={
            icon:"icondengdaichuli",
            rTitle:lang.e().page.txDetail.pending,
            rMsg:''
        }
    }

    componentDidMount() {
        this.setState({
            rTitle:lang.e().page.txDetail.pending,
            rMsg:<div style={{wordBreak:"break-all"}}>
                <p>{lang.e().page.txDetail.pendingDesc}</p>
                <p>{lang.e().page.txDetail.hash}: {this.props.match.params.hash}</p>
            </div>
        })

        this.getTxState();
    }

    getTxState(){
        const that = this;
        const hash = this.props.match.params.hash;
        jsonRpc.seroRpc("sero_getTransactionReceipt",[hash],function (data) {
            const rest = data.result;
            if(rest){
                if(new BigNumber(rest.status).comparedTo(0) === 1){
                    that.setState({
                        rTitle:lang.e().page.txDetail.success,
                        icon:"iconchenggongtishi",
                        rMsg:<div style={{wordBreak:"break-all"}}>
                            <p>{lang.e().page.txDetail.block}: {new BigNumber(rest.blockNumber).toString(10)}</p>
                            <p>{lang.e().page.txDetail.hash}: <a >{rest.transactionHash}</a></p>
                        </div>
                    })
                }
            }else{
                setTimeout(function () {
                    that.getTxState()
                },3000)
            }
        })
    }

    render() {
        const {rTitle,rMsg,icon} = this.state;
        return (
            <div>
                <NavBar
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        url.goBack();
                    }}
                    mode={"light"}
                >
                    {lang.e().page.txDetail.title}
                </NavBar>
                <Result
                    img={<Icon type={icon} size="lg" className="resultIcon"/>}
                    title={<span>{rTitle}</span>}
                    message={rMsg}
                />
            </div>
        )
    }
}

export default PayResult