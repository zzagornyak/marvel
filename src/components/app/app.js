import { useState } from "react";

import ErrorBoundary from "../errorBoundaries/errorBoundary";
import AppHeader from "../app-header/app-header";
import RandomChar from "../random-char/random-char";
import CharList from "../char-list/char-list";
import CharInfo from "../char-info/char-info"
import ComicsList from "../comics-list/comics-list";

import decoration from '../../resources/img/vision.png';


const App = () => {

    const [currentCharId, setСurrentCharId] = useState(null)

    const onCharSelected = (id) => {
        setСurrentCharId(id)
    }
    
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    {/* <RandomChar/> */}
                </ErrorBoundary>
                <div className="char__content">
                    {/* <ErrorBoundary> */}
                        {/* <CharList */}
                            {/* onCharSelected={onCharSelected}/> */}
                    {/* </ErrorBoundary> */}
                    {/* <CharInfo charId={currentCharId} /> */}
                    <ComicsList/>
                </div>
                {/* <img className="bg-decoration" src={decoration} alt="vision"/> */}
            </main>
        </div>
    )
}

export default App;