var Index = {

    init:function(){
        this.setLang();

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