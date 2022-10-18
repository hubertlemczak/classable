import { TRegisterArgs } from '../../../@types/auth';
import { hashStr } from '../../auth';

import dbClient from '../../utils/dbClient';

export async function create({
  email,
  password,
  firstName,
  lastName,
}: TRegisterArgs) {
  const hashedPassword = await hashStr(password);

  return await dbClient.user.create({
    data: {
      email,
      password: hashedPassword,
      profile: {
        create: {
          firstName,
          lastName,
        },
      },
    },
  });
}
