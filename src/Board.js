import React, {Component} from 'react';

import './Board.css'
import Card from "./Card";
class Board extends React.Component {

    score = 0;

    constructor(props){
        super(props);
    }

    state ={
        gameEnd:false,
        newTurn:true,
    };
    changeCurCell = (i) => {
        this.score += 3;
        return   <Card type={0} number={1} changeCurCell={this.changeCurCell} words ={[['Привет', 'Кот'],['Hi','Cat']]}/>

    };

    render() {
        if (this.state.newTurn){

            this.setState({
                newTurn: false
            });
        }
        let number = 1;
        let type = 0;
        return (
            <span>
                <div>
                    <p>Score:  {this.score} </p>
                    <ul className="Board">
                         <Card type={type} number={number} changeCurCell={this.changeCurCell} words ={[['Привет', 'Кот'],['Hi','Cat']]}/>
                    </ul>
                </div>
                <p>Rule: train your memory

                </p>
            </span>
        )
    };

}

export default Board;
