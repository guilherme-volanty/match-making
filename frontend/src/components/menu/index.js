import React  from 'react';
import './styles.css';
import volantyLogo from '../../Assets/volanty-logo.svg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';



const Headerr = () => {
    return <nav className="menu-nav">
        <div className="brand">
            <img className="logo" src={volantyLogo} alt="Volanty brand logo"/>
        </div>
         <Navbar collapseOnSelect expand="lg" variant="light">
          <Navbar.Collapse id="responsive-navbar-nav">
           <Nav className="linksnavgador">
            <Nav.Link href="home"><p>Home</p></Nav.Link>
            <Nav.Link href="upload-database"><p>Bases</p></Nav.Link>
            <Nav.Link href="match"><p>Match</p></Nav.Link>
           </Nav>
           </Navbar.Collapse>
      
      </Navbar>
    </nav>
}

export default Headerr;