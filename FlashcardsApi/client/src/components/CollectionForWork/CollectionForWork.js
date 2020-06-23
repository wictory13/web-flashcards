import React, { Component } from "react";
import Card from "../Card/Card";
import './CollectionForWork.css'
import {Link} from "react-router-dom";
import cookie from "react-cookies";

class CollectionForWork extends Component {
    constructor(props){
        super(props);
        this.state={
            cards: null,
            errMessage: null,
            curIndex: 0,
            countSuccess: 0,
            endCheck: false,
            answerUser: null,
            countFail: 0,
            cardForCheck: null,
            isCheckCard: false,
            isLearn: false,
        }
    }
    componentDidMount() {
        this.getCards();
        if (this.props.match.path.includes('check'))
            this.nextWord();
    }

    changeIndex = (value) => {
        let newIndex = (this.state.curIndex + value) % this.state.cards.length;
        if (newIndex < 0)
            newIndex = this.state.cards.length + newIndex;
        this.setState({curIndex: newIndex, languageIsNative: false});
    }

    deleteCard = (idCard) => {
        const newCards = state.cards.filter(item => item.id !== idCard);
        this.setState((state) => ({cards: newCards, curIndex: 0}));
    }

    setAnswer = (answerUser) => this.setState({answerUser: answerUser, isCheckCard: true});


    processAnswerUser = async (isRight) => {
        if (isRight)
            await this.noteRightAnswer();
        const newCountSuccess = isRight ? this.state.countSuccess + 1 : this.state.countSuccess;
        const newCountFail =  isRight ? this.state.countFail : this.state.countFail + 1;
        await this.nextWord(newCountSuccess, newCountFail);
    }

    nextWord = async (newCountSuccess = this.state.countSuccess, newCountFail = this.state.countFail) => {
        const response = await fetch(`https://localhost:44351/api/collections/${this.props.match.params.id}/next`, {
            headers:{
                'Authorization': 'Bearer ' + cookie.load('token'),
            }
        });
        if (response && response.ok){
            console.log(response.status)
            console.log(response.statusText)
            if (response.status !== 204) {
                const payload = await response.json();//жду id, collectionId, word,translation, periodicity, ownerLogin
                this.setState({
                    cardForCheck: payload,
                    isCheckCard: false,
                    answerUser: null,
                    countSuccess: newCountSuccess,
                    countFail: newCountFail,
                    endCheck: false,
                    isLearn: false
                })
            }
            else
                this.setState({endCheck: true, isLearn: true})
        }
    }

    noteRightAnswer = async () => {
        const response = await fetch('https://localhost:44351/api/cards/know',{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + cookie.load('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.cardForCheck.id)
        });
    }

    getCards = async () => {
        const response = await fetch(`https://localhost:44351/api/collections/${this.props.match.params.id}/cards`, {
            headers:{
                'Authorization': 'Bearer ' + cookie.load('token')
            },
        });
        if (response && response.ok) {
            const payload = await response.json();//жду {id, collectionId, word,translation, periodicity, ownerLogin, img},...
            this.setState({cards: payload})
        }
         //this.setState({cards: [{id: 1, word: 'cat', translation: 'кошка', img:'https://ichef.bbci.co.uk/news/320/cpsprodpb/582E/production/_109447522_catsmaincoonunfriendly.jpg'},
        //         {id: 2, word: 'dog', translation: 'собака', img: 'https://cs2.livemaster.ru/storage/a6/c2/c07137d2f3df108be9971f9aa3qm--kukly-i-igrushki-vojlochnaya-igrushka-fedenka-sobachka-iz-she.jpg'},
        //         {id: 3, word: 'penguin', translation:'пингвин', img:'https://i.pinimg.com/originals/c6/96/41/c69641a5d9a63081e22a8ae51c145505.jpg'}]});// без бэкэнда
    }

    getCollectionForShow = () => {
        const curCard = this.state.cards[this.state.curIndex];
        return (
            <div>
                <Card isShow={true} curCard={curCard} deleteCard={this.deleteCard}/>
                <div id="board" className="bottom-panel-management">
                    <div id="speechBtn" className="bottom-panel-button board first" >
                        <button id="btnVoice" className="uk-button uk-width-1-2" onClick={() => this.changeIndex(-1)}>
                            Назад
                        </button>
                    </div>
                    <div id="speechBtn" className="bottom-panel-button" >
                        <button id="btnVoice" className="uk-button uk-width-1-2" onClick={() => this.changeIndex(1)}>
                            Вперед
                        </button>
                    </div>
                    <Link  className="link" to={'/'}>Вернуться к коллекциям</Link>
                </div>
            </div>
        )
    }

    getCollectionForCheck = () => {
        return (
            <div>
                <Card isShow={false} isCheck ={this.state.isCheckCard} curCard={this.state.cardForCheck}/>
                <div id="speechBtn" className="bottom-panel-button board first"  >
                    <button id="btnVoice" className="uk-button no" onClick={() => this.setAnswer(false)}>
                        Не помню
                    </button>
                </div>
                <div id="speechBtn" className="bottom-panel-button"  >
                    <button id="btnVoice" className="uk-button yes" onClick={() => this.setAnswer(true)}>
                        Помню
                    </button>
                </div>
                <div id="speechBtn" className="bottom-panel-button"  >
                    <button id="btnVoice" className="uk-button yes" onClick={() => this.setState({endCheck: true})}>
                        Закончить проверку
                    </button>
                </div>
            </div>
        )
    }

    getCollectionForCheckAnswerUser = () => {
        return(
            <div>
                <Card isShow={false} isCheck ={this.state.isCheckCard} curCard={this.state.cardForCheck}/>
                <div id="speechBtn" className="bottom-panel-button board first"  >
                    <button id="btnVoice" className="uk-button uk-width-1-2" onClick={() => this.processAnswerUser(this.state.answerUser)}>
                        Продолжить
                    </button>
                </div>
                {
                    this.state.answerUser
                    ? <div id="speechBtn" className="bottom-panel-button"  >
                        <button id="btnVoice" className="uk-button uk-width-1-2" onClick={() => this.processAnswerUser(false)}>
                            Ошибся
                        </button>
                    </div>
                    : ''
                }
            </div>
        )
    }


    render() {
        const isEmpty = !this.state.cards || (this.props.match.path.includes('check') && !(this.state.cardForCheck || this.state.endCheck));
        if (isEmpty)
            return(
                <div>
                    <Link  className="link" to={'/'}>Вернуться к коллекциям</Link>
                </div>
            )
        if(this.state.endCheck){
            return (
                <div>
                <div id="game"  className="death">
                    {this.state.isLearn ? <h2>Поздравляю, вы выучили эту коллекцию!</h2> : <h2>Вы  ответили правильно {this.state.countSuccess} из {this.state.countSuccess + this.state.countFail}</h2>}
                </div>
                    <Link className="link" to={'/'}>Вернуться в меню</Link>
                </div>
            )
        }
        if(this.props.match.path.includes('show'))
            return this.getCollectionForShow();
        if (this.state.answerUser === null){
            return this.getCollectionForCheck();
        }
        return this.getCollectionForCheckAnswerUser();
    }
}

export default CollectionForWork;
