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
            try{
                if (plus) {
                    clearInterval(that.intervalId);
                    that._init();
                }
            }catch (e) {
                console.error(e);
                clearInterval(that.intervalId);
            }
            this.interCount++;
        }, 1000);
    }

    get(url, cb) {
        if (plus && plus.net) {
            const xhr = new plus.net.XMLHttpRequest();
            xhr.onreadystatechange = function () {
                switch (xhr.readyState) {
                    case 0:
                        console.log("xhr请求已初始化");
                        break;
                    case 1:
                        console.log("xhr请求已打开");
                        break;
                    case 2:
                        console.log("xhr请求已发送");
                        break;
                    case 3:
                        console.log("xhr请求已响应");
                        break;
                    case 4:
                        if (xhr.status === 200) {
                            cb(xhr.responseText, null)
                            // alert( "xhr请求成功："+xhr.responseText );
                        } else {
                            // alert( "xhr请求失败："+xhr.readyState );
                            cb(null, xhr.readyState)
                        }
                        break;
                    default :
                        break;
                }
            }
            xhr.open("GET", url);
            xhr.send();
        }
    }

}

const appPlus = new AppPlus();

export {appPlus}