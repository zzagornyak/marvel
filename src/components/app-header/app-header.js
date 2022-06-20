import './app-header.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="google.com">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a href="google.com">Characters</a></li>
                    /
                    <li><a href="google.com">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;