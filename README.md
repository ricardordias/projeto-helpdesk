# HelpDesk API

API REST para gestão de chamados de suporte — projeto da Residência Interna (Bolsa Futuro Digital).

## Stack
Node.js · Express · MySQL (mysql2/promise) · JWT · bcrypt · dotenv

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/ricardordias/projeto-helpdesk
cd projeto-helpdesk
```

2. Instale as dependências:
```bash
npm install
```

3. Crie o banco de dados e importe os scripts de estrutura e seed:
```bash
mysql -u root -p < src/database/create_database.sql
mysql -u root -p probeautydb < src/database/create_tables.sql
mysql -u root -p probeautydb < src/database/seed_data.sql
```

## Variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto
```bash
cp .env.example .env      # ajuste as credenciais
```

O arquivo deve ter o seguinte conteúdo:

```env
PORT=3000
BASE=http://localhost:3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_DATABASE=probeautydb
JWT_SECRET=sua_chave_secreta_super_segura
JWT_EXPIRES_IN=8h
```