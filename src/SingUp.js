import React,{Component} from 'react';
import {Redirect} from 'react-router';
import {LoginContextConsumer} from "./LoginContext";

const namesForm = ['email', 'login', 'firstName', 'password'];

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.login = null;
        this.state = {
            redirect: false,
            error: '',
        }
        this.sentData = this.sentData.bind(this);
    }

    returnBack = () => this.setState({error: ''});

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
        //когда появится back должно работать
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
        if (this.state.redirect) {
            return (<LoginContextConsumer>{context => {
                    setTimeout(context.setLogin,0,this.login);
                    // context.setLogin(this.login);
                    return (<Redirect to={'/profile'}/>)
                }
            }
            </LoginContextConsumer>);
        }
        if (this.state.error) {
            return (<div><div><p>{this.state.error}
            Sorry, please try later.</p><button onClick={this.returnBack}>Ok</button></div></div>);
        }
        return (<div>
            <form onSubmit={this.sentData} className='SignUp'>
                <input type='email' name='email' placeholder='Enter your email' defaultValue='test@gmail.com'/>
                <input type='text' name='login' placeholder='Enter your login' defaultValue='user'/>
                <input type='text' name='firstName' placeholder='Enter your First Name' defaultValue='user'/>
                {/*<input type='text' name='lastName' placeholder='Enter your Last Name' defaultValue='user'/>*/}
                <input type='password' name='password' placeholder='Enter password' defaultValue='123456'/>
                {/*<input type='date' name='dateOfBirth' placeholder='Enter your birthday' defaultValue='2019-01-19'/>*/}
                {/*<p> Your gender:*/}
                {/*    <input type="radio" name="sex" value='MALE' defaultChecked={true}/> Male*/}
                {/*    <input type="radio" name="sex" value='FEMALE'/> Female*/}
                {/*</p>*/}
                <button>Sign Up</button>
            </form>
        </div>);
    }
}
export default SignUp