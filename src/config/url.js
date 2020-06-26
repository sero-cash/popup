// import {keys, storage} from "./common";
// import {Toast} from "antd-mobile";
import { createHashHistory } from 'history'

class Url {

    constructor() {
        this.Home = '/';
        this.AccountCreate1 = '/account/create1';
        this.AccountCreate2 = '/account/create2';
        this.AccountCreate3 = '/account/create3';
        this.AccountCreate4 = '/account/create4';
        this.ImportAccount = '/account/import';
        this.Personal = '/my';
        this.Stake = '/stake';
        this.DApp = '/dapp';
        this.WalletManager = '/walletManage';
        this.AddressAdd = '/address/add';
        this.AddressDetail = '/';
        this.AddressList = '/address';
        this.AddressSelect = '/addressSelect';
        this.TransferList = '/';
        this.Receive = '/receive';
        this.Settings = '/settings';
        this.About = '/about';
        this.HistoryPKr = '/manage/historyPKr';
        this.Embed = '/embed';
        this.ThirdPay = '/thirdpay';
        this.PayResult = '/thirdpay/result/';

    }

    manage(address) {
        return "/manage/" + address;
    }

    manageName(address) {
        return "/manage/name/" + address;
    }

    addressDetail(address) {
        return "/address/detail/" + address;
    }

    addressEdit(address) {
        return "/address/edit/" + address;
    }

    transferList(currency) {
        return "/transfer/list/" + currency;
    }

    transferDetail(hash){
        if(hash === "0x0000000000000000000000000000000000000000000000000000000000000001"
            || hash === "0x0000000000000000000000000000000000000000000000000000000000000002"
            || hash === "0x0000000000000000000000000000000000000000000000000000000000000003"){
        }else{
            return "/transfer/detail/"+hash;
        }
    }

    transfer(currency) {
        return "/transfer/" + currency;
    }

    transferResult(hash){
        return '/transfer/result/'+hash;
    }

    receive(address,type) {
        return "/receive/" + type + "/" + address;
    }

    browser(url) {
        return "/browser/" + encodeURIComponent(url);
    }

    addressSelect(currency) {
        return "/addressSelect/" + currency;
    }

    payResult(hash) {
        return this.PayResult + hash;
    }

    scan(bizType,cy){
        // sessionStorage.setItem(keys.scan.type,bizType);
        // window.location.href="scan.html?type="+bizType;
        // window.history.replaceState(null,"SCAN","scan.html?type="+bizType);
        if(cy){
            return "/scan/" + bizType+"/"+cy;
        }else{
            return "/scan/" + bizType;
        }
    }

    goPage(to, back) {
        if (back) {
            let backUrl = JSON.parse(sessionStorage.getItem("backUrl"));
            if (backUrl && backUrl.length > 0) {
                backUrl.push(back)
            } else {
                backUrl = new Array();
                backUrl.push(back);
            }
            sessionStorage.setItem("backUrl", JSON.stringify(backUrl));
        }
        // window.location.replace(to);
        if(to === this.Home || to === this.Personal || to === this.DApp || to === this.Stake){
            sessionStorage.setItem("backUrl", JSON.stringify([]));
        }
        // window.location.href = to;
        // window.location.replace(to);
        createHashHistory().push(to)
    }

    goBack() {
        let backUrl = JSON.parse(sessionStorage.getItem("backUrl"));
        if (backUrl && backUrl.length > 0) {
            let back = backUrl.pop()
            sessionStorage.setItem("backUrl", JSON.stringify(backUrl));
            // window.location.replace(back);
            // window.location.href = back;
            createHashHistory().push(back)
        } else {
            // window.location.replace(this.Home);
            // window.location.href = this.Home;
            createHashHistory().push(this.Home)
        }
    }

}

export default Url