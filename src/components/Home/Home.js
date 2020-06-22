import React from 'react';
import Collection from "../Collection/Collection";
import './Home.css'
import '../CollectionForWork/CollectionForWork.css' //и вот здесь смущает
import cookie from 'react-cookies';


class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            collections: null,
            isAddNewCollection: false,
        }
    }

    componentDidMount() {
        this.getCollectionsUser();
        // this.setState({collections: [{id: 1, name: 'животные', ownerLogin: 'asas'}, {id: 2, name: 'люди', ownerLogin: 'asas'}]}); //бэк не работает
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

    render() {
        const curCollections = this.state.collections ? this.state.collections.map(e => <Collection key={e.id} name={e.name} id={e.id} deleteCollection={this.deleteCollection}/>) : '';
        const newCollection = (
            <div>
                <form onSubmit={this.onCreateCollectionServer}>
                    <input className="input" type='text' name='nameCol' placeholder='Введите название коллекции' defaultValue='just Collection'/>
                    <button>Создать</button>
                </form>
                <button onClick={()=>this.setState({isAddNewCollection: false})}>отмена</button>
            </div>
        );
        return (
            <div>
                <div id="game" >
                    <h2>Добро пожаловать, {cookie.load('username')}!</h2>
                    <h>Ваши коллекции:</h>
                </div>
                <div id="table" className="table" >
                    {this.state.isAddNewCollection ? newCollection : curCollections}
                </div>
                <div>
                    <button className="link" onClick={this.onCreateCollection}>Создать новую коллекцию</button>
                </div>
            </div>
        )
    };

}

export default Home;
