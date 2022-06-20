import AppHeader from "../app-header/app-header";
import RandomChar from "../random-char/random-char";
import CharList from "../char-list/char-list";
import CharInfo from "../char-info/char-info"

import decoration from '../../resources/img/vision.png';


const App = () => {
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList/>
                    <CharInfo/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;