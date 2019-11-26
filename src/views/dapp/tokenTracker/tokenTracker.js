import React,{Component} from 'react'
import {Button, Card, List} from 'antd-mobile'

const Item = List.Item;

class TokenTracker extends Component{

    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        const data = new Array(9).map((value, index) => {
            return <div key={index}>
                <Card full>

                    <Card.Header title="AAA"
                    />
                    <Card.Body>
                        <List>
                            <Item extra={<span>AAAA</span>}>Name</Item>
                            <Item extra={<span>AAAA</span>}>Symbol</Item>
                            <Item extra={<span>18</span>}>Decimals</Item>
                            <Item extra={<span>1000.00</span>}>Total Supply</Item>
                            <Item extra={<span>1000.00</span>}>Balance</Item>
                            <Item extra={<span>1000.00</span>}>Amount(SERO)</Item>
                        </List>
                    </Card.Body>
                    <Card.Footer>
                        <Button>Transfer</Button>
                    </Card.Footer>
                </Card>
            </div>
        })
        return <div>
            {data}
        </div>
    }

}

export default TokenTracker