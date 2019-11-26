import {config, keys, storage} from "./common";

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
            network: {}
        }

        this.host = {
            // host: "http://192.168.50.86:3000/#/",
            // rpc :"http://192.168.19.145:8545",

            // host: "http://192.168.15.131:3001/#/",
            // rpc: "http://192.168.15.131:8545",
            // price: "http://192.168.15.131:8987/ticket?t=",

            host: "http://popup.sero.cash/#/",
            rpc: "http://148.70.169.73:8545",
            price: "http://129.211.98.114:8987/ticket?t=",

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
            console.log("seroRpcHost:", seroRpcHost)
            this.host.rpc = seroRpcHost;
        }


    }

    seroRpc() {
        let v = storage.get(keys.settings.seroRpcHost)
        if (!v) {
            return this.host.rpc;
        } else {
            return v
        }
    }

    setLanguage(v) {
        storage.set(keys.settings.language, v)
        this.init();
    }

    setRpc(v) {
        storage.set(keys.settings.seroRpcHost, v)
        this.host.rpc = v
        this.init();
    }

    setMoneyType(v) {
        storage.set(keys.settings.moneyType, v)
        this.init();
    }

}

export default Config