import { useState, useEffect, useRef } from 'react';
import './Header.modules.css';
import logoImg from './../../assets/logo.png';
import BeforeInstallPromptEvent from './../../types/BeforeInstallPromptEvent';

const Header = () => {
    const [isInstallBtn, setIsInstallBtn] = useState(true);
    const deferredPrompt = useRef<BeforeInstallPromptEvent | null>();

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt.current = e;
        });
    }, []);

    useEffect(() => {
        (deferredPrompt.current) ? setIsInstallBtn(true) : setIsInstallBtn(false);
    }, [deferredPrompt.current]);

    const handleInstall = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (deferredPrompt.current?.prompt && deferredPrompt.current.userChoice) {
            await deferredPrompt.current.prompt();
            const { outcome } = await deferredPrompt.current.userChoice;
            if (outcome === 'accepted') {
                deferredPrompt.current = null;
            }
        }
    }

    const handleShare = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (navigator.share) {
            await navigator.share({
                title: 'The Routine',
                url: window.location.href
            });
        }
    }

    return (
        <header className='header'>
            <a href="/" className='app-name'>
                <img src={logoImg} className='app-name-logo' alt="logo" />
                <h1 className='app-name-text'>The Routine</h1>
            </a>
            {
                (isInstallBtn) ? (
                    <a href='#' className='app-action' onClick={handleInstall}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M320-160v-40H160q-33 0-56.5-23.5T80-280v-480q0-33 23.5-56.5T160-840h280q17 0 28.5 11.5T480-800q0 17-11.5 28.5T440-760H160v480h640v-80q0-17 11.5-28.5T840-400q17 0 28.5 11.5T880-360v80q0 33-23.5 56.5T800-200H640v40q0 17-11.5 28.5T600-120H360q-17 0-28.5-11.5T320-160Zm320-393v-247q0-17 11.5-28.5T680-840q17 0 28.5 11.5T720-800v247l76-75q11-11 27.5-11.5T852-628q11 11 11 28t-11 28L708-428q-12 12-28 12t-28-12L508-572q-11-11-11.5-27.5T508-628q11-11 28-11t28 11l76 75Z" /></svg>
                    </a>
                ) : (
                    <a href='#' className='app-action' onClick={handleShare}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Z" /></svg>
                    </a>
                )
            }
        </header>
    );
};

export default Header;