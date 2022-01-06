import isAuthenticated from './is-authenticated';

export default {
  schemaDirectives: {
    isAuthenticated: isAuthenticated.directive,
  },
  typeDefs: [isAuthenticated.typeDef],
};
