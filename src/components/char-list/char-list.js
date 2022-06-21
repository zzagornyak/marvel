import { Component } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import MarvelService from '../../services/marvel-services';

import './char-list.scss';

class CharsList extends Component{
    constructor(props) {
        super(props)
        this.state = {
            charsList: [],
            loading: true,
            newCharsLoading: false,
            error: false,
            offset: 210,
            buttonVisible: true
        }

    }


    marvelService = new MarvelService()

    componentDidMount(){
        this.onRequest() 
    } 

    onRequest = (offset) => {
        this.onCharsListLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharsListLoaded)
            .catch(this.onError)
    }
    onCharsListLoading = () => {
        this.setState({
            newCharsLoading: true
        })
    }
    onCharsListLoaded = (newCharsList) => {
        let charsEnded = true
        if (newCharsList.length < 9) {
            charsEnded = false
        }
        this.setState(({charsList,offset}) => ({
            charsList: [...charsList, ...newCharsList],
            loading: false,
            offset: offset + 9,
            newCharsLoading: false,
            buttonVisible: charsEnded
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    itemsRender = (charsList) => {
         const items = charsList.map((item) => {
            const {name, thumbnail, id} = item
            const imageStyle = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? {objectFit: 'unset'} : {objectFit: 'cover'}
            return(
                <li key={id} className="char__item">
                    <img style={imageStyle}
                        src={thumbnail} 
                        alt={name}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })
        return(
            <ul className="char__grid">
                {items}
            </ul>
        )
    }


    render() {
        const {charsList, error, loading, newCharsLoading, offset, buttonVisible} = this.state
        const items = this.itemsRender(charsList)
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null 
        const content = !(loading || error) ? items : null
        const buttonStyle = buttonVisible ? null : {display: "none"}
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    style={buttonStyle}
                    disabled={newCharsLoading}
                    onClick={() => {
                        this.onRequest(offset)
                    }}
                    className="button button__main button__long">
                        <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharsList;

