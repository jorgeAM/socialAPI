import express from 'express';
import * as publicationController from '../controllers/publication';
import * as authMiddleware from '../middlewares/authenticated';
import multipart from 'connect-multiparty';

const api = express.Router();
const multipartMiddleware = multipart({
  uploadDir: './uploads/publications',
});

api.post('/publication', authMiddleware.isAuth, publicationController.addPublication);

export default api;
