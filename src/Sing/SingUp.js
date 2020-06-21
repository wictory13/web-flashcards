import React,{Component} from 'react';
import {Link, Redirect} from "react-router-dom";

const namesForm = ['login','password'];

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errMessage: null,
        }
    }

    getDataForm(e){
        const form = document.querySelector('.SingUp');
        const cur_data = {};
        for (const name of namesForm)
            cur_data[name] = e.target[name].value;
        return cur_data;
    }

    onSignup = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/users/create", {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(this.getDataForm(e))
        });
        await this.processResponseSignup(response);
    }

    processResponseSignup = (response) => {
        if (response && response.ok)
            return <Redirect to='/'/>;
        else {
            if (response)
                this.setState({ errMessage: `Response failed: ${response.status} ${response.statusText}`});
            this.setState({errMessage: 'Server not available.'});
        }
    }

    render(){
        if (this.state.errMessage) {
            return (<div><div><p>{this.state.errMessage} Sorry, please try later.</p>
                <button onClick={() => this.setState({errMessage: null})}>Ok</button></div></div>);
        }
        return (<div>
            <div id="game"  >
                <h2>Регистрация</h2>
            </div>
            <form onSubmit={this.onSignup} className='SignUp'>
                <div className="form">
                <input className="input" type='text' name='login' placeholder='Enter your login' defaultValue='user'/>
                <input className="input" type='password' name='password' placeholder='Enter password' defaultValue='123456'/>
                </div>
                <div id="speechBtn" className="bottom-panel-button" data-uk-button-checkbox
                     data-uk-tooltip="{pos:'bottom'}" >
                    <button id="btnVoice" className="uk-button uk-width-1-2 first">
                        Зарегистрироваться
                    </button>
                </div>
            </form>
            <Link className="uk-button uk-width-1-2" to={'/'}>Уже зарегистрирован</Link>
        </div>);
    }
}
export default SignUp
