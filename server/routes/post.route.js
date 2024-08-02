import express from "express";
import { createPost, getPosts } from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/create', verifyToken, createPost)
router.get('/get-posts', getPosts)

export default router;