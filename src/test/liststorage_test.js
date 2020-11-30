const BN = require("bn.js")
const {LinkedListStorage} = require("../components/data/liststorage");

function linkedListStorage_test() {


    let map = new Map();
    let list = new LinkedListStorage("test", "", map);

    list.insert("0", 0)
    // list.insert("1", 1)
    // list.insert("2", 2)
    // list.insert("3", 3)
    // list.insert("4", 4)
    // list.insert("5", 5)
    list.insertList([{key: "1", value: 1}, {key: "2", value: 2}, {key: "3", value: 3}, {key: "4", value: 4}, {
        key: "5",
        value: 5
    }])

    list.remove("0")
    list.remove("1")
    list.insert("7", 7)
    list.remove("5")
    list.insert("6", 6)
    list.remove("2")
    list.remove("4")
    list.remove("3")
    list.remove("6")
    list.remove("7")

    for (var i = 0; i < 1000; i++) {
        let n = Math.floor(Math.random() * 10)
        let flag = Math.random()
        if (flag < 0.5) {
            list.insert(n.toString(), n);
        } else {
            list.remove(n.toString())
        }
    }

    console.log(map.size)
    map.forEach(function (val, key) {
        console.log(key, val);
    })
    list.forEach(function (val, key) {
        console.log(key, val);
    })

    // console.log("r 2-------------------")
    //
    // list.remove("2")
    //
    // map.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    // list.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    // console.log("add 2-------------------")
    // list.insert("2", 2)
    // map.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    // list.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    // console.log("r 2-------------------")
    // list.remove("2")
    // map.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    // list.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    // console.log("r 1-------------------")
    // list.remove("1")
    // map.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    // list.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    // console.log("r 4-------------------")
    // list.remove("4")
    // map.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    // list.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    // console.log("r 5-------------------")
    // list.remove("5")
    // map.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    // list.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    // console.log("r 3-------------------")
    // list.remove("3")
    // map.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    // list.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    // console.log("add 6-------------------")
    // list.insert("6", 6)
    // map.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    // list.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    //
    // console.log("r 6-------------------")
    // list.remove("6")
    // map.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    // list.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    //
    // console.log("add list-------------------")
    // list.insertList([{key: "1", value: 1}, {key: "2", value: 2}])
    // map.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    // list.forEach(function (val, key) {
    //     console.log(key, val);
    // })
}

linkedListStorage_test();


class TokenStorage extends LinkedListStorage {

    constructor(pk, currency, db) {
        super(pk + ":" + currency, db);
        this.pk = pk;
        this.currency = currency;
    }

    valueOf() {
        return "0";
    }

    findRoots(remain) {
        let that = this;
        let roots = [];
        that.forEach(function (root, value) {
            let amount = new BigNumber(value, 10);
            roots.push(value);
            remain = remain.sub(amount);
            return remain.isNeg() || remain.isZero();
        });
        return {remain: remain, roots: roots};
    }

    delTokenByRoot(root) {
        this.remove(root);
    }

    indexToken(root, amount) {
        let that = this;
        that.insert(root, amount.toString());
        return true;
    }

    indexList(list) {
        super.insertList(list);
    }

    remove(key) {
        let item = super.remove(key);
        if (!item) {
            return;
        }
        let nextKey = item.nextKey;
        while (nextKey) {
            let item = super._del(nextKey);
            nextKey = item.nextKey;
        }
        delete item.nextKey;

        let prevItem = super._get(item.prevKey);
        if (prevItem) {
            delete prevItem.nextKey;
            super._set(item.prevKey, prevItem)
        } else {
            super._set(this.headKey, item.nextKey)
        }

        super._set(this.tailKey, item.prevKey)
    }
}


function tokenStorage_insert_del_test() {
    let map = new Map();
    let list = new TokenStorage("pk", "test", map);

    list.indexToken("1", new BN(1));
    list.indexToken("2", new BN(2));
    list.indexToken("3", new BN(3));
    list.indexToken("4", new BN(4));


    list.indexToken("5", new BN(5));
    list.indexToken("6", new BN(6));

    map.forEach(function (val, key) {
        console.log(key, val);
    })

    list.forEach(function (key, val) {
        console.log(key, val);
    })
    console.log("-------------------")
    list.delTokenByRoot("1");
    map.forEach(function (val, key) {
        console.log(key, val);
    })

    list.forEach(function (key, val) {
        console.log(key, val);
    })
    console.log("-------------------")
    list.delTokenByRoot("4");
    map.forEach(function (val, key) {
        console.log(key, val);
    })

    list.forEach(function (key, val) {
        console.log(key, val);
    })
    console.log("-------------------")
    list.delTokenByRoot("5");
    map.forEach(function (val, key) {
        console.log(key, val);
    })

    list.forEach(function (key, val) {
        console.log(key, val);
    })
    console.log("-------------------")
    list.delTokenByRoot("6");
    map.forEach(function (val, key) {
        console.log(key, val);
    })

    list.forEach(function (key, val) {
        console.log(key, val);
    })
    // let list2 = new TokenStorage("pk", "test", map);
    // list2.forEach(function (key, val) {
    //     console.log(key, val);
    // })
    // list.delTokenByRoot("5");
    // console.log("-------------------")
    // list2.forEach(function (key, val) {
    //     console.log(key, val);
    // })
    // map.forEach(function (val, key) {
    //     console.log(key, val);
    // })
    // list.delTokenByRoot("6");
    // console.log("-------------------")
    // list2.forEach(function (key, val) {
    //     console.log(key, val);
    // })
    // map.forEach(function (val, key) {
    //     console.log(key, val);
    // })
}

// tokenStorage_insert_del_test();


function linkedListStorage_test01() {

    let map = new Map();
    let list = new LinkedListStorage("test", "", map);

    list.insertList([{key: "1", value: 1}, {key: "2", value: 2}, {key: "3", value: 3}, {key: "4", value: 4}, {
        key: "5",
        value: 5
    }])

    map.forEach(function (val, key) {
        console.log(key, val);
    })
    list.forEach(function (val, key) {
        console.log(key, val);
    })
    console.log("-------------------")

    list.remove("2")
    // list.remove("1")
    list.remove("4")
    list.remove("1")
    list.remove("5")
    list.remove("3")


    map.forEach(function (val, key) {
        console.log(key, val);
    })
    list.forEach(function (val, key) {
        console.log(key, val);
    })
}

// linkedListStorage_test01()