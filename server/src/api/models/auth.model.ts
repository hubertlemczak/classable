import dbClient from '../../utils/dbClient';
import { TRegisterArgs } from '../../../@types/auth';

async function register({
  email,
  password,
  firstName,
  lastName,
}: TRegisterArgs) {
  const user = await dbClient.user.create({
    data: {
      email,
      password,
      profile: {
        create: {
          firstName,
          lastName,
        },
      },
    },
  });

  return user;
}

export default { register };
