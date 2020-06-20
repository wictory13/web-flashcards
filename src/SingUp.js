import React,{Component} from 'react';
import {Link} from "react-router-dom";

import {LoginContextConsumer} from "./LoginContext";

const namesForm = ['email', 'login', 'firstName', 'password'];

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.login = null;
        this.state = {
            errMessage: '',
        }
        this.sentData = this.sentData.bind(this);
    }

    getDataForm(e){
        const form = document.querySelector('.SingUp');
        const cur_data = {};
        for (const name of namesForm)
            cur_data[name] = e.target[name].value;
        return cur_data;
    }

    sentFetch(e){
        return fetch("/signup", {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(this.getDataForm(e))
        });
    }

    async sentData(e) {
        this.login = "admin";
        this.setState({redirect: true});
        return ;
        //когда появится back должно работать возможно будет другой метод
        // let [status, statusText] = ['', ''];
        // e.preventDefault();
        // const response = await this.sentFetch(e);
        // if (response && response.ok) {
        //     this.login = await response.json().login;
        //     this.setState({redirect: true});
        // }
        // else {
        //     if (response)
        //         [status, statusText] = [response.status, response.statusText] ;
        //     else
        //         status = 'not connection';
        //     this.setState({ error: `Response failed: ${status} ${statusText}`});
        // }
    }

    render(){

        if (this.state.errMessage) {
            return (<div><div><p>{this.state.errMessage}
            Sorry, please try later.</p><Link to={'/signUp'}>Ok</Link></div></div>);
        }
        return (<div>
            <div id="game"  >
                <h2>Регистрация</h2>
            </div>
            <form onSubmit={this.sentData} className='SignUp'>
                <div className="form">
                <input className="input" type='email' name='email' placeholder='Enter your email' defaultValue='test@gmail.com'/>
                <input className="input" type='text' name='login' placeholder='Enter your login' defaultValue='user'/>
                <input className="input" type='text' name='firstName' placeholder='Enter your First Name' defaultValue='user'/>
                {/*<input type='text' name='lastName' placeholder='Enter your Last Name' defaultValue='user'/>*/}
                <input className="input" type='password' name='password' placeholder='Enter password' defaultValue='123456'/>
                </div>
                <div id="speechBtn" className="bottom-panel-button" data-uk-button-checkbox
                     data-uk-tooltip="{pos:'bottom'}" >
                    <button id="btnVoice" className="uk-button uk-width-1-2 first">
                        Зарегистрироваться
                    </button>

                </div>
            </form>
            <Link className="uk-button uk-width-1-2" to={'/'}>Уже зарегестрирован</Link>
        </div>);
    }
}
export default SignUp
