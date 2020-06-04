import React from "react";
import {Link} from "react-router-dom";

const Collection = (props) =>{
        return (
            <div>
                <div>
                    <h2>{props.name}</h2>
                    <p>{`Количество карточек в коллекции ${props.count}`}</p>
                </div>
                <Link to={`/show/${props.id}/${props.name}/${props.count}`}>Посмотреть коллекцию</Link>
                <Link to={`/check/${props.id}/${props.name}/${props.count}`}>Проверить себя</Link>
                <button>Удалить коллекцию</button>
            </div>

        )
}

export default Collection;
