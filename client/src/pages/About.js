import React from "react";
import "../css/About.css";

const About = () => {
  return (
    <div className="about-container" role="region" aria-label="Sobre Mim">
      <h2>Sobre Mim</h2>
      <div className="about-text">
        <p>
          Olá! Meu nome é <strong>Ana</strong>, sou <em>desenvolvedora web</em>{" "}
          com experiência em criação de soluções interativas e eficientes. Tenho
          paixão por aprender novas tecnologias e utilizá-las para resolver
          problemas do mundo real.          
          <span lang="en">Let's build something amazing together!</span>
        </p>
        <p>
          Ao longo da minha carreira, trabalhei em projetos que abrangem desde
          sites dinâmicos a aplicativos modernos, sempre com foco na experiência
          do usuário e na qualidade do código.
        </p>
        <p id="descricao">
          Aqui você encontrará alguns dos meus trabalhos e as tecnologias que
          utilizo. Vamos construir algo incrível juntos!
        </p>
        <button aria-describedby="descricao">Ver Projetos</button>
      </div>
    </div>
  );
};

export default About;
