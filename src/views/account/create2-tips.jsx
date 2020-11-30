import React, {Component} from 'react'
import {NavBar, Icon, WhiteSpace, WingBlank,Button} from 'antd-mobile'
import './create.css'
import {storage, keys, config, url, baseDecimal, lang} from "../../config/common";

class AccountCreateStep3 extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        let that = this;
        let word = sessionStorage.getItem("worddata");
        if(!word){
            url.goPage(url.Home)
            return
        }

    }

    next = ()=>{
        url.goPage(url.AccountCreate3,url.AccountCreate2);
    }

    render() {

        return <div style={{background:"#f7f7f7",minHeight:document.documentElement.clientHeight}}>
            <NavBar
                mode="light"
                icon={<Icon type="left"/>}
                onLeftClick={() => {
                    url.goBack()
                }}
            />
            <div style={{background:"#f7f7f7"}}>
                <WingBlank size="lg" >
                    <WhiteSpace size="lg"/>
                    <div style={{textAlign: "center"}}>
                        <h2>{lang.e().page.create.step2.title}</h2>
                        <p style={{color:'gray'}}>{lang.e().page.create.step2.d1}</p>
                    </div>
                    <WhiteSpace size="lg"/>
                    <div>
                        <ul>
                            <li><h3>{lang.e().page.create.step2.d2}</h3></li>
                            <li style={{listStyleType:'none'}}><p style={{color:'gray'}}>{lang.e().page.create.step2.d3}</p></li>
                            <li><h3>{lang.e().page.create.step2.d4}</h3></li>
                            <li style={{listStyleType:'none'}}><p style={{color:'gray'}}>
                                {lang.e().page.create.step2.d5}
                            </p>
                            </li>
                            <li><h3>{lang.e().page.create.step2.d6}</h3></li>
                            <li style={{listStyleType:'none'}}><p style={{color:'gray'}}>
                                {lang.e().page.create.step2.d7}
                            </p>
                            </li>
                        </ul>
                    </div>
                </WingBlank>
            </div>

            <div className="btn-bottom">
                <Button type="primary"  onClick={this.next} >{lang.e().button.next}</Button>
            </div>
        </div>
    }
}

export default AccountCreateStep3