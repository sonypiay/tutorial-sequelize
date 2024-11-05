import express from 'express';
import { router } from './router.js';

export const serve = express();

serve.use(express.json());
serve.use(express.urlencoded({ extended: false }));
serve.use(router);