class Sqlite {

    constructor() {
        this.name = "popup";
        this.path = "_doc/popup.db";
    }

    initDatabase() {
        let that = this;
        that.openDatabase().then(function (e) {
        }).catch((e) => {
            console.log(e.message)
        });
    }

    openDatabase() {
        let that = this;
        return new Promise(function (resolve, reject) {
            if (that.isOpenDatabase()) {
                resolve(true)
            } else {
                if(plus && plus.sqlite){
                    plus.sqlite.openDatabase({
                        name: that.name,
                        path: that.path,
                        success: function (e) {
                            resolve(e)
                        },
                        fail: function (e) {
                            reject(e)
                        }
                    });
                }
            }
        })

    }

    isOpenDatabase() {
        if(plus && plus.sqlite){
            let that = this;
            return plus.sqlite.isOpenDatabase({
                name: that.name,
                path: that.path
            });
        }else{
            return false;
        }

    }

    closeDatabase() {

        let that = this;
        return new Promise(function (resolve, reject) {
            if(plus && plus.sqlite){
                plus.sqlite.closeDatabase({
                    name: that.name,
                    success: function (e) {
                        resolve(e)
                    },
                    fail: function (e) {
                        console.log('closeDatabase failed: ' + JSON.stringify(e));
                        reject(e)
                    }
                });
            }else{
                reject("not app")
            }
        })
    }

    transaction() {
        let that = this;
        return new Promise(function (resolve, reject) {
            if(plus && plus.sqlite){
                plus.sqlite.transaction({
                    name: that.name,
                    success: function (e) {
                        resolve(e)
                    },
                    fail: function (e) {
                        console.log('transaction failed: ' + JSON.stringify(e));
                        reject(e)
                    }
                });
            }else{
                reject("not app")
            }
        })
    }

    async executeSql(sql) {
        console.log(sql)
        let that = this;
        console.log(sql);
        return new Promise(function (resolve, reject) {
            if(plus && plus.sqlite){
                plus.sqlite.executeSql({
                    name: that.name,
                    sql: sql,
                    success: function (e) {
                        console.log('executeSql success: ' + JSON.stringify(e));
                        resolve(e);
                    },
                    fail: function (e) {
                        console.log('executeSql failed: ' + JSON.stringify(e));
                        reject(e)
                    }
                });
            }else{
                reject("not app")
            }
        })
    }

    async selectSql(sql) {
        console.log(sql)
        let that = this;
        return new Promise(function (resolve, reject) {
            if(plus && plus.sqlite){
                plus.sqlite.selectSql({
                    name: that.name,
                    sql: sql,
                    success: function (e) {
                        console.log('selectSql success: ' + JSON.stringify(e));
                        resolve(e)
                    },
                    fail: function (e) {
                        console.log('selectSql failed: ' + JSON.stringify(e));
                        reject(e)
                    }
                });
            }else{
                reject("not app")
            }
        })
    }
}

export default Sqlite