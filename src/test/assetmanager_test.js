// const {AccountsAssetManager, AccountAssetManager, TokenStorage, LinkedListStorage} = require("../components/assetmanager");
const BigNumber = require('bn.js');


class Test {
    constructor(name, db) {
        this.name = name;
        this.db = db;
    }

    valueOf() {
        return [this.name];
    }

    println() {
        console.log(this.name);
    }
}


//
//
// function tokenStorage_insert_del_test() {
//     let map = new Map();
//     let list = new TokenStorage("pk", "test", map);
//
//     list.indexToken("1", new BigNumber(1));
//     list.indexToken("2", new BigNumber(2));
//     list.indexToken("3", new BigNumber(3));
//     list.indexToken("4", new BigNumber(4));
//
//
//     list.indexToken("5", new BigNumber(5));
//     list.indexToken("6", new BigNumber(6));
//
//
//     let list2 = new TokenStorage("pk", "test", map);
//     list2.forEach(function (key, val) {
//         console.log(key, val);
//     })
//     list.delTokenByRoot("5");
//     console.log("-------------------")
//     list2.forEach(function (key, val) {
//         console.log(key, val);
//     })
//     map.forEach(function (val, key) {
//         console.log(key, val);
//     })
//     list.delTokenByRoot("6");
//     console.log("-------------------")
//     list2.forEach(function (key, val) {
//         console.log(key, val);
//     })
//     map.forEach(function (val, key) {
//         console.log(key, val);
//     })
// }
//
// function tokenStorage_findroots_test() {
//     let map = new Map();
//     let list = new TokenStorage("pk", "test", map);
//
//     list.indexToken("1", new BigNumber(1));
//     list.indexToken("2", new BigNumber(2));
//     list.indexToken("3", new BigNumber(3));
//     list.indexToken("4", new BigNumber(4));
//
//
//     let ret = list.findRoots(new BigNumber(5));
//     console.log(ret);
// }
//
//
// function map_test() {
//     let map = new Map();
//     let smap = new StorageMap(function (args) {
//         return new Test(args[0], map);
//     }, "ss", map);
//
//     smap.insert("1", new Test("test1"));
//     smap.insert("2", new Test("test2"));
//     smap.insert("3", new Test("test3"));
//
//     map.forEach(function (each, key) {
//         console.log(key, each);
//     });
//
//     smap.forEach(function (each, key) {
//         console.log(key, each.name);
//     });
//     smap.remove("1");
//
//     map.forEach(function (each, key) {
//         console.log(key, each);
//     });
//     smap.forEach(function (each, key) {
//         console.log(key, each.name);
//     });
//
// }
//
//
// function accountAssetManager_test() {
//     const stringJson = `[{
// 	"Root": "0x444784e485e02047d6e811c8a2d3087a78a78f65a9467e420c6e228dac376b9d",
// 	"Asset": {
// 		"Tkn": {"Currency":"SERO", "Value":100000},
// 		"Tkt": {
// 		    "Category":"0xe8d7c865bfab470c8b9937706e2a221b0114ed2176371f86161fb092d4a169c0",
// 		    "Value":"0x3a1f112eb8ce9eed9c2cc045d39c0f396ec295eaab231024e51e1a18dbc5c96b"
// 		}
// 	},
// 	"Nils": ["0x4202a3a85705efb7a4a66279d9aa983bedcb76935f63827c2155d7078ba70255"]
//   }]`
//
//     const utxos = JSON.parse(stringJson);
//
//     const tk = 'GwA94QDTyQ86cE5jcuYCyrQ9Bu9FRcXfq4dxQhryTDzgFgu62LJQ8f73ApEz4Zwm4zFfDAwUB22sEmQQ1AguYXn';
//     const pk = account.tkToPk(tk);
//
//     let map = new Map();
//
//     let manager = new AccountAssetManager(tk, map);
//
//     manager.indexUtxos({utxos: utxos, lastBlockNumber: 1});
//     map.forEach(function (val, key) {
//         console.log(key, val);
//     })
// }

// linkedListStorage_test();
// tokenStorage_insert_del_test();
// tokenStorage_findroots_test()

// map_test();
accountAssetManager_test();