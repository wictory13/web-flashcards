import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

// потом будут компоненты которые прорисовываю форму и отправляют ее данные на сервер
const SignUp = ()=>(
    <h2>SignUp</h2>
)
const SignIn = ()=>(
    <h2>SignIn</h2>
)

const Profile = ()=>(
    <h2>SignIn</h2>
)

const Play = ()=>(
    <h2>SignIn</h2>
)

class Main extends Component {

    constructor(props) {
        super(props);
        this.state ={
            cardsCollection: [],
        }
    }
    componentDidMount(){
        this.getCardsCollection();
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