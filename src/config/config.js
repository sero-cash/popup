import {config, keys, lang, storage} from "./common";
import {assetService} from "../components/service/service";

class Config {

    constructor() {
        this.setting = {
            moneyType: {
                usd: "USD",
                cny: "CNY",
            },
            language: {
                zh_CN: "简体中文",
                en_US: 'English'
            },
            network: {
                cn: "https://light.seronode.io",
                en: "https://f-light.seronode.io"
            }
        }

        this.host = {
            host: "http://popup.sero.cash/#/",
            // rpc: "http://light.seronode.io:8545",
            rpc: "https://light.seronode.io",
            price: "",

        }

        this.moneyType = "USD"
        this.language = "en_US"
    }

    init() {
        let moneyType = storage.get(keys.settings.moneyType);
        if (moneyType) {
            this.moneyType = moneyType;
        }

        let language = storage.get(keys.settings.language);
        if (language) {
            this.language = language;
        } else {
            let localUtc = new Date().getTimezoneOffset() / 60;
            if (localUtc === -8) {
                storage.set(keys.settings.language, "zh_CN")
                this.language = "zh_CN";
            } else {
                storage.set(keys.settings.language, "en_US")
                this.language = "en_US"
            }
        }

        let seroRpcHost = storage.get(keys.settings.seroRpcHost);
        if (seroRpcHost) {
            if(!this.isZH() && (seroRpcHost.indexOf("sero.cash")>-1 ||  seroRpcHost.indexOf("ririniannian.com")>-1) ){
                // storage.set(keys.settings.seroRpcName, lang.e().page.setting.enNode)
                // storage.set(keys.settings.seroRpcHost, this.setting.network.en)
                // this.host.rpc = this.setting.network.en
                this.setRpc(this.setting.network.en,keys.settings.seroRpcName)
                // assetService.init()
            }else{
                if(seroRpcHost.indexOf("sero.cash")>-1 ||  seroRpcHost.indexOf("ririniannian.com")>-1){
                    // storage.set(keys.settings.seroRpcName, lang.e().page.setting.enNode)
                    // storage.set(keys.settings.seroRpcHost, this.setting.network.cn)
                    // this.host.rpc = this.setting.network.cn
                    this.setRpc(this.setting.network.cn,lang.e().page.setting.cnNode)
                }else{
                    this.host.rpc = seroRpcHost;
                }
            }
        }else{
            if(!this.isZH()){
                this.host.rpc = this.setting.network.en
            }else{
                this.host.rpc = this.setting.network.cn
            }
        }

    }

    isZH =()=>{
        let localUtc = new Date().getTimezoneOffset() / 60;
        return localUtc === -8;
    }

    seroRpc() {
        let v = storage.get(keys.settings.seroRpcHost)
        if (!v) {
            return this.host.rpc;
        } else {
            return v
        }
    }

    seroRpcName() {
        let v = storage.get(keys.settings.seroRpcName)
        if (!v) {
            if(!this.isZH()){
                return lang.e().page.setting.enNode;
            }else{
                return lang.e().page.setting.cnNode;
            }
        } else {
            return v
        }
    }

    setLanguage(v) {
        storage.set(keys.settings.language, v)
        this.init();
    }

    setRpc(v,name) {
        storage.set(keys.settings.seroRpcHost, v)
        storage.set(keys.settings.seroRpcName, name?name:v)
        this.host.rpc = v
        // this.init();
    }

    setMoneyType(v) {
        storage.set(keys.settings.moneyType, v)
        this.init();
    }

}

export default Config