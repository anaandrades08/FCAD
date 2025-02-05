import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const location = useLocation(); // Hook para obter a localização atual

  return (
    <header className="header" role="banner">
      <div className="header-content">
        <h1 aria-label="Logo FCAD">FCAD</h1>
        <nav
          className="nav-menu"
          role="navigation"
          aria-label="Navegação principal"
        >
          <ul className="nav-menu">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                aria-label="Página inicial da FCAD"
                aria-current={location.pathname === "/" ? "page" : undefined}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className="nav-link"
                aria-label="Página sobre a FCAD"
                aria-current={
                  location.pathname === "/about" ? "page" : undefined
                }
              >
                Sobre
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/form"
                className="nav-link"
                aria-label="Página de cadastro"
                aria-current={
                  location.pathname === "/form" ? "page" : undefined
                }
              >
                Cadastro
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/contact"
                className="nav-link"
                aria-label="Página de contato"
                aria-current={
                  location.pathname === "/contact" ? "page" : undefined
                }
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
