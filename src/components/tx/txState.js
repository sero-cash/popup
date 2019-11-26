import utils from "jsuperzk/dist/utils/utils";

class TxState {

    constructor(httpprovider) {
        this.httpprovider = httpprovider;
    }

    getAnchor(roots) {
        const resp = this.httpprovider.send({ "id": 0, "jsonrpc": "2.0", "method": "sero_getAnchor", "params": [roots] });
        if (utils.isNotNull(resp.error)) {
            throw new Error(resp.error.message);
        } else {
            // console.log("anchor>>>>>>>>>>:",JSON.stringify(resp.result))
            return resp.result;
        }
    }

    getOut(root){

    }

    getPkgById(id) {
        return null
    }

    getSeroGasLimit(to, tfee, gasPrice) {
        return utils.toBN(tfee.Value).div(gasPrice).toNumber();
    }

}

export default TxState