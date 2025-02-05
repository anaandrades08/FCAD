# FCAD - Sistema de Cadastro

FCAD é um sistema completo de cadastro que integra um front-end em React e um back-end em Node.js, utilizando EmailJS para envio de emails e PostgreSQL como banco de dados. Este projeto foi desenvolvido para fornecer uma solução eficiente e escalável para gerenciamento de cadastros.

## Tecnologias Utilizadas

- **Front-end**: React
- **Back-end**: Node.js, Express
- **Banco de Dados**: PostgreSQL
- **Envio de Emails**: EmailJS

## Instalação

### Pré-requisitos

- Node.js
- PostgreSQL

### Configuração do Banco de Dados

1. Instale e configure o PostgreSQL no seu sistema.
2. Crie um banco de dados para o projeto:
    ```sql
    CREATE DATABASE fcad_db;
    ```

### Configuração do Back-end

1. Navegue até o diretório do servidor e instale as dependências:
    ```bash
    cd server
    npm install
    ```

2. Crie um arquivo `.env` no diretório `server` com as seguintes configurações:
    ```
    PORT=5000
    DATABASE_URL=postgresql://username:password@localhost:5432/fcad_db
    JWT_SECRET=sua_chave_secreta
    EMAILJS_USER=seu_usuario_emailjs
    EMAILJS_SERVICE_ID=seu_service_id
    EMAILJS_TEMPLATE_ID=seu_template_id
    ```

3. Inicie o servidor:
    ```bash
    npm start
    ```

### Configuração do Front-end

1. Navegue até o diretório do cliente e instale as dependências:
    ```bash
    cd ../client
    npm install
    ```

2. Crie um arquivo `.env` no diretório `client` com as seguintes configurações:
    ```
    REACT_APP_API_URL=http://localhost:5000/api
    ```

3. Inicie o servidor de desenvolvimento do React:
    ```bash
    npm start
    ```

### Executar Projeto Completo

Você pode iniciar o servidor e o cliente simultaneamente a partir da raiz do projeto usando o seguinte comando:

```bash
npm install concurrently --save-dev
npm start
