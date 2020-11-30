import {lang, url} from "../../config/common";
import {Toast} from "antd-mobile";

class Key {

    constructor() {
        this.KeyType = {
            backbutton:"backbutton",
        }
    }

    eventListener(){
        if(plus && plus.key){
            plus.key.addEventListener(this.KeyType.backbutton,function(){
                if(window.barcode){
                    window.barcode.close();
                    window.barcode = null;
                }
                let a = window.location.href;
                let lastBackTime = window.lastBackTime;

                if(a.substring(a.length-2)==="#/"){
                    if( plus && plus.runtime){
                        let now = new Date();
                        if(lastBackTime && (now - lastBackTime <= 2000)){
                            plus.runtime.quit();
                        }else{
                            window.lastBackTime = new Date();
                            Toast.info(lang.e().toast.info.quitApp,2)
                        }
                    }
                }else{
                    url.goBack();
                }
            });
            console.log("plus.key.addEventListener success");
        }
    }
}

export default Key