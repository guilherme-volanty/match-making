
import React  from 'react';
import '../Style/header.css';

const volantyLogo ="https://assets.volanty.com/images/3.0/nova-logo.svg"


const Header = () => {
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

export default Header; 