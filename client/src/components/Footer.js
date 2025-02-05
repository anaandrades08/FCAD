import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo" aria-label="Rodapé do site">
      <div class="footer-content">
        <p>© 2025 Sistema FCAD. Todos os direitos reservados.</p>
        <nav>
          <a href="/linkedin">Linkedin</a>
          <a href="/GitHub">GitHub</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
