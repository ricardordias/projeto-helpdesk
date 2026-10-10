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
1. Crie um arquivo `.env` na raiz do projeto
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
DB_DATABASE=db_helpdesk
JWT_SECRET=sua_chave_secreta_super_segura
JWT_EXPIRES_IN=8h
```

## Configurar nome e e-mail do git
```bash
git config user.name "Teu Nome"
git config user.email "teu_email_do_git"
```

## Como vai funcionar
```text
main   ← produção (não mexer direto)
  └── dev   ← branch de integração do time (fazer push aqui)
        ├── nataniel
        ├── rodrigo
        └── ricardo
```
Cada um trabalha só na sua branch pessoal. A dev só recebe merge quando a tarefa estiver funcionando. A main só recebe merge quando a dev estiver estável.


1. Ir para a dev e atualizar
```bash
git checkout dev
git pull origin dev
```

2. Criar a branch pessoal a partir da dev atualizada
```bash
git checkout -b nome_do_usuario (usar teu nome para identificar a branch)
```

## Como usar depois de adicionar algo funcional
1. Ver o que mudou
```bash
git status
```

2. Adicionar arquivos alterados
```bash
git add .
```

3. Commitar com mensagem clara
```bash
git commit -m "feat: implementa chamados"
```

4. Enviar a branch para o GitHub
```bash
git push -u origin rodrigo (branch do usuário)
```
O ```-u``` só é necessário na primeira vez que enviam a branch. Depois basta git push

## Quando a implementação estiver ok → merge da branch pessoal para a ```dev```
1. Ir para a dev e atualizar (pega o que os colegas já subiram)
```bash
git checkout dev
git pull origin dev
```

2. Fazer o merge da SUA branch para a dev
```bash
git merge rodrigo
```

3. Subir a dev atualizada para o GitHub
```bash
git push origin dev
```

4. Depois do merge, volte para a sua branch e sincronize:
```bash
git checkout rodrigo
git merge dev
```