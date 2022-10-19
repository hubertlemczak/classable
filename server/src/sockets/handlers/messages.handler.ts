import { Server } from 'socket.io';
import model from '../models/messages.model';
import { TSocketWithUser } from '../../../@types/io';
import { TCreateMessage } from '../../../@types/messages';

const messagesHandler = (socket: TSocketWithUser, io: Server) => {
  const createMessage = async ({ content, userId, chatId }: TCreateMessage) => {
    try {
      const createdMessage = await model.createMessage({
        content,
        chatId,
        userId,
      });

      if (createdMessage) {
        io.to(chatId).emit('chat-message', createdMessage);
      }
    } catch (err) {
      socket.emit('exception', err);
      console.error('err', err);
    }
  };

  const handleTyping = ({ chatId }: { chatId: string }) => {
    try {
      socket.broadcast.to(chatId).emit('typing', socket.user?.p);
    } catch (err) {
      socket.emit('exception', err);
      console.error('err', err);
    }
  };

  socket.on('chat-message', createMessage);
  socket.on('typing', handleTyping);
};

export default messagesHandler;
