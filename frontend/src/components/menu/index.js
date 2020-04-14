import React  from 'react';
import './styles.css';
import volantyLogo from '../../assets/volanty-logo.png';


const Menu = () => {
    return <nav className="menu-nav">
        <div className="brand">
            <img className="logo" src={volantyLogo} alt="Volanty brand logo"/>
        </div>
        <div className="entry">
            <p>Home</p>
            <p>Bases</p>
            <p>Match</p>
        </div>
    </nav>
}

export default Menu; 