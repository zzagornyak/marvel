import {lazy, Suspense } from 'react/';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// import MainPage from "../pages/MainPage"
// import ComicsPage from "../pages/ComicsPage"
// import SingleComicPage from "../pages/SingleComicPage"
// import Page404 from "../pages/404";

import AppHeader from "../app-header/app-header";

const MainPage = lazy( ()=> import("../pages/MainPage") )
const ComicsPage = lazy( ()=> import("../pages/ComicsPage") )
const SingleComicPage = lazy( ()=> import("../pages/SingleComicPage") )
const Page404 = lazy( ()=> import("../pages/404") )

const App = () => {
    return (
        <Suspense fallback={<span>Loading</span>}>
            <Router>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </main>
                </div>
            </Router>
        </Suspense>
    )
}

export default App;