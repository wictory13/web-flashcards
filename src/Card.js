import React from 'react';
import './Card.css'


class Card extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            languageIsNative: true,
        }
    }

    changeLanguage = () => this.setState({languageIsNative: !this.state.languageIsNative})

    render() {
        return <div className="card">
            <h1>{this.state.languageIsNative ? this.props.nativeWord : this.props.foreignerWord}</h1>
        </div>
    }

}

export default Card;