import React from 'react';
import Collection from "../Collection/Collection";
import './Home.css'
import '../CollectionForWork/CollectionForWork.css' //и вот здесь смущает
import cookie from 'react-cookies';
import {Link, Redirect} from "react-router-dom";


class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            collections: null,
            isAddNewCollection: false,
            isUpdate: false,
        }
    }

    componentDidMount() {
        this.getCollectionsUser();
        //this.setState({collections: [{id: 1, name: 'животные', ownerLogin: 'asas'},{id: 2, name: 'люди', ownerLogin: 'asas'}]}); //бэк не работает
    }

     getCollectionsUser = async () => {
         const response = await fetch("https://localhost:44351/api/collections/all", {
             headers:{
                 'Authorization': 'Bearer ' + cookie.load('token')
             },
         });
         if (response && response.ok) {
             const payload = await response.json();//жду {name, id, ownerLogin},...
             this.setState({collections: payload})
         }
     }

    onClick = () => {
        cookie.remove('token');
        cookie.remove('name');
        this.setState({isUpdate: true});
    }

    onCreateCollection = () => {
        this.setState({isAddNewCollection: true});
    }

    onCreateCollectionServer = async (e) => {
        const response = await fetch("https://localhost:44351/api/collections/create", {
            headers:{
                'Authorization': 'Bearer ' + cookie.load('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(e.target.nameCol.value)
        });
        if (response && response.ok) {
            const payload = await response.json();// жду idCollection
            const curCollection = await this.getCollection(payload.idCollection)
            const newCollections = this.state.collections.slice();
            newCollections.push(curCollection)
            if(curCollection)
                this.setState({isAddNewCollection: false,  collections: newCollections})
        }
    }

    deleteCollection = (idCollection)=> this.setState((state)=>({collections: state.collections.filter(item => item.id !== idCollection)}));

    getCollection = async(id) =>{
        const response = await fetch(`https://localhost:44351/api/collections/${id}`, {
            headers:{
                'Authorization': 'Bearer ' + cookie.load('token'),
            }
        });
        if (response && response.ok) {
            const payload = await response.json();
            return payload;
        }
    }

    getNewCollection = () => {
        return (
            <div>
                <div id="game" >
                    <h2>Добро пожаловать, {cookie.load('username')}!</h2>
                </div>
                <form onSubmit={this.onCreateCollectionServer}>
                    <div className="form">
                    <input  className="input" type='text' name='nameCol' placeholder='Введите название коллекции' defaultValue='just Collection'/>
                    </div>
                    <div id="speechBtn" className="bottom-panel-button" >
                        <button className="uk-button uk-width-1-2 first">
                            Создать
                        </button>

                    </div>
                </form>
                <button  className="uk-button uk-width-1-2" onClick={()=>this.setState({isAddNewCollection: false})}>отмена</button>
            </div>
        )
    }

    render() {
        if (this.state.isUpdate) {
            return <Redirect to='/'/>;
        }
        const curCollections = this.state.collections ? this.state.collections.map(e => <Collection key={e.id} name={e.name} id={e.id} deleteCollection={this.deleteCollection}/>) : '';
        if (this.state.isAddNewCollection)
            return this.getNewCollection();
        return (
            <div>

                <div id="game" >
                    <div >
                        {cookie.load('token') ?
                            <button className="uk-button uk-width-1-2 game-but" onClick={this.onClick}>Выйти</button> : ''}
                    </div>
                    <h2>Добро пожаловать, {cookie.load('username')}!</h2>
                    <h3>Ваши коллекции:</h3>

                </div>
                <div id="table" className="table" >
                    {curCollections}
                </div>
                <div>
                    <button className="link" onClick={this.onCreateCollection}>Создать новую коллекцию</button>
                </div>
            </div>
        )
    };

}

export default Home;
