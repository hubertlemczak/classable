import express, { Request, Response } from 'express';

const api = express.Router();

import usersController from './controllers/users.controller';
import authController from './controllers/auth.controller';
import messagesController from './controllers/messages.controller';
import chatsController from './controllers/chats.controller';
import coursesController from './controllers/courses.controller';
import boardsController from './controllers/boards.controller';
import notesController from './controllers/notes.controller';
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
api.get('/users/:id/follows', authenticateUser, usersController.getFollows);

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

// chats

api.get('/chats', authenticateUser, chatsController.getAll);
api.get('/chats/:id', authenticateUser, chatsController.getById);

// courses

api.get('/courses', authenticateUser, coursesController.getAll);
api.get('/courses/:id', authenticateUser, coursesController.getById);

// boards

api.get('/boards', authenticateUser, boardsController.getAll);
api.get('/boards/:id', authenticateUser, boardsController.getById);

// notes

api.post('/notes', authenticateUser, notesController.create);

api.get('/notes', authenticateUser, notesController.getAll);
api.get('/notes/:id', authenticateUser, notesController.getById);

export default api;
