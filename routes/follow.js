import express from 'express';
import * as followController from '../controllers/follow';
import * as authMiddleware from '../middlewares/authenticated';

const api = express.Router();

api.post('/follow', authMiddleware.isAuth, followController.followUser);
api.delete('/unfollow/:id', authMiddleware.isAuth, followController.unFollowUser);
api.get(
  '/myFollows/:id?/:page?',
  authMiddleware.isAuth,
  followController.peopleFollowedByMePaginate
);
api.get('/myFollows/:id?', authMiddleware.isAuth, followController.peopleFollowedByMe);
api.get('/followers/:id?/:page?', authMiddleware.isAuth, followController.yourFollowersPaginate);
api.get('/followers/:id?', authMiddleware.isAuth, followController.yourFollowers);

export default api;
