import { Component } from "react/cjs/react.production.min";
import ErrorBoundary from "../errorBoundaries/errorBoundary";
import AppHeader from "../app-header/app-header";
import RandomChar from "../random-char/random-char";
import CharList from "../char-list/char-list";
import CharInfo from "../char-info/char-info"

import MarvelService from "../../services/marvel-services";

import decoration from '../../resources/img/vision.png';



class App extends Component {
    state = {
        currentCharId: null   
    }

    marvelService = new MarvelService();

    onCharSelected = (id) => {
        this.setState({
            currentCharId: id
        })
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList
                                onCharSelected={this.onCharSelected}/>
                        </ErrorBoundary>
                        <CharInfo charId={this.state.currentCharId} />
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;