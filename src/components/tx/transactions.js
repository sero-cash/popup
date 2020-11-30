import {keys, config} from "../../config/common";
import Storage from "../../config/storage";
import Account from "../account/account";
import {genTxMap, genTxInfo, sortTxMap} from "./utils";
import BigNumber from "bignumber.js";
import {assetService} from "../service/service";

let account = new Account();

const storage = new Storage();

class Transactions {

    constructor(address) {
        if (address) {
            this.address = address;
        } else {
            const current = storage.get(keys.account.current);
            if (current) {
                this.address = current.address;
            }
        }

    }

    query(currency) {
        let that = this;
        return new Promise(function (resolve, reject) {
            try {
                let data = that.queryStorage(currency);
                resolve(data)
            } catch (e) {
                resolve(that.queryStorage(currency))
            }
        })
    }

    queryStorage(currency) {
        let len = storage.length();
        let prefix = keys.txKeyPrefix(this.address);
        let txMap = new Map();
        for (let i = 0; i < len; i++) {
            let tmpKey = storage.key(i);
            if (tmpKey.indexOf(prefix) > -1) {
                let hash = tmpKey.split(":")[2];
                let root = tmpKey.split(":")[3];
                let type = tmpKey.split(":")[4];
                genTxMap(root, hash, currency, txMap, type);
            }

        }

        if (txMap) {
            return sortTxMap(txMap)
        }

    }

    info(hash) {
        let that = this;
        return new Promise(function (resolve, reject) {
            try {
                // if(plus && plus.sqlite){
                //     txDatabase.queryByHash(hash).then((data)=>{
                //         let t = {
                //             state:"completed",
                //             data:data
                //         }
                //         resolve(t)
                //     }).catch((e)=>{
                //         reject(e)
                //     });
                // }else{
                resolve(that.infoStorage(hash))
                // }
            } catch (e) {
                resolve(that.infoStorage(hash))
            }
        })
    }

    infoStorage(hash) {
        let txInfo = storage.get(hash);
        //pending
        if (txInfo.currency) {
            return {state: "pending", data: txInfo}
        } else {
            const hashPrefix = keys.txKeyHashPrefix(this.address, hash)
            const len = storage.length();
            let txMap = new Map();
            for (let i = 0; i < len; i++) {
                let keys = storage.key(i);
                if (keys.indexOf(hashPrefix) > -1) {
                    let root = keys.split(":")[3];
                    let type = keys.split(":")[4];
                    genTxInfo(type, txMap, hash, root);
                }
            }

            let tx = null;
            let assets = []
            txMap.forEach(function (value, key, map) {
                tx = value;
                assets.push({
                    cy: value.currency,
                    value: value.value,
                })
            })
            tx["assets"] = assets
            return {state: "completed", data: tx}
        }
    }

    async transfer(tx, password) {
        let act ;
        let cy = tx.cy;
        let gas = tx.gas;
        let gasPrice = tx.gasPrice;
        let from = tx.from;
        if (!cy) cy = "SERO"
        if (!gas) {
            gas = "0x"+new BigNumber("4700000").toString(16);
        }
        if (!gasPrice) {
            gasPrice = "0x"+new BigNumber("1000000000").toString(16);
        }
        if (!from) {
            const current = await account.getCurrent();
            act = new Account(current.address);
            from = current.tk;
        }else{
            act = new Account(from);
            const dtl = await act.Detail(from);
            from = dtl.tk;
        }
        let txReq = {}
        txReq.From=from;
        txReq.To=tx.to;
        txReq.Cy=cy;
        txReq.Value=tx.value;
        txReq.Data=tx.data;
        txReq.Gas=new BigNumber(gas).toString(16);
        txReq.GasPrice=new BigNumber(gasPrice).toString(16);
        txReq.SK = await act.getSK(password);
        txReq.FeeCy = tx.feeCy?tx.feeCy:"SERO";
        txReq.BuyShare = tx.BuyShare;
        if(tx.feeValue){
            txReq.FeeValue = tx.feeValue;
        }

        if(tx.catg && tx.tkt){
            let tkts=new Map()
            tkts.set(tx.catg,tx.tkt)
            txReq.Tkts = tkts;
        }

        return assetService.commitTx(txReq)

    }

    storePendingTx(txData) {
        storage.set(keys.txKeyPending(this.address, txData.currency, txData.hash), 1);
        storage.set(txData.hash, txData)
    }

    pendingTxList(currency) {
        let that = this;
        return new Promise(function (resolve, reject) {
            let len = storage.length();
            let txArray = [];
            for (let i = 0; i < len; i++) {
                let key = storage.key(i);
                if (key.indexOf(keys.txKeyPendingPrefix(that.address, currency)) > -1) {
                    let hash = key.split(":")[3];
                    let pendingTx = storage.get(hash)
                    if (pendingTx.currency) {
                        txArray.push(pendingTx)
                    }
                }
            }
            resolve(txArray)
        })
    }

    pendingTxInfo(hash) {
        return storage.get(hash);
    }
}

function SortMap() {
    this._map = {};
}

SortMap.prototype.add = function (key, value) {
    this._map[key] = value;
}

SortMap.prototype.get = function (key) {
    return this._map[key];
}


export {Transactions}
