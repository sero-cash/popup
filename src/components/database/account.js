import {appPlus} from "../app/app-plus";

class AccountDB {

    create(account){
        appPlus.db.executeSql(`create table if not exists account(
        "address" CHAR(200),
        "name" CHAR(100)),
        "hint" CHAR(100)),
        "tk" CHAR(200)),
        "avatar" CHAR(50)),
        "keystore" CHAR(1000),createdAt`).then(function (e) {
            appPlus.db.executeSql(`insert into account values(
            '${account.address}',
            '${account.name}',
            '${account.hint}',
            '${account.tk}',
            '${account.avatar}',
            '${JSON.stringify(account.keystore)}',
            'now()')`).then((e) => {
                console.log(JSON.parse(e))
                console.log(e)
            }).catch((e) => {
                console.log(e.message);
            })
        }).catch((e) => {
            console.log(e.message);
        })
    }

    get(address){
        appPlus.db.selectSql(`select * from account where address='${address}'`).then(function (e) {
            return JSON.parse(e)
        }).catch((e) => {
            console.log(e.message);
        })
    }

    first(){
        appPlus.db.selectSql(`select * from account limit 1'`).then(function (e) {
            return JSON.parse(e)
        }).catch((e) => {
            console.log(e.message);
        })
    }

    list(){
        appPlus.db.selectSql(`select address,name,hint,tk,avatar,createdAt from account order by createdAt desc'`).then(function (e) {
            return JSON.parse(e)
        }).catch((e) => {
            console.log(e.message);
        })
    }

    update(detail){
        appPlus.db.executeSql(`update account set name='${detail.name}',avatar='${detail.avatar}' where address='${detail.address}'`).then(function (e) {
            return JSON.parse(e)
        }).catch((e) => {
            console.log(e.message);
        })
    }

}

const accountDB = new AccountDB();

export default accountDB