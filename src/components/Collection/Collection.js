import React from "react";
import {Link} from "react-router-dom";
import './Collection.css'
import '../Card/Card.css'
import cookie from "react-cookies"; //вот здесь меня смущает

const namesForm = ['word','translation','img'];

class Collection extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isCreateCard: false,
        }
    }

    getDataForm(e){
        const cur_data = {'collectionId': this.props.id};
        for (const name of namesForm)
            cur_data[name] = e.target[name].value
        return cur_data
    }

    onDelete = async() => {
        const response = await fetch('https://localhost:44351/api/collections/delete',{
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + cookie.load('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.props.id)
        });

        if (response&& response.ok)
            this.props.deleteCollection(this.props.id);
    }

    onCreateCard = () => this.setState({isCreateCard: true});

    CreateCard = async () => {
        const response = await fetch('https://localhost:44351/api/cards/create',{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + cookie.load('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.getDataForm())
        });
        if (response && response.ok)
            this.setState({isCreateCard: false});
    }

    getCreateCard(){
        return(
            <div>
                <form onSubmit={this.CreateCard}>
                    <input className="input" type='text' name='word' placeholder='Enter your word' defaultValue='cat'/>
                    <input  className="input" type='text' name='translation' placeholder='Enter your translation' defaultValue='кошка'/>
                    <input  className="input" type='text' name='img' placeholder='Enter your ref on img' defaultValue='https://ichef.bbci.co.uk/news/320/cpsprodpb/582E/production/_109447522_catsmaincoonunfriendly.jpg'/>
                    <button>
                        Создать карточку
                    </button>
                </form>
                <button onClick={() => this.setState({isCreateCard: false})}> Отмена </button>
            </div>
        )
    }

    getCollection(){
        return (
            <div className="collection">
                <div className="box ">
                    <div>
                        <h2>{this.props.name}</h2>
                    </div>
                    <div className="bottom-panel-actions home-panel">
                        <div id="speechBtn" className="bottom-panel-button home-card" data-uk-button-checkbox
                             data-uk-tooltip="{pos:'bottom'}" >
                            <Link id="btnVoice" className="uk-button uk-width-1-1"
                                  to={`/show/${this.props.id}/${this.props.name}`}>Посмотреть коллекцию
                            </Link>
                        </div>
                        <div id="speechBtn" className="bottom-panel-button home-card" data-uk-button-checkbox
                             data-uk-tooltip="{pos:'bottom'}" >
                            <Link id="btnVoice" className="uk-button uk-width-1-1"
                                  to={`/check/${this.props.id}/${this.props.name}`}>Проверить себя
                            </Link>
                        </div>
                        <div id="speechBtn" className="bottom-panel-button home-card" data-uk-button-checkbox
                             data-uk-tooltip="{pos:'bottom'}" >
                            <button id="btnVoice" className="uk-button uk-width-1-1" onClick={this.onDelete}>
                                Удалить коллекцию
                            </button>
                        </div>
                        <div id="speechBtn" className="bottom-panel-button home-card" data-uk-button-checkbox
                             data-uk-tooltip="{pos:'bottom'}" >
                            <button id="btnVoice" className="uk-button uk-width-1-1" onClick={this.onCreateCard}>
                                Добавить карточку в коллекцию
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return this.getCollection();
    }
}


export default Collection;
