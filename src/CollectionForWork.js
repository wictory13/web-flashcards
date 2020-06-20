import React, { Component } from "react";
import {Redirect} from 'react-router';
import Card from "./Card";
import './CollectionForWork.css'
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
                <div id="game"  className="death">
                    <h2>Вы запомнили {this.state.score} из {this.props.match.params.count}</h2>
                </div>
                    <Link className="link" to={'/'}>Вернуться в меню</Link>
                </div>
            )
        }
        const curCard = this.state.cards[this.state.curIndex];
        const word = this.state.languageIsNative ? curCard.translation : curCard.word;
        if(this.props.match.path.includes('show')) {
            return (
                <div>
                    <Card isShow={true} word={word} curCard={curCard} idCollection={this.props.match.params.id} changeLanguage={this.changeLanguage}/>
                    <div id="board" className="bottom-panel-management">
                    <div id="speechBtn" className="bottom-panel-button board first" data-uk-button-checkbox
                         data-uk-tooltip="{pos:'bottom'}" >
                        <button id="btnVoice" className="uk-button uk-width-1-2"
                                onClick={(_) => this.changeIndex(-1)}> Назад
                        </button>
                    </div>
                    <div id="speechBtn" className="bottom-panel-button" data-uk-button-checkbox
                         data-uk-tooltip="{pos:'bottom'}" >
                        <button id="btnVoice" className="uk-button uk-width-1-2"
                                onClick={(_) => this.changeIndex(1)}> Вперед
                        </button>
                    </div>

                    <Link  className="link" to={'/'}>Вернуться к коллекциям</Link>
                </div>
                </div>
            )
        }

        if (this.state.answerUser === null){
            return (<div>
                <Card isShow={false} word={word} curCard={curCard}/>
                <div id="speechBtn" className="bottom-panel-button board first" data-uk-button-checkbox
                     data-uk-tooltip="{pos:'bottom'}" >
                    <button id="btnVoice" className="uk-button no"
                            onClick={(_) => this.setAnswer(false)}>Не помню
                    </button>
                </div>
                <div id="speechBtn" className="bottom-panel-button" data-uk-button-checkbox
                     data-uk-tooltip="{pos:'bottom'}" >
                    <button id="btnVoice" className="uk-button yes"
                            onClick={(_) => this.setAnswer(true)}>Помню
                    </button>
                </div>

            </div>)
        }

        return (
            <div>
                <Card isShow={false} word={word} curCard={curCard}/>
                <div id="speechBtn" className="bottom-panel-button board first" data-uk-button-checkbox
                     data-uk-tooltip="{pos:'bottom'}" >
                    <button id="btnVoice" className="uk-button uk-width-1-2"
                            onClick={(_) => this.nextWord(this.state.answerUser)}>Продолжить
                    </button>
                </div>
                {this.state.answerUser ?
                <div id="speechBtn" className="bottom-panel-button" data-uk-button-checkbox
                     data-uk-tooltip="{pos:'bottom'}" >
                    <button id="btnVoice" className="uk-button uk-width-1-2"
                            onClick={(_) => this.nextWord(false)}>Ошибся
                    </button>
                </div>:''}

            </div>
        )

    }
}

export default CollectionForWork;
