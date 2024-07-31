import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

// Utility function to remove password from user object
const excludePassword = (user) => {
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
};

export const Signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username.trim() === '' || email.trim() === '' || password.trim() === '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
};

export const Signin = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password || username.trim() === '' || password.trim() === '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({ username });
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET || 'default_secret_key', { expiresIn: '5h' });

        const userWithoutPassword = excludePassword(validUser);

        res.status(200).cookie('access_token', token, { httpOnly: true }).json(userWithoutPassword);
    } catch (error) {
        next(error);
    }
};
