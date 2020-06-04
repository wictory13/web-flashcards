import React, { Component } from "react";
import {Redirect} from 'react-router';
import Card from "./Card";
import {Link} from "react-router-dom";

class CollectionForWork extends Component {
    constructor(props){
        super(props);
        this.state={
            cards: null,
            errMessage: null,
            curIndex: 0,
            score: 0,
            endCheck: false,
            languageIsNative: false,
            answerUser: null,
        }
    }
    componentDidMount() {
        this.getCards();
    }

    changeIndex = (value) => {
        this.setState((state, props) => {
                let newIndex = (state.curIndex + value) % props.match.params.count;
                if (newIndex < 0)
                    newIndex = +props.match.params.count + newIndex;
                return {curIndex: newIndex, languageIsNative: false};
            }
        )
    }

    changeLanguage = (_) => this.setState((state, _) => ({languageIsNative: !state.languageIsNative}));

    setAnswer = (answerUser) => this.setState((state, _) => ({answerUser: answerUser, languageIsNative: !state.languageIsNative}));

    nextWord = (isRight) => {
        //вынести state
        this.setState((state, props) => {
                const newIndex = (state.curIndex + 1);
                if (newIndex === +props.match.params.count)
                    return isRight ? {endCheck: true, score: state.score + 1, languageIsNative: false, answerUser: null}
                        : {endCheck: true, languageIsNative: false, answerUser: null};
                return isRight ? {curIndex: newIndex, score: state.score + 1, languageIsNative: false, answerUser: null}
                : {curIndex: newIndex, languageIsNative: false, answerUser: null};
            }
        )
    }
    getCards = async () => {
        // const result = await fetch(`api/collections/${this.props.match.params.id}/cards`).then(r => r.ok ? r.json() : this.setState({errMessage: `Ошибка ${r.status} ${r.statusText},
        //  попробуйте загрузить позже`}), e => this.setState({errMessage: 'Сервер не доступен, попробуйте позже.'}));
        // this.setState({cards: result.cards});
        this.setState({cards: [{id: 1, word: 'cat', translation: 'кошка', img:'https://ichef.bbci.co.uk/news/320/cpsprodpb/582E/production/_109447522_catsmaincoonunfriendly.jpg'},
                {id: 2, word: 'dog', translation: 'собака', img: 'https://cs2.livemaster.ru/storage/a6/c2/c07137d2f3df108be9971f9aa3qm--kukly-i-igrushki-vojlochnaya-igrushka-fedenka-sobachka-iz-she.jpg'},
                {id: 3, word: 'penguin', translation:'пингвин', img:'https://i.pinimg.com/originals/c6/96/41/c69641a5d9a63081e22a8ae51c145505.jpg'}]});
    }
//разбить по функции
    render() {
        if (!this.state.cards)
            return '';
        if(this.state.endCheck){
            return (
                <div>
                    <p>Вы запомнили {this.state.score} из {this.props.match.params.count}</p>
                    <Link to={'/'}>Ок</Link>
                </div>
            )
        }
        const curCard = this.state.cards[this.state.curIndex];
        const word = this.state.languageIsNative ? curCard.translation : curCard.word;
        if(this.props.match.path.includes('show')) {
            return (
                <div>
                    <Card isShow={true} word={word} curCard={curCard} idCollection={this.props.match.params.id} changeLanguage={this.changeLanguage}/>
                    <button onClick={(_) => this.changeIndex(-1)}> Назад</button>
                    <button onClick={(_) => this.changeIndex(1)}> Вперед</button>
                    <Link to={'/'}>Вернуться к коллекциям</Link>
                </div>
            )
        }

        if (this.state.answerUser === null){
            return (<div>
                <Card isShow={false} word={word} curCard={curCard}/>
                <button onClick={(_) => this.setAnswer(false)}>Не знаю</button>
                <button onClick={(_) => this.setAnswer(true)}>Знаю</button>
            </div>)
        }

        return (
            <div>
                <Card isShow={false} word={word} curCard={curCard}/>
                <button onClick={(_) => this.nextWord(this.state.answerUser)}>Продолжить</button>
                {this.state.answerUser ? <button onClick={(_) => this.nextWord(false)}>Ошибся</button>:''}
            </div>
        )

    }
}

export default CollectionForWork;
