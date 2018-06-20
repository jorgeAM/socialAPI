import express from 'express';
import multipart from 'connect-multiparty';
import * as userController from '../controllers/user';
import * as authMiddleware from '../middlewares/authenticated';

const api = express.Router();
const multipartMiddleware = multipart({
  uploadDir: './uploads/users',
});

api.post('/sign-up', userController.signUp);
api.post('/sign-in', userController.signIn);
api.get('/users/:page?', authMiddleware.isAuth, userController.getUsers);
api.get('/user/:id', authMiddleware.isAuth, userController.getUser);
api.get('/counter/:id?', authMiddleware.isAuth, userController.getCounters);
api.put('/user/:id', authMiddleware.isAuth, userController.updateProfile);
api.post(
  '/my-avatar/:id',
  [authMiddleware.isAuth, multipartMiddleware],
  userController.uploadAvatar
);
api.get('/avatar/:avatar', authMiddleware.isAuth, userController.getAvatar);

export default api;
