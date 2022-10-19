import { NotFoundError } from '@prisma/client/runtime';
import { JsonWebTokenError } from 'jsonwebtoken';
import { Server } from 'socket.io';

import { TDecodedUser } from '../../@types/auth';
import { TSocketWithUser } from '../../@types/io';

import { HttpException } from '../api/errors';
import { verifyToken } from '../auth';
import dbClient from '../utils/dbClient';
import messagesHandler from './handlers/messages.handler';

const getUser = async (id: string) => {
  return await dbClient.user.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      profile: {
        select: { firstName: true, lastName: true },
      },
      chatrooms: true,
    },
  });
};

async function authenticateUser(socket: TSocketWithUser) {
  const token = socket.handshake.auth.token?.trim().split(' ')[1];

  if (!token) {
    throw new HttpException(403, 'Unauthorized');
  }

  const decodedUser = verifyToken(token);
  if (!decodedUser) {
    throw new HttpException(403, 'Unauthorized');
  }

  const { id } = decodedUser as TDecodedUser;

  const user = await getUser(id);

  socket.user = {
    id: user.id,
    email: user.email,
    firstName: user.profile?.firstName,
    lastName: user.profile?.lastName,
  };

  return user;
}

export default function sockets({ io }: { io: Server }) {
  io.use(async (socket: TSocketWithUser, next) => {
    try {
      const user = await authenticateUser(socket);
      console.log(user);

      user.chatrooms.forEach(chatroom => {
        socket.join(chatroom?.chatId);
      });

      next();
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        next(err);
      }
      if (err instanceof NotFoundError) {
        next(err);
      }
    }
  });

  const onConnection = (socket: TSocketWithUser) => {
    console.log('a user connected');

    messagesHandler(socket, io);

    socket.on('disconnect', () => {
      const users: TDecodedUser[] = [];

      io.of('/').sockets.forEach((s: TSocketWithUser) => {
        users.push(s.user as TDecodedUser);
      });

      io.emit('online-users', users);
      console.log('user disconnected');
    });

    socket.on('get-online-users', () => {
      const users: TDecodedUser[] = [];

      io.of('/').sockets.forEach((s: TSocketWithUser) => {
        users.push(s.user as TDecodedUser);
      });

      socket.emit('online-users', users);
    });
  };

  io.on('connection', onConnection);
}
