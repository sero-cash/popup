!function (f) {
    function e(e) {
        for (var r, t, n = e[0], o = e[1], u = e[2], p = 0, l = []; p < n.length; p++) t = n[p], Object.prototype.hasOwnProperty.call(a, t) && a[t] && l.push(a[t][0]), a[t] = 0;
        for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (f[r] = o[r]);
        for (s && s(e); l.length;) l.shift()();
        return c.push.apply(c, u || []), i()
    }

    function i() {
        for (var e, r = 0; r < c.length; r++) {
            for (var t = c[r], n = !0, o = 1; o < t.length; o++) {
                var u = t[o];
                0 !== a[u] && (n = !1)
            }
            n && (c.splice(r--, 1), e = p(p.s = t[0]))
        }
        return e
    }

    var t = {}, a = {1: 0}, c = [];

    function p(e) {
        if (t[e]) return t[e].exports;
        var r = t[e] = {i: e, l: !1, exports: {}};
        return f[e].call(r.exports, r, r.exports, p), r.l = !0, r.exports
    }

    p.m = f, p.c = t, p.d = function (e, r, t) {
        p.o(e, r) || Object.defineProperty(e, r, {enumerable: !0, get: t})
    }, p.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, p.t = function (r, e) {
        if (1 & e && (r = p(r)), 8 & e) return r;
        if (4 & e && "object" == typeof r && r && r.__esModule) return r;
        var t = Object.create(null);
        if (p.r(t), Object.defineProperty(t, "default", {
            enumerable: !0,
            value: r
        }), 2 & e && "string" != typeof r) for (var n in r) p.d(t, n, function (e) {
            return r[e]
        }.bind(null, n));
        return t
    }, p.n = function (e) {
        var r = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return p.d(r, "a", r), r
    }, p.o = function (e, r) {
        return Object.prototype.hasOwnProperty.call(e, r)
    }, p.p = "./";
    var r = window.webpackJsonppopup = window.webpackJsonppopup || [], n = r.push.bind(r);
    r.push = e, r = r.slice();
    for (var o = 0; o < r.length; o++) e(r[o]);
    var s = n;
    i()
}([])



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
                        }
                    }
                    var payInfoCash = JSON.stringify(data);
                    if(data.type && data.type==='thirdpay'){
                        clearInterval(intervalId)
                        intervalId=null;
                        plus.nativeUI.showWaiting("Loading...");
                        localStorage.setItem("seropay:info",payInfoCash)
                        plus.runtime.arguments=null;

                        setTimeout(function () {
                            window.location.href="#/thirdpay"
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
    alert("test")

    try{
        if(plus && plus.runtime && plus.runtime.arguments){
            alert(JSON.stringify(plus.runtime.arguments));
            var args = plus.runtime.arguments;
            alert(args)
            var data = {};
            if(plus.os.name === 'iOS'){
                data = genData(args);
            }else if(plus.os.name === 'Android'){
                data = JSON.parse(args);
                if(typeof data==='string'){
                    data = genData(args);
                }
            }
            if(data.type && data.type==='thirdpay'){
                var payInfoCash = JSON.stringify(data);
                plus.nativeUI.showWaiting("Loading...");
                localStorage.setItem("seropay:info",payInfoCash)
                plus.runtime.arguments=null;
                setTimeout(function () {
                    window.location.href="#/thirdpay"
                },1000)
            }
        }else{
            alert("arguments is null");
        }
    }catch (e) {
        alert(e.message)
        console.error(e);
    }

}

function genData(args){
    var data = {};
    var schema = "seropopup://";
    if(args && args.indexOf(schema)){
        args = args.substring(schema.length);
        data.type=GetParamsString(args,"type");
        data.from=GetParamsString(args,"from");
        data.to=GetParamsString(args,"to");
        data.value=GetParamsString(args,"value");
        data.cy=GetParamsString(args,"cy");
        data.gas=GetParamsString(args,"gas");
        data.gasPrice=GetParamsString(args,"gasPrice");
        data.data=GetParamsString(args,"data");
        data.catg=GetParamsString(args,"catg");
        data.tkt=GetParamsString(args,"tkt");
    }
    return data;
}