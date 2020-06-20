import React from 'react';
import Collection from "./Collection";
import './Home.css'
import './CollectionForWork.css'
import {Link} from "react-router-dom";


class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            errMessage: null,
            collections: null,
        }
    }

    componentDidMount() {
        this.getCollectionsUser();
    }

     getCollectionsUser = async () => {
         // const result = await fetch('api/collections').then(r => r.ok ? r.json() : this.setState({errMessage: `Ошибка ${r.status} ${r.statusText},
         // попробуйте загрузить позже`}), e => this.setState({errMessage: 'Сервер не доступен, попробуйте позже.'}));
         // this.setState({collections: result.collection});
         this.setState({collections: [{id: 1, name: 'животные', cardsCount: 3}, {id: 2, name: 'люди', cardsCount: 0}]});
     }


    render() {
        const curCollections = this.state.collections ? this.state.collections.map(e => <Collection key={e.id} name={e.name} count={e.cardsCount} id={e.id}/>) : '';
        return (
            <div>

                    <div id="gameover" >
                        <h2>Добро пожаловать, {this.props.userData.name}!</h2>
                        <h>Ваши коллекции:</h>
                    </div>
                <div id="table" className="table" >
                    {curCollections}
                </div>


                <div>
                    <button className="link">Создать новую коллекцию</button>
                </div>
            </div>
        )
    };

}

export default Home;
