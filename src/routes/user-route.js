import express from 'express';
import { UserController } from '../controller/user-controller.js';
import { Middleware } from '../middleware/middleware.js';

export const userRoute = express.Router();

userRoute.post(
    UserController.login.path, 
    UserController.login.handler
);

userRoute.post(
    UserController.register.path, 
    UserController.register.handler
);

userRoute.get(
    UserController.getProfile.path, 
    Middleware.validateApiToken,
    UserController.getProfile.handler
);