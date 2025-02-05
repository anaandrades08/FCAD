import React, { useContext } from "react";
import { FormContext } from "../context/FormContext";
import "../css/FormResult.css";

function FormResult() {
  const { formData } = useContext(FormContext);

  // Função para formatar CPF
  const formatarCPF = (cpf) => {
    if (!cpf) return "Não informado";
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  // Função para formatar CEP
  const formatarCEP = (cep) => {
    if (!cep) return "Não informado";
    return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
  };

  // Função para formatar Data de Nascimento (dd/MM/aaaa)
  const formatarDataNascimento = (data) => {
    if (!data) return "Não informado";

    // Divide a data no formato ISO (aaaa-MM-dd)
    const [ano, mes, dia] = data.split("-");

    // Retorna no formato brasileiro (dd/MM/aaaa)
    return `${dia}/${mes}/${ano}`;
  };

  // Função para formatar Telefone (ex: (XX) XXXXX-XXXX)
  const formatarTelefone = (telefone) => {
    if (!telefone) return "Não informado";
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  return (
    <div className="resultado-container">
      <h2>Cadastro Realizado com Sucesso!</h2>

      {/* Dados Pessoais */}
      <div className="dados-cadastro">
        <h3>Dados Pessoais</h3>
        <p>
          <strong>Nome Completo:</strong>{" "}
          {formData.nomeCompleto || "Não informado"}
        </p>
        <p>
          <strong>CPF:</strong> {formatarCPF(formData.cpf)}
        </p>
        <p>
          <strong>Data de Nascimento:</strong>{" "}
          {formatarDataNascimento(formData.dataNascimento)}
        </p>
        <p>
          <strong>Gênero:</strong> {formData.genero || "Não informado"}
        </p>
        <p>
          <strong>Estado Civil:</strong>{" "}
          {formData.estadoCivil || "Não informado"}
        </p>
      </div>

      {/* Dados de Contato */}
      <div className="dados-cadastro">
        <h3>Dados de Contato</h3>
        <p>
          <strong>Email:</strong> {formData.email || "Não informado"}
        </p>
        <p>
          <strong>Celular:</strong> {formatarTelefone(formData.celular)}
        </p>

        <p>
          <strong>CEP:</strong> {formatarCEP(formData.cep)}
        </p>
        <p>
          <strong>Endereço:</strong> {formData.endereco || "Não informado"}
        </p>
        <p>
          <strong>Número:</strong> {formData.numero || "Não informado"}
        </p>
        <p>
          <strong>Complemento:</strong>{" "}
          {formData.complemento || "Não informado"}
        </p>
        <p>
          <strong>Bairro:</strong> {formData.bairro || "Não informado"}
        </p>
        <p>
          <strong>Cidade:</strong> {formData.cidade || "Não informado"}
        </p>
        <p>
          <strong>UF:</strong> {formData.uf || "Não informado"}
        </p>
      </div>

      {/* Dados de Cadastro */}
      <div className="dados-cadastro">
        <h3>Dados de Cadastro</h3>
        <p>
          <strong>Login:</strong> {formData.login || "Não informado"}
        </p>
        <p>
          <strong>Senha:</strong> ********
        </p>
      </div>

      {/* Interesses */}
      {formData.interesses && formData.interesses.length > 0 && (
        <div className="dados-cadastro">
          <h3>Interesses</h3>
          <ul>
            {formData.interesses.map((interesse, index) => (
              <li key={index}>{interesse}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FormResult;
