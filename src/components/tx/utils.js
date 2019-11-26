import utils, {addrToString} from "jsuperzk/dist/utils/utils";
import BigNumber from "bignumber.js";
import {decimals} from "./decimals";
import {storage} from "../../config/common";

function genTxInfo(type, txMap, hash, root) {
    let utxo = storage.get(root)
    let txInfo = storage.get(hash)
    if (txInfo && utxo && utxo.Asset && utxo.Asset.Tkn) {
        let cy = utils.hexToCy(utxo.Asset.Tkn.Currency);
        let pkr = getPKrFromUtxo(utxo);
        let fee = new BigNumber(txInfo.GasUsed).multipliedBy(txInfo.GasPrice).dividedBy(new BigNumber(10).pow(18));

        let amount = decimals.convert(utxo.Asset.Tkn.Value, cy);
        console.log(root,utxo.Asset.Tkn.Value,amount)
        if (type === "out") {
            amount = new BigNumber(amount).multipliedBy(-1);
        }

        let tx = txMap.get(hash+cy);
        if (tx) {
            let val = tx.value;
            tx.value = new BigNumber(val).plus(new BigNumber(amount));
        } else {
            tx = {
                root: root,
                type: type,
                hash: hash,
                block: txInfo.Num,
                currency: cy,
                value: new BigNumber(amount),
                fee: fee,
                gas: txInfo.Gas,
                gasUsed: txInfo.GasUsed,
                gasPrice: txInfo.GasPrice,
                time: txInfo.Time,
                from: txInfo.From,
                to: addrToString(pkr),
                blockHash: txInfo.BlockHash,
            }
        }
        if (tx.from !== addrToString(pkr)) {
            tx.To = tx.from;
        }
        txMap.set(hash+cy, tx)
    }
}

function convertTx(tx) {
    if (new BigNumber(tx.value).comparedTo(0) === -1) {
        tx.type = "out";
        tx.value = new BigNumber(tx.value).plus(tx.fee).toString(10)
    }
    tx.fee = new BigNumber(tx.fee).toFixed(8);
    tx.value = new BigNumber(tx.value).toFixed(8);
}

function getPKrFromUtxo(utxo) {
    let pkr = '';
    if (utxo.State.OS.Out_C) {
        pkr = utxo.State.OS.Out_C.PKr;
    } else if (utxo.State.OS.Out_O) {
        pkr = utxo.State.OS.Out_O.Addr;
    } else if (utxo.State.OS.Out_P) {
        pkr = utxo.State.OS.Out_P.PKr;
    } else if (utxo.State.OS.Out_Z) {
        pkr = utxo.State.OS.Out_Z.PKr;
    }
    return pkr;
}

function genTxMap(root, hash, currency, txMap, type) {
    let utxo = storage.get(root)
    let txInfo = storage.get(hash)

    if (utxo && utxo.Asset && utxo.Asset.Tkn && txInfo) {
        let cy = utils.hexToCy(utxo.Asset.Tkn.Currency);
        if (currency && currency === cy) {

            let txMapKey = hash + cy;
            let block = txInfo.Num;
            if(hash === "0x0000000000000000000000000000000000000000000000000000000000000001"
                || hash === "0x0000000000000000000000000000000000000000000000000000000000000002"
                || hash === "0x0000000000000000000000000000000000000000000000000000000000000003"){

                let pkr = getPKrFromUtxo(utxo);
                txMapKey = utxo.State.Num + pkr
                block = utxo.State.Num;
            }
            let tx = txMap.get(txMapKey);
            // let amount = decimals.convert(utxo.Asset.Tkn.Value, currency)
            let amount = new BigNumber(utxo.Asset.Tkn.Value);

            if (type === "out") {
                amount = new BigNumber(amount).multipliedBy(-1);
            }
            if (tx) {
                let val = tx.value;
                tx.value = new BigNumber(val).plus(new BigNumber(amount));
            } else {
                tx = {
                    root: root,
                    type: type,
                    hash: hash,
                    block: block,
                    currency: cy,
                    value: new BigNumber(amount),
                    // fee: decimals.convert(new BigNumber(txInfo.GasUsed?txInfo.GasUsed:txInfo.Gas).multipliedBy(txInfo.GasPrice), "SERO", 18),
                    fee: new BigNumber(txInfo.GasUsed ? txInfo.GasUsed : txInfo.Gas).multipliedBy(txInfo.GasPrice),
                    gas: txInfo.Gas,
                    gasUsed: txInfo.GasUsed,
                    gasPrice: txInfo.GasPrice,
                    time: txInfo.Time,
                    blockHash: txInfo.BlockHash,
                }
            }

            txMap.set(txMapKey, tx)
        }
    }
}

function sortTxMap(txMap) {
    let txMapNew = new Map();
    txMap.forEach(function (tx, key, map) {
        if (new BigNumber(tx.value).isNegative()) {
            tx.type = "out";
            if (tx.currency === "SERO") {
                tx.value = new BigNumber(tx.value).plus(tx.fee)
            }
        }


        if (!tx.value.isZero()) {
            tx.value = decimals.convert(tx.value, tx.currency);
            txMapNew.set(key, tx)
        }

        // tx.value = new BigNumber(tx.value).toFixed(3);
        // if (new BigNumber(tx.value).comparedTo(0) === 0) {
        // } else {
        //     txMapNew.set(key, tx)
        // }
    })
    let mapAsnc = new Map([...txMapNew.entries()].sort((a, b) => {
        if (a[1].block < b[1].block) {
            return 1
        } else {
            if (a[1].block > b[1].block) {
                return -1
            } else {
                return 0
            }
        }
    }));

    return mapAsnc;
}

function cutZero(old) {
    if (old.indexOf(".") > -1 && old.charAt(old.length - 1) == '0') {
        for (var i = old.length - 1; i > 0; i--) {
            if (old.charAt(i) != '0') {
                if (old.charAt(i) == '.') {
                    return old.substring(0, i);
                } else {
                    return old.substring(0, i + 1);
                }
            }
        }
    }
    return old;
}

export {
    sortTxMap, genTxMap, genTxInfo, convertTx, cutZero
}