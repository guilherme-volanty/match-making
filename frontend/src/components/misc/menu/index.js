import React from 'react';
import { singOut } from "../../../services/auth";
// import Cookie from "js-cookie";
import './styles.css';
import volantyLogo from '../../../assets/volanty-logo.png';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router';

const Menu = () => {
    let history = useHistory();
    //const userName=Cookie.getJSON("user");

    const onClick = () => {
      singOut();
      history.push("/login")
    };

    return (
        <Navbar className="menu-nav" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <div className="brand">
                <img className="logo" src={volantyLogo} alt="Volanty brand logo" />
            </div>
            <Navbar.Toggle className="toggle" aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto entry">
                    <div className="items-container">
                        <NavDropdown title="Bases" className="menu-item" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/upload-database">Upload Base Principal</NavDropdown.Item>
                            <NavDropdown.Item href="/search-database">Consulta Base Principal</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/upload-match">Upload Base Match</NavDropdown.Item>
                            <NavDropdown.Item href="/search-match">Consulta Base Match</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Match" className="menu-item" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/match-screen">Faça Match</NavDropdown.Item>
                            <NavDropdown.Item href="/match-table">Tabela de Matches</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </Nav>
                <div className="navbar-nav ml-auto">
            <div className="navbar-brand justify-content-between">
              {/*{userName}*/}
            </div>
            <button
              className="btn btn-primary menu"
              onClick={onClick}
            >
              Sair
            </button>
          </div>
            </Navbar.Collapse>
        </Navbar>
    )

}

export default Menu;