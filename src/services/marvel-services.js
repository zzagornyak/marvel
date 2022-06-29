import {useHttp} from "../hooks/http.hooks"


const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp()

    const _apiBase = "https://gateway.marvel.com:443/v1/public/"
    const _apiKey = "apikey=45a892704752bc34880c920802df307a"
    const _baseOffset = 210
    const _baseComicsOffset = 5000
    
    const getComics = async (offset=_baseComicsOffset) => {
        const res = await request(`${_apiBase}comics?format=comic&hasDigitalIssue=true&limit=8&offset=${offset}&apikey=45a892704752bc34880c920802df307a`)
        return res.data.results.map(_transformCharacter)
    }
    
    
    const getAllCharacters = async (offset=_baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    
    }

    const _transformCharacter = (arg) => {
        return {
            id: arg.id,
            name: arg.name? arg.name : arg.title,
            description: arg.description ? arg.description.slice(0,210)+"..." : "There is no description for this character.",
            thumbnail: arg.thumbnail.path + "." + arg.thumbnail.extension,
            homepage: arg.urls[0].url,
            wiki: arg.urls[1].url,
            comics: arg.comics ? arg.comics.items: null,
            price: arg.price ? arg.prices[0].price : null
        }
    }
    return {loading, error, getAllCharacters, getCharacter, clearError,getComics}
    
}    

export default useMarvelService;






// axios.get("https://jsonplaceholder.typicode.com/todos/1")
//   .then(response => console.log("response", response.data))

// axios
//   .post("https://jsonplaceholder.typicode.com/posts", {
//     title: "Title of post",
//     body: "Body of post"
//   })
//   .then(response => console.log(response.data))
//   .catch(error => console.log(error));