import React from "react";
import {Link} from "react-router-dom";
import './Collection.css'
import '../Card/Card.css'
import cookie from "react-cookies"; //вот здесь меня смущает

class Collection extends React.Component{
    constructor(props){
        super(props);
    }

    onDelete = async() => {
        const response = await fetch('/api/collections/delete',{
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + cookie.load('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.props.id)
        })
        if (response&& response.ok)
            this.props.deleteCollection(this.props.id)
    }

    render() {
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
                    </div>
                </div>
            </div>

        )
    }
}


export default Collection;
