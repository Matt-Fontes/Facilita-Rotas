# Facilita Rotas

Um facilitador para encontrar a melhor rota para visitar diversos clientes e voltar ao ponto de partida. Algoritmo baseado no [Algoritmo de Colônias de Formigas de M. Dorigo](https://www.sciencedirect.com/science/article/abs/pii/S0303264797017085).

## Tecnologias Utilizadas

#### Client:

| Tecnologia | Versão  |
| ---------- | ------- |
| nodejs     | 16.15.0 |
| reactjs    | 18.12.0 |
| antd       | 5.14.0  |

#### Server:

| Tecnologia    | Versão  |
| ------------- | ------- |
| nodejs        | 16.15.0 |
| expressjs     | 4.18.2  |
| pg | 8.11.3  |

#### Database

| Tecnologia    | Versão  |
| ------------- | ------- |
| PostgreSQL        | 16.1 |

## Como Executar

> Certifique-se de ter o nodejs instalado previamente

#### Client:

Primeiro instale todos os pacotes utilizando o `npm`, com o seguinte comando:

```
npm install
```

Antes de rodar o projeto, é necessário configurar a `.env` definindo a porta que o projeto será executado.
Para isso crie o arquivo `.env` seguindo o `.env.example` como base.

Então, execute o seguinte comando para rodar o projeto:

```
npm run start
```

#### Server

Similar ao cliente, inicie instalando todos os pacotes, utilizando `npm`, com o seguinte comando:

```
npm install
```

Configure a `.env`, com base na `.env.example`. Será necessário configurar todos os dados relacionados a conexão do seu banco de dados local, como `host`, `database`, `user`, `password` e `port`.

Então incie o projeto com o seguinte comando:

```
npm run dev
```
