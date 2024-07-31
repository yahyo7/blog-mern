import express from 'express';
import { Signup, Signin } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/sign-up', Signup);
router.post('/sign-in', Signin )

export default router;