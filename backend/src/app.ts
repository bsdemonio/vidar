import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import express, { Request } from 'express';

import schema from './modules';
import getUser from './utils/context';

const server = new ApolloServer({
  schema,
  context: async ({ req }: { req: Request }) => ({
    user: await getUser(req),
  }),
  // https://github.com/apollographql/apollo-server/issues/1709
  plugins: [
    {
      requestDidStart() {
        return {
          willSendResponse({ response, errors }) {
            if (response && response.http) {
              if (
                errors &&
                errors.some((err) => err.originalError instanceof AuthenticationError)
              ) {
                response.data = undefined;
                response.http.status = 401;
              }
            }
          },
        };
      },
    },
  ],
});

const app = express();

server.applyMiddleware({
  path: '/',
  app,
});

export default app;
