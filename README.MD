# Localizapet

O sistema permite ao usuário comum buscar por animais cadastrados para adoção, divulgação de pets perdidos e poderá ajudar instituições necessitadas. As instituições poderão divulgar animais para adoção e solicitar recursos e ajuda voluntária. A aplicação foi desenvolvida utilizando Spring Boot para o back-end, React para o front-end e o para o banco de dados foi utilizado MongoDB. Com isso, a aplicação foi desenvolvida para ser utilizada como meio para os usuários preocupados com os animais se comunicarem, assim auxiliando também as instituições.

## Modelo de dados
- Collection Markers
- Collection Pets
- Collection Roles
- Collection Users

## Como iniciar a aplicação
### API
- É necessário ter o Java 11
- Na pasta `./api` utilizar o `intellij` ou IDE de preferência, que baixe as dependências do `pom.xml` para iniciar a api do projeto.
- Na pasta `./api/src/main/resources` se encontra o arquivo `application.yml` com as configurações da aplicação.
- É necessário criar o banco de dados no mongoDB local ou no cloud.mongodb.com.
- É necessário inserir a uri do seu mongoDB em `spring: data: mongodb: uri: ${SUA_URI}`.
- Para a inserção dos dados necessários para o mongoDB, utilizar o arquivo `roles.json` na pasta `./data`.
- Os endpoints para utilizar na api estão no arquivo `localizapet-payload-insomnia.json` na pasta `./data`.

### APP
- É necessário ter o Node 16
- Ao acessar a pasta `./app` dentro do terminal, utilizar o comando `npm i` para instalar as dependências da aplicação.
- Ainda na pasta `./app` dentro do terminal, utilizar o comando `npm start` para iniciar a aplicação front-end.

## Rotas (REST)
| Rota | Descrição |
| --- | --- |
| `POST /auth/signin` | Realiza o login |
| `POST /auth/signup` | Cadastrar usuário |
| --- | --- |
| `GET /user/{userId}` | Lista informações básicas do usuário |
| `GET /user/full/{userId}` | Lista todas informações do usuário |
| `GET /user` | Lista informações do usuário logado |
| `PUT /user` | Atualiza informações do usuário |
| --- | --- |
| `GET /pet/{petId}` | Lista informações do pet |
| `GET /pet/list` | Lista os pets do usuário |
| `GET /pet/list/{petNome}` | Lista os pets do usuário pelo nome |
| `POST /pet/save` | Cadastra um pet |
| `PUT /pet/update/{petId}` | Atualiza do pet |
| --- | --- |
| `GET /marker/show/{pontoId}` | Lista informações do ponto |
| `GET /marker/list` | Lista os pontos |
| `DEL /marker/{pontoId}` | Delete o ponto |
| --- | --- |
