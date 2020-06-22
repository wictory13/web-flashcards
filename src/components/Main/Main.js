import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
import Home from "../Home/Home";
import CollectionForWork from "../CollectionForWork/CollectionForWork"

import cookie from 'react-cookies';

// потом будут компоненты которые прорисовываю форму и отправляют ее данные на сервер
//state login...
//модули css
//данные в ссылки
//все расложить по папочкам
//в режиме проверки перемешанные карты показывать чаще которые не знает
//componentDidMount get User смотрим залогинин или нет
//Redirect, ну сразу и Update, кнопочка Выйти, форма


class Main extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLogin: cookie.load('token') ? true : false,
        }
    }

     onClick = () => {
        cookie.remove('token');
        cookie.remove('name');
        this.setState({isLogin: false});
    }

    login = () => this.setState({isLogin: true});

    render() {
        return (
            <Router>
                <div className='App'>
                    <div>
                        {this.state.isLogin ? <button onClick={this.onClick}>Выйти</button> : ''}
                    </div>
                    <Route exact path='/' component={() => this.state.isLogin ? <Home/> : <SignIn login ={this.state.login}/>}/>
                    <Route path='/signUp' component={SignUp}/>
                    <Route path='/check/:id/:name' component={CollectionForWork}/>
                    <Route path='/show/:id/:name' component={CollectionForWork}/>
                </div>
            </Router>
        )
    }
}

export default Main;
