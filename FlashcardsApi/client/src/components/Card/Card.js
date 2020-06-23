import React from 'react';
import './Card.css'
import cookie from "react-cookies";


class Card extends React.Component {
    constructor(props){
        super(props);
    }

    deleteCurCard = async () =>{
      const response = await fetch('https://localhost:44351/api/cards/delete',{
          method: 'DELETE',
          headers: {
              'Authorization': 'Bearer ' + cookie.load('token'),
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.props.curCard.id)
      });

      if (response&& response.ok)
          this.props.deleteCard(this.props.curCard.id);
    };

    getCardForShow = () =>{
        return(
            <div className="card" >
                <div className="uk-panel-box ">
                    <div>
                        <h4>{this.props.curCard.word}</h4>
                        <h4>{this.props.curCard.translation}</h4>
                    </div>
                    <img src={this.props.curCard.img} height={150} alt={this.props.curCard.translation}/>
                    <div className="bottom-panel-actions">
                        <div id="speechBtn" className="bottom-panel-button"  >
                            <button id="btnVoice" className="uk-button uk-width-1-1" onClick={this.deleteCurCard}>
                                Удалить карточку
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        if (this.props.isShow )
            return this.getCardForShow();
        return(
            <div className="card" >
                <div className="uk-panel-box check">
                    <h4>{this.props.isCheck ? this.props.curCard.translation : this.props.curCard.word}</h4>
                </div>
            </div>
        )
    }

}

export default Card;
