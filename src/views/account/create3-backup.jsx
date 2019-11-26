import React, {Component} from 'react'
import {NavBar, Icon, WhiteSpace, WingBlank,Button,Tag} from 'antd-mobile'
import './create.css'
import {storage, keys, config, url, baseDecimal, lang} from "../../config/common";

class AccountCreateStep3 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            wordTag:''
        }
    }

    next = ()=>{
        url.goPage(url.AccountCreate4,url.AccountCreate3)
    }

    componentDidMount() {
        let word = sessionStorage.getItem("worddata");
        if(!word){
            url.goPage(url.Home)
            return
        }
        let wordArray = word.split(" ");
        let tags =[];
        let i=0;
        for(let w of wordArray){
            tags.push(<Tag className="customer-tag" key={i++}>{w}</Tag>);
        }
        this.setState({
            wordTag:tags,
        })
    }

    render() {

        return <div style={{background:"#f7f7f7",height:document.documentElement.clientHeight}}>
            <NavBar
                mode="light"
                icon={<Icon type="left"/>}
                onLeftClick={() => {
                   url.goBack()
                }}
            />
            <WingBlank size="lg">
                <div style={{textAlign: "center"}}>
                    <Icon type="iconbiji" size="lg" color="gray"/>
                    <h2>{lang.e().page.create.step3.title}</h2>
                    <p style={{color:'gray'}}>{lang.e().page.create.step3.h1}</p>
                </div>
                <WhiteSpace size="lg"/>
                <div className="tag-div">
                    {this.state.wordTag}
                </div>
            </WingBlank>
            <div className="btn-bottom">
                <Button type="primary"  onClick={this.next} >{lang.e().button.next}</Button>
            </div>
        </div>
    }
}

export default AccountCreateStep3