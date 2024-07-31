import express from 'express';
import { Signup, Signin, GoogleAuth } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/sign-up', Signup);
router.post('/sign-in', Signin )
router.post('/google', GoogleAuth)

export default router;