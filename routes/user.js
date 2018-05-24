import express from 'express';
import * as userController from '../controllers/user';
import * as authMiddleware from '../middlewares/authenticated';

const api = express.Router();

api.post('/sign-up', userController.signUp);
api.post('/sign-in', userController.signIn);
api.get('/users/:page?', authMiddleware.isAuth, userController.getUsers);
api.get('/user/:id', authMiddleware.isAuth, userController.getUser);
api.put('/user/:id', authMiddleware.isAuth, userController.updateProfile);

export default api;
