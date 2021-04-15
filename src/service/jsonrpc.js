import {config} from "../config/common";
import axios from 'axios'
import BigNumber from 'bignumber.js'
// const axios = require('axios');

class JsonRpc {

    constructor(rpc) {
        if (rpc) {
            this.rpc = rpc;
        }
    }

    seroRpc(_method, _params, callback) {
        let rpc = config.host.rpc;
        if(this.rpc){
            rpc = this.rpc
        }
        let data = {
            id: 0,
            jsonrpc: "2.0",
            method: _method,
            params: _params,
        };
        axios.post(rpc, data).then(function (response) {
            let data = response.data
            if (callback) {
                callback(data);
            }
        }).catch(function (error) {
            console.log("req error: ", error);
        })
    }

    async seroRpcAsync(_method, _params) {
        let rpc = config.host.rpc;
        if(this.rpc){
            rpc = this.rpc
        }
        let data = {
            id: 0,
            jsonrpc: "2.0",
            method: _method,
            params: _params,
        };
        const response = await axios.post(rpc, data);
        return new Promise(resolve => {
            resolve(response.data);
        });
    }

    get(url, cb) {
        axios.get(url).then(function (rest) {
            if (cb) {
                cb(rest.data)
            }
        })
    }

    latestBlock = async ()=>{
        const rest =  await this.seroRpcAsync("sero_blockNumber",[])
        return new BigNumber(rest.result).toNumber()-12;
    }
}
const jsonRpc = new JsonRpc()
export {JsonRpc,jsonRpc}
