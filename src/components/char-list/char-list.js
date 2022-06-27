import { useEffect, useState, useRef } from 'react';
import PropTypes from "prop-types"
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import MarvelService from '../../services/marvel-services';

import './char-list.scss';

const CharsList = (props) => {

    const [charsList, setCharsList] = useState([])
    const [loading, setLoading] = useState(true)
    const [newCharsLoading, setNewCharsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [offset, setOffset] = useState(210)
    const [buttonVisible, setButtonVisible] = useState(true)
 
    const marvelService = new MarvelService()

    useEffect(() => {
        onRequest()
// eslint-disable-next-line
    }, [])
    
    const onRequest = (offset) => {

        onCharsListLoading()
        marvelService.getAllCharacters(offset)
            .then(onCharsListLoaded)
            .catch(onError)
    }

    const onCharsListLoading = () => {
        setNewCharsLoading(true)
    }

    const onCharsListLoaded = (newCharsList) => {
        let charsEnded = true
        if (newCharsList.length < 9) {
            charsEnded = false
        }

        setCharsList(charsList => [...charsList, ...newCharsList])
        setLoading(false)
        setOffset(offset => offset +9)
        setNewCharsLoading(false)
        setButtonVisible(charsEnded)
    }

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const itemRefs = useRef([])

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove("char__item_selected"))
        itemRefs.current[id].classList.add("char__item_selected")
        itemRefs.current[id].focus()
    }



    function itemsRender(charsList) {
         const items = charsList.map((item, i) => {
            const {name, thumbnail, id} = item
            const imageStyle = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? {objectFit: 'unset'} : {objectFit: 'cover'}
            return(
                <li 
                ref={el => itemRefs.current[i] = el}
                tabIndex={0}
                onClick={() => {
                    props.onCharSelected(id)
                    focusOnItem(i)
                }}
                onKeyPress={e => {
                    if (e.key === "" || e.key === "Enter"){
                        props.onCharSelected(id)
                        focusOnItem(i)
                    }
                }}
                key={id} 
                className="char__item">
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


    const items = itemsRender(charsList)
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
                    onRequest(offset)
                }}
                className="button button__main button__long">
                    <div className="inner">load more</div>
            </button>
        </div>
    )

}

CharsList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}
// CharsList.defaultProps = {
//     : 
// }

export default CharsList;

