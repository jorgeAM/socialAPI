import express from 'express';
import * as followController from '../controllers/follow';
import * as authMiddleware from '../middlewares/authenticated';

const api = express.Router();

export default api;
