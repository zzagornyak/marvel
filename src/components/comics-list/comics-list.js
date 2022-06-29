import {useState, useEffect } from 'react';

import avengers from "../../resources/img/Avengers.png"
import avengersLogo from "../../resources/img/Avengers_logo.png"

import useMarvelService from '../../services/marvel-services';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';

import './comics-list.scss';


const ComicsList = () => {
    const [comics, setComics] = useState([])
    const [offset, setOffset] = useState(10000) 
    const [onNewComicsLoading, setNewComicsLoading] = useState(false)
    const [buttonVisible, setButtonVisible] = useState(true)

    const {loading, error, getComics} = useMarvelService()
    
    
    useEffect(()=> {
        onRequest(offset, true)
    }, [])
    
    const onRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true)
        getComics(offset)
            .then(res => {
                onComicsLoaded(res)
            })
    }

    function onComicsLoaded(newComics) {
        setComics(comics => [...comics, ...newComics])
        setOffset(offset => offset+9)
        setNewComicsLoading (false)
    }

    const items = comics.map((item, i) => {
        const {name, thumbnail, price, homepage} = item
        return (
            <li key={i} className="comics__item">
                    <a  href={homepage}>
                        <img src={thumbnail} alt={name} 
                        className="comics__item-img"/>
                        <div className="comics__item-name">{name}</div>
                        <div className="comics__item-price">{price}</div>
                    </a>
            </li>
        )
    })


    const spinner = loading && !onNewComicsLoading ? <Spinner style={{alignSelf: "center"}}/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    const buttonStyle = buttonVisible ? null : {display:"none"}


    return (
        <div className="comics__list">
            <div className="comics__header">
                <img src={avengers} alt="" className="comics__header-avengers" />
                <div className="comics__header-text">
                    <span >New comics every week! Stay tuned!</span>
                </div>
        
                <img src={avengersLogo} alt="" className="comics__header-logo" />
            </div>

                {spinner}
            <ul className="comics__grid">
                {items}
                {error}
            </ul>

            <button 
                disabled={onNewComicsLoading}
                style={buttonStyle} 
                onClick={() => onRequest(offset, false)} 
                className="button button__main button__long">
                    <div  className="inner">
                        load more
                    </div>
            </button>
        </div>
    )
}

export default ComicsList;