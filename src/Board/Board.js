import React from 'react';
import './Board.css'
import Card from "../Card/Card";
class Board extends React.Component {

    constructor(props){
        super(props);
        this.newTurn = true;
        this.state ={
            gameEnd:false,
            score: 0,
        };
    }

    changeCurCell = (i) => {
        this.setState({score: this.state.score + 3});
    };

    render() {
        if (this.newTurn)
            this.newTurn = false;
        let number = 1;
        let type = 0;
        return (
            <span>
                <div>
                    <p>Score:  {this.state.score} </p>
                    <ul className="Board">
                         <Card type={type} number={number} changeCurCell={this.changeCurCell} words ={[['Привет', 'Кот'],['Hi','Cat']]}/>
                    </ul>
                </div>
                <p>
                    Rule: train your memory
                </p>
            </span>
        )
    };

}

export default Board;
