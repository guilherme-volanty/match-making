import React from 'react';
import './styles.css';
import volantyLogo from '../../assets/volanty-logo.png';
import { Nav, Navbar, NavDropdown} from 'react-bootstrap'


const Menu = () => {
    return (
        <Navbar className="menu-nav" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <div className="brand">
                <img className="logo" src={volantyLogo} alt="Volanty brand logo" />
            </div>
            <Navbar.Toggle className="toggle" aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto entry">
                    <div className="items-container">
                        <Nav.Link href="/" className="menu-item">Home</Nav.Link>
                        <NavDropdown title="Bases" className="menu-item" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/upload-database">Upload Base Principal</NavDropdown.Item>
                            <NavDropdown.Item href="/search-database">Consulta Base Principal</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.3">Upload Base Comparação</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Consulta Base Comparação</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/match" className="menu-item">Match</Nav.Link>
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}

export default Menu;