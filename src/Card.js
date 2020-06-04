import React from 'react';
import './Card.css'


class Card extends React.Component {
    constructor(props){
        super(props);
    }

    deleteCurCard = (_) =>{
      fetch('api/cards/delete',{
          method: 'DELETE',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({id:this.props.curCard.id})
      })
    };

    render() {
        const curWord = <h4>{this.props.word}</h4>;
        if (this.props.isShow ) {
            return <div className="card">
                {curWord}
                <img src={this.props.curCard.img} height={150} alt={this.props.curCard.transaction}/>
                <button onClick={this.props.changeLanguage}>Перевернуть карточку</button>
                <button onClick={this.deleteCurCard}> Удалить карточку</button>
            </div>
        }
        return (<div className="card">
            {curWord}
        </div>)

    }

}

export default Card;
