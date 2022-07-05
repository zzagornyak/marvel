import './single-comic.scss';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/marvel-services';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"



const SingleComic = () => {

    const {comicId} = useParams()
    const [comic, setComic] = useState({})
    const {getComic, loading, error, clearError} = useMarvelService()
    
    useEffect(() => {
        console.log("update")
        updateComic(comicId)
// eslint-disable-next-line
    },[comicId])
    
    const updateComic = (id) => {
        clearError()
        getComic(id).then(res => {
            onComicLoaded(res)
        })
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    
    const spinner = loading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null 
    const content = !(loading || error|| !comic) ? <View comic={comic}/> : null
    return (
        <div className="single-comic">
            {spinner}
            {errorMessage}
            {content}
        </div>
    )
}


const View = ({comic}) => {
    const {name, description, thumbnail, price, language, pages, purchase} = comic
    return (
        <>
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages}</p>
                <p className="single-comic__descr">Language: {language ? language : "Please check in the our store"}</p>
                <div className="single-comic__price">{price}$</div>
                <a href={purchase} className="single-comic__descr">Click to buy in the our store</a>
            </div>
            <Link  to="../comics" className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleComic;