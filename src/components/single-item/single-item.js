import './single-item.scss';
import useMarvelService from '../../services/marvel-services';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';


const SingleItem = () => {
    const {comicId, characterId} = useParams()
    const [item, setItem] = useState({})
    const {getComic, getCharacterByName, loading, error, clearError} = useMarvelService()
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        if (comicId) {
            clearError()
            getComic(comicId)
                .then(res => onItemLoaded(res))
        } else {
            clearError()
            getCharacterByName(characterId)
                .then(res => onItemLoaded(res))

        }
// eslint-disable-next-line
    }, [])
    
    const onItemLoaded = (item) => {
        setItem(item)
    }

    
    const spinner = loading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null 
    const content = !(loading || error|| !item) ? <View item={item}/> : null
    return (
        <div className="single-item">
            {spinner}
            {errorMessage}
            {content}
        </div>
    )
}


const View = ({item}) => {
    const {name, description, thumbnail, price, language, pages, purchase} = item
    return (
        <>
            <img src={thumbnail} alt={name} className="single-item__img"/>
            <div className="single-item__info">
                <h2 className="single-item__name">{name}</h2>
                <p className="single-item__descr">{description}</p>
                {pages ? <p className="single-item__descr">{pages}</p> : null}
                {language ? <p className="single-item__descr">Language: {language}</p> : null}
                {price ? <div className="single-item__price">{price}$</div> : null}
                {price ? <a href={purchase} className="single-item__descr">Click to buy in the our store</a> : null}
            </div>
            <span 
                onClick={() => {
                    window.history.back()
                }}   className="single-item__back">
                Back to all
            </span>
        </>
    )
}

export default SingleItem;