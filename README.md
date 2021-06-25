## Descrição para uso
Antes de iniciar, rode um cada projeto, um `npm install`, para instalar as dependencias do projeto.

Inicie o docker-compose na raiz do projeto, esse docker-compose configura e inicia o banco postgreSQL e o MongoDB.

```
docker-compose up -d
```

Após iniciar o banco de dados, inicie os projetos.

Para iniciar a api:

```
cd backend-bff && npm run start:dev
```

Para iniciar o microserviço de produtos:

```
cd products-micro && npm run start:dev
```

Para iniciar o microserviço de carrinhos:

```
cd cart-micro && npm run start:dev
```

Por ultimo chame a rota `/products/add` para popular a tabela de produtos.

## Requisitos
* NodeJs
* NPM
* Docker
* docker-compose