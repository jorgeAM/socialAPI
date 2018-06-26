import express from 'express';
import * as publicationController from '../controllers/publication';
import * as authMiddleware from '../middlewares/authenticated';
import multipart from 'connect-multiparty';

const api = express.Router();
const multipartMiddleware = multipart({
  uploadDir: './uploads/publications',
});

api.post('/publication', authMiddleware.isAuth, publicationController.addPublication);
api.get('/publications/:page?', authMiddleware.isAuth, publicationController.getPublications);
api.get('/publication/:id', authMiddleware.isAuth, publicationController.getPublication);
api.delete('/publication/:id', authMiddleware.isAuth, publicationController.deletePublication);
api.post('/publication/:id',
  [authMiddleware.isAuth, multipartMiddleware],
  publicationController.uploadFileInPublication
);
api.get('/publication-file/:image', publicationController.getFilesPublication);

export default api;
