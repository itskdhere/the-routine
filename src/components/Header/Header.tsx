import { useEffect, useState } from 'react';
import './Header.modules.css';
import githubLogoForDarkMode from './../../assets/github-mark-white.svg';
import githubLogoForLightMode from './../../assets/github-mark.svg';
import logoImg from './../../assets/logo.png';

const Header = () => {
    const [prefersDarkMode, setPrefersDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

    useEffect(() => {
        if (!window.matchMedia) return;
        const query = window.matchMedia('(prefers-color-scheme: dark)');
        const prefersDarkMode = query.matches;
        setPrefersDarkMode(prefersDarkMode);
        query.addEventListener('change', (event) => setPrefersDarkMode(event.matches));
    }, [prefersDarkMode]);

    return (
        <header className='header'>
            <a href="/" className='app-name'>
                <img src={logoImg} className='app-logo' alt="logo" />
                <h1>The Routine</h1>
            </a>
            <a href='https://github.com/itskdhere/the-routine' target="_blank" className='app-repo'>
                <img src={prefersDarkMode ? githubLogoForDarkMode : githubLogoForLightMode} alt="GitHub" />
            </a>
        </header>
    );
};

export default Header;