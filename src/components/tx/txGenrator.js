import {acmng} from "../data/assetmanager"

const asmg = acmng;
class TxGenrator {

    findRoots(accountKey, currency, amount){
        let roots = asmg.findUtxos(accountKey, currency, amount);
        return roots
    }

    findRootsByTicket(accountKey, tickets){

    }

    getRoot(root) {
    }

    defaultRefundTo(accountKey){

        return '';
    }

}

export default TxGenrator

