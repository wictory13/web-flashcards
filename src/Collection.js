import React from "react";
import {Link} from "react-router-dom";
import './Collection.css'
import './Card.css'

const Collection = (props) =>{
        return (
            <div className="collection">
                <div className="box ">
                <div>
                    <h2>{props.name}</h2>
                    <h>{`Количество карточек в коллекции ${props.count}`}</h>
                </div>
                    <div className="bottom-panel-actions">
                        <div id="speechBtn" className="bottom-panel-button home-card" data-uk-button-checkbox
                             data-uk-tooltip="{pos:'bottom'}" >
                            <Link id="btnVoice" className="uk-button uk-width-1-1"
                                  to={`/show/${props.id}/${props.name}/${props.count}`}>Посмотреть коллекцию
                            </Link>
                        </div>
                        <div id="speechBtn" className="bottom-panel-button home-card" data-uk-button-checkbox
                             data-uk-tooltip="{pos:'bottom'}" >
                            <Link id="btnVoice" className="uk-button uk-width-1-1"
                                  to={`/check/${props.id}/${props.name}/${props.count}`}>Проверить себя
                            </Link>
                        </div>
                        <div id="speechBtn" className="bottom-panel-button home-card" data-uk-button-checkbox
                             data-uk-tooltip="{pos:'bottom'}" >
                            <button id="btnVoice" className="uk-button uk-width-1-1">
                                Удалить коллекцию
                            </button>
                        </div>
                    </div>
            </div>
            </div>

        )
}

export default Collection;
