import {keys, storage} from "../../config/common";
import txDatabase from "../database/txDatabase";


class TxStore {
    constructor(address) {
        this.address = address;
    }

    store(hash, root, type) {
        try {
            // if (plus && plus.sqlite) {
                // console.log("use sqlite " ,hash, root, type)
            //     txDatabase.store(this.address,hash, root, type);
            // }
            let txKey = keys.txKey(this.address, hash, root, type);
            storage.set(txKey, 1);
        } catch (e) {
            let txKey = keys.txKey(this.address, hash, root, type);
            storage.set(txKey, 1)
        }
    }

    storeTxInfo(data) {
        let txInfoKey = keys.txInfoKey(this.address, data.txHash);
        storage.set(txInfoKey, data);
    }

    storeHash(data) {
        //remove pengdingHash
        let pending = storage.get(data.TxHash)
        if(pending && pending.currency){
            storage.delete(data.TxHash)
            storage.delete(keys.txKeyPending(this.address, pending.currency,data.TxHash))
        }
        storage.set(data.TxHash, data);
    }
}

export {TxStore}