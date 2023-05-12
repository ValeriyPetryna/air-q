<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description
NestJS + Mongo Atlas DB + Docker

Required to have installed Node/npm, Docker, and Docker Compose

## Preparing to Installation

```bash
$ Clone repository and Rename .env.example to .env
```

## Installation

Build docker images and run containers:
```bash
$ docker-compose up --build -d
```

> or download all packages and run application without docker containers:
```bash
$ npm install
$ npm run start
```

## Links:

### Running the app by default:
> Endpoints described in Swagger API Documentation:

[App link](https://localhost:3000)


## Test

```bash
$ npm run test
```
