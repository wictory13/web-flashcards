import React from 'react';


class CheckCollection extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            curIndex: 0,
            Score: 0,
            cards: null,
        }
    }

    componentDidMount() {
        // по this.state.idCollection достать коллекцию изменить this.state.cards
    }



    render() {
        return (''
        )
    };

}

export default CheckCollection;
