import express from 'express';
import * as followController from '../controllers/follow';
import * as authMiddleware from '../middlewares/authenticated';

const api = express.Router();

api.post('/follow', authMiddleware.isAuth, followController.followUser);
api.post('/unfollow', authMiddleware.isAuth, followController.unFollowUser);

export default api;
