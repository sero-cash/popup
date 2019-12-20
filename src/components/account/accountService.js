const webworker = new Worker('./data.worker.js', {type: 'module'});

class AccountService {

    callbackHandler = new Map()
    messageId = 0

    constructor() {
        let that = this;

        that.callbackHandler = new Map();
        that.messageId = 0;

        webworker.onmessage = function (event) {
            let msg = event.data;
            let cb = that.callbackHandler.get(msg.messageId);
            that.callbackHandler.delete(msg.messageId);
            if (cb && typeof cb === "function") {
                cb(msg);
            }
        }
    }

    importMnemonic(data,cb){
        let message = {method: "importMnemonic", data: data}
        this.handlerMsg(message, cb)
    }

    createAccount(data,cb){
        let message = {method: "createAccount", data: data}
        this.handlerMsg(message, cb)
    }

    exportMnemonic(data,cb){
        let message = {method: "exportMnemonic", data: data}
        this.handlerMsg(message, cb)
    }

    getSK(data,cb){
        let message = {method: "getSK", data: data}
        this.handlerMsg(message, cb)
    }

    handlerMsg(message, cb) {
        if (cb) {
            const messageId = this.messageId++;
            message.messageId = messageId;
            console.log("account service handlerMsg: ",message);
            webworker.postMessage(message);
            this.callbackHandler.set(messageId, cb)
        }
    }
}


const accountService = new AccountService();

export {
    accountService
}

