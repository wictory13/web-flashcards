import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
import Home from "../Home/Home";
import CollectionForWork from "../CollectionForWork/CollectionForWork"
import cookie from 'react-cookies';

function Main(){
    return (
        <Router>
            <div className='App'>
                <Route exact path='/' component={() => cookie.load('token') ? <Home/> : <SignIn/>}/>
                <Route path='/signUp' component={SignUp}/>
                <Route path='/check/:id/:name' component={CollectionForWork}/>
                <Route path='/show/:id/:name' component={CollectionForWork}/>
            </div>
        </Router>
    )
}

export default Main;
