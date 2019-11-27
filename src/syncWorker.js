import Account from "./components/account/account";
import {assetService} from "./components/service/service";

window.hasSet = new Map();

export function register() {
    let account = new Account();
    account.initRpc();
    assetService.init();

    console.log("init worker success");
    initAccountSyncService();
    setInterval(function () {
        initAccountSyncService();
    }, 1000)
}

document.onvisibilitychange = ()=>{
    let visibility = document.visibilityState;
    console.log("document.visibilityState:",visibility);
    if(visibility === "visible"){
        alert(visibility);
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