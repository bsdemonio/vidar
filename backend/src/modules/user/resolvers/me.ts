import { IUser } from '../../../models/user';

type Context = {
  user: IUser;
};

const me = async (_parent: any, _args: any, context: Context) => {
  const { user } = context;
  return {
    created: user.created,
    email: user.email,
    firstName: user.firstName,
    id: user.id,
    lastName: user.lastName,
  };
};

export default me;
