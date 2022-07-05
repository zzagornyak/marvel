import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import useMarvelService from '../../services/marvel-services';
import ErrorMessage from '../error-message/error-message';
import Spinner from '../spinner/spinner';
import Skeleton from '../skeleton/skeleton';

import './char-info.scss';


const CharInfo = (props) => {
    const [char, setChar] = useState(null)
  
    const {loading, error, getCharacter, clearError} = useMarvelService()

    useEffect(() => {
        updateChar()
// eslint-disable-next-line
    }, [props.charId])

    const updateChar = () => {
        clearError()
        const {charId} = props
        if (!charId) {
            return
        }
        getCharacter(charId)
            .then(onCharLoaded)
    }
    
    const onCharLoaded = (char) => {
        setChar(char)
    }

    

    const spinner = loading ? <Spinner/> : null 
    const errorMessage = error ? <ErrorMessage/>  : null
    const content = !(loading || error || !char) ? <View char={char} /> : null
    const skeleton = char || spinner || errorMessage  ? null : <Skeleton/> 
    return (
        <div className="char__info">
            {spinner}
            {errorMessage}
            {content}   
            {skeleton}             
        </div>
    )
}


const View = ({char}) => {

    const {name, description, wiki, homepage, thumbnail, comics} = char
    const imageStyle = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? {objectFit: 'unset'} : {objectFit: 'cover'}
    const comicsItems = comics.map((item, index) => {
        const comicsId = item.resourceURI.match(/\d+$/g)[0]; 
        // eslint-disable-next-line
        
        return (
            <Link to={`/comics/${comicsId}`} key={index} className="char__comics-item">
                    {item.name}
            </Link>
        )
    })
    return (
        <>
            <div className="char__basics">
                <img
                    style={imageStyle} 
                    src={thumbnail} 
                    alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsItems.length>0 ? comicsItems : "There are no comics for this character"}
            </ul>
        </>
            
        
    )
}

export default CharInfo;



  