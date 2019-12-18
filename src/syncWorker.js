import Account from "./components/account/account";
import {assetService} from "./components/service/service";
import {storage,keys} from "./config/common";

window.hasSet = new Map();
const account = new Account();
export function register() {

    account.initRpc();
    assetService.init();

    console.log("init worker success");
    initAccountSyncService();

    repairData();
    setInterval(function () {
        initAccountSyncService();
    }, 1000)
}

document.onvisibilitychange = ()=>{
    let visibility = document.visibilityState;
    console.log("document.visibilityState:",visibility);
    if(visibility === "visible"){
        assetService.init();
    }
}


function initAccountSyncService() {
    if (!window.hasSet) {
        window.hasSet = new Map();
    }
    let account = new Account();
    const accountList = account.List();
    for (let ac of accountList) {
        if (!window.hasSet.get(ac.address)) {
            account = new Account(ac.address);
            assetService.initAccount(ac.tk)
            window.hasSet.set(ac.address, true)
            console.log("init account success, address: ", ac.address, account.Keystore().version);
        }
    }
}

function repairData() {
    const storageLength = storage.length();
    let removeKeys = [];
    for (let i = 0; i < storageLength; i++) {
        let key = storage.key(i)
        if (key
            && key.indexOf("account:") === -1
            && key.indexOf("settings:") === -1
            && key.indexOf("dapps:") === -1
            && key.indexOf("address:") === -1
            && key.indexOf("decimals:") === -1){
            removeKeys.push(key)
        }
        if (key.indexOf("account:pkrIndex") > -1) {
            removeKeys.push(key)
        }
        if (key.indexOf("account:currentPKr") > -1) {
            removeKeys.push(key)
        }
    }

    if (removeKeys.length > 0) {
        removeKeys.forEach(function (value) {
            storage.delete(value)
        })
    }

    account.repairAccountData().then()
}

