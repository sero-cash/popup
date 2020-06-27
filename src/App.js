import React, {Component} from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './views/home/home'
import AccountCreate1 from "./views/account/create1-input";
import AccountCreate2 from "./views/account/create2-tips";
import AccountCreate3 from "./views/account/create3-backup";
import AccountCreate4 from "./views/account/create4-done";
import Personal from "./views/personal/personal";
import Stake from "./views/stake/stake";
import DApp from "./views/dapp/dapp";
import WalletManager from "./views/personal/wallet-manage/wallet-manage";
import Manage from "./views/personal/wallet-manage/manage";
import ManageName from "./views/personal/wallet-manage/manage-name";
import AddressList from "./views/personal/address/list";
import AddressAdd from "./views/personal/address/add";
import AddressDetail from "./views/personal/address/detail";
import AddressEdit from "./views/personal/address/edit";
import TransferList from "./views/transfer/list";
import TransferDetail from "./views/transfer/detail";
import Transfer from "./views/transfer/transfer";
import Receive from "./views/transfer/receive";
import Settings from "./views/personal/settings/settings";
import Browser from "./views/dapp/browser";
import TxResult from "./views/transfer/txresult";
import ImportAccount from "./views/account/import";
import Scanner from "./views/scaner/scanner";
import AddressSelect from "./views/personal/address/select";
import AboutUs from "./views/personal/settings/about";
import HistoryPkr from "./views/personal/wallet-manage/historyPkr";
import ThirdPay from "./views/thirdpay/thirdpay";
import PayResult from "./views/thirdpay/payResult";

class App extends Component {

    render() {

        return (
            <Router>
                <Switch>

                    <Route exact path="/home" component={Home}/>

                    <Route exact path="/account/create1" component={AccountCreate1}/>
                    <Route exact path="/account/create2" component={AccountCreate2}/>
                    <Route exact path="/account/create3" component={AccountCreate3}/>
                    <Route exact path="/account/create4" component={AccountCreate4}/>
                    <Route exact path="/account/import" component={ImportAccount}/>

                    <Route exact path="/my" component={Personal}/>
                    <Route exact path="/stake" component={Stake}/>
                    <Route exact path="/dapp" component={DApp}/>
                    <Route exact path="/" component={Home}/>

                    <Route exact path="/walletManage" component={WalletManager}/>
                    <Route exact path="/manage/historyPKr" component={HistoryPkr}/>
                    <Route exact path="/manage/:address" component={Manage}/>
                    <Route exact path="/manage/name/:address" component={ManageName}/>

                    <Route exact path="/address/add/:address" component={AddressAdd}/>
                    <Route exact path="/address/add" component={AddressAdd}/>
                    <Route exact path="/address/detail/:address" component={AddressDetail}/>
                    <Route exact path="/address/edit/:address" component={AddressEdit}/>
                    <Route exact path="/address" component={AddressList}/>
                    <Route exact path="/addressSelect/:currency" component={AddressSelect}/>


                    <Route exact path="/transfer/list/:currency" component={TransferList}/>
                    <Route exact path="/transfer/detail/:hash" component={TransferDetail}/>
                    <Route exact path="/transfer/result/:hash" component={TxResult}/>
                    <Route exact path="/transfer/:currency/:address" component={Transfer}/>
                    <Route exact path="/transfer/:currency" component={Transfer}/>
                    <Route exact path="/receive/:type/:address" component={Receive}/>
                    <Route exact path="/scan/:type/:cy" component={Scanner}/>
                    <Route exact path="/scan/:type" component={Scanner}/>


                    <Route exact path="/settings" component={Settings}/>
                    <Route exact path="/about" component={AboutUs}/>
                    <Route exact path="/browser/:url" component={Browser}/>

                    <Route exact path="/thirdpay/result/:hash" component={PayResult}/>
                    <Route exact path="/thirdpay/:timestamp" component={ThirdPay}/>
                    <Route exact path="/thirdpay" component={ThirdPay}/>

                </Switch>
            </Router>
        );
    }
}

export default App;
