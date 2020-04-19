import React from 'react';
import './Card.css'


class Card extends React.Component {
    render() {
        //let words = [['Привет', 'Кот'],['Hi','Cat']];
        let props = this.props;
        return <div className="card" onClick={function (){props.changeCurCell(props.number)}}>
            {props.words[props.type][props.number]}
        </div>
    }

}

export default Card;