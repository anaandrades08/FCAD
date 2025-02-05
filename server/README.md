# FCAD - Servidor

Este é o back-end do sistema de cadastro FCAD, desenvolvido com Node.js e Express. Ele gerencia a lógica do servidor, as APIs e a conexão com o banco de dados PostgreSQL.

## Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- dotenv

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

### Configuração do Servidor

1. Navegue até o diretório `server` e instale as dependências:
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

### Executar o Servidor

Para iniciar o servidor, execute:
```bash
npm start
