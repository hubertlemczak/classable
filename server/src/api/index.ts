import express, { Request, Response } from 'express';

const api = express.Router();

import usersController from './controllers/users.controller';
import authController from './controllers/auth.controller';
import messagesController from './controllers/messages.controller';
import conversationsController from './controllers/conversations.controller';
import { authenticateUser } from '../auth';

api.get('/health-check', (req: Request, res: Response) => {
  res.sendStatus(200);
});

// auth
api.post('/login', authController.login);
api.post('/register', authController.register);

// users
api.get('/users', authenticateUser, usersController.getAll);
api.get('/users/:id', authenticateUser, usersController.getById);

api.patch(
  '/users/:id/follows/:followId',
  authenticateUser,
  usersController.createFollow
);

api.delete(
  '/users/:id/follows/:followId',
  authenticateUser,
  usersController.deleteFollow
);

// messages

api.get('/messages', authenticateUser, messagesController.getAll);

// conversations

api.get('/conversations', authenticateUser, conversationsController.getAll);
api.get(
  '/conversations/:id',
  authenticateUser,
  conversationsController.getById
);

export default api;
