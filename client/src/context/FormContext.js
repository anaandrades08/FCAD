import React, { useState, createContext } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    dataNascimento: "",
    estadoCivil: "",
    genero:"",
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
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
