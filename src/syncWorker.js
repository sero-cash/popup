import Account from "./components/account/account";
import {assetService} from "./components/service/service";

window.hasSet = new Map();
export function register() {

    assetService.init();

    console.log("init worker success");
    initAccountSyncService();

    setInterval(function () {
        initAccountSyncService();
    }, 10* 1000)
}

document.onvisibilitychange = ()=>{
    let visibility = document.visibilityState;
    if(visibility === "visible"){
        assetService.init();
    }
}


function initAccountSyncService() {
    if (!window.hasSet) {
        window.hasSet = new Map();
    }
    let account = new Account();
    account.List().then(accountList=>{
        for (let ac of accountList) {
            if (!window.hasSet.get(ac.address)) {
                account = new Account(ac.address);
                assetService.initAccount(ac.tk)
                window.hasSet.set(ac.address, true)
                console.log("init account success, address: ", ac.address, account.Keystore().version);
            }
        }
    });

}

