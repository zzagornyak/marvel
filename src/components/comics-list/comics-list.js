import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


import useMarvelService from '../../services/marvel-services';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';

import './comics-list.scss';


const ComicsList = () => {
    const [comics, setComics] = useState([])
    const [offset, setOffset] = useState(7000) 
    const [onNewComicsLoading, setNewComicsLoading] = useState(false)
    const [buttonVisible, setButtonVisible] = useState(true)

    const {loading, error, getComics} = useMarvelService()

    
    useEffect(()=> {
        onRequest(offset, true)
// eslint-disable-next-line
    }, [])
    
    const onRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true)
        getComics(offset)
            .then(res => {
                onComicsLoaded(res)
            })
    }

    function onComicsLoaded(newComics) {
        const comicsEnded = newComics.length < 8 ? false : true


        setComics(comics => [...comics, ...newComics])
        setOffset(offset => offset+9)
        setNewComicsLoading (false)
        setButtonVisible(comicsEnded)
    }

    const items = comics.map((item, i) => {
        const {name, thumbnail, price, } = item
        return (
            <li key={i} className="comics__item">
                    <Link  to={`/comics/${item.id}`}>
                        <img src={thumbnail} alt={name} 
                        className="comics__item-img"/>
                        <div className="comics__item-name">{name}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
            </li>
        )
    })


    const spinner = loading && !onNewComicsLoading ? <Spinner style={{alignSelf: "center"}}/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    const buttonStyle = buttonVisible ? null : {display:"none"}


    return (
        <div className="comics__list">
                {spinner}
            <ul className="comics__grid">
                {items}
                {errorMessage}
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