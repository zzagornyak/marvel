import {useHttp} from "../hooks/http.hooks"


const useMarvelService = () => {
    const {loading, request, error} = useHttp()

    const _apiBase = "https://gateway.marvel.com:443/v1/public/"
    const _apiKey = "apikey=45a892704752bc34880c920802df307a"
    const _baseOffset = 210
 
    const getAllCharacters = async (offset=_baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? char.description.slice(0,210)+"..." : "There is no description for this character.",
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
    return {loading, error, getAllCharacters, getCharacter}
    
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