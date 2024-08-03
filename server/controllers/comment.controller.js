import Comment from "../models/comment.model.js"
import { errorHandler } from "../utils/error.js"


export const createComment = async (req, res, next) => {
    try {
        const { postId, userId, content } = req.body

        if (userId !== req.user.id) {
            return next(errorHandler(403, "You can not comment on this post"))
        }

        const newComment = new Comment({content, postId, userId })
        await newComment.save()
        res.status(200).json(newComment)
    } catch (error) {
        next(error)
    }
}