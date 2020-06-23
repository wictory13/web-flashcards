import React,{Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import './SignIn.css'
import cookie from 'react-cookies';

const namesForm = ['login','password'];

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            errMessage: null,
            update: false
        }
    }

    getDataForm(e){
        const cur_data = {};
        for (const name of namesForm)
            cur_data[name] = e.target[name].value
        return cur_data
    }

    onLogin = async (e) => {
         //cookie.save('token', 'check',{ path: '/'}); //проверка без бэк
         //cookie.save('username', 'check',{ path: '/'});
        e.preventDefault();
        //this.props.login()
        const response = await fetch("https://localhost:44351/api/users/token", {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(this.getDataForm(e))
        });
        await this.processResponseLogin(response);
    }

     processResponseLogin = async(response) => {
        if (response && response.ok) {
            const payload = await response.json();//жду token и username пользователя
            cookie.save('token', payload.token ,{ path: '/'});
            cookie.save('username', payload.username,{ path: '/'});
            this.setState({update: true});
        }else {
            if (response)
                this.setState({ errMessage: `Response failed: ${response.status} ${response.statusText}`});
            this.setState({errMessage: 'Server not available.'});
        }
    }


    render() {
        if (this.state.update)
            return <Redirect to='/'/>;
        if (this.state.errMessage) {
            return (<div ><div><p className='Fail'>{this.state.errMessage}<br/>
                <br/>Sorry, please try later.</p><button onClick={() => this.setState({errMessage: null})}>Ok</button></div></div>);
        };
        return(<div>
            <div id="game"  >
                <h2>Вход в приложение</h2>
            </div>
                <form onSubmit={this.onLogin}>
                    <div className="form">
                        <input className="input" type='text' name='login' placeholder='Enter your login' defaultValue='user'/>
                        <input  className="input" type='password' name='password' placeholder='Enter your password' defaultValue='123456'/>
                    </div>

                <div id="speechBtn" className="bottom-panel-button" >
                    <button id="btnVoice" className="uk-button uk-width-1-2 first">
                        Войти
                    </button>
                </div>
            </form>
            <Link id="btnVoice" className="uk-button uk-width-1-2" to={'/signUp'}>Зарегистрироваться</Link>
        </div>)
    }
}
export default SignIn
