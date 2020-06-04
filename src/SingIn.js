import React,{Component} from 'react';
import {Link} from "react-router-dom";
import cookie from 'react-cookies';

const namesForm = ['email','password'];

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            errMessage: null,
        }
    }

    // getDataForm(e){
    //     const cur_data = {};
    //     for (const name of namesForm)
    //         cur_data[name] = e.target[name].value
    //     return cur_data
    // }
    //
    sentData = (e) => {
        this.props.changeUserData('normNick', 'Вася');
        // return fetch("https://livinir.herokuapp.com/api/auth/signin", {
        //     headers:{
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     method: "POST",
        //     body: JSON.stringify(this.getDataForm(e))
        // }).catch(reason => console.log('Server not available. Please try sing up later.'))
    }
    // async sentData(e) {
    //     let {status, statusText} = ['', ''];
    //     const email = e.target['email'].value;
    //     e.preventDefault();
    //     const response = await this.sentFetch(e);
    //     // cookie.save('userLog','sad', { path: '/'});
    //     if (response && response.ok) {
    //         const payload = await response.json();//жду jwt token и login пользователя
    //         cookie.save('email', email ,{ path: '/'});
    //         cookie.save('token', payload.accessToken,{ path: '/'});
    //         cookie.save('refresh', payload.refreshToken,{ path: '/'});
    //         this.setState({redirect: true});
    //     }else {
    //         if (response)
    //             [status, statusText] = [response.status, response.statusText] ;
    //         else
    //             [status, statusText] = ['not connection', ' '];
    //     }
    //     this.setState({ redirect: `Response failed: ${status} ${statusText}`});
    // }


    render() {
        if (this.state.errMessage) {
            return (<div ><div><p className='Fail'>{this.state.errMessage}<br/>
                <br/>Sorry, please try later.</p><Link to={'/'}>Ok</Link></div></div>);
        };
        return(<div>
            <form onSubmit={this.sentData}>
                <input type='email' name='email' placeholder='Enter your email' defaultValue='test@gmail.com'/>
                <input type='password' name='password' placeholder='Enter your password' defaultValue='123456'/>
                <button >Войти</button>
            </form>
            <Link to={'/signUp'}>Зарегестрироваться</Link>
        </div>)
    }
}
export default SignIn
