import {appPlus} from "../app/app-plus";
import {storage} from "../../config/common";
import {genTxMap,genTxInfo,convertTx,sortTxMap} from "../tx/utils";

class TxDatabase {

    store(address, hash, root, type) {

        let executeSql = `create table if not exists tx(
            "address" TEXT,
            "hash" TEXT,
            "root" TEXT,
            "type" TEXT,
            "createdAt" TEXT
        )`;
        appPlus.db.executeSql(executeSql).then(function (e) {
            let insertSql = `insert into tx values(
                '${address}',
                '${hash}',
                '${root}',
                '${type}',
                '${new Date().getTime()}'
            )`;
            appPlus.db.executeSql(insertSql).then((data) => {
            }).catch((e) => {
                alert(e.message);
            })
        }).catch((e) => {
            alert(e.message);
        })
    }

    // storeInfo(data){
    //
    //     let executeSql = `create table if not exists txInfo(
    //         "num" TEXT,
    //         "txHash" TEXT,
    //         "blockHash" TEXT,
    //         "gas" TEXT,
    //         "gasUsed" TEXT,
    //         "gasPrice" TEXT,
    //         "from" TEXT,
    //         "to" TEXT,
    //         "time" TEXT,
    //         "createdAt" TEXT
    //     )`;
    //     console.log(executeSql)
    //     appPlus.db.executeSql(executeSql).then(function (e) {
    //         let insertSql = `insert into txInfo values(
    //             '${data.num}',
    //             '${data.txHash}',
    //             '${data.blockHash}',
    //             '${data.gas}',
    //             '${data.gasUsed}',
    //             '${data.gasPrice}',
    //             '${data.from}',
    //             '${data.to}',
    //             '${data.time}',
    //             '${new Date().getTime()}'
    //         )`;
    //         console.log(insertSql)
    //         appPlus.db.executeSql(insertSql).then((e) => {
    //             console.log(JSON.parse(e))
    //             console.log(e)
    //         }).catch((e) => {
    //             alert(e.message);
    //             console.log(e.message);
    //         })
    //     }).catch((e) => {
    //         alert(e.message);
    //         console.log(e.message);
    //     })
    // }

    queryByHash(hash){
        return new Promise(function (resolve, reject) {
            if (hash) {
                let sql = `select * from tx where hash = '${hash}' order by createdAt desc,hash asc `;
                appPlus.db.selectSql(sql).then((datas) => {
                    console.log(JSON.stringify(datas))
                    if (datas) {
                        let txMap = new Map();
                        for (let data of datas) {
                            // let address = data.address;
                            // let hash = data.hash;
                            let root = data.root;
                            let type = data.type;
                            genTxInfo(type, txMap, hash, root);
                        }

                        if (txMap) {
                            let tx = null;
                            let assets = []
                            txMap.forEach(function (value, key, map) {
                                tx = value;
                                assets.push({
                                    cy:value.currency,
                                    value:value.value,
                                })
                            })
                            tx["assets"]=assets
                            resolve(tx)
                        }
                    }
                }).catch((e) => {
                    console.log(e.message);
                    reject(e)
                })
            } else {
                reject(new Error("hash con't be null."))
                // throw new Error("currency and address con't be null.")
            }
        })
    }

    //return a list
    query(currency, address) {
        return new Promise(function (resolve, reject) {
            if (currency && address) {
                let sql = `select * from tx where address = '${address}' order by createdAt desc,hash asc `;
                appPlus.db.selectSql(sql).then((datas) => {
                    if (datas) {
                        let txMap = new Map();
                        for (let data of datas) {
                            // let address = data.address;
                            let hash = data.hash;
                            let root = data.root;
                            let type = data.type;
                            genTxMap(root, hash, currency, txMap, type);
                        }

                        if (txMap) {
                            let mapAsnc = sortTxMap(txMap);
                            resolve(mapAsnc)
                        }
                    }
                }).catch((e) => {
                    console.log(e.message);
                    reject(e)
                })
            } else {
                reject(new Error("currency and address con't be null."))
                // throw new Error("currency and address con't be null.")
            }
        })
    }

    //return a list
    /**
     *
     *from: detail.mainPKr,
     to: to,
     value: decimals.convert(value, cy, 4),
     currency: cy,
     fee: decimals.convert(fee.Value, cy, 8),
     gas: gas,
     gasPrice: gasPrice,
     hash: signRet.Hash,
     time: parseInt(new Date().getTime() / 1000)
     * @param currency
     * @param address
     */
    queryPending(currency, address) {
        return new Promise(function (resolve, reject) {
            if (currency && address) {
                let sql = `select * from tx where address = '${address}' and type='pending' order by createdAt desc,hash asc `;
                appPlus.db.selectSql(sql).then((datas) => {
                    if (datas) {
                        let txs = [];
                        for (let data of datas) {
                            // let address = data.address;
                            let hash = data.hash;
                            let root = data.hash;
                            let type = data.type;
                            let txInfo = storage.get(hash);
                            if(currency === txInfo.cy){
                                let tx = {
                                    root: root,
                                    type: 'out',
                                    hash: hash,
                                    block: '',
                                    currency: txInfo.cy,
                                    value: txInfo.value,
                                    fee: txInfo.fee,
                                    gas: txInfo.gas,
                                    gasUsed: '25000',
                                    gasPrice: txInfo.gasPrice,
                                    time: txInfo.time,
                                    blockHash: '',
                                }
                                txs.push(tx)
                            }
                        }
                        resolve(txs)
                    }
                }).catch((e) => {
                    console.log(e.message);
                })
            } else {
                resolve(new Error("currency and address is required!"))
            }
        })
    }
}

const txDatabase = new TxDatabase();

export default txDatabase