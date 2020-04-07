import React from 'react'
import {config, keys, lang, storage} from "../../config/common";
import BigNumber from 'bignumber.js'
import Account from '../../components/account/account'
import {Transactions} from "../../components/tx/transactions";
import Web3 from 'sero-web3'
import {assetService} from "../../components/service/service";

let web3 = new Web3();

const transactions = new Transactions();
const account = new Account();
const operation = {
    method: {
        init: "init",
        accountDetail: "accountDetail",
        accountList: "accountList",
        executeContract: "executeContract",
        call: "call",
        estimateGas: "estimateGas",
        getInfo: "getInfo",
    }
}


class Embed {

    constructor() {
        web3.setProvider(new web3.providers.HttpProvider(config.seroRpc()))
    }

    async getAccountList(msg){
        try {
            let addresses = storage.get(keys.account.addresses);
            let rest = [];
            if (addresses) {
                for (let address of addresses) {
                    let detail = await account.Detail(address)
                    const assets = await assetService.balanceOf(detail.tk);
                    rest.push({Name: detail.name, PK: detail.address, MainPKr: detail.mainPKr, Balance: assets})
                }
            }
            msg.data=rest
            return msg
        } catch (e) {
            msg.data = null
            msg.error = e.message
            return msg
        }
    }

    async getAccountDetail(address, msg){
        try {
            if (address) {
                let detail = await account.Detail(address)
                const assets = await assetService.balanceOf(detail.tk);
                msg.data = {Name: detail.name, PK: detail.address, MainPKr: detail.mainPKr, Balance: assets}
                return msg
            }
        } catch (e) {
            msg.data = null
            msg.error = e.message
            return msg
            // Toast.fail(e.message,3)
        }
    }

    call = (data, msg) => {
        try {
            let rest = web3.sero.call(data, "latest");
            msg.data = rest
            return msg
        } catch (e) {
            msg.data = "0x"
            msg.error = e.message
            return msg
            // Toast.fail(e.message,3)
        }
    }

    estimateGas = (data, msg) => {
        try {
            msg.data = web3.sero.estimateGas(data)
            return msg
        } catch (e) {
            msg.data = "0x0"
            msg.error = e.message
            return msg
            // Toast.fail(e.message,3)
        }
    }

    getInfo = () =>{
        let data = {}
        data.language = lang.e().key;
        data.rpc = config.seroRpc();

        return data
    }

    executeContract = (data, cb) => {
        if (!data) {
            return
        }
        if (data && !data.cy) {
            data.cy = "SERO"
        }

        if (data && !data.gas) {
            data.gas = "0x" + new BigNumber("4700000").toString(16);
        }

        if (data && !data.gasPrice) {
            data.gasPrice = "0x" + new BigNumber("1000000000").toString(16);
        }

        if (data && !data.value) {
            data.value = "0x0";
        }
        const password = data.password;
        delete data.password
        transactions.transfer(data, password).then(hash=>{
            cb(hash)
        }).catch(error=>{
            if(typeof error === "object"){
                error = error.message;
            }
            if (error.indexOf("wrong passphrase") > -1) {
                cb(lang.e().toast.error.passwordError)
            } else {
                cb(error)
            }
        })
    }


    receiveMessage = (event) => {
        let that = this;
        if (event !== undefined && event.data) {
            let msg = event.data;
            console.log("popup receive msg: ", msg);
            if (msg.method) {
                if (msg.method === operation.method.init) {
                    msg.data = "SUCCESS";
                    that.sendMessage(msg);
                } else if (msg.method === operation.method.accountDetail) {
                    that.getAccountDetail(msg.data,msg).then(msg=>{
                        that.sendMessage(msg);
                    })
                } else if (msg.method === operation.method.accountList) {
                    that.getAccountList(msg).then(msg=>{
                        that.sendMessage(msg);
                    })
                } else if (msg.method === operation.method.executeContract) {
                    that.executeContract(msg.data.tx, function (txHash) {
                        if(txHash){
                            msg.data = txHash;
                        }else{
                            const ifrm = document.getElementsByClassName("h5-iframe");
                            if(ifrm && ifrm.length>0){
                                ifrm[0].focus();
                            }
                            msg.data = "";
                            msg.error = "Operation cancel";
                        }
                        that.sendMessage(msg);
                    });
                } else if (msg.method === operation.method.call) {
                    that.sendMessage(that.call(msg.data,msg));
                } else if (msg.method === operation.method.estimateGas) {
                    that.sendMessage(that.estimateGas(msg.data,msg));
                } else if (msg.method === operation.method.getInfo) {
                    msg.data = that.getInfo();
                    that.sendMessage(msg);
                } else {
                    that.sendMessage("operation method is invalid !");
                }
            } else {
                that.sendMessage("operation method is required !");
            }
        }
    };


    sendMessage = (msg) => {
        sendMsg(msg)
    };

}
function sendMsg(msg) {
    console.log("embed send msg >>>> ", msg)
    parent.postMessage(msg, '*');
}

export default Embed