import React, { Component } from "react";
const { Provider, Consumer } = React.createContext();

class LoginContextProvider extends Component {
    state = {
        token: null
    };

    setLogin = (value) => {
        this.setState({login:value});
    };

    render() {
        const context = {login: this.state.login, setLogin: this.setLogin}
        return <Provider value={context}>{this.props.children}</Provider>;
    }
}

export { LoginContextProvider, Consumer as LoginContextConsumer };