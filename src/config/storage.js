class Storage {

    constructor() {

    }

    /**
     * Empties the list associated with the object of all key/value pairs, if there are any.
     */
    clear() {
        this._clear();
        this._clearPlus();
    }

    _clear() {
        window.localStorage.clear();
    }

    _clearPlus() {
        try{
            if (plus && plus.storage) {
                plus.storage.clear();
            }
        }catch (e) {
            console.log(e.message);
        }
    }

    /**
     * value = storage[key]
     */
    get(key) {
        var ls =  this._get(key)
        var ps =  this._getPlus(key)
        return ls===0?ls:ls||ps;
    }

    _get(k) {
        var jsonStr = window.localStorage.getItem(k);
        return jsonStr||jsonStr==="0" ? JSON.parse(jsonStr) : null;
    }

    _getPlus(k) {
       try{
           if(plus && plus.storage){
               var jsonStr = plus.storage.getItem(k);
               return jsonStr||jsonStr==="0" ? JSON.parse(jsonStr) : null;
           }else{
               return null;
           }
       }catch (e) {
           console.log(e.message);
       }
    }

    /**
     * Returns the name of the nth key in the list, or null if n is greater
     * than or equal to the number of key/value pairs in the object.
     */
    key(index) {
        return this._key(index) || this._keyPlus(index)
    }

    _key(index) {
        return window.localStorage.key(index);
    }

    _keyPlus(index) {
        try{
            if (plus && plus.storage) {
                return plus.storage.key(index);
            }
        }catch (e) {
            console.log(e.message);
        }
    }


    delete(key) {
        this._delete(key);
        this._deletePlus(key);
    }

    _delete(key) {
        window.localStorage.removeItem(key);
    }

    _deletePlus(key) {
        try{
            if (plus && plus.storage) {
                plus.storage.removeItem(key);
            }
        }catch (e) {
            console.log(e.message);
        }
    }


    /**
     * storage[key] = value
     */
    set(k, value) {
        try {
            this._set(k,value)
        } catch (e) {
            window.localStorage.removeItem(k);
            this._setPlus(k,value);
        }

    }

    _set(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value))
    }

    _setPlus(key, value) {
        try{
            if (plus && plus.storage) {
                plus.storage.setItem(key, JSON.stringify(value))
            }
        }catch (e) {
            console.log(e.message);
        }
    }

    /**
     * value = storage[key]
     */
    has(key) {
        return this._has(key) || this._hasPlus(key)
    }

    _has(key) {
        let data = window.localStorage.getItem(key);
        return !!data;
    }

    _hasPlus(key) {
        try{
            if (plus && plus.storage) {
                let data = plus.storage.getItem(key);
                return !!data;
            }
        }catch (e) {
            consol
        }
    }


    length() {
        return this._length() || this._lengthPlus();
    }

    _length() {
        return window.localStorage.length;
    }

    _lengthPlus() {
        if (plus && plus.storage) {
            return plus.storage.getLength();
        }
    }
}

export default Storage