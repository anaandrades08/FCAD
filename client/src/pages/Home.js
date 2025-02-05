import React from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";

function Home() {
  return (
    <main className="home-container" role="main">
      <section 
        className="banner" 
        role="region" 
        aria-label="Boas-vindas"
      >
        <h1>Bem-vindo ao meu formulário de cadastro!</h1>
        <p className="banner-subtitle">Explorando tecnologia, design e inovação!</p>
      </section>

      <div className="sections-grid">
        <section 
          className="cadastre-me card"
          role="region"
          aria-labelledby="cadastro-heading"
        >
          <h2 id="cadastro-heading">Cadastre-se</h2>
          <p>
            <Link to="/form" className="button-link">
              <button aria-label="Ir para o formulário de cadastro">
                Começar Cadastro
              </button>
            </Link>
          </p>
        </section>

        <section 
          className="about-me card"
          role="region"
          aria-labelledby="sobre-heading"
        >
          <h2 id="sobre-heading">Sobre Mim</h2>
          <p>Sou uma desenvolvedora apaixonada por criar soluções acessíveis...</p>
          <Link to="/about" className="button-link">
            <button aria-label="Saiba mais sobre mim">
              Ver Detalhes
            </button>
          </Link>
        </section>

        <section 
          className="contact-me card"
          role="region"
          aria-labelledby="contato-heading"
        >
          <h2 id="contato-heading">Contato</h2>
          <p>
            <Link to="/contact" className="button-link">
              <button aria-label="Entrar em contato">
                Fale Comigo
              </button>
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default Home;