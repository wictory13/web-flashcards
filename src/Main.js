import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import SignUp from "./SingUp";
import {LoginContextConsumer} from "./LoginContext";

// потом будут компоненты которые прорисовываю форму и отправляют ее данные на сервер

const SignIn = ()=>(
    <h2>SignIn</h2>
)

const Profile = ()=>(
    <LoginContextConsumer>{context => (<h2>{context.login}</h2>)}</LoginContextConsumer>
)

const Play = ()=>(
    <h2>Play</h2>
)

class Main extends Component {

    constructor(props) {
        super(props);
        this.state ={
            cardsCollection: [],
        }
    }
    componentDidMount(){
        //this.getCardsCollection();
    }
    async getCardsCollection(){
        let result = await fetch(`/getAllCards`).catch(error=>console.log(error));
        if (result && result.ok) {
            //console.log(result);
            result = await result.json();
            this.setState({cardsCollection : result.cardsCollection})
        }
        else
            console.log('error');
    }

    render() {
        return (
            <Router>
                <div className='App'>
                    <Route exact path='/' component={SignUp}/>
                    <Route path='/signIn' component={SignIn}/>
                    <Route path='/profile' component={Profile}/>
                    <Route path='/play' component={Play}/>
                </div>
            </Router>
        );
    }
}
export default Main;