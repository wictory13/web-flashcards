import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import SignUp from "./SingUp";
import {LoginContextConsumer} from "./LoginContext";
import Profile from "./Profile";

// потом будут компоненты которые прорисовываю форму и отправляют ее данные на сервер

const SignIn = ()=>(
    <h2>SignIn</h2>
)

const CheckBoard = ()=>(
    <h2>CheckBoard</h2>
)

const ShowBoard = ()=>(
    <h2>ShowBoard</h2>
)

class Main extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount(){
        //this.getCardsCollection();
    }

    render() {
        return (
            <LoginContextConsumer>{ context =>
                <Router>
                    <div className='App'>
                        <Route exact path='/' component={SignUp}/>
                        <Route exact path='/signIn' component={SignIn}/>
                        <Route path='/profile' component={() => <Profile login={context.login}/>}/>
                        <Route path='/check' component={CheckCollection}/>
                        <Route path='/show' component={ShowCollection}/>
                    </div>
                </Router>
            }
            </LoginContextConsumer>
        );
    }
}
export default Main;