class LinkedListStorage {

    constructor(prefix, key, db) {
        this.db = db;
        this.prefix = prefix;
        this.headKey = this.genKey(key + ":headkey");
        this.tailKey = this.genKey(key + ":tailKey");
    }

    genKey(key) {
        return this.prefix + ":" + key;
    }

    forEach(func) {
        let key = this.db.get(this.tailKey);
        if (!key) {
            return;
        }
        while (true) {
            let item = this.db.get(key);
            if (!item) {
                return
            }

            if (func(item.value, key.substring(key.lastIndexOf(":") + 1))) {
                break;
            }
            if (!item.prevKey) {
                break;
            }
            key = item.prevKey;
        }
    }

    insert(key, value) {
        key = this.genKey(key);
        let item = this.db.get(key)
        if (item) {
            item.value = value;
            this.db.set(key, item);
            return;
        } else {
            item = {value: value};
        }

        let headItemKey = this.db.get(this.headKey);
        if (!headItemKey) {
            this.db.set(this.tailKey, key);
        } else {
            item.nextKey = headItemKey;
            let nextItem = this.db.get(item.nextKey);
            nextItem.prevKey = key;
            this.db.set(item.nextKey, nextItem);
        }
        this.db.set(this.headKey, key);
        this.db.set(key, item);
    }

    insertList(list) {
        let that = this;
        list.forEach(function (item, index) {
            that.insert(item.key, item.value);
        });


        // if (!list || list.length == 0) {
        //     return;
        // }
        // if (list.length == 1) {
        //     this.insert(list[0].key, list[0].value);
        // } else {
        //     const items = [];
        //     const len = list.length;
        //
        //     for (var i = 0; i < len; i++) {
        //         if (i != 0) {
        //             list[i].prevKey = this.genKey(list[i - 1].key);
        //         }
        //
        //         if (i != len - 1) {
        //             list[i].nextKey = this.genKey(list[i + 1].key);
        //         } else {
        //             const headItemKey = this.db.get(this.headKey);
        //             if (!headItemKey) {
        //                 this.db.set(this.tailKey, this.genKey(list[i].key));
        //             } else {
        //                 list[i].nextKey = headItemKey;
        //                 let nextItem = this._get(headItemKey);
        //                 nextItem.prevKey = this.genKey(list[i].key);
        //                 this._set(headItemKey, nextItem);
        //             }
        //         }
        //     }
        //
        //     this._set(this.headKey, this.genKey(list[0].key));
        //     for (var i = len - 1; i >= 0; i--) {
        //         let key = this.genKey(list[i].key);
        //         delete list[i].key;
        //         this._set(key, list[i]);
        //     }
        // }
    }

    remove(key) {
        key = this.genKey(key);
        let item = this._del(key);
        if (!item) {
            // if (key.indexOf("NIL") != -1) {
            //     throw new Error("remove error key:" + key);
            // }
            console.log("remove error key:" + key)
            return;
        }

        let prevItem = this._get(item.prevKey);
        let nextItem = this._get(item.nextKey);
        if (!prevItem) {
            this._set(this.headKey, item.nextKey);
        } else {
            prevItem.nextKey = item.nextKey;
            this._set(item.prevKey, prevItem);
        }
        if (!nextItem) {
            this._set(this.tailKey, item.prevKey);
        } else {
            nextItem.prevKey = item.prevKey;
            this._set(item.nextKey, nextItem);
        }
        return item;
    }

    _get(key) {
        if (!key) {
            return;
        }
        return this.db.get(key);
    }

    _set(key, val) {
        if (!key) {
            return;
        }
        if (!val) {
            this.db.delete(key);
        } else {
            this.db.set(key, val);
        }
    }

    _del(key) {
        if (!key) {
            return;
        }
        let item = this.db.get(key);
        this.db.delete(key);
        return item;
    }

    get(key) {
        if (!key) {
            return;
        }
        key = this.genKey(key);
        let val = this.db.get(key);
        if (val) {
            return val.value;
        }
    }

    // del(key) {
    //     if (!key) {
    //         return;
    //     }
    //     key = this.genKey(key);
    //     let item = this.name.get(key);
    //     this.name.delete(key);
    //     return item;
    // }
}

// module.exports = {LinkedListStorage}
export {LinkedListStorage}