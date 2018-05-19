import express from 'express';
import * as userController from '../controllers/user';

const api = express.Router();

api.post('/sign-up', userController.signUp);

export default api;
