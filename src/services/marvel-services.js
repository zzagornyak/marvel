import {useHttp} from "../hooks/http.hooks"


const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp()

    const _apiBase = "https://gateway.marvel.com:443/v1/public/"
    const _apiKey = "apikey=45a892704752bc34880c920802df307a"
    const _baseOffset = 210
    const _baseComicsOffset = 5000
    
    const getComics = async (offset=_baseComicsOffset) => {
        const res = await request(`${_apiBase}comics?format=comic&hasDigitalIssue=true&limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }
    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0])
    }
    
    // https://gateway.marvel.com:443/v1/public/comics/82967?apikey=45a892704752bc34880c920802df307a
    const getAllCharacters = async (offset=_baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    
    }

    const _transformCharacter = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description ? character.description.slice(0,210)+"..." : "There is no description for this character.",
            thumbnail: character.thumbnail.path + "." + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items,
        }
    }

    const _transformComics = (comic) => {
        return {
            id: comic.id,
            name: comic.title,
            description: comic.description ? comic.description : "There is no description for this comic.",
            thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
            homepage: comic.urls[0].url,
            price: comic.prices ? comic.prices[0].price : "is not available to purchase",
            language: comic.textObjects[0].language,
            pages: comic.pageCount

        }
    }
    return {loading, error, getAllCharacters, getCharacter, clearError,getComics, getComic}
    
}    

export default useMarvelService;



