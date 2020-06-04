import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import SignUp from "./SingUp";
import SignIn from "./SingIn";
import {LoginContextConsumer} from "./LoginContext";
import Home from "./Home";
import CollectionForWork from "./CollectionForWork"

import cookie from 'react-cookies';

// потом будут компоненты которые прорисовываю форму и отправляют ее данные на сервер
//state login...
//модули css
//данные в ссылки
//все расложить по папочкам
//в режиме проверки перемешанные карты показывать чаще которые не знает
//componentDidMount get User смотрим залогинин или нет


class Main extends Component {

    constructor(props) {
        super(props);
        this.state= {
            login: null,
            name: null,
        }
    }

    changeUserData = (login, name) => {
        this.setState((state, _) => ({login: login || state.login, name: name || state.name}))
    }

//count не нужно
    render() {
        return (
            <LoginContextConsumer>{ context =>
                <Router>
                    <div className='App'>
                        <Route exact path='/' component={() => this.state.login ? <Home userData={{login: this.state.login, name: this.state.name}}/> : <SignIn changeUserData={this.changeUserData}/>}/>
                        <Route path='/signUp' component={SignUp}/>
                        <Route path='/check/:id/:name/:count' component={CollectionForWork}/>
                        <Route path='/show/:id/:name/:count' component={CollectionForWork}/>
                    </div>
                </Router>
            }
            </LoginContextConsumer>
        );
    }
}
export default Main;
