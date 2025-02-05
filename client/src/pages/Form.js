import React, { useContext, useState, useEffect } from "react";
import { FormContext } from "../context/FormContext.js";
import { useNavigate } from "react-router-dom";
import "../css/Form.css";

function Form() {
  const { formData, setFormData } = useContext(FormContext);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({ message: "" });
  const navigate = useNavigate();

  const initialFormData = {
    nomeCompleto: "",
    cpf: "",
    genero: "",
    dataNascimento: "",
    estadoCivil: "",
    email: "",
    celular: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    login: "",
    senha: "",
    confirmarSenha: "",
    interesses: [],
  };

  useEffect(() => {
    setFormData(initialFormData);
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }, [setFormData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Limpa erro do campo
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

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
      setErrors((prev) => ({
        ...prev,
        cep: "CEP inválido. Deve conter 8 dígitos",
      }));
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        throw new Error("CEP não encontrado");
      }
      // Verifica se o logradouro está vazio
      const logradouroVazio = !data.logradouro || data.logradouro.trim() === "";

      setFormData({
        ...formData,
        endereco: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade,
        uf: data.uf,
        // Habilita os campos se o logradouro estiver vazio
        enderecoEditavel: logradouroVazio,
        bairroEditavel: logradouroVazio,
      });
      // Limpa os erros dos campos
      setErrors({
        endereco: "",
        bairro: "",
        cidade: "",
        uf: "",
        cep: undefined,
      });
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setErrors((prev) => ({ ...prev, cep: "CEP não encontrado ou inválido" }));
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");
    return cpf.length === 11;
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
    const newErrors = {};

    // Validações
    if (!formData.nomeCompleto || formData.nomeCompleto.length < 5) {
      newErrors.nomeCompleto = "Nome completo deve ter pelo menos 5 caracteres";
      if (!formData.nomeCompleto) {
        newErrors.nomeCompleto = "Nome completo é obrigatório";
      }
    }
    if (!formData.cpf) {
      newErrors.cpf = "CPF é obrigatório";
    } else {
      if (!validateCPF(formData.cpf)) {
        newErrors.cpf = "CPF inválido";
      }
    }

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else {
      if (!validateEmail(formData.email)) {
        newErrors.email = "Email inválido";
      }
    }

    if (!formData.dataNascimento) {
      newErrors.dataNascimento = "Data de Nascimento é obrigatória";
    } else {
      if (!validateDateOfBirth(formData.dataNascimento)) {
        newErrors.dataNascimento = "Você deve ter pelo menos 18 anos";
      }
    }

    if (!formData.genero) {
      newErrors.genero = "Gênero é obrigatório";
    }
    if (!formData.estadoCivil) {
      newErrors.estadoCivil = "Estado Civil é obrigatório";
    }
    if (!formData.cep || formData.cep.length !== 8) {
      newErrors.cep = "CEP inválido";
      if (!formData.cep) {
        newErrors.cep = "CEP é obrigatório";
      }
    }
    if (!formData.endereco) {
      newErrors.endereco = "Endereço é obrigatório";
    }
    if (!formData.numero) {
      newErrors.numero = "Número é obrigatório";
    }
    if (!formData.bairro) {
      newErrors.bairro = "Bairro é obrigatório";
    }
    if (!formData.cidade) {
      newErrors.cidade = "Cidade é obrigatória";
    }
    if (!formData.uf) {
      newErrors.uf = "UF é obrigatória";
    }
    if (!formData.celular || formData.celular.length < 11) {
      newErrors.celular = "Celular inválido";
      if (!formData.celular) {
        newErrors.celular = "Celular é obrigatório";
      }
    }
    if (!formData.login || formData.login.length < 8) {
      newErrors.login = "Login deve ter pelo menos 8 caracteres";
      if (!formData.login) {
        newErrors.login = "Login é obrigatório";
      }
    }
    if (!formData.senha || formData.senha.length < 8) {
      newErrors.senha = "Senha deve ter pelo menos 8 caracteres";
      if (!formData.senha) {
        newErrors.senha = "Senha é obrigatória";
      }
    }
    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = "Senhas não coincidem";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      console.log("Enviando dados:", formData);
      setSuccess({ message: "Cadastro realizado com sucesso!" });
      setErrors({});

      setTimeout(() => {
        navigate("/result");
      }, 2000);
    } catch (error) {
      console.error("Erro:", error);
      setErrors({
        ...newErrors,
        unsuccess: "Erro ao enviar os dados. Tente novamente.",
      });
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setErrors({});
    setSuccess({ message: "" });
  };

  useEffect(() => {
    if (errors.unsuccess) {
      const timer = setTimeout(() => {
        setErrors((prev) => ({ ...prev, unsuccess: null }));
      }, 5000); // 5000 milissegundos = 5 segundos

      return () => clearTimeout(timer);
    }
  }, [errors.unsuccess]);

  useEffect(() => {
    if (success.message) {
      const timer = setTimeout(() => {
        setSuccess({ message: null });
      }, 5000); // 5000 milissegundos = 5 segundos

      return () => clearTimeout(timer);
    }
  }, [success.message]);

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Usuários</h2>
      <form className="cadastro-form" onSubmit={handleSubmit} noValidate>
        {/* Dados Pessoais */}
        <fieldset className="fieldset-dados-pessoais">
          <legend>Dados Pessoais</legend>
          <label htmlFor="nomeCompleto">
            Nome Completo:
            <input
              type="text"
              id="nomeCompleto"
              name="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={handleChange}
              aria-describedby="nomeCompleto-help"
              className={errors.nomeCompleto ? "input-error" : ""}
            />
          </label>
          {errors.nomeCompleto && (
            <small id="nomeCompleto-help" className="errors-text">
              {errors.nomeCompleto}
            </small>
          )}

          <label htmlFor="cpf">
            CPF:
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf.replace(
                /(\d{3})(\d{3})(\d{3})(\d{2})/,
                "$1.$2.$3-$4"
              )}
              onChange={handleChange}
              aria-describedby="cpf-help"
              className={errors.cpf ? "input-error" : ""}
            />
          </label>
          {errors.cpf && (
            <small id="cpf-help" className="errors-text">
              {errors.cpf}
            </small>
          )}

          <label htmlFor="dataNascimento">
            Data de Nascimento:
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              aria-describedby="dataNascimento-help"
              className={errors.dataNascimento ? "input-error" : ""}
            />
          </label>
          {errors.dataNascimento && (
            <small id="dataNascimento-help" className="errors-text">
              {errors.dataNascimento}
            </small>
          )}

          <label htmlFor="genero">
            Gênero:
            <select
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              aria-describedby="genero-help"
              className={errors.genero ? "input-error" : ""}
            >
              <option value="" disabled selected>
                Selecione
              </option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
              <option value="Prefiro não dizer">Prefiro não dizer</option>
            </select>
          </label>
          {errors.genero && (
            <small id="genero-help" className="errors-text">
              {errors.genero}
            </small>
          )}

          <label htmlFor="estadoCivil">
            Estado Civil:
            <select
              id="estadoCivil"
              name="estadoCivil"
              value={formData.estadoCivil}
              onChange={handleChange}
              aria-describedby="estadoCivil-help"
              className={errors.estadoCivil ? "input-error" : ""}
            >
              <option value="" disabled selected>
                Selecione
              </option>
              <option value="Solteiro">Solteiro</option>
              <option value="Casado">Casado</option>
              <option value="Viuvo">Viúvo</option>
              <option value="Divorciado">Divorciado</option>
            </select>
          </label>
          {errors.estadoCivil && (
            <small id="estadoCivil-help" className="errors-text">
              {errors.estadoCivil}
            </small>
          )}
        </fieldset>

        {/* Dados de Contato */}
        <fieldset className="fieldset-dados-contato">
          <legend>Dados de Contato</legend>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              aria-describedby="email-help"
              className={errors.email ? "input-error" : ""}
            />
          </label>
          {errors.email && (
            <small id="email-help" className="errors-text">
              {errors.email}
            </small>
          )}

          <label htmlFor="celular">
            Celular:
            <input
              type="text"
              id="celular"
              name="celular"
              value={formData.celular.replace(
                /(\d{2})(\d{5})(\d{4})/,
                "($1) $2-$3"
              )}
              onChange={handleChange}
              aria-describedby="celular-help"
              className={errors.celular ? "input-error" : ""}
            />
          </label>
          {errors.celular && (
            <small id="celular-help" className="errors-text">
              {errors.celular}
            </small>
          )}

          <label htmlFor="cep">
            CEP:
            <input
              type="text"
              id="cep"
              name="cep"
              value={formData.cep.replace(/(\d{5})(\d{3})/, "$1-$2")}
              onChange={handleChange}
              onBlur={handleBuscarCep}
              aria-describedby="cep-help"
              className={errors.cep ? "input-error" : ""}
            />
          </label>
          {errors.cep && (
            <small id="cep-help" className="errors-text">
              {errors.cep}
            </small>
          )}

          <label htmlFor="endereco">
            Endereço:
            <input
              type="text"
              id="endereco"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              aria-describedby="endereco-help"
              className={errors.endereco ? "input-error" : ""}
              readOnly={!formData.enderecoEditavel} // Habilita/desabilita edição
            />
          </label>
          {errors.endereco && (
            <small id="endereco-help" className="errors-text">
              {errors.endereco}
            </small>
          )}

          <div className="numero-complemento">
            <div>
              <label htmlFor="numero">
                Número:
                <input
                  type="text"
                  id="numero"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  aria-describedby="numero-help"
                  className={errors.numero ? "input-error" : ""}
                />
              </label>
              {errors.numero && (
                <small id="numero-help" className="errors-text">
                  {errors.numero}
                </small>
              )}
            </div>
            <div>
              <label htmlFor="complemento">
                Complemento:
                <input
                  type="text"
                  id="complemento"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <label htmlFor="bairro">
            Bairro:
            <input
              type="text"
              id="bairro"
              name="bairro"
              value={formData.bairro}
              onChange={handleChange}
              aria-describedby="bairro-help"
              className={errors.bairro ? "input-error" : ""}
              readOnly={!formData.bairroEditavel} // Habilita/desabilita edição
            />
          </label>
          {errors.bairro && (
            <small id="bairro-help" className="errors-text">
              {errors.bairro}
            </small>
          )}

          <label htmlFor="cidade">
            Cidade:
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              aria-describedby="cidade-help"
              className={errors.cidade ? "input-error" : ""}
              readOnly
            />
          </label>
          {errors.cidade && (
            <small id="cidade-help" className="errors-text">
              {errors.cidade}
            </small>
          )}

          <label htmlFor="uf">
            UF:
            <input
              type="text"
              id="uf"
              name="uf"
              value={formData.uf}
              onChange={handleChange}
              aria-describedby="uf-help"
              className={errors.uf ? "input-error" : ""}
              readOnly
            />
          </label>
          {errors.uf && (
            <small id="uf-help" className="errors-text">
              {errors.uf}
            </small>
          )}
        </fieldset>

        {/* Dados de Cadastro */}
        <fieldset className="fieldset-dados-cadastro">
          <legend>Dados de Cadastro</legend>
          <label htmlFor="login">
            Login:
            <input
              type="text"
              id="login"
              name="login"
              value={formData.login}
              onChange={handleChange}
              aria-describedby="login-help"
              className={errors.login ? "input-error" : ""}
            />
          </label>
          {errors.login && (
            <small id="login-help" className="errors-text">
              {errors.login}
            </small>
          )}

          <label htmlFor="senha">
            Senha:
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              aria-describedby="senha-help"
              className={errors.senha ? "input-error" : ""}
            />
          </label>
          {errors.senha && (
            <small id="senha-help" className="errors-text">
              {errors.senha}
            </small>
          )}

          <label htmlFor="confirmarSenha">
            Confirmar Senha:
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              aria-describedby="confirmarSenha-help"
              className={errors.confirmarSenha ? "input-error" : ""}
            />
          </label>
          {errors.confirmarSenha && (
            <small id="confirmarSenha-help" className="errors-text">
              {errors.confirmarSenha}
            </small>
          )}
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
          <button type="submit">Cadastrar</button>
          <button type="button" onClick={handleReset}>
            Limpar
          </button>
        </div>

        {/* Mensagem de erro global */}
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
}

export default Form;
