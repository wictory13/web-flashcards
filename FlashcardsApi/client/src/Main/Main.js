import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import SignUp from "../Sing/SingUp";
import SignIn from "../Sing/SingIn";
import {LoginContextConsumer} from "../LoginContext/LoginContext";
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


function Main(){
//count не нужно
    return (
        <LoginContextConsumer>{ context =>
            <Router>
                <div className='App'>
                    <Route exact path='/' component={() => cookie.load('token') ? <Home/> : <SignIn/>}/>
                    <Route path='/signUp' component={SignUp}/>
                    <Route path='/check/:id/:name/:count' component={CollectionForWork}/>
                    <Route path='/show/:id/:name/:count' component={CollectionForWork}/>
                </div>
            </Router>
        }
        </LoginContextConsumer>
    );
}

export default Main;
