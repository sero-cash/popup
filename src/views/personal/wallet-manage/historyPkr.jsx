import React,{Component} from 'react'
import {Icon, List, Toast, NavBar} from 'antd-mobile'
import Account from "../../../components/account/account";
import {utils} from "../../../config/utils";
import jsuperzk from 'jsuperzk'
import {keys, lang, storage, url} from "../../../config/common";
import {assetService} from "../../../components/service/service";

let account = new Account();
const Item = List.Item;
const Brief = Item.Brief;

class HistoryPkr extends Component{

    constructor(props) {
        super(props);
        this.state={
            current:{},
            pkrs:[],
            currentBlock:0,
        }
    }

    componentDidMount() {
        const that = this;
        Toast.loading("loading...")
        setTimeout(function () {
            that.loadData();
        },300)

    }

    loadData=()=>{
        const that = this;
        account.getCurrent().then(current=>{
            that.setState({
                current:current
            })
            assetService.getPKrIndex(current.tk).then(data=>{
                const pkrIndex = data.PkrIndex;
                const currentBlock =  data.CurrentBlock;
                account = new Account(current.address);
                let version = account.Keystore().version;
                let pkrTemp = [];
                pkrTemp.push(<Item extra={"Index"} style={{background:"#fdfdfd"}}><span style={{fontSize:"14px"}}>PKr</span></Item>)
                for (let i=pkrIndex;i>0;i--){
                    let tempPkr = jsuperzk.createPkrHash(current.tk,i,version);
                    pkrTemp.push(<Item extra={i}><span style={{fontSize:"14px"}}>{utils.ellipsisAddress(tempPkr)}</span></Item>)
                }
                that.setState({
                    pkrs : pkrTemp,
                    currentBlock:currentBlock
                })

            })
        });

    }

    render() {
        return (
            <div>
                <div className="layout-top">
                <NavBar
                    mode="light"
                    leftContent={<Icon type="left" onClick={() => {
                        url.goBack()
                    }}/>}
                >
                    {lang.e().page.setting.pkr}
                </NavBar>
                </div>

                <div style={{height:document.documentElement.clientHeight-45,marginTop:'45px',overflowY: 'scroll'}}>
                    <h1 style={{textAlign:"center"}}>Block height : {this.state.currentBlock}</h1>
                    <List>
                        {this.state.pkrs}
                    </List>
                </div>

            </div>
        )
    }


}

export default HistoryPkr