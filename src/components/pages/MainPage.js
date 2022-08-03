import { useState } from "react";

import RandomChar from "../random-char/random-char";
import CharList from "../char-list/char-list";
import CharInfo from "../char-info/char-info"
import CharSearch from "../char-search/char-search";
import ErrorBoundary from "../errorBoundaries/errorBoundary";
import decoration from '../../resources/img/vision.png';



const MainPage = () => {
    const [currentCharId, setСurrentCharId] = useState(null)

    const onCharSelected = (id) => {
        setСurrentCharId(id)
    }
    

    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
                <aside className="char__aside">
                    <CharInfo charId={currentCharId} />
                    <CharSearch />
                </aside>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage;