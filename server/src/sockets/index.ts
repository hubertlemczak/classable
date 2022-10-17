import { NotFoundError } from '@prisma/client/runtime';
import { JsonWebTokenError } from 'jsonwebtoken';
import { Server } from 'socket.io';

import { TDecodedUser } from '../../@types/auth';
import { TSocketWithUser } from '../../@types/io';

import { verifyToken } from '../auth';
import dbClient from '../utils/dbClient';
import messagesHandler from './handlers/messages.handler';

const getUser = async ({ id }: TDecodedUser) => {
  return await dbClient.user.findUniqueOrThrow({
    where: { id },
    include: {
      chatrooms: {
        where: {
          userId: id,
        },
      },
    },
  });
};

export default function sockets({ io }: { io: Server }) {
  io.use(async (socket: TSocketWithUser, next) => {
    try {
      const token = socket.handshake.auth.token;
      const user = verifyToken(token);

      const foundUser = await getUser(user as TDecodedUser);

      socket.user = user as TDecodedUser;

      foundUser.chatrooms.forEach(chatroom => {
        socket.join(chatroom.conversationId);
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
    const users: TDecodedUser[] = [];
    io.of('/').sockets.forEach((s: TSocketWithUser) => {
      users.push(s.user as TDecodedUser);
    });
    io.emit('online-users', users);

    messagesHandler(socket, io);

    socket.on('disconnect', () => {
      const users: TDecodedUser[] = [];
      io.of('/').sockets.forEach((s: TSocketWithUser) => {
        users.push(s.user as TDecodedUser);
      });
      io.emit('online-users', users);
      console.log('user disconnected');
    });
  };

  io.on('connection', onConnection);
}
