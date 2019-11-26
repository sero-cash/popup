import {appPlus} from "../app/app-plus";

class Lstorage {

    set(key, value) {
        appPlus.db.executeSql(`create table if not exists lstorage("key" CHAR(1000),"value" CHAR(1000))`).then(function (e) {
            appPlus.db.executeSql(`insert into lstorage values('${key}','${JSON.stringify(value)}')`).then((e) => {
                console.log(JSON.parse(e))
                console.log(e)
            }).catch((e) => {
                console.log(e.message);
            })
        }).catch((e) => {
        })
    }

    has(key) {
        appPlus.db.selectSql(`select value from lstorage where key ='${key}'`).then(function (e) {
            if (e) {
                console.log(JSON.parse(e))
                return true
            } else {
                return false
            }
        }).catch((e) => {
            console.log(e.message);
        });
    }

    get(key) {
        appPlus.db.selectSql(`select value from lstorage where key ='${key}'`).then(function (e) {
            console.log(JSON.parse(e))
            return JSON.parse(e)
        }).catch((e) => {
            console.log(e.message);
        });
    }

    delete(key) {
        appPlus.db.executeSql(`delete from lstorage where key ='${key}'`).then(function (e) {
            console.log(e);
            return true;
        }).catch((e) => {
            console.log(e.message)
            return false;
        })
    }

}

const lstorage = new Lstorage();

export default lstorage