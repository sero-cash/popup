import React ,{Component} from 'react'
import {Icon, NavBar,Toast} from "antd-mobile";
import {storage, url} from "../../config/common";
import {validPkr} from "jsuperzk/dist/wallet/wallet"

window.barcode = null;
var scanType;
var cy = "SERO";

function onmarked(type, result) {
    window.barcode.close();
    if(result.indexOf("http")===0){
        url.goPage(url.browser(result))
    }else{
        if(scanType === "transfer"){
            if(validPkr(result)){
                url.goPage(url.transfer(cy+"/"+result))
            }else{
                try{
                    const data = JSON.parse(result);
                    if(typeof data === 'object'){
                        data.from=data.payFrom;
                        storage.set("seropay:info",data);
                        setTimeout(function () {
                            url.goPage(url.ThirdPay+"/"+new Date().getTime());
                        },1000)
                    }
                }catch (e) {
                    Toast.fail(e.message,3)
                }
            }
        }else if(scanType === "address"){
            url.goPage(url.AddressAdd+"/"+result)
        }else if(scanType === "browser"){
            url.goPage(url.browser(result))
        }
    }
}

function createBarcode() {
    if(plus&&plus.barcode){
        window.barcode = plus.barcode.create('barcode', [plus.barcode.QR], {
            top:45,
            width: '100%',
            height: document.documentElement.clientHeight-45,
            position: 'static',
            frameColor:"#4bbd2c",
            scanbarColor:"#4bbd2c",
        });
        window.barcode.onmarked = onmarked;
        plus.webview.currentWebview().append(window.barcode);
    }
    window.barcode.start();
}

class Scanner extends Component{

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        createBarcode();

        scanType = this.props.match.params.type;
        if(this.props.match.params.cy){
            cy = this.props.match.params.cy;
        }
    }

    render() {
        return <div>
            <NavBar
                mode="light"
                style={{background:"#f7f7f7"}}
                leftContent={<Icon type="left"/>}
                onLeftClick={()=>{
                    window.barcode.close();
                    url.goBack()
                }}
            >
                Scanner
            </NavBar>
        </div>
    }

}

export default Scanner