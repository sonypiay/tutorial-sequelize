import express from 'express';
import { UserController } from '../controller/user-controller.js';

export const userRoute = express.Router();

userRoute.post(UserController.login.path, UserController.login.method);
userRoute.post(UserController.register.path, UserController.register.method);