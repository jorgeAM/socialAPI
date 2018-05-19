import express from 'express';
import * as userController from '../controllers/user';

const api = express.Router();

api.post('/sign-up', userController.signUp);
api.post('/sign-in', userController.signIn);

export default api;
