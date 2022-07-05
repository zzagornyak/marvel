import { useEffect, useState, useRef } from 'react';
import PropTypes from "prop-types"
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import useMarvelService from '../../services/marvel-services';
import {CSSTransition,TransitionGroup,} from 'react-transition-group';

import './char-list.scss';

const CharsList = (props) => {

    const [charsList, setCharsList] = useState([])
    const [newCharsLoading, setNewCharsLoading] = useState(true)
    const [offset, setOffset] = useState(142)
    const [buttonVisible, setButtonVisible] = useState(true)
 
    const {loading, error, getAllCharacters} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
// eslint-disable-next-line
    }, [])
    
    const onRequest = (offset, initial) => {
        initial ? setNewCharsLoading(false) : setNewCharsLoading(true)
        getAllCharacters(offset)
            .then(onCharsListLoaded)
    }

    const onCharsListLoaded = (newCharsList) => {
        const charsEnded = newCharsList.length < 9 ? false : true

        setCharsList(charsList => [...charsList, ...newCharsList])
        setOffset(offset => offset +9)
        setNewCharsLoading(false)
        setButtonVisible(charsEnded)
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
                <CSSTransition
                onEnter={() => {
                    if(i > 9 && i % 9 === 1) {
                        console.log("scroll")
                        setTimeout(() => {
                            window.scrollBy(0,600)
                        },100)
                    }
                }}
                in={item.id}
                key={id}
                timeout={500}
                classNames={"char__item"}>
                    <li 
                        ref={el => itemRefs.current[i] = el}
                        tabIndex={0}
                        onClick={() => {
                            props.onCharSelected(id)
                            focusOnItem(i)
                            // window.scrollTo(0,300)
                        }}
                        onKeyPress={e => {
                            if (e.key === "" || e.key === "Enter"){
                                props.onCharSelected(id)
                                focusOnItem(i)
                            }
                        }}
                         
                        className="char__item">
                            <img style={imageStyle}
                                src={thumbnail} 
                                alt={name}/>
                            <div className="char__name">
                                {name}
                            </div>
                    </li>
                </CSSTransition>
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
    const spinner = loading && !newCharsLoading ? <Spinner/> : null 
    const buttonStyle = buttonVisible ? null: {display: "none"}

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            <TransitionGroup >
                {items}
            </TransitionGroup>
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

