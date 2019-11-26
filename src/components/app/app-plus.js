import Key from "./key";
import Sqlite from "./sqlite";

const key = new Key();

class AppPlus {

    constructor() {
        this.key = key;
        this.db = new Sqlite();
        this.intervalId = null;
        this.interCount = 0;
    }

    init() {
        this._initPlus();
    }

    _init() {
        this.key.eventListener();

        this.db = new Sqlite();
        this.db.initDatabase();
    }

    _initPlus() {
        let that = this;
        that.intervalId = setInterval(function () {
            if (this.interCount > 10) {
                clearInterval(that.intervalId)
            }
            if (plus) {
                clearInterval(that.intervalId);
                that._init();
            }
            this.interCount++;
        }, 1000);
    }

}

const appPlus = new AppPlus();

export {appPlus}