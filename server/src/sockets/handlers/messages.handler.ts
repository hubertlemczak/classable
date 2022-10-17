import { Server } from 'socket.io';
import model from '../models/messages.model';
import { TSocketWithUser } from '../../../@types/io';
import { TCreateMessage } from '../../../@types/messages';

const messagesHandler = (socket: TSocketWithUser, io: Server) => {
  const createMessage = async ({
    content,
    userId,
    conversationId,
  }: TCreateMessage) => {
    try {
      const createdMessage = await model.createMessage({
        content,
        conversationId,
        userId,
      });

      if (createdMessage) {
        io.to(conversationId).emit('chat-message', createdMessage);
      }
    } catch (err) {
      socket.emit('exception', err);
      console.error('err', err);
    }
  };

  const handleTyping = ({ conversationId }: { conversationId: string }) => {
    try {
      socket.broadcast.to(conversationId).emit('typing', socket.user?.username);
    } catch (err) {
      socket.emit('exception', err);
      console.error('err', err);
    }
  };

  socket.on('chat-message', createMessage);
  socket.on('typing', handleTyping);
};

export default messagesHandler;
