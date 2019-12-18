import {appPlus} from "../app/app-plus";
import {storage} from "../../config/common";

function isPlus(){
    return !!(plus && plus.sqlite);
}

class Lstorage {

    async set(key,value){
        if(isPlus()){
            return this.setWithSqlLite(key,value);
        }else{
            return this.setWithStorage(key,value);
        }
    }

    async get(key){
        if(isPlus()){
            return this.getWithSqlLite(key);
        }else{
            return this.getWithStorage(key);
        }
    }

    async delete(key){
        if(isPlus()){
            return this.deleteWithSqlLite(key);
        }else{
            return this.deleteWithStorage(key);
        }
    }

    setWithStorage(key, value){
        return new Promise(function (resolve) {
            storage.set(key,value);
            resolve()
        })
    }

    getWithStorage(key){
        return new Promise(function (resolve) {
            const v = storage.get(key)
            resolve(v);
        })
    }

    deleteWithStorage(key){
        return new Promise(function (resolve) {
            storage.delete(key);
            resolve()
        })
    }

    async setWithSqlLite(key, value) {
        await appPlus.db.executeSql(`create table if not exists lstorage("key" CHAR(1000),"value" CHAR(1000))`);
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

    getWithSqlLite(key) {
        return appPlus.db.selectSql(`select value from lstorage where key ='${key}'`)
    }

    deleteWithSqlLite(key) {
        return appPlus.db.executeSql(`delete from lstorage where key ='${key}'`)
    }



}

const lstorage = new Lstorage();

export default lstorage