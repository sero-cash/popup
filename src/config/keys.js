class Keys {

    constructor() {
        this.account = {
            addresses: "account:addresses",
            infoPrefix: "account:info:",
            pkrIndex: "account:pkrIndex:",
            detail: "account:detail:",
            tempKeystore: "account:keystore:temp",
            current: 'account:current',
            currentPKr: 'account:currentPKr:',
            assets:'account:assets:',
        }

        this.config = {
            seroRpcHost: "config:seroRpcHost"
        }

        this.sync = {
            latestBlockNumber: "sync:latestBlockNumber",
            nils: "sync:nils",
            roots: "sync:roots",
            root: "sync:root:"
        }
        this.address = {
            book: "address:book",
            info: "address:info:",
        }

        this.scan = {
            value: "scan:value",
            type: "scan:type"
        }

        this.transaction = {
            Tx: "Tx",
            TxInfo: "TxInfo",
            TxPending: "TxPending",
        }

        this.settings = {
            moneyType: "settings:moneyType",
            seroRpcHost: "settings:seroRpcHost",
            seroRpcName: "settings:seroRpcName",
            language: "settings:language"
        }

        this.dapp = {
            list: "dapps:list",
            info:"dapps:info:",
            read:"dapps:read:"
        }

        this.decimals = "decimals"
    }

    dappsRead(name){
        return this.dapp.read + name;
    }

    dappsInfoKey(contractAddress){
        return this.dapp.info + contractAddress
    }

    decimalsKey(currency) {
        return [this.decimals, currency].join(":")
    }

    infoKey(address) {
        return this.account.infoPrefix + address;
    }

    rootKey(root) {
        return this.sync.root + root;
    }

    pkrIndexKey(address) {
        return this.account.pkrIndex + address;
    }

    currentPKrIndex(address) {
        return this.account.currentPKr + address;
    }

    detailKey(address) {
        return this.account.detail + address;
    }

    txKey(address, hash, root, type) {
        return [this.transaction.Tx, address, hash, root, type].join(":");
    }

    txInfoKey(address, hash) {
        return [this.transaction.TxInfo, address, hash].join(":");
    }

    txKeyPrefix(address) {
        return [this.transaction.Tx, address].join(":");
    }

    txKeyHashPrefix(address, hash) {
        return [this.transaction.Tx, address, hash].join(":");
    }

    txKeyPending(address, currency, hash) {
        return [this.transaction.TxPending, address, currency, hash].join(":");
    }

    txKeyPendingPrefix(address, currency) {
        return [this.transaction.TxPending, address, currency].join(":");
    }


}

export default Keys
