import Wallet from "jsuperzk/dist/wallet/wallet"
import axios from 'axios'

const wallet = new Wallet();

const operations = {
    "createAccount": createAccount,
    "exportMnemonic": exportMnemonic,
    "getSK": getSK,
    "importMnemonic":importMnemonic
}


self.addEventListener('message', e => {
    console.log("account receive data: ", e.data);
    if (e.data && e.data.method) {
        if (operations[e.data.method]) {
            operations[e.data.method](e.data)
        }
    }
})

function createAccount(msg){
    try{
        const account = msg.data;
        if (!account) {
            return;
        }
        let wt = wallet.fromMnemonic(account.word, account.password);
        msg.data=wt.keystore;
        _postMessage(msg)
    }catch (e) {
        msg.data=null;
        msg.error = e.message;
        _postMessage(msg)
    }
}

function exportMnemonic(msg){
    try{
        let wlt = new Wallet();
        const password = msg.data.password;
        const keystore = msg.data.keystore;
        wlt.fromKeystore(keystore)
        msg.data = wlt.exportMnemonic(password);
        _postMessage(msg)
    }catch (e) {
        msg.data=null;
        msg.error = e.message;
        _postMessage(msg)
    }
}

function importMnemonic(msg){
    try{
        let wlt = new Wallet();
        const password = msg.data.password;
        const word = msg.data.word;
        wlt = wlt.fromMnemonic(word,password);
        msg.data = wlt.getKeystore();
        _postMessage(msg)
    }catch (e) {
        msg.data=null;
        msg.error = e.message;
        _postMessage(msg)
    }
}

function getSK(msg){
    try {
        const password = msg.data.password;
        const keystore = msg.data.keystore;
        console.log("getSK begin>>>>"+ new Date().getTime());
        wallet.fromKeystore(keystore);
        msg.data = wallet.getSk(password)
        console.log("getSK end >>>>"+ new Date().getTime());
        _postMessage(msg)
    } catch (error) {
        msg.error=error.message;
        _postMessage(msg)
    }
}


function _postMessage(message) {
    console.log("account service sendMsg:",message);
    self.postMessage(message)
}
