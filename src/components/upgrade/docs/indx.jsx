import {config} from "../../../config/common";

class Docs {

    version = "1.0.0"
    remoteVersion = "1.0.0"
    timerId = null

    remoteUrl = "http://popup-github.sero.cash/version.json"

    constructor() {

    }

    init(){
        if (config.isZH()){

        }
    }


    startCheck(){
        console.log("start version check timer")
        if(!this.timerId){
            this.timerId = setInterval(function () {

            },10*1000)
        }
    }

}

export default Docs