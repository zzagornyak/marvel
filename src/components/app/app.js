import {lazy, Suspense } from 'react/';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// import MainPage from "../pages/MainPage"
// import ComicsPage from "../pages/ComicsPage"
// import SingleComicPage from "../pages/SingleComicPage"
// import Page404 from "../pages/404";

import AppHeader from "../app-header/app-header";

const MainPage = lazy( ()=> import("../pages/MainPage") )
const ComicsPage = lazy( ()=> import("../pages/ComicsPage") )
const SingleItemPage = lazy( ()=> import("../pages/SingleItemPage") )
const Page404 = lazy( ()=> import("../pages/404") )

const App = () => {
    return (
        <Suspense fallback={<span>Loading</span>}>
            <Router>
                <div className="app">
                    <div className="app__content">
                        <AppHeader/>
                        
                        <main>
                            <Routes>
                                <Route path="/" element={<MainPage/>}/>
                                <Route path="/:characterId" element={<SingleItemPage/>}/>
                                <Route path="/comics" element={<ComicsPage/>}/>
                                <Route path="/comics/:comicId" element={<SingleItemPage/>}/>
                                <Route path="*" element={<Page404/>}/>
                            </Routes>
                        </main>
                    </div>
                </div>
            </Router>
        </Suspense>
    )
}

export default App;