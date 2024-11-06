import express from 'express';
import cors from 'cors';
import { Middleware } from '../middleware/middleware.js';
import { userRoute } from '../routes/user-route.js';

export const router = express.Router();

router.use(cors());
router.use(userRoute);
router.use(Middleware.errorException);