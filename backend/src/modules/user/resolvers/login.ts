import { ApolloError } from 'apollo-server-express';
import bcrypt from 'bcrypt';

import config from '../../../config';
import User from '../../../models/user';
import tokenUtil from '../../../utils/token';

type Args = {
  email: string;
  password: string;
};

const login = async (_parent: any, args: Args) => {
  const { email, password } = args;
  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  });

  if (!user) {
    throw new ApolloError('The username and/or password you entered is incorrect.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

  if (!isPasswordValid) {
    throw new ApolloError('The username and/or password you entered is incorrect.');
  }

  const token = tokenUtil.create(user.id);

  return {
    token,
    tokenExpiration: config.JwtLifeTime,
    user: {
      created: user.created,
      email: user.email,
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName,
    },
  };
};

export default login;
