import React, { useState, useEffect } from "react";
import { sendForm } from "@emailjs/browser"; // Importe o EmailJS
import "../css/Contact.css";

const seu_template_id = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const seu_public_key= process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const seu_service_id = process.env.REACT_APP_EMAILJS_SERVICE_ID;

const Contact = () => {
  // Estado para os dados do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Estado para mensagens de erro
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
    unsuccess: "",
  });

  // Estado para mensagem de sucesso
  const [success, setSuccess] = useState({
    message: "",
  });

  // Função para validar o formulário
  const validateForm = () => {
    const newErrors = { name: "", email: "", message: "" };
    let isValid = true;
    setSuccess({ message: "" });
    setErrors({ unsuccess: "" });

    // Validação do nome
    if (!formData.name.trim()) {
      newErrors.name = "O nome é obrigatório.";
      isValid = false;
    } else {
      if (formData.name.length < 5) {
        newErrors.name = "O nome deve ter pelo menos 5 caracteres.";
        isValid = false;
      }
    }

    // Validação do e-mail
    if (!formData.email.trim()) {
      newErrors.email = "O e-mail é obrigatório.";
      isValid = false;
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Por favor, insira um e-mail válido.";
        isValid = false;
      }
    }

    // Validação da mensagem
    if (!formData.message.trim()) {
      newErrors.message = "A mensagem é obrigatória.";
      isValid = false;
    } else {
      if (formData.message.length < 10) {
        newErrors.message = "A mensagem deve ter pelo menos 10 caracteres.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Função para lidar com mudanças nos campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setSuccess({ message: "" });
  };

  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setSuccess({ message: "" }); //limpa mensagem de sucesso
        setErrors({ unsuccess: "" }); //limpa mensagem de erro

        // Envia o e-mail usando EmailJS
        //deixar desativado no teste
         await sendForm(
           seu_service_id, // ID do Serviço (EmailJS > Services)
           seu_template_id, // ID do Template (EmailJS > Email Templates)
           e.target, // Elemento do formulário
           seu_public_key // User ID (EmailJS > Account > API Keys)
          );

        // Limpa o formulário e exibe mensagem de sucesso
        setFormData({ name: "", email: "", message: "" });
        setErrors({ name: "", email: "", message: "", unsuccess: "" });
        setSuccess({ message: "Mensagem enviada com sucesso!" });
      } catch (error) {
        console.error("Erro:", error);
        setErrors({
          ...errors,
          unsuccess: "Erro ao enviar a mensagem. Tente novamente.",
        });
        setSuccess({ message: "" });
      }
    }
  };

  // Função para limpar o formulário
  const handleReset = () => {
    setFormData({ name: "", email: "", message: "" }); // Limpa os dados do formulário
    setErrors({ name: "", email: "", message: "", unsuccess: "" }); // Limpa as mensagens de erro
    setSuccess({ message: "" }); // Limpa a mensagem de sucesso
  };

  useEffect(() => {
    if (errors.unsuccess) {
      const timer = setTimeout(() => {
        setErrors({ ...errors, unsuccess: null });
      }, 5000); // 5000 milissegundos = 5 segundos

      return () => clearTimeout(timer); // Limpa o timer quando o componente é desmontado
    }
  }, [errors.unsuccess]);

  useEffect(() => {
    if (success.message) {
      const timer = setTimeout(() => {
        setSuccess({ message: null });
      }, 5000); // 5000 milissegundos = 5 segundos

      return () => clearTimeout(timer); // Limpa o timer quando o componente é desmontado
    }
  }, [success.message]);

  return (
    <div className="contact-container">
      <h2>Contato</h2>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite seu nome"
              aria-label="Nome"
              aria-describedby="name-help"
              className={errors.name ? "input-error" : ""}
            />
          </label>
          {errors.name && (
            <small id="name-help" className="errors-text">
              {errors.name}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              aria-label="Email"
              aria-describedby="email-help"
              className={errors.email ? "input-error" : ""}
            />
          </label>
          {errors.email && (
            <small id="email-help" className="errors-text">
              {errors.email}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message">
            Mensagem:
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Digite sua mensagem"
              aria-label="Mensagem"
              aria-describedby="message-help"
              className={errors.message ? "input-error" : ""}
            ></textarea>
          </label>
          {errors.message && (
            <small id="message-help" className="errors-text">
              {errors.message}
            </small>
          )}
        </div>

        <div className="Contact-Buttons">
          <button type="submit" aria-label="Enviar mensagem">
            Enviar
          </button>
          <button
            type="button"
            onClick={handleReset}
            aria-label="Limpar formulário"
          >
            Limpar
          </button>
        </div>
        {/* Mensagem de erro */}
        {errors.unsuccess && (
          <small
            id="unsuccess-message"
            className="errors-text"
            aria-live="assertive"
          >
            {errors.unsuccess}
          </small>
        )}

        {/* Mensagem de sucesso */}
        {success.message && (
          <small
            id="success-message"
            className="success-text"
            aria-live="assertive"
          >
            {success.message}
          </small>
        )}
      </form>
    </div>
  );
};

export default Contact;
