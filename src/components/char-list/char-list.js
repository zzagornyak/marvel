import { Component } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import MarvelService from '../../services/marvel-services';

import './char-list.scss';

class CharsList extends Component{
    state = {
        charsList: [],
        loading: true,
        error: false
    }


    marvelService = new MarvelService()

    componentDidMount(){
        this.marvelService.getAllCharacters()
            .then(this.onCharsListLoaded)
            .catch(this.onError)    
    } 

   

    onCharsListLoaded = (charsList) => {
        this.setState({
            charsList,
            loading: false
        })
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
        const {charsList, error, loading} = this.state
        const items = this.itemsRender(charsList)
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null 
        const content = !(loading || error) ? items : null 
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharsList;

// <ul className="char__grid">
//                     <li className="char__item">
//                         <img src={abyss} alt="abyss"/>
//                         <div className="char__name">Abyss</div>
//                     </li>
//                     <li className="char__item char__item_selected">
//                         <img src={abyss} alt="abyss"/>
//                         <div className="char__name">Abyss</div>
//                     </li>
//                     <li className="char__item">
//                         <img src={abyss} alt="abyss"/>
//                         <div className="char__name">Abyss</div>
//                     </li>
//                     <li className="char__item">
//                         <img src={abyss} alt="abyss"/>
//                         <div className="char__name">Abyss</div>
//                     </li>
//                     <li className="char__item">
//                         <img src={abyss} alt="abyss"/>
//                         <div className="char__name">Abyss</div>
//                     </li>
//                     <li className="char__item">
//                         <img src={abyss} alt="abyss"/>
//                         <div className="char__name">Abyss</div>
//                     </li>
//                     <li className="char__item">
//                         <img src={abyss} alt="abyss"/>
//                         <div className="char__name">Abyss</div>
//                     </li>
//                     <li className="char__item">
//                         <img src={abyss} alt="abyss"/>
//                         <div className="char__name">Abyss</div>
//                     </li>
//                     <li className="char__item">
//                         <img src={abyss} alt="abyss"/>
//                         <div className="char__name">Abyss</div>
//                     </li>
//                 </ul>