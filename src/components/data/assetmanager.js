import {LinkedListStorage} from "./liststorage";
import {hexToCy} from "jsuperzk/dist/utils/utils";
import number from "less/lib/less/functions/number";

const BN = require('bn.js');
const jsuperzk = require('jsuperzk/dist/index')
const {keys, storage} = require('../../config/common');
const {TxStore} = require('../tx/txStore');

const {webworker} = require('../account/webworker');

class TokenStorage extends LinkedListStorage {

    constructor(pk, currency, db) {
        super("TOKEN", pk + ":" + currency, db);
        this.pk = pk;
        this.currency = currency;
    }

    valueOf() {
        return "0";
    }

    findRoots(remain) {
        let that = this;
        let roots = [];
        that.forEach(function (value, root) {
            let amount = new BN(value, 10);
            roots.push(root);
            remain = remain.sub(amount);
            return remain.isNeg() || remain.isZero();
        });
        return {remain: remain, roots: roots};
    }

    indexList(list) {
        super.insertList(list);
    }

    // remove(key) {
    //     let item = super.remove(key);
    //     if (!item) {
    //         return;
    //     }
    //     let nextKey = item.nextKey;
    //     while (nextKey) {
    //         let item = super._del(nextKey);
    //         nextKey = item.nextKey;
    //     }
    //     delete item.nextKey;
    //
    //     let prevItem = super._get(item.prevKey);
    //     if (prevItem) {
    //         delete prevItem.nextKey;
    //         super._set(item.prevKey, prevItem)
    //     } else {
    //         super._set(this.headKey, item.nextKey)
    //     }
    //
    //     super._set(this.tailKey, item.prevKey)
    // }
}

class TicketStorage extends LinkedListStorage {
    constructor(pk, db) {
        super("TICKET", pk, db);
    }

    indexList(list) {
        super.insertList(list);
    }
}

class NilsStorage extends LinkedListStorage {
    constructor(pk, db) {
        super("NIL", pk, db);
    }

    indexList(list) {
        super.insertList(list);
    }

    remove(key) {
        let item = super.remove(key);
        if (item) {
            return item.value;
        }
    }
}

class StorageMap extends LinkedListStorage {

    constructor(newInstance, prefix, db) {
        super(prefix, "", db);
        this.newInstance = newInstance;
    }

    has(key) {
        return this.get(key)
    }

    set(key, value) {
        if (value.valueOf) {
            super.insert(key, value.valueOf())
        } else {
            super.insert(key, value)
        }
    }

    forEach(func) {
        let that = this;
        super.forEach(function (val, key) {
            let instance = that.newInstance(key, val);
            func(instance, key);
        });
    }

    get(key) {
        let value = super.get(key);
        if (typeof value === "undefined") {
        } else {
            return this.newInstance(key, value);
        }
    }
}

class AccountAssetManager {

    constructor(pk, tk, version, db) {
        this.pk = pk;
        this.tk = tk;
        this.version = version
        this.db = db;

        this.storages = new StorageMap(function (currency, value) {
            return new TokenStorage(pk, currency, db);
        }, "M:" + this.pk, db);

        this.tickets = new TicketStorage(this.pk, db);
        this.nils = new NilsStorage(this.pk, db);

        let start = this.db.get(this.pk + ":startBlockNumber");
        if (!start) {
            start = 1;
        }
        this.region = {start: start};
    }

    valueOf() {
        return this.pk;
    }

    start() {
        this.fetchUtxos();
        this.checkUsedUxtos();
    }

    balancesOf() {
        let balance = new Map();
        this.storages.forEach(function (val, key, map) {
            let amount = new BN();
            val.forEach(function (value, key) {
                amount.iadd(new BN(value, 10))
            });
            balance.set(key, amount);
        });
        return balance;
    }

    ticketsOf() {
        let tickets = new Map();
        this.tickets.forEach(function (key, value) {
            let category = key.substring(key.indexOf(":") + 1);
            let list = tickets.get(category);
            if (!list) {
                list = [];
                tickets.set(category, list);
            }
            list.push(value);
        });
        return tickets;
    }

    getUtxoByNil(nil) {
        let val = this.nils.get(nil);
        if (val) {
            let values = val.split(":");
            return {root: values[0], utxo: this.db.get(values[0])};
        }
    }

    getRootByNil(nil) {
        let val = this.nils.get(nil);
        if (val) {
            let values = val.split(":");
            return values[0];
        }
    }

    findUtxos(cy, amount) {
        let that = this;
        let storage = this.storages.get(cy);
        if (!storage) {
            return {utxos: [], remain: amount};
        }
        let ret = storage.findRoots(amount);
        let utxos = [];
        ret.roots.forEach(function (root, index) {
            utxos.push(that.db.get(root));
        });
        return {utxos: utxos, remain: ret.remain};
    }

    indexUtxos(data) {
        let that = this;
        let blockData = data.blockData;
        let utxos = blockData.utxos;
        let txInfos = blockData.txInfos;
        const transactions = new TxStore(that.pk);
        let changgRegion = true;

        let currentIndex = that.getIndex();
        if (utxos && utxos.length > 0) {
            const nilItems = [];
            const tokenItems = new Map();
            const ticketItems = [];
            let currentPkr = jsuperzk.createPkrHash(that.tk, currentIndex, that.version)
            utxos.forEach(function (utxo) {
                that.db.set(utxo.Root, {Root: utxo.Root, Asset: utxo.Asset, State: utxo.State});
                let currency = "";
                let category = "";
                if (utxo.Asset.Tkn) {
                    currency = hexToCy(utxo.Asset.Tkn.Currency);
                    let list = tokenItems.get(currency);
                    if (!list) {
                        list = [];
                        tokenItems.set(currency, list);
                    }
                    list.push({key: utxo.Root, value: utxo.Asset.Tkn.Value});
                }
                if (utxo.Asset.Tkt) {
                    category = utxo.Asset.Tkt.Value;
                    ticketItems.push({
                        key: utxo.Asset.Tkt.Value,
                        value: utxo.Root + ":" + hexToCy(utxo.Asset.Tkt.Category)
                    })
                }

                utxo.Nils.forEach(function (nil, index) {
                    nilItems.push({key: nil, value: [utxo.Root, currency, category].join(":")});
                });

                //for transaction
                transactions.store(utxo.TxHash, utxo.Root, "in");

                if (currentPkr == utxo.Pkr) {
                    changgRegion = false;
                }
            });

            tokenItems.forEach(function (items, currency, map) {
                let storage = that.storages.get(currency);
                if (!storage) {
                    storage = new TokenStorage(that.pk, currency, that.db);
                    that.storages.set(currency, storage);
                }
                storage.indexList(items);
            });
            that.tickets.indexList(ticketItems);
            that.nils.indexList(nilItems);

            if (!that.region.end) {
                that.region.end = data.lastBlockNumber;
            }
        }

        if (changgRegion) {
            that.region = {start: data.lastBlockNumber + 1};
            this.db.set(that.pk + ":startBlockNumber", data.lastBlockNumber + 1);
        } else {
            that.db.set(keys.pkrIndexKey(that.pk), currentIndex + 1);
        }

        //for transaction
        if (txInfos && txInfos.length > 0) {
            txInfos.forEach(function (txInfo, key) {
                transactions.storeHash(txInfo)
            })
        }
        that.fetchUtxos();
    }

    delUtxoByNils(nils) {
        let that = this;
        nils.forEach(function (nil, index) {
            let val = that.nils.remove(nil);
            // let val = that.name.get(nil);
            if (val) {
                let values = val.split(":");
                if (values[1]) {
                    let storage = that.storages.get(values[1]);
                    if (storage) {
                        storage.remove(values[0]);
                    }
                }
                if (values[2]) {
                    that.tickets.remove(values[2]);
                }
            }
        });

        setTimeout(function () {
            that.checkUsedUxtos()
        }, 5 * 1000);
    }


    fetchUtxos(init) {
        let postData = {method: "fetchUtxos", tk: this.tk};
        postData.start = this.region.start;
        postData.end = this.region.end;

        if (this.region.end) {
            postData.pkrs = [jsuperzk.createPkrHash(this.tk, this.getIndex(), this.version)];
            setTimeout(function () {
                webworker.postMessage(postData);
            }, 1 * 1000);
        } else {
            let index = this.getIndex();
            let mainPKr = jsuperzk.createPkrHash(this.tk, 1, this.version);
            let mainOldPKr = jsuperzk.createOldPkrHash(this.tk, 1, this.version);
            let pkrs = [mainPKr,mainOldPKr];
            for (var i = Math.max(2, index - 4); i <= index; i++) {
                pkrs.push(jsuperzk.createPkrHash(this.tk, i, this.version));
            }
            postData.pkrs = pkrs;
            setTimeout(function () {
                webworker.postMessage(postData);
            }, 10 * 1000);
        }
    }


    checkUsedUxtos() {
        let that = this;
        let nils = [];
        this.nils.forEach(function (val, key) {
            nils.push(key);
        });

        if (nils.length == 0) {
            setTimeout(function () {
                that.checkUsedUxtos()
            }, 5 * 1000);
            return;
        }

        webworker.postMessage({method: "checkNils", tk: this.tk, nils: nils});
    }

    getIndex() {
        let index = this.db.get(keys.pkrIndexKey(this.pk));
        if (!index) {
            index = 1;
        }
        return index;
    }
}

class AccountsAssetManager {

    constructor() {
        this.accounts = new Map();
    }

    initAccount(pk, tk, version) {
        if (!this.accounts.has(tk)) {
            const account = new AccountAssetManager(pk, tk, version, storage);
            this.accounts.set(tk, account);
            account.start();
        }
    }

    clearAccounts(){
        this.accounts = new Map();
    }

    findUtxos(tk, cy, amount) {
        let account = this.accounts.get(tk);
        if (!account) {
            return {};
        }
        return account.findUtxos(cy, amount);
    }

    balancesOf(tk) {
        let account = this.accounts.get(tk);
        if (!account) {
            return new Map();
        }
        return account.balancesOf();
    }

    ticketsOf(tk) {
        let account = this.accounts.get(tk);
        if (!account) {
            return {};
        }
        return account.ticketsOf();
    }

    initWorker() {
        let that = this;

        webworker.addEventListener('message', (event) => {
            // console.log("assets eventListener:", event.data)
            if (event.data.method === "fetchUtxos") {
                let account = that.accounts.get(event.data.tk);
                if (account) {
                    account.indexUtxos(event.data.data);
                }
            } else if (event.data.method === "checkNils") {
                let data = event.data;
                let account = that.accounts.get(data.tk);
                if (account) {
                    let nils = [];
                    if (data.datas) {
                        data.datas.forEach(function (item) {
                            try{
                                let hash = item.TxHash;
                                let root = account.getRootByNil(item.Nil);
                                // let utxo = storage.get(root);
                                const transactions = new TxStore(account.pk);
                                transactions.store(hash, root, "out")
                                transactions.storeTxInfo({
                                    num: item.Num,
                                    txHash: item.TxHash,
                                    blockHash: item.TxInfo.BlockHash,
                                    gas: item.TxInfo.Gas,
                                    gasUsed: item.TxInfo.GasUsed,
                                    gasPrice: item.TxInfo.GasPrice,
                                    from: item.TxInfo.From,
                                    to: item.TxInfo.To,
                                    time: item.TxInfo.Time
                                })
                                transactions.storeHash(item.TxInfo);
                            }catch (e) {
                                console.log("checkNils err:",e.message)
                            }

                            nils.push(item.Nil);
                        });
                    }
                    account.delUtxoByNils(nils);
                }
            }
        });

        webworker.addEventListener('error', (event) => {
            if (event.data.method === "fetchUtxos") {
                let account = that.accounts.get(event.data.tk);
                if (account) {
                    setTimeout(function () {
                        account.fetchUtxos()
                    }, 3 * 1000);
                }
            } else if (event.data.method === "checkNils") {
                let account = that.accounts.get(event.data.tk);
                if (account) {
                    setTimeout(function () {
                        account.checkUsedUxtos()
                    }, 3 * 1000);

                }
            }
        });
    }
}

const acmng = new AccountsAssetManager()

export {acmng}