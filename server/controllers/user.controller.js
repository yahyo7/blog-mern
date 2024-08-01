import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
    res.json({message: "Hello World"})
}

// Utility function to remove password from user object
const excludePassword = (user) => {
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You can not update this account!"));
    } 
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, "Password must be at least 6 characters long!"));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
        if (req.body.username.length < 5 || req.body.username.length > 20) {
            return next(errorHandler(400, "Username must be between 5 and 20 characters long!"));
        }
        if (req.body.username.includes(" ")) {
            return next(errorHandler(400, "Username can not contain spaces!"));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, "Username can only contain letters and numbers!"));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, "Username must be lowercase!"));
        }
    }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password
                }
            }, { new: true }); // to send the new information
            const userWithoutPassword = excludePassword(updatedUser);
            res.status(200).json(userWithoutPassword);
        } catch (error) {
            next(error);
        }
    
}