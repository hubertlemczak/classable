import dbClient from '../../utils/dbClient';
import { TRegisterArgs } from '../../../@types/auth';

const register = async ({ username, email, password }: TRegisterArgs) => {
  const user = await dbClient.user.create({
    data: {
      username,
      email,
      password,
    },
  });

  return user;
};

export default { register };
