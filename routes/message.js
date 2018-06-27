import express from 'express';
import * as messageController from '../controllers/message';
import * as authMiddleware from '../middlewares/authenticated';

const api = express.Router();

api.post('/send', authMiddleware.isAuth, messageController.sendMessage);
api.get('/receive/:page?', authMiddleware.isAuth, messageController.receiveMessage);
api.get('/sended/:page?', authMiddleware.isAuth, messageController.sendedMessage);

export default api;
