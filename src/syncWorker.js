import Account from "./components/account/account";
import {assetService} from "./components/service/service";
import Embed from "./views/embed/embed";

window.hasSet = new Map();
export function register() {

    assetService.init();

    console.log("init worker success");
    initAccountSyncService();

    setInterval(function () {
        initAccountSyncService();
    }, 10* 1000)

    registerEmbed();
    initConsole();


}
function registerEmbed(){
    if (window.frames.length !== parent.frames.length){
        const embed = new Embed()
        window.addEventListener("message", embed.receiveMessage, {passive: true});
    }
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

function initConsole() {
    if(process.env.NODE_ENV !== "production"){
        return
    }
    console.log = function (message) {
    }

    console.debug = function (message) {
    }

    console.info = function (message) {
    }

    console.warn = function (message) {
    }

    console.trace = function (message) {
    }
}

