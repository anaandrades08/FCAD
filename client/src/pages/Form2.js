import React, { useContext, useState, useEffect } from "react";
import { FormContext } from "../context/FormContext";
import { useNavigate } from "react-router-dom";
import "../css/Form.css";

function Form() {
  const { formData, setFormData } = useContext(FormContext);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  // Limpa os dados do formulário quando o componente é montado
  useEffect(() => {
    setFormData({
      nomeCompleto: "",
      cpf: "",
      email: "",
      endereco: "",
      numero: "",
      complemento: "", // Novo campo
      bairro: "",
      cidade: "",
      uf: "",
      cep: "",
      dataNascimento: "",
      celular: "",
      login: "",
      senha: "",
      confirmarSenha: "",
      estadoCivil: "",
      interesses: [],
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }, [setFormData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "cep") {
      const cepFormatado = value.replace(/\D/g, "").slice(0, 8);
      setFormData({ ...formData, [name]: cepFormatado });
    } else if (name === "cpf") {
      const cpfFormatado = value.replace(/\D/g, "").slice(0, 11);
      setFormData({ ...formData, [name]: cpfFormatado });
    } else if (name === "celular") {
      const celularFormatado = value.replace(/\D/g, "").slice(0, 11);
      setFormData({ ...formData, [name]: celularFormatado });
    } else if (type === "checkbox") {
      const interesses = formData.interesses || [];
      if (checked) {
        setFormData({ ...formData, interesses: [...interesses, value] });
      } else {
        setFormData({
          ...formData,
          interesses: interesses.filter((item) => item !== value),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBuscarCep = async () => {
    const cep = formData.cep.replace(/\D/g, "");

    if (cep.length !== 8) {
      alert("CEP inválido. O CEP deve conter 8 dígitos.");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        throw new Error("CEP não encontrado.");
      }

      setFormData({
        ...formData,
        endereco: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf,
      });
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao buscar CEP. Verifique o CEP e tente novamente.");
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11) return false;
    return true;
  };

  const validateDateOfBirth = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= 18;
    }
    return age >= 18;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setMessage({ text: "Email inválido.", type: "error" });
      return;
    }

    if (!validateCPF(formData.cpf)) {
      setMessage({ text: "CPF inválido.", type: "error" });
      return;
    }

    if (!validateDateOfBirth(formData.dataNascimento)) {
      setMessage({
        text: "Você deve ter pelo menos 18 anos.",
        type: "error",
      });
      return;
    }

    if (formData.senha.length < 8) {
      setMessage({
        text: "A senha deve ter pelo menos 8 caracteres.",
        type: "error",
      });
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setMessage({ text: "As senhas não coincidem.", type: "error" });
      return;
    }

    try {
      console.log("Enviando dados:", formData);

      setMessage({ text: "Cadastro realizado com sucesso!", type: "success" });

      setTimeout(() => {
        navigate("/result");
      }, 2000);
    } catch (error) {
      setMessage({
        text: "Erro ao enviar os dados. Tente novamente.",
        type: "error",
      });
      console.error("Erro:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      nomeCompleto: "",
      cpf: "",
      email: "",
      endereco: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
      cep: "",
      dataNascimento: "",
      celular: "",
      login: "",
      senha: "",
      confirmarSenha: "",
      estadoCivil: "",
      interesses: [],
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    setMessage({ text: "", type: "" });
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Usuários</h2>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        {/* Dados Pessoais */}
        <fieldset className="fieldset-dados-pessoais">
          <legend>Dados Pessoais</legend>
          <label htmlFor="nomeCompleto">Nome Completo:</label>
          <input
            type="text"
            id="nomeCompleto"
            name="nomeCompleto"
            minLength={5}
            value={formData.nomeCompleto}
            onChange={handleChange}
            required
          />

          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf.replace(
              /(\d{3})(\d{3})(\d{3})(\d{2})/,
              "$1.$2.$3-$4"
            )}
            onChange={handleChange}
            required
          />

          <label htmlFor="dataNascimento">Data de Nascimento:</label>
          <input
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            required
          />

          <label htmlFor="estadoCivil">Estado Civil:</label>
          <select
            id="estadoCivil"
            name="estadoCivil"
            value={formData.estadoCivil}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="Solteiro">Solteiro</option>
            <option value="Casado">Casado</option>
            <option value="Viuvo">Viúvo</option>
            <option value="Divorciado">Divorciado</option>
          </select>
        </fieldset>

        {/* Dados de Contato */}
        <fieldset className="fieldset-dados-contato">
          <legend>Dados de Contato</legend>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            minLength={5}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="celular">Celular:</label>
          <input
            type="text"
            id="celular"
            name="celular"
            value={formData.celular.replace(
              /(\d{2})(\d{5})(\d{4})/,
              "($1) $2-$3"
            )}
            onChange={handleChange}
            required
          />
          <label htmlFor="cep">CEP:</label>
          <input
            type="text"
            id="cep"
            name="cep"
            value={formData.cep.replace(/(\d{5})(\d{3})/, "$1-$2")}
            onChange={handleChange}
            onBlur={handleBuscarCep} // Adicionado o evento onBlur
            required
          />

          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            required
            readOnly // Em vez de disabled
            aria-readonly="true"
          />

          <div className="numero-complemento">
            <div>
              <label htmlFor="numero">Número:</label>
              <input
                type="text"
                id="numero"
                name="numero"
                maxLength={5}
                value={formData.numero}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="complemento">Complemento:</label>
              <input
                type="text"
                id="complemento"
                name="complemento"
                maxLength={50}
                value={formData.complemento}
                onChange={handleChange}
              />
            </div>
          </div>

          <label htmlFor="bairro">Bairro:</label>
          <input
            type="text"
            id="bairro"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            required
            disabled
          />

          <label htmlFor="cidade">Cidade:</label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
            disabled
          />

          <label htmlFor="uf">UF:</label>
          <input
            type="text"
            id="uf"
            name="uf"
            value={formData.uf}
            onChange={handleChange}
            required
            disabled
          />
        </fieldset>

        {/* Dados de Cadastro */}
        <fieldset className="fieldset-dados-cadastro">
          <legend>Dados de Cadastro</legend>
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            id="login"
            name="login"
            minLength={8}
            value={formData.login}
            onChange={handleChange}
            required
          />

          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            maxLength={12}
            minLength={8}
            value={formData.senha}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmarSenha">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            maxLength={12}
            minLength={8}
            value={formData.confirmarSenha || ""}
            onChange={handleChange}
            required
          />
        </fieldset>

        {/* Interesses */}
        <fieldset className="fieldset-dados-interesses">
          <legend>Interesses</legend>
          <div className="checkbox-group">
            {[
              "Automóveis",
              "Culinária",
              "Cultura",
              "Esportes",
              "Economia",
              "Educação",
              "Empregos",
              "Jogos",
              "Moda e Estilo",
              "Policial",
              "Política",
              "Tecnologia",
              "Tempo",
              "Viagem",
            ].map((interesse) => (
              <div key={interesse}>
                <input
                  type="checkbox"
                  id={interesse.toLowerCase()}
                  name="interesses"
                  value={interesse}
                  onChange={handleChange}
                />
                <label htmlFor={interesse.toLowerCase()}>{interesse}</label>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Botões */}
        <div className="button-container">
          <button type="submit" aria-label="Enviar cadastro">
            Cadastrar
          </button>
          <button
            aria-label="Limpar formulário"
            type="button"
            onClick={handleReset}
          >
            Limpar
          </button>
        </div>
      </form>
      {message.text && (
        <div
          className={message.type === "error" ? "errors-text" : "success-text"}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}

export default Form;
