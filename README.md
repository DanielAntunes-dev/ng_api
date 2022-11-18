# ng_api


[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=ng_api&uri=https%3A%2F%2Fraw.githubusercontent.com%2FDanielAntunes-dev%2Fng_api%2Fmaster%2FInsomnia_2022-11-18.json)


📝 Features Created
=====================
* Login (JWT Authentication)
* Users CRUD
* Account CRUD
* Transactions CRUD


🚀 Techs
=================

<table>
<tr>
<td>postegre</td>
<td>node</td>
<td>express</td>
<td>typescript</td>
<td>typeorm</td>
<td>bcrypt</td>
<td>jsonwebtoken</td>
<td>class-validator</td>
<td>reflect-metadata</td>
</tr>
</table>

### 🔧 Instalação
    - Após clonar o repositório, acesse via terminal a pasta ./src/ executar o comando "npm install" para instalar todas as dependências do projeto.

    - Criar um arquivo na raiz do projeto com o nome ".env", com o seguinte conteúdo (substitua pelas suas informações sem as aspas):</br>

        DB_HOST="local onde está rodando o servidor, para servidor local usar localhost"
        DB_PORT="3000"
        DB_USER="nome do seu usuario no pg"
        DB_PASS="senha do seu usuario no pg"
        DB_NAME="api_ng"

        JWT_PASS="criar senha com caracteres validos"


    - Criar banco de dados dentro do pg com o seguinte nome: parrot e deixar o banco vazio.
    - No terminal, rodar os comandos, todos sem aspas:
    - "npm run migration:generate" e em seguida "npm run migration:run" para gerar as tabelas com as migrations;
    - Para iniciar o servidor da API via script, acesse o terminal e execute o seguinte comando: npm run dev.


