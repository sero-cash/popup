import {JsonRpc} from '../../service/jsonrpc'
import {keys, storage, config} from '../../config/common'
import BigNumber from "bignumber.js";

let rpc = new JsonRpc();

class Price {


    seroTotal(amount, cb) {
        let resData = {}
        rpc.get(config.host.price+"sero_usdt", function (rest) {
            if(rest && rest!==""){
                rest = JSON.parse(rest)
                let usdt = rest.last;
                let total = new BigNumber(amount).multipliedBy(new BigNumber(usdt));
                let moneyType = storage.get(keys.settings.moneyType);
                moneyType = moneyType ? moneyType : ""
                if (moneyType.toUpperCase() === config.setting.moneyType.cny) {
                    rpc.get(config.host.price+'usdt_cny', function (rest) {
                        rest = JSON.parse(rest)
                        let cny = rest.last;
                        total = new BigNumber(total).multipliedBy(new BigNumber(cny)).toFixed(5);
                        resData["type"] = "¥";
                        resData["total"] = total;
                        cb(resData);
                    })
                } else {

                    total = total.toFixed(5)
                    resData["type"] = "$";
                    resData["total"] = total;
                    cb(resData);
                }
            }
        })
    }

}

export {Price}