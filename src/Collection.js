import React, { Component } from "react";
import {Redirect} from 'react-router';
import Card from "./Card";

class Collection extends Component {
    constructor(props){
        super(props);
        this.idCollection = this.props.id;
        this.state={
            name: this.props.name,
            describe: this.props.describe,
            isCheck: false,
            isShow: false,
        }
    }


    render() {
        if (isCheck){
            return (<Redirect to={{
                pathname: '/check',
                state: { idCollection: this.idCollection}
            }}
            />)
        }

        if (isShow){
            return (<Redirect to={{
                pathname: '/show',
                state: { idCollection: this.idCollection}
            }}
            />)
        }
        return (
            <div>
                <div>
                    <h2>{this.state.name}</h2>
                    <p>{this.state.describe}</p>
                </div>
                <button onClick={() => this.setState({isShow: true})}>Посмотреть коллекцию</button>
                <button onClick={() => this.setState({isCheck:true})}>Проверить себя</button>
            </div>

        )
    }
}

export default Collection;