var Index = {

    init:function(){
        this.setLang();

        onNetIntent();

    },

    setLang:function(){
        var language = GetQueryString("language");
        if(language && ["zh_CN","en_US","ja_JP","ko_KR","be_BY"].indexOf(language) > -1){
            localStorage.setItem("settings:language",JSON.stringify(language))
            localStorage.setItem("language",JSON.stringify(language))
        }
    }

}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function GetParamsString(args,name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = args.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
var intervalId = null;

function onNetIntent(){
    if(!intervalId){
        var count = 0 ;
        intervalId = setInterval(function () {
            try{
                if(++count >30){
                    clearInterval(intervalId)
                    intervalId=null;
                    return
                }
                if(plus && plus.runtime && plus.runtime.arguments){
                    var args = plus.runtime.arguments;
                    var data = {};
                    if(plus.os.name === 'iOS'){
                        data = genData(args);
                    }else if(plus.os.name === 'Android'){
                        data = JSON.parse(args);
                        if(typeof data==='string'){
                            data = genData(args);
                        }else{
                            data.from = data.payFrom;
                            data.appInf={};
                            data.appInf.pname=data.pName;
                            data.appInf.action=data.pSchema;
                        }
                    }
                    var payInfoCash = JSON.stringify(data);
                    if(data.type && data.type==='thirdpay'){
                        clearInterval(intervalId)
                        intervalId=null;
                        plus.nativeUI.showWaiting("Loading...");
                        localStorage.setItem("seropay:info",payInfoCash)
                        plus.runtime.arguments="";

                        setTimeout(function () {
                            window.location.href="#/thirdpay/"+new Date().getTime();
                        },1000)
                    }
                }
            }catch (e) {
                clearInterval(intervalId)
                console.error(e);
            }
        },1000)
    }
}

function onNetIntentEv() {
    try{
        if(plus && plus.runtime && plus.runtime.arguments){
            var args = plus.runtime.arguments;
            var data = {};
            if(plus.os.name === 'iOS'){
                data = genData(args);
            }else if(plus.os.name === 'Android'){
                data = JSON.parse(args);
                if(typeof data==='string'){
                    data = genData(args);
                }else{
                    data.from = data.payFrom;
                    data.appInf={};
                    data.appInf.pname=data.pName;
                    data.appInf.action=data.pSchema;
                }
            }

            if(data.type && data.type==='thirdpay'){
                var payInfoCash = JSON.stringify(data);
                plus.
                nativeUI.showWaiting("Loading...");
                localStorage.setItem("seropay:info",payInfoCash);
                plus.runtime.arguments="";
                setTimeout(function () {
                    window.location.href="#/thirdpay/"+new Date().getTime();
                },1000)
            }
        }
    }catch (e) {
        console.error(e);
    }

}

function genData(args){
    var data = {};
    var schema = "seropopup://";
    if(args && args.indexOf(schema)){
        args = args.substring(schema.length);
        data.type=GetParamsString(args,"type");
        data.from=GetParamsString(args,"payFrom");
        data.to=GetParamsString(args,"to");
        data.value=GetParamsString(args,"value");
        data.cy=GetParamsString(args,"cy");
        data.gas=GetParamsString(args,"gas");
        data.gasPrice=GetParamsString(args,"gasPrice");
        data.data=GetParamsString(args,"data");
        data.catg=GetParamsString(args,"catg");
        data.tkt=GetParamsString(args,"tkt");
        data.gasCy=GetParamsString(args,"gasCy");
        data.feeValue=GetParamsString(args,"feeValue");

        data.appInf={};
        data.appInf.pname=GetParamsString(args,"pName");
        data.appInf.action=GetParamsString(args,"pSchema");
    }
    return data;
}