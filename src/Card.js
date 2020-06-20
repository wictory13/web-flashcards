import React from 'react';
import './Card.css'


class Card extends React.Component {
    constructor(props){
        super(props);
    }
//удаление карточки оповистить коллекцию
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
            return <div className="card" >
                <div className="uk-panel-box ">
                {curWord}
                <img src={this.props.curCard.img} height={150} alt={this.props.curCard.transaction}/>
                <div className="bottom-panel-actions">
                        <div id="speechBtn" className="bottom-panel-button" data-uk-button-checkbox
                             data-uk-tooltip="{pos:'bottom'}" >
                            <button id="btnVoice" className="uk-button uk-width-1-1"
                                    onClick={this.props.changeLanguage}>Перевернуть карточку
                            </button>
                        </div>
                        <div id="speechBtn" className="bottom-panel-button" data-uk-button-checkbox
                             data-uk-tooltip="{pos:'bottom'}" >
                            <button id="btnVoice" className="uk-button uk-width-1-1"
                                    onClick={this.deleteCurCard}> Удалить карточку
                            </button>
                        </div>
                </div>
            </div>
            </div>
        }
        return (<div className="card">
            {curWord}
        </div>)

    }

}

export default Card;
