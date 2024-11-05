import express from 'express';
import { Middleware } from '../middleware/middleware.js';
import { userRoute } from '../routes/user-route.js';

export const router = express.Router();

router.use(userRoute);
router.use(Middleware.errorException);