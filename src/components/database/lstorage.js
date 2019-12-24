import {appPlus} from "../app/app-plus";
import {storage} from "../../config/common";

function isPlus() {
    try {
        return !!(plus && plus.sqlite);
    } catch (e) {
        return false
    }
}

class Lstorage {

    constructor(){
        this.init();
    }

    init(){
        if(isPlus()){
            appPlus.db.openDatabase().then(()=>{
                appPlus.db.executeSql(`create table if not exists lstorage("key" CHAR(1000),"value" CHAR(1000))`).then(data=>{
                    console.log("create table>>> " + data);
                }).catch(error=>{
                    console.log("create table>>> " + error);
                });
            })
        }
    }

    async set(key,value){
        storage.set(key,value);
        if(isPlus()){
            this.setWithSqlLite(key,value).then().catch();
        }
        return new Promise(function (resolve) {
            resolve();
        })
    }

    async get(key){
        const that = this;
        const v = storage.get(key);
        return new Promise(function (resolve) {
            if(!v){
                if(isPlus()){
                    that.getWithSqlLite(key).then(value => {
                        if(value){
                            storage.set(key,value);
                            resolve(value);
                        }else{
                            resolve("");
                        }
                    }).catch((e)=>{
                        console.log(e);
                        resolve("");
                    });
                }else{
                    resolve("");
                }
            }else{
                resolve(v);
            }
        })
    }

    async delete(key){
        storage.delete(key);
        if(isPlus()){
            this.deleteWithSqlLite(key).then();
        }
        return new Promise(function (resolve) {
            resolve();
        })
    }

    async setWithStorage(key, value){
        return new Promise(function (resolve) {
            storage.set(key,value);
            resolve()
        })
    }

    async getWithStorage(key){
        return new Promise(function (resolve) {
            const v = storage.get(key)
            resolve(v);
        })
    }

    async deleteWithStorage(key){
        return new Promise(function (resolve) {
            storage.delete(key);
            resolve()
        })
    }

    async setWithSqlLite(key, value) {
        const data = await appPlus.db.selectSql(`select value from lstorage where key='${key}' `);
        if (!data || data.length === 0){
            await appPlus.db.executeSql(`insert into lstorage values('${key}','${JSON.stringify(value)}')`);
        }else{
            await appPlus.db.executeSql(`update lstorage set value='${JSON.stringify(value)}' where key = '${key}'`);
        }
        return new Promise(function (resolve) {
            resolve();
        })
    }

    async getWithSqlLite(key) {
        const that = this;
        return new Promise(function (resolve) {
            appPlus.db.selectSql(`select value from lstorage where key ='${key}'`).then(datas=>{
                if(datas && datas.length>0){
                    resolve(JSON.parse(datas[0].value))
                }else{
                    resolve("")
                }
            }).catch(error=>{
                that.init();
            });
        })
    }

    async deleteWithSqlLite(key) {
        await appPlus.db.executeSql(`delete from lstorage where key ='${key}'`)
    }



}

const lstorage = new Lstorage();

export default lstorage