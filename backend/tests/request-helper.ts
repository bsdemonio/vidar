import request from 'supertest';

import app from '../src/app';

const graphQLRequest = ({ query, variables = null }: { query: string; variables?: any }) => {
  return request(app).post('/').send({
    query,
    variables,
  });
};
export default graphQLRequest;
