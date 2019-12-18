import {appPlus} from "../app/app-plus";

class Lstorage {

    async set(key, value) {
        await appPlus.db.executeSql(`create table if not exists lstorage("key" CHAR(1000),"value" CHAR(1000))`);
        await appPlus.db.executeSql(`insert into lstorage values('${key}','${JSON.stringify(value)}')`);
    }

    async has(key) {
        const rst = await appPlus.db.selectSql(`select value from lstorage where key ='${key}'`);
        if(rst) {
            return new Promise(function (resolve) {
                resolve(true)
            })
        }
    }

    async get(key) {
        await appPlus.db.selectSql(`select value from lstorage where key ='${key}'`)
    }

    async delete(key) {
        await appPlus.db.executeSql(`delete from lstorage where key ='${key}'`)
    }

}

const lstorage = new Lstorage();

export default lstorage