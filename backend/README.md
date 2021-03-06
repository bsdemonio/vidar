# NodeJS (Express) + GraphQL (Apollo Server)

## Language

- Typescript

## Authentication

- jwt

## Database

- MongoDB (mongoose)

## Dev Tools

- Nodemon
- Prettier
- EsLint
- Husky

## Folder Structure

    .
    └── src
    |    ├── directives          # Custom GraphQL directives http://spec.graphql.org/draft/#sec-Type-System.Directives
    |    ├── models              # Mongo models
    |    ├── modules             # GraphQL module (include schema and resolvers)
    |    ├── scalars             # Custom GraphQL types http://spec.graphql.org/draft/#sec-Scalars
    |    └── utils               # Shared functions across the project
    └── tests

## Setup Development Env

- Clone the repository
- Install nvm https://github.com/nvm-sh/nvm#installing-and-updating
- Run `nvm use` to use the correct version of node supported
- Run `yarn install` to install dependencies
- Make a copy of the `.env.sample` file and rename it to `.env`
- Install mongodb https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
- Create a new database and set the URI in the .env file i.e. `mongodb://localhost:27017/vidar`

## Deploy to Heroku

## Scripts

### `yarn dev`

Runs the app in development mode.

### `yarn lint`

Launches the lint runner in the interactive watch mode.<br />
Learn more about [ESLint](https://eslint.org/docs/user-guide/getting-started).

### `yarn format`

Launches the format runner in the interactive watch mode.<br />
Learn more about [Prettier](https://prettier.io/).

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
