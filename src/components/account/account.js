import Utils from "../../config/utils";
import {storage, keys, config} from "../../config/common";
import {accountService} from './accountService'
const jsuperzk = require('jsuperzk')
const utils = new Utils();
import {acmng} from "../data/assetmanager";
import BigNumber from "bignumber.js";
import {assetService} from "../service/service";

class Account {

    constructor(address){
        this.address = address
    }

    initRpc(){
    }

    genWord() {
        try {
            let seed = jsuperzk.genSeed();
            let word = jsuperzk.entropyToMnemonic(seed);
            sessionStorage.setItem("worddata", word);
            sessionStorage.setItem("MnemonicType", "create");
            return word;
        }catch (e) {
            throw new Error(e.message)
        }
    }

    getSK(password){
        const that = this;
        return new Promise(function (resolve,reject) {
            try{
                let address = that.address;
                if(!address){
                    let current = that.getCurrent()
                    address = current.address
                }
                const keystore = storage.get(keys.infoKey(address));
                accountService.getSK({password:password,keystore:keystore},function (msg) {
                    if(msg.error){
                        reject(msg.error)
                    }else{
                        resolve(msg.data)
                    }
                })
            }catch (e) {
                reject(e.message)
            }
        })
    }

     balanceOf(currency){
        let current = this.getCurrent()
        const assets = acmng.balancesOf(current.tk);
        let amount =0;
        assets.forEach(function (value, cy) {
            if(cy === currency){
                amount= new BigNumber(value).toString(10);
            }
        })
        return amount
    }

    PreCreate(name, password, hint, word) {
        try {
            storage.delete(keys.account.tempKeystore);
            const data= {
                password: password,
                word: word,
            }
            accountService.createAccount(data,function (msg) {
                const keystore =msg.data;
                let detail = {
                    address: keystore.address,
                    name: name,
                    hint: hint,
                    tk:keystore.tk,
                    avatar: utils.getRandomAvatar(),
                }
                const tempKeystore = {detail: detail, keystore: keystore}
                storage.set(keys.account.tempKeystore, tempKeystore);
            })
        }catch (e) {
            throw new Error(e.message)
        }
    }

    CopyTempKeystore() {
        try {
            let tempKeystore = storage.get(keys.account.tempKeystore);
            if (!tempKeystore) {
                return new Error("create account failed! please try again!")
            }
            const keystore = tempKeystore.keystore;
            let addressArray = storage.get(keys.account.addresses);

            if (addressArray) {
                addressArray.push(keystore.address);
            } else {
                addressArray = [keystore.address];
            }
            storage.set(keys.account.addresses, addressArray);
            storage.set(keys.infoKey(keystore.address), keystore);
            storage.set(keys.detailKey(keystore.address), tempKeystore.detail);
            let current = this.getCurrent();
            if (!current) {
                this.setCurrent(tempKeystore.detail);
            }
            storage.delete(keys.account.tempKeystore);
        }catch (e) {
            throw new Error(e.message);
        }
    }

    exportMnemonic(address, password) {
        return new Promise(function (resolve,reject) {
            let keystore = storage.get(keys.infoKey(address));
            accountService.exportMnemonic({keystore,password},function (msg) {
                if(msg.error){
                    reject(msg.error)
                }else{
                    const word = msg.data;
                    sessionStorage.setItem("worddata", word);
                    sessionStorage.setItem("MnemonicType", "export");
                    resolve(true)
                }
            })
        })
    }

    importMnemonic(name,hint,word,password){
        const that = this;
        return new Promise(function (resolve,reject) {
            accountService.importMnemonic({word,password},function (msg) {
                if(msg.error){
                    reject(msg.error)
                }else{
                    const keystore = msg.data;
                    let address = keystore.address;
                    let addressArray = storage.get(keys.account.addresses);
                    if (addressArray) {
                        for(let addr of addressArray){
                            if(addr === address){
                                return "Account Exist!! ";
                            }
                        }
                        addressArray.push(address);
                    } else {
                        addressArray = [address];
                    }
                    storage.set(keys.account.addresses, addressArray);
                    storage.set(keys.infoKey(address), keystore);
                    let detail = {
                        address: address,
                        name: name,
                        hint: hint,
                        tk:keystore.tk,
                        avatar: utils.getRandomAvatar(),
                    }
                    storage.set(keys.detailKey(address), detail);
                    that.setCurrent(detail);
                    resolve(true)
                }
            })
        })
    }

    List() {
        let list = [];
        let addresses = storage.get(keys.account.addresses);
        if (addresses) {
            for (let address of addresses) {
                let account = storage.get(keys.infoKey(address));
                list.push(account)
            }
            return list;
        }
        return [];
    }

    Details() {
        let list = [];
         let addresses = storage.get(keys.account.addresses);
        if (addresses) {
            for (let address of addresses) {
                // let account = storage.get(keys.detailKey(address));
                list.push(this.Detail(address))
            }
            return list;
        }
        return [];
    }

    getCurrent() {
        let data = storage.get(keys.account.current);
        // console.log(JSON.stringify(data))
        return data;
    }

    setCurrent(info) {
        // console.log(JSON.stringify(info))
        storage.set(keys.account.current, info);
    }

    setDetail(detail) {
        const current = storage.get(keys.account.current);
        if (current.address === detail.address) {
            storage.set(keys.account.current, detail);
        }
        storage.set(keys.detailKey(detail.address), detail)
    }

    Keystore() {
        return storage.get(keys.infoKey(this.address));
    }

    Detail(address) {
        if (!address){
            address = this.address;
        }else{
            this.address = address;
        }
        let detail = storage.get(keys.detailKey(address));
        if (detail) {
            if (!detail.mainPKr) {
                detail.mainPKr = this.MainPKr();
            }
            let keystore = this.Keystore(this.address);
            if(!detail.currentPKr){
                detail.currentPKr =  this.MainPKr();
            }
            assetService.getPKrIndex(keystore.tk).then(info=>{
                detail.currentPKr = jsuperzk.createPkrHash( keystore.tk, info.PkrIndex,keystore.version);
                storage.set(keys.detailKey(this.address), detail);
            }).catch(err=>{

            })

            return detail
        }
    }

    Remove() {
        let addresses = storage.get(keys.account.addresses);
        let list = [];
        for (let address of addresses) {
            if (this.address === address) {
            } else {
                list.push(address);
            }
        }
        storage.set(keys.account.addresses, list);
        storage.delete(keys.infoKey(this.address));
    }


    NextPKrIndex() {
        let current = storage.get(keys.account.pkrIndex + this.address);
        if (current) {
            return parseInt(current) + 1
        } else {
            return 1
        }
    }

    MainPKr(){
        let keystore = this.Keystore(this.address);
        let rest = jsuperzk.createPkrHash(keystore.tk, 1,keystore.version);
        return rest
    }



}

export default Account