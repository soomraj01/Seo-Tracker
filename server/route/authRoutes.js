
import express from 'express'
import {login, getUser, register } from '../controllers/authcontroller.js';
import auth from '../middleware/auth.js';
const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
//auth middleware
authRouter.get('/', auth, getUser);

export default authRouter;